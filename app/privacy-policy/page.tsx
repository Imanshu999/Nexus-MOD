export const metadata = {
  title: 'Privacy Policy — APKVault',
  description: 'How APKVault handles your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen container mx-auto max-w-4xl px-4 py-12">
      <div className="glass-card p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            At APKVault, we take your privacy seriously. This policy describes how
            we collect, use, and protect your information.
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Data Collection</h2>
          <p>
            We collect minimal data necessary for the operation of our services,
            including anonymized download logs for analytics and rate limiting.
            IP addresses are hashed using SHA-256 and are not stored in plaintext.
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Cookies</h2>
          <p>
            We use essential cookies to maintain your theme preference and session
            state. See our Cookie Policy for details.
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Third-Party Services</h2>
          <p>
            We use Supabase for database infrastructure and storage. All data is
            transmitted over encrypted connections and protected by Row Level Security.
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Contact</h2>
          <p>
            For privacy inquiries, contact us at privacy@apkvault.app.
          </p>
        </div>
      </div>
    </div>
  );
}
