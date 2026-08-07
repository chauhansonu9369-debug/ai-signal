export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">
          📧 Contact Us
        </h1>

        <p className="mb-4">
          If you have any questions, suggestions or business inquiries,
          please contact us.
        </p>

        <div className="bg-zinc-900 rounded-xl p-5 mt-6">
          <p>
            <strong>Email:</strong><br />
            chauhansonu9369@gmail.com
          </p>

          <p className="mt-4">
            <strong>Website:</strong><br />
            https://ai-signal-gilt.vercel.app
          </p>
        </div>

        <p className="mt-8 text-zinc-400">
          We usually reply within 24–48 hours.
        </p>
      </div>
    </main>
  );
}
