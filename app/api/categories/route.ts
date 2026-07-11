import { NextResponse } from 'next/server';
import { CATEGORIES_DATA } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ categories: CATEGORIES_DATA });
}
