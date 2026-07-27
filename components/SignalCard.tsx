export default function SignalCard() {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5 mt-6">

      <h2 className="text-center text-3xl font-bold text-green-500">
        BUY
      </h2>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span>Live Price</span>
          <span>--</span>
        </div>

        <div className="flex justify-between">
          <span>Entry</span>
          <span>--</span>
        </div>

        <div className="flex justify-between">
          <span>Stop Loss</span>
          <span>--</span>
        </div>

        <div className="flex justify-between">
          <span>Target 1</span>
          <span>--</span>
        </div>

        <div className="flex justify-between">
          <span>Target 2</span>
          <span>--</span>
        </div>

        <div className="flex justify-between">
          <span>Confidence</span>
          <span>95%</span>
        </div>

      </div>

    </div>
  );
}
