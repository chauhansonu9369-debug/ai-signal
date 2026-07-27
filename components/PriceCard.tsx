export default function PriceCard() {
  return (
    <div className="rounded-2xl bg-zinc-800 p-4 mt-6">
      <h3 className="text-xl font-bold text-yellow-400">
        Live NIFTY 50
      </h3>

      <p className="mt-3 text-3xl font-bold">
        --
      </p>

      <p className="text-gray-400">
        Waiting for live market data...
      </p>
    </div>
  );
}
