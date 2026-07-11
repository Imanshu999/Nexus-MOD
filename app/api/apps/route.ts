import { NextRequest, NextResponse } from 'next/server';
import { getAppsByType } from '@/lib/data';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 60;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || '';
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'popular';
  const page = Math.max(parseInt(searchParams.get('page') || '1'), 1);
  const limit = Math.min(parseInt(searchParams.get('limit') || '24'), 50);

  try {
    const { results, total, totalPages } = getAppsByType(
      type,
      category,
      sort,
      page,
      limit
    );

    return NextResponse.json({
      results,
      total,
      page,
      limit,
      total_pages: totalPages,
    });
  } catch (err) {
    console.error('Apps fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch apps' }, { status: 500 });
  }
}
