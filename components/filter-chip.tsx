'use client';

import { cn } from '@/lib/utils';

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export function FilterChip({
  active,
  onClick,
  children,
  size = 'md',
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full font-medium whitespace-nowrap transition-all shrink-0',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
        active
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
          : 'glass-input hover:ring-2 hover:ring-primary/50'
      )}
    >
      {children}
    </button>
  );
}
