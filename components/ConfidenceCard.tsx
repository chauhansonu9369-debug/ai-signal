"use client";

import { useEffect, useState } from "react";

export default function ConfidenceCard() {
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

    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, []);

  const confidence =
    data?.signal === "BUY"
      ? 92
      : data?.signal === "SELL"
      ? 88
      : 60;

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6">
      <h2 className="text-2xl font-bold text-cyan-400">
        🧠 AI Confidence
      </h2>

      <div className="w-full bg-zinc-700 rounded-full h-4 mt-5">
        <div
          className="bg-cyan-500 h-4 rounded-full"
          style={{ width: `${confidence}%` }}
        />
      </div>

      <p className="text-3xl font-bold mt-4">
        {confidence}%
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <p>EMA Trend: {data?.ema9 > data?.ema21 ? "✅ Bullish" : "🔴 Bearish"}</p>
        <p>RSI: {Number(data?.rsi ?? 50).toFixed(2)}</p>
        <p>Signal: <b>{data?.signal}</b></p>
      </div>
    </div>
  );
}
