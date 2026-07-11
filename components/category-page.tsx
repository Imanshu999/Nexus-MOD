'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppCard } from '@/components/app-card';
import { FilterChip } from '@/components/filter-chip';
import { Skeleton } from '@/components/ui/skeleton';
import type { AppItem, Category } from '@/lib/types';

interface CategoryPageProps {
  type: 'game' | 'app';
  categories: Category[];
}

export function CategoryPage({ type, categories }: CategoryPageProps) {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get('sort') || 'popular'
  );

  const typeCategories = categories.filter((c) => c.type === type);

  useEffect(() => {
    const cat = searchParams.get('category');
    const sort = searchParams.get('sort') || 'popular';
    setSelectedCategory(cat);
    setSortBy(sort);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    async function fetchApps() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          type,
          sort: sortBy,
          page: String(page),
          limit: '24',
        });
        if (selectedCategory) params.set('category', selectedCategory);

        const res = await fetch(`/api/apps?${params}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setItems(data.results || []);
        setTotal(data.total || 0);
        setTotalPages(data.total_pages || 1);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, [type, selectedCategory, sortBy, page]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);
    setPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setPage(1);
  };

  const title = type === 'game' ? 'Juegos' : 'Apps';
  const subtitle =
    type === 'game'
      ? 'Descarga los mejores juegos para Android'
      : 'Las aplicaciones más útiles para tu dispositivo';

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          <FilterChip
            active={!selectedCategory}
            onClick={() => {
              setSelectedCategory(null);
              setPage(1);
            }}
          >
            Todos
          </FilterChip>
          {typeCategories.map((cat) => (
            <FilterChip
              key={cat.slug}
              active={selectedCategory === cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
            >
              {cat.name}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {total} {type === 'game' ? 'juegos' : 'apps'}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">
            Ordenar:
          </span>
          <div className="flex items-center gap-1">
            <FilterChip
              active={sortBy === 'popular'}
              onClick={() => handleSortChange('popular')}
              size="sm"
            >
              Más Populares
            </FilterChip>
            <FilterChip
              active={sortBy === 'rating'}
              onClick={() => handleSortChange('rating')}
              size="sm"
            >
              Mejor Valorados
            </FilterChip>
            <FilterChip
              active={sortBy === 'recent'}
              onClick={() => handleSortChange('recent')}
              size="sm"
            >
              Recientes
            </FilterChip>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground mb-2">No se encontraron resultados</p>
          <p className="text-sm text-muted-foreground">
            Intenta con otra categoria o filtro
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} variant="grid" />
          ))}
        </div>
      )}

      {totalPages > 1 && !loading && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="glass-input rounded-full px-4 py-2 text-sm font-medium disabled:opacity-40 hover:ring-2 hover:ring-primary/50 transition-all"
          >
            Anterior
          </button>
          <span className="text-sm text-muted-foreground px-2">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="glass-input rounded-full px-4 py-2 text-sm font-medium disabled:opacity-40 hover:ring-2 hover:ring-primary/50 transition-all"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
