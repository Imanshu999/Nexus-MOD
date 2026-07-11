'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AppListItem } from '@/lib/types';

interface HeroCarouselProps {
  items: AppListItem[];
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number, dir: number = 1) => {
      setDirection(dir);
      setCurrent((index + items.length) % items.length);
    },
    [items.length]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, items.length]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full h-[280px] sm:h-[360px] md:h-[440px] rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={item.banner_url || item.icon_url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          </div>

          <div className="relative h-full flex items-end p-6 md:p-10">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wide">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-semibold">{item.rating}</span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-2 text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  by {item.developer}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/app/${item.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/40 transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground glass px-3 py-2 rounded-full">
                    <Shield className="w-3.5 h-3.5 text-success" />
                    SHA-256 Verified
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 glass rounded-full p-2.5 hover:ring-2 hover:ring-primary/50 transition-all z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-full p-2.5 hover:ring-2 hover:ring-primary/50 transition-all z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === current
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
