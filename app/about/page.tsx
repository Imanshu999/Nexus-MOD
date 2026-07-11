import { Shield } from 'lucide-react';

export const metadata = {
  title: 'About Us — APKVault',
  description: 'Learn about APKVault and our mission.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen container mx-auto max-w-4xl px-4 py-12">
      <div className="glass-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">About Us</h1>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            APKVault is a premium APK discovery and download platform dedicated to
            providing safe, verified, and high-quality Android applications and games.
            Our mission is to create a trusted ecosystem where users can discover,
            download, and manage APK files with confidence.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Every APK on our platform undergoes rigorous security checks including
            SHA-256 checksum verification, malware scanning, and integrity validation.
            We use secure token-based download delivery to prevent hotlinking and
            ensure that every download is authentic.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Our community spans across Telegram and beyond, providing 24/7 support
            and keeping users updated with the latest releases.
          </p>
        </div>
      </div>
    </div>
  );
}
