export const metadata = {
  title: 'Cookie Policy — APKVault',
  description: 'How APKVault uses cookies.',
};

export default function CookiePage() {
  return (
    <div className="min-h-screen container mx-auto max-w-4xl px-4 py-12">
      <div className="glass-card p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Cookie Policy</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            APKVault uses cookies to enhance your browsing experience and provide
            essential functionality.
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Essential Cookies</h2>
          <p>
            We use essential cookies to remember your theme preference (dark/light
            mode) and to maintain session state during your visit.
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Analytics</h2>
          <p>
            We may use anonymized analytics to understand how users interact with
            our platform. No personally identifiable information is collected.
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Managing Cookies</h2>
          <p>
            You can manage or disable cookies through your browser settings. Note
            that disabling essential cookies may affect functionality.
          </p>
        </div>
      </div>
    </div>
  );
}
