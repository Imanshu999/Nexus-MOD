import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'popular';
  const page = Math.max(parseInt(searchParams.get('page') || '1'), 1);
  const limit = Math.min(parseInt(searchParams.get('limit') || '24'), 50);
  const featured = searchParams.get('featured') === 'true';
  const trending = searchParams.get('trending') === 'true';
  const recent = searchParams.get('recent') === 'true';
  const recommended = searchParams.get('recommended') === 'true';

  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from('apps')
      .select(
        'id, title, slug, developer, type, icon_url, banner_url, version, file_size, rating, downloads, category_id, category:categories(name, slug)',
        { count: 'exact' }
      );

    if (type) query = query.eq('type', type);
    if (category) query = query.eq('categories.slug', category);
    if (featured) query = query.eq('is_featured', true);
    if (trending) query = query.eq('is_trending', true);
    if (recent) query = query.eq('is_recent', true);
    if (recommended) query = query.eq('is_recommended', true);

    switch (sort) {
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'recent':
        query = query.order('created_at', { ascending: false });
        break;
      case 'popular':
      default:
        query = query.order('downloads', { ascending: false });
        break;
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      results: data || [],
      total: count || 0,
      page,
      limit,
      total_pages: Math.ceil((count || 0) / limit),
    });
  } catch (err) {
    console.error('Apps fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch apps' }, { status: 500 });
  }
}
