import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const downloadRateMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = downloadRateMap.get(ip);
  if (!entry || now > entry.resetTime) {
    downloadRateMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

const TOKEN_SECRET =
  process.env.DOWNLOAD_TOKEN_SECRET || 'apk-vault-secure-token-secret-2024';
const TOKEN_EXPIRY = 5 * 60 * 1000;

interface TokenPayload {
  appId: string;
  expiresAt: number;
  nonce: string;
}

function createToken(payload: TokenPayload): string {
  const data = JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(data)
    .digest('hex');
  return Buffer.from(data).toString('base64') + '.' + signature;
}

function verifyToken(token: string): TokenPayload | null {
  try {
    const [dataB64, signature] = token.split('.');
    if (!dataB64 || !signature) return null;

    const data = Buffer.from(dataB64, 'base64').toString();
    const expectedSig = crypto
      .createHmac('sha256', TOKEN_SECRET)
      .update(data)
      .digest('hex');

    if (signature !== expectedSig) return null;

    const payload: TokenPayload = JSON.parse(data);
    if (Date.now() > payload.expiresAt) return null;

    return payload;
  } catch {
    return null;
  }
}

function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  );
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Download rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const appId = body.appId;

    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ error: 'Invalid app ID' }, { status: 400 });
    }

    const serverClient = getServerClient();

    const { data: app, error } = await serverClient
      .from('apps')
      .select('id, title, slug, download_url, checksum, version')
      .eq('id', appId)
      .maybeSingle();

    if (error || !app) {
      return NextResponse.json({ error: 'App not found' }, { status: 404 });
    }

    const nonce = crypto.randomBytes(16).toString('hex');
    const expiresAt = Date.now() + TOKEN_EXPIRY;
    const token = createToken({ appId: app.id, expiresAt, nonce });

    await serverClient.from('download_logs').insert({
      app_id: app.id,
      ip_address: crypto.createHash('sha256').update(ip).digest('hex'),
      user_agent: request.headers.get('user-agent') || 'unknown',
    });

    await serverClient.rpc('increment_downloads', { app_id: app.id });

    return NextResponse.json({
      token,
      expires_at: expiresAt,
      app_id: app.id,
      checksum: app.checksum,
      download_url: `/api/download?token=${token}`,
    });
  } catch (err) {
    console.error('Download token error:', err);
    return NextResponse.json(
      { error: 'Failed to generate download token' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Download rate limit exceeded.' },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing download token' }, { status: 400 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
  }

  const serverClient = getServerClient();

  const { data: app, error } = await serverClient
    .from('apps')
    .select('id, title, slug, download_url, checksum, version, file_size')
    .eq('id', payload.appId)
    .maybeSingle();

  if (error || !app) {
    return NextResponse.json({ error: 'App not found' }, { status: 404 });
  }

  return NextResponse.json({
    app: {
      id: app.id,
      title: app.title,
      slug: app.slug,
      version: app.version,
      file_size: app.file_size,
      checksum: app.checksum,
    },
    download_url: app.download_url,
    message: 'Download token verified. In production, file streaming would begin here.',
  });
}
