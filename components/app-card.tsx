'use client';

import Link from 'next/link';
import { Star, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AppListItem } from '@/lib/types';

interface AppCardProps {
  app: AppListItem;
  variant?: 'horizontal' | 'grid';
  index?: number;
}

export function AppCard({ app, variant = 'horizontal', index = 0 }: AppCardProps) {
  if (variant === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <Link href={`/app/${app.slug}`} className="block group">
          <div className="glass-card p-4 h-full">
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 ring-2 ring-border/50">
                <img
                  src={app.icon_url}
                  alt={app.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                  {app.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {app.developer}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span className="text-xs font-medium">{app.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {app.file_size}
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Instalar
            </button>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="shrink-0 w-[160px] sm:w-[180px]"
    >
      <Link href={`/app/${app.slug}`} className="block group">
        <div className="glass-card p-3 h-full">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 ring-2 ring-border/50">
            <img
              src={app.icon_url}
              alt={app.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
            {app.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate mb-2">
            {app.developer}
          </p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-warning text-warning" />
              <span className="text-xs font-medium">{app.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{app.file_size}</span>
          </div>
          <button className="w-full py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Instalar
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
