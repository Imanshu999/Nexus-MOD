'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { AppCard } from '@/components/app-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AppItem } from '@/lib/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&limit=50`
        );
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-5 h-5 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Resultados de busqueda</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {loading
            ? 'Buscando...'
            : `${results.length} resultados para "${query}"`}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium mb-1">Sin resultados</p>
          <p className="text-sm text-muted-foreground">
            No encontramos nada para "{query}". Intenta con otros terminos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((app, i) => (
            <AppCard key={app.slug} app={app} index={i} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
