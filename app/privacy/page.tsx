export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">
          🔒 Privacy Policy
        </h1>

        <p className="mb-4">
          AI-Signal respects your privacy. We do not sell, rent or share your
          personal information with third parties.
        </p>

        <p className="mb-4">
          We may collect basic analytics such as browser type, device
          information and anonymous usage statistics to improve our services.
        </p>

        <p className="mb-4">
          If you contact us by email, we only use your information to respond
          to your query.
        </p>

        <p className="mb-4">
          Third-party services such as Google Analytics, Google AdSense or
          referral partners may use cookies according to their own privacy
          policies.
        </p>

        <p className="mb-4">
          By using AI-Signal, you agree to this Privacy Policy.
        </p>

        <div className="mt-8 border-l-4 border-cyan-500 bg-zinc-900 p-4 rounded">
          Your privacy is important to us, and we are committed to protecting
          your information.
        </div>
      </div>
    </main>
  );
}
