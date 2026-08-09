export default function Header() {
  return (
    <header className="text-center py-6">
      <img
        src="/ai-signal-logo.png"
        alt="AI-Signal Logo"
        className="w-20 h-20 mx-auto rounded-2xl object-cover"
      />

      <h1 className="text-4xl font-bold text-green-400 mt-3">
        AI SIGNAL
      </h1>

      <p className="mt-2 text-gray-400">
        NIFTY 50 AI Trading Signals
      </p>
    </header>
  );
}
