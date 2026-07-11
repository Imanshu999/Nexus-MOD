export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'game' | 'app';
  icon: string | null;
  created_at: string;
}

export interface AppItem {
  id: string;
  title: string;
  slug: string;
  developer: string;
  description: string;
  category_id: string | null;
  type: 'game' | 'app';
  icon_url: string;
  banner_url: string | null;
  screenshots: string[];
  version: string;
  file_size: string;
  rating: number;
  downloads: number;
  is_featured: boolean;
  is_trending: boolean;
  is_recent: boolean;
  is_recommended: boolean;
  created_at: string;
  updated_at: string;
  category?: Category | null;
}

export interface AppListItem {
  id: string;
  title: string;
  slug: string;
  developer: string;
  type: 'game' | 'app';
  icon_url: string;
  banner_url: string | null;
  version: string;
  file_size: string;
  rating: number;
  downloads: number;
  category_id: string | null;
  category?: Category | null;
}

export interface DownloadTokenResponse {
  token: string;
  expires_at: number;
  app_id: string;
  checksum: string;
}

export interface SearchSuggestion {
  slug: string;
  title: string;
  icon_url: string;
  type: 'game' | 'app';
}
