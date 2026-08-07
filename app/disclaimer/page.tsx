export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          ⚠️ Disclaimer
        </h1>

        <p className="mb-4">
          AI-Signal provides trading signals using technical indicators and
          AI-based analysis. The information on this website is for
          <strong> educational and informational purposes only.</strong>
        </p>

        <p className="mb-4">
          We are <strong>NOT SEBI registered investment advisors.</strong>
          Nothing on this website should be considered financial,
          investment or trading advice.
        </p>

        <p className="mb-4">
          Stock, Futures and Options trading involves substantial financial
          risk. You may lose part or all of your invested capital.
        </p>

        <p className="mb-4">
          You are solely responsible for your own investment and trading
          decisions. Always do your own research and consult a qualified
          financial advisor before investing.
        </p>

        <p className="mb-4">
          AI-Signal, its developers and owners shall not be responsible for
          any financial loss, trading loss or damages resulting from the use
          of this website.
        </p>

        <div className="mt-8 border-l-4 border-yellow-500 bg-zinc-900 p-4 rounded">
          <strong>Risk Warning:</strong><br />
          Past performance does not guarantee future results.
          Trading is subject to market risk.
        </div>
      </div>
    </main>
  );
}
