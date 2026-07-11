import Link from 'next/link';
import { Shield, Download, Mail, Send } from 'lucide-react';

const footerLinks = {
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'DMCA', href: '/dmca' },
  ],
  categories: [
    { label: 'Games', href: '/games' },
    { label: 'Apps', href: '/apps' },
    { label: 'Action', href: '/games?category=action' },
    { label: 'Tools', href: '/apps?category=tools' },
  ],
  popular: [
    { label: 'Shadow Combat 5', href: '/app/shadow-combat-5' },
    { label: 'Pro Cleaner Plus', href: '/app/pro-cleaner-plus' },
    { label: 'Fantasy RPG Online', href: '/app/fantasy-rpg-online' },
    { label: 'VPN Shield Pro', href: '/app/vpn-shield-pro' },
  ],
};

export function Footer() {
  return (
    <footer className="hidden md:block border-t bg-muted/30 mt-16">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">APKVault</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Discover, download, and manage the latest APK files for games and
              apps. Secure, fast, and reliable.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:contact@apkvault.app"
                className="glass-input rounded-full p-2.5 hover:ring-2 hover:ring-primary/50 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/apkvault"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-input rounded-full p-2.5 hover:ring-2 hover:ring-primary/50 transition-all"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Popular</h3>
            <ul className="space-y-2">
              {footerLinks.popular.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} APKVault. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Download className="w-3.5 h-3.5" />
            <span>All APKs are SHA-256 verified for integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
