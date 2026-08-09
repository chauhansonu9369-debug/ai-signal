"use client";

import { useEffect, useState } from "react";

type Props = {
  timeframe: string;
};

export default function SignalCard({ timeframe }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);

    const load = async () => {
      try {
        const res = await fetch(
          `/api/market?timeframe=${timeframe}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Market API failed");
        }

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Signal API Error:", error);
      }
    };

    load();

    const timer = setInterval(load, 5000);

    return () => clearInterval(timer);
  }, [timeframe]);

  if (!data) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-5 mt-6 text-center text-zinc-400">
        Loading {timeframe} analysis...
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6">

      <div className="text-center text-sm text-zinc-400 mb-2">
        Current analysis:{" "}
        <span className="text-cyan-400 font-bold">
          {timeframe === "1h"
            ? "1H"
            : timeframe === "1d"
            ? "1D"
            : timeframe}
        </span>
      </div>

      <h2
        className={`text-4xl font-bold text-center ${
          data.signal.includes("BUY")
            ? "text-green-500"
            : data.signal.includes("SELL")
            ? "text-red-500"
            : "text-yellow-400"
        }`}
      >
        {data.signal}
      </h2>

      <div className="space-y-3 mt-6 text-lg">

        <div className="flex justify-between">
          <span>Live Price</span>
          <b>{Number(data.price ?? 0).toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>Entry</span>
          <b>{Number(data.entry ?? 0).toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>Stop Loss</span>
          <b className="text-red-400">
            {Number(data.stopLoss ?? 0).toFixed(2)}
          </b>
        </div>

        <div className="flex justify-between">
          <span>Target 1</span>
          <b className="text-green-400">
            {Number(data.target1 ?? 0).toFixed(2)}
          </b>
        </div>

        <div className="flex justify-between">
          <span>Target 2</span>
          <b className="text-green-400">
            {Number(data.target2 ?? 0).toFixed(2)}
          </b>
        </div>

        <div className="flex justify-between">
          <span>RSI</span>
          <b>{Number(data.rsi ?? 0).toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>AI Score</span>
          <b className="text-cyan-400">
            {Number(data.score ?? 0)}%
          </b>
        </div>

      </div>

      <h3 className="text-2xl font-bold mt-8">
        Why this Signal?
      </h3>
      
      <p className="text-sm text-zinc-400 mt-2">
        Based on{" "}
        <span className="text-cyan-400 font-bold">
          {timeframe === "1h"
            ? "1H"
            : timeframe === "1d"
            ? "1D"
            : timeframe}
        </span>{" "}
        timeframe indicators
      </p>
      
      <div className="mt-4 space-y-2">
        {data.reasons?.length > 0 ? (
          data.reasons.map(
            (reason: string, index: number) => (
              <div
                key={index}
                className="bg-zinc-800 rounded-lg px-3 py-2"
              >
                ✅ {reason}
              </div>
            )
          )
        ) : (
          <div className="text-zinc-400">
            No signal reasons available.
          </div>
        )}
            </div>
    </div>
  );
}
