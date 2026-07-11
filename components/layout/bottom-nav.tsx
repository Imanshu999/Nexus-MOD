'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Gamepad2, Smartphone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/games', label: 'Juegos', icon: Gamepad2 },
  { href: '/apps', label: 'Apps', icon: Smartphone },
  {
    href: 'https://t.me/apkvault',
    label: 'Telegram',
    icon: Send,
    external: true,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav border-t safe-area-pb">
      <div className="container mx-auto max-w-7xl px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive =
              !item.external &&
              (item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href));

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors text-muted-foreground hover:text-primary"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors relative',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={cn('w-5 h-5 relative z-10', isActive && 'fill-primary/20')}
                />
                <span className="text-[10px] font-medium relative z-10">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
