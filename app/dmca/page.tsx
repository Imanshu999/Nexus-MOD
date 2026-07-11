export const metadata = {
  title: 'DMCA — APKVault',
  description: 'DMCA policy for APKVault.',
};

export default function DmcaPage() {
  return (
    <div className="min-h-screen container mx-auto max-w-4xl px-4 py-12">
      <div className="glass-card p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">DMCA Policy</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            APKVault respects the intellectual property rights of others and complies
            with the Digital Millennium Copyright Act (DMCA).
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-6">Filing a Claim</h2>
          <p>
            If you believe that content on APKVault infringes your copyright, please
            send a DMCA notice to dmca@apkvault.app with the following information:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Identification of the copyrighted work</li>
            <li>URL of the infringing content</li>
            <li>Your contact information</li>
            <li>A statement of good faith belief</li>
            <li>A statement of accuracy under penalty of perjury</li>
            <li>Your physical or electronic signature</li>
          </ul>
          <h2 className="text-lg font-semibold text-foreground mt-6">Response Time</h2>
          <p>
            We process DMCA notices within 48 hours of receipt and will remove
            infringing content promptly upon verification.
          </p>
        </div>
      </div>
    </div>
  );
}
