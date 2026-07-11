'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppCard } from './app-card';
import type { AppItem } from '@/lib/types';

interface HorizontalScrollProps {
  title: string;
  icon?: React.ReactNode;
  items: AppItem[];
  viewAllHref?: string;
}

export function HorizontalScroll({
  title,
  icon,
  items,
  viewAllHref,
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (items.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {icon}
            <h2 className="text-lg md:text-xl font-bold">{title}</h2>
          </motion.div>
          <div className="flex items-center gap-2">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="flex items-center gap-1 text-sm text-primary hover:underline mr-2"
              >
                Ver todo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={() => scroll('left')}
              className="glass-input rounded-full p-2 hover:ring-2 hover:ring-primary/50 transition-all hidden sm:block"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="glass-input rounded-full p-2 hover:ring-2 hover:ring-primary/50 transition-all hidden sm:block"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="container mx-auto max-w-7xl px-4 overflow-x-auto hide-scrollbar scroll-smooth"
      >
        <div className="flex gap-4 pb-2">
          {items.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
