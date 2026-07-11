'use client';

import { cn } from '@/lib/utils';

function SkeletonBase({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-shimmer rounded-2xl', className)}
      aria-hidden="true"
    />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <SkeletonBase className={className} />;
}
