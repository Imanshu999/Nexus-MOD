export interface AppSecurity {
  checksum: string;
  secureToken: string;
  cloudStorage: string;
}

export interface AppItem {
  id: string;
  name: string;
  slug: string;
  developer: string;
  rating: string;
  downloads: string;
  size: string;
  version: string;
  category: string;
  type: string;
  updatedAt: string;
  icon: string;
  description: string;
  downloadUrl: string;
  screenshots: string[];
  security: AppSecurity;
  isFeatured?: boolean;
  isTrending?: boolean;
  isRecent?: boolean;
  isRecommended?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  type: 'game' | 'app';
}

export interface SearchSuggestion {
  slug: string;
  name: string;
  icon: string;
  type: string;
}
