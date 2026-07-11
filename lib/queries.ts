import { supabase } from './supabase';
import type { AppListItem, Category, AppItem } from './types';

const PUBLIC_FIELDS =
  'id, title, slug, developer, type, icon_url, banner_url, version, file_size, rating, downloads, category_id, category:categories(name, slug)';

export async function getFeaturedApps(): Promise<AppListItem[]> {
  const { data } = await supabase
    .from('apps')
    .select(PUBLIC_FIELDS)
    .eq('is_featured', true)
    .order('downloads', { ascending: false })
    .limit(5);
  return (data as unknown as AppListItem[]) || [];
}

export async function getTrendingApps(): Promise<AppListItem[]> {
  const { data } = await supabase
    .from('apps')
    .select(PUBLIC_FIELDS)
    .eq('is_trending', true)
    .order('downloads', { ascending: false })
    .limit(12);
  return (data as unknown as AppListItem[]) || [];
}

export async function getRecentApps(): Promise<AppListItem[]> {
  const { data } = await supabase
    .from('apps')
    .select(PUBLIC_FIELDS)
    .eq('is_recent', true)
    .order('created_at', { ascending: false })
    .limit(12);
  return (data as unknown as AppListItem[]) || [];
}

export async function getRecommendedApps(): Promise<AppListItem[]> {
  const { data } = await supabase
    .from('apps')
    .select(PUBLIC_FIELDS)
    .eq('is_recommended', true)
    .order('rating', { ascending: false })
    .limit(12);
  return (data as unknown as AppListItem[]) || [];
}

export async function getCategories(type?: string): Promise<Category[]> {
  let query = supabase.from('categories').select('*').order('name');
  if (type) query = query.eq('type', type);
  const { data } = await query;
  return data || [];
}

export async function getAppBySlug(slug: string): Promise<AppItem | null> {
  const { data } = await supabase
    .from('apps')
    .select(
      `id, title, slug, developer, description, category_id, type, icon_url, banner_url, screenshots, version, file_size, rating, downloads, is_featured, is_trending, is_recent, is_recommended, created_at, updated_at, category:categories(name, slug)`
    )
    .eq('slug', slug)
    .maybeSingle();
  return (data as unknown as AppItem) || null;
}

export async function getRelatedApps(
  appId: string,
  categoryId: string | null,
  type: string,
  limit: number = 6
): Promise<AppListItem[]> {
  let query = supabase
    .from('apps')
    .select(PUBLIC_FIELDS)
    .neq('id', appId)
    .eq('type', type)
    .order('downloads', { ascending: false })
    .limit(limit);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data } = await query;
  return (data as unknown as AppListItem[]) || [];
}

export async function getAppsByType(
  type: string,
  categorySlug?: string,
  sort: string = 'popular',
  page: number = 1,
  limit: number = 24
): Promise<{ results: AppListItem[]; total: number; totalPages: number }> {
  const offset = (page - 1) * limit;

  let query = supabase
    .from('apps')
    .select(PUBLIC_FIELDS, { count: 'exact' })
    .eq('type', type);

  if (categorySlug) {
    query = query.eq('categories.slug', categorySlug);
  }

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

  const { data, count } = await query;

  return {
    results: (data as unknown as AppListItem[]) || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export function formatDownloads(downloads: number): string {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  } else if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(0)}K`;
  }
  return downloads.toString();
}
