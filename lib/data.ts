import type { AppItem, Category } from './types';

export const CATEGORIES_DATA: Category[] = [
  { name: 'Action', slug: 'action', type: 'game' },
  { name: 'Arcade', slug: 'arcade', type: 'game' },
  { name: 'Adventure', slug: 'adventure', type: 'game' },
  { name: 'Racing', slug: 'racing', type: 'game' },
  { name: 'Strategy', slug: 'strategy', type: 'game' },
  { name: 'Tools', slug: 'tools', type: 'app' },
  { name: 'Productivity', slug: 'productivity', type: 'app' },
  { name: 'Social', slug: 'social', type: 'app' },
  { name: 'Entertainment', slug: 'entertainment', type: 'app' },
  { name: 'Education', slug: 'education', type: 'app' },
];

export const APPS_DATA: AppItem[] = [
  {
    id: '1',
    name: 'LearnCode Academy',
    slug: 'learncode-academy',
    developer: 'EduTech Solutions',
    rating: '4.9',
    downloads: '4.3M',
    size: '58 MB',
    version: '2.8.0',
    category: 'Education',
    type: 'App',
    updatedAt: '11/7/2026',
    icon: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150',
    description:
      'Learn programming with interactive lessons. Python, JavaScript, Java, C++ — 500+ exercises with real-time feedback.',
    downloadUrl: '/downloads/learncode-academy.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isTrending: true,
    isRecent: true,
    isRecommended: true,
  },
  {
    id: '2',
    name: 'Shadow Combat 5',
    slug: 'shadow-combat-5',
    developer: 'GameForge Studios',
    rating: '4.8',
    downloads: '12.5M',
    size: '1.2 GB',
    version: '5.2.1',
    category: 'Action',
    type: 'Game',
    updatedAt: '10/7/2026',
    icon: 'https://images.unsplash.com/photo-1538481199705-af0931e94a2b?w=150',
    description:
      'An intense action-packed combat game with stunning graphics and immersive gameplay. Battle through 50+ levels with customizable weapons and gear.',
    downloadUrl: '/downloads/shadow-combat-5.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1542751374-ad6a4de934a9?w=500',
      'https://images.unsplash.com/photo-1493711662062-fc538edb4340?w=500',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isTrending: true,
    isRecommended: true,
  },
  {
    id: '3',
    name: 'Neon Racer X',
    slug: 'neon-racer-x',
    developer: 'Velocity Games',
    rating: '4.6',
    downloads: '8.2M',
    size: '850 MB',
    version: '3.7.0',
    category: 'Racing',
    type: 'Game',
    updatedAt: '9/7/2026',
    icon: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=150',
    description:
      'High-octane racing through neon-lit city streets. Customize your ride, compete in tournaments, and dominate the leaderboards.',
    downloadUrl: '/downloads/neon-racer-x.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500',
      'https://images.unsplash.com/photo-1492144534155-265282f0e60b?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isTrending: true,
    isRecent: true,
  },
  {
    id: '4',
    name: 'Pro Cleaner Plus',
    slug: 'pro-cleaner-plus',
    developer: 'OptiTools',
    rating: '4.4',
    downloads: '18M',
    size: '28 MB',
    version: '4.1.0',
    category: 'Tools',
    type: 'App',
    updatedAt: '8/7/2026',
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
    description:
      'Boost your device performance with one tap. Clean junk files, manage storage, optimize RAM, and extend battery life.',
    downloadUrl: '/downloads/pro-cleaner-plus.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1518770660439-4636190af478?w=500',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isTrending: true,
    isRecommended: true,
  },
  {
    id: '5',
    name: 'TaskFlow Pro',
    slug: 'taskflow-pro',
    developer: 'ProductivityHub',
    rating: '4.8',
    downloads: '9.5M',
    size: '52 MB',
    version: '5.0.3',
    category: 'Productivity',
    type: 'App',
    updatedAt: '7/7/2026',
    icon: 'https://images.unsplash.com/photo-1486312338219-ce51d2e961f3?w=150',
    description:
      'Organize your life with powerful task management. Projects, subtasks, reminders, calendar sync, and team collaboration.',
    downloadUrl: '/downloads/taskflow-pro.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1484480973090-1d6dc68f7d2e?w=500',
      'https://images.unsplash.com/photo-1454165804609-cf3cd7b474fe?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isTrending: true,
    isRecent: true,
  },
  {
    id: '6',
    name: 'Galaxy Defender',
    slug: 'galaxy-defender',
    developer: 'Cosmic Interactive',
    rating: '4.5',
    downloads: '5.6M',
    size: '95 MB',
    version: '4.0.2',
    category: 'Arcade',
    type: 'Game',
    updatedAt: '6/7/2026',
    icon: 'https://images.unsplash.com/photo-1614728263952-84e256895eff?w=150',
    description:
      'Defend the galaxy from alien invasion in this epic space shooter. Upgrade your ship, unlock powerful weapons, and save humanity.',
    downloadUrl: '/downloads/galaxy-defender.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1446776877213-223e6e6d4f5d?w=500',
      'https://images.unsplash.com/photo-1462332420958-a5d6e43f1d56?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isRecommended: true,
  },
  {
    id: '7',
    name: 'Empire Wars',
    slug: 'empire-wars',
    developer: 'Throne Studios',
    rating: '4.4',
    downloads: '9.8M',
    size: '1.5 GB',
    version: '7.3.1',
    category: 'Strategy',
    type: 'Game',
    updatedAt: '5/7/2026',
    icon: 'https://images.unsplash.com/photo-1610440033855-9b7e3d3a6e2e?w=150',
    description:
      'Build your empire, forge alliances, and conquer rival kingdoms in this deep strategy game with real-time battles.',
    downloadUrl: '/downloads/empire-wars.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=500',
      'https://images.unsplash.com/photo-1504805388131-6e3d6e3e0ae8?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isTrending: true,
    isRecommended: true,
  },
  {
    id: '8',
    name: 'VPN Shield Pro',
    slug: 'vpn-shield-pro',
    developer: 'SecureNet Labs',
    rating: '4.7',
    downloads: '12M',
    size: '35 MB',
    version: '6.1.0',
    category: 'Tools',
    type: 'App',
    updatedAt: '4/7/2026',
    icon: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=150',
    description:
      'Protect your privacy with military-grade encryption. 100+ server locations, no logs policy, and unlimited bandwidth.',
    downloadUrl: '/downloads/vpn-shield-pro.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1550751827-4bd374a333e7?w=500',
      'https://images.unsplash.com/photo-1510517138c8f3e1e2d2e3c4?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isTrending: true,
  },
  {
    id: '9',
    name: 'ChatWave Messenger',
    slug: 'chatwave-messenger',
    developer: 'ConnectSocial',
    rating: '4.6',
    downloads: '22M',
    size: '65 MB',
    version: '8.2.1',
    category: 'Social',
    type: 'App',
    updatedAt: '3/7/2026',
    icon: 'https://images.unsplash.com/photo-1611606063065-ee7946e0787c?w=150',
    description:
      'Secure messaging with end-to-end encryption, voice/video calls, group chats, and file sharing. No ads, no tracking.',
    downloadUrl: '/downloads/chatwave-messenger.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1611162617213-7d7a87e70c1b?w=500',
      'https://images.unsplash.com/photo-1611162616475-46b635cb68ca?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isRecent: true,
    isRecommended: true,
  },
  {
    id: '10',
    name: 'StreamFlix Player',
    slug: 'streamflix-player',
    developer: 'MediaStream Inc',
    rating: '4.5',
    downloads: '7.8M',
    size: '42 MB',
    version: '3.5.0',
    category: 'Entertainment',
    type: 'App',
    updatedAt: '2/7/2026',
    icon: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=150',
    description:
      'Play any video format with this powerful media player. Subtitles, casting, playlist support, and 4K playback.',
    downloadUrl: '/downloads/streamflix-player.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isRecommended: true,
  },
  {
    id: '11',
    name: 'Pixel Dungeon Quest',
    slug: 'pixel-dungeon-quest',
    developer: 'RetroPixel Studio',
    rating: '4.7',
    downloads: '3.4M',
    size: '120 MB',
    version: '2.1.4',
    category: 'Adventure',
    type: 'Game',
    updatedAt: '1/7/2026',
    icon: 'https://images.unsplash.com/photo-1507738396-4e6a4e4e4e4e?w=150',
    description:
      'A retro-style dungeon crawler with procedurally generated levels, pixel art aesthetics, and challenging boss battles.',
    downloadUrl: '/downloads/pixel-dungeon-quest.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1551105378-78e8e9e6e6e6?w=500',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isRecent: true,
    isRecommended: true,
  },
  {
    id: '12',
    name: 'Fantasy RPG Online',
    slug: 'fantasy-rpg-online',
    developer: 'Mythic Worlds',
    rating: '4.7',
    downloads: '15M',
    size: '2.1 GB',
    version: '6.0.0',
    category: 'Adventure',
    type: 'Game',
    updatedAt: '6/30/2026',
    icon: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150',
    description:
      'Embark on an epic MMORPG adventure. Choose your class, explore vast open worlds, and battle dragons with friends.',
    downloadUrl: '/downloads/fantasy-rpg-online.apk',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500',
      'https://images.unsplash.com/photo-1493238752000-1616e6e4e4e4?w=500',
    ],
    security: {
      checksum: 'Archivo verificado con checksum SHA-256',
      secureToken: 'Descarga mediante token seguro (sin hotlinking)',
      cloudStorage: 'Almacenamiento en nube con acceso privado',
    },
    isFeatured: true,
    isTrending: true,
    isRecommended: true,
  },
];

export function getFeaturedApps(): AppItem[] {
  return APPS_DATA.filter((app) => app.isFeatured);
}

export function getTrendingApps(): AppItem[] {
  return APPS_DATA.filter((app) => app.isTrending);
}

export function getRecentApps(): AppItem[] {
  return APPS_DATA.filter((app) => app.isRecent);
}

export function getRecommendedApps(): AppItem[] {
  return APPS_DATA.filter((app) => app.isRecommended);
}

export function getAppBySlug(slug: string): AppItem | null {
  return APPS_DATA.find((app) => app.slug === slug) || null;
}

export function getRelatedApps(app: AppItem, limit: number = 6): AppItem[] {
  return APPS_DATA.filter(
    (a) => a.id !== app.id && a.type === app.type
  ).slice(0, limit);
}

export function getCategoriesByType(type: string): Category[] {
  return CATEGORIES_DATA.filter((c) => c.type === type);
}

export function searchApps(query: string, limit: number = 10): AppItem[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return APPS_DATA.filter(
    (app) =>
      app.name.toLowerCase().includes(q) ||
      app.developer.toLowerCase().includes(q) ||
      app.category.toLowerCase().includes(q)
  ).slice(0, limit);
}

export function getAppsByType(
  type: string,
  categorySlug?: string | null,
  sort: string = 'popular',
  page: number = 1,
  limit: number = 24
): { results: AppItem[]; total: number; totalPages: number } {
  let filtered = APPS_DATA.filter(
    (app) => app.type.toLowerCase() === type.toLowerCase()
  );

  if (categorySlug) {
    const category = CATEGORIES_DATA.find((c) => c.slug === categorySlug);
    if (category) {
      filtered = filtered.filter(
        (app) => app.category.toLowerCase() === category.name.toLowerCase()
      );
    }
  }

  switch (sort) {
    case 'rating':
      filtered = [...filtered].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case 'recent':
      filtered = [...filtered].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      break;
    case 'popular':
    default:
      filtered = [...filtered].sort((a, b) => {
        const parseDownloads = (d: string) => {
          const num = parseFloat(d);
          if (d.includes('M')) return num * 1000000;
          if (d.includes('K')) return num * 1000;
          return num;
        };
        return parseDownloads(b.downloads) - parseDownloads(a.downloads);
      });
      break;
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const results = filtered.slice(offset, offset + limit);

  return { results, total, totalPages };
}
