"use client";

import { useEffect, useState } from "react";

export default function SignalCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/market", {
        cache: "no-store",
      });

      const json = await res.json();
      setData(json);
    };

    load();

    const timer = setInterval(load, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!data) return null;

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6">

      <h2 className={`text-4xl font-bold text-center ${
        data.signal.includes("BUY")
          ? "text-green-500"
          : data.signal.includes("SELL")
          ? "text-red-500"
          : "text-yellow-400"
      }`}>
        {data.signal}
      </h2>

      <div className="space-y-3 mt-6 text-lg">

        <div className="flex justify-between">
          <span>Live Price</span>
          <b>{data.price.toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>Entry</span>
          <b>{data.entry.toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>Stop Loss</span>
          <b className="text-red-400">{data.stopLoss.toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>Target 1</span>
          <b className="text-green-400">{data.target1.toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>Target 2</span>
          <b className="text-green-400">{data.target2.toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>RSI</span>
          <b>{data.rsi.toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>AI Score</span>
          <b className="text-cyan-400">{data.score}%</b>
        </div>

      </div>

      <h3 className="text-2xl font-bold mt-8">
        Why this Signal?
      </h3>

      <div className="mt-4 space-y-2">
        {data.reasons?.map((reason: string, index: number) => (
          <div key={index}>
            ✅ {reason}
          </div>
        ))}
      </div>

    </div>
  );
}
