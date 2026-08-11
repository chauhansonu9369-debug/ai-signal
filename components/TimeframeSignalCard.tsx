"use client";

import { useEffect, useState } from "react";

type Props = {
  timeframe: string;
};

export default function TimeframeSignalCard({
  timeframe,
}: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);

    const load = async () => {
      try {
        const res = await fetch(
          `/api/timeframe?timeframe=${timeframe}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Timeframe API failed");
        }

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(
          "Timeframe Signal Error:",
          error
        );
      }
    };

    load();

    // Price + data refresh every 10 seconds
    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, [timeframe]);

  if (!data) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-6 text-center text-zinc-400">
        Loading {timeframe} analysis...
      </div>
    );
  }

  const signal = data.signal ?? "WAIT";

  const signalColor = signal.includes("BUY")
    ? "text-green-500"
    : signal.includes("SELL")
    ? "text-red-500"
    : "text-yellow-400";

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <div className="text-center text-sm text-zinc-400">
        Candle Timeframe
      </div>

      <div className="text-center text-cyan-400 font-bold text-xl mt-1">
        {timeframe === "1h"
          ? "1H"
          : timeframe === "1d"
          ? "1D"
          : timeframe}
      </div>

      <h2
        className={`text-5xl font-bold text-center mt-4 ${signalColor}`}
      >
        {signal}
      </h2>

      <div className="text-center text-sm text-zinc-500 mt-3">
        Signal based on completed candles
      </div>

      <div className="space-y-3 mt-7 text-lg">
        <div className="flex justify-between">
          <span>Live Price</span>
          <b>
            {Number(data.price ?? 0).toFixed(2)}
          </b>
        </div>

        <div className="flex justify-between">
          <span>AI Score</span>
          <b className="text-cyan-400">
            {Number(data.score ?? 0)}%
          </b>
        </div>

        <div className="flex justify-between">
          <span>RSI</span>
          <b>
            {Number(data.rsi ?? 0).toFixed(2)}
          </b>
        </div>

        <div className="flex justify-between">
          <span>EMA 9</span>
          <b>
            {Number(data.ema9 ?? 0).toFixed(2)}
          </b>
        </div>

        <div className="flex justify-between">
          <span>EMA 21</span>
          <b>
            {Number(data.ema21 ?? 0).toFixed(2)}
          </b>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-8">
        Why this Signal?
      </h3>

      <div className="mt-4 space-y-2">
        {data.reasons?.map(
          (reason: string, index: number) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-lg px-3 py-2 text-sm"
            >
              ✅ {reason}
            </div>
          )
        )}
      </div>

      <div className="mt-6 text-center text-xs text-zinc-500">
        Completed candles:{" "}
        {data.completedCandles ?? 0}
      </div>
    </div>
  );
}
