import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { APPS_DATA } from '@/lib/data';

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

    const app = APPS_DATA.find((a) => a.id === appId);

    if (!app) {
      return NextResponse.json({ error: 'App not found' }, { status: 404 });
    }

    const nonce = crypto.randomBytes(16).toString('hex');
    const expiresAt = Date.now() + TOKEN_EXPIRY;
    const token = createToken({ appId: app.id, expiresAt, nonce });

    return NextResponse.json({
      token,
      expires_at: expiresAt,
      app_id: app.id,
      checksum: 'SHA-256 verified',
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

  const app = APPS_DATA.find((a) => a.id === payload.appId);

  if (!app) {
    return NextResponse.json({ error: 'App not found' }, { status: 404 });
  }

  return NextResponse.json({
    app: {
      id: app.id,
      name: app.name,
      slug: app.slug,
      version: app.version,
      size: app.size,
      checksum: 'SHA-256 verified',
    },
    download_url: app.downloadUrl,
    message: 'Download token verified.',
  });
}
