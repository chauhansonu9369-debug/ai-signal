"use client";

import { useEffect, useState } from "react";

type Props = {
  timeframe: string;
};

export default function ConfidenceCard({ timeframe }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `/api/market?timeframe=${timeframe}`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    load();

    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, [timeframe]);

  const confidence = Number(data?.score ?? 0);

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6">
      <h2 className="text-2xl font-bold text-cyan-400">
        🧠 AI Confidence
      </h2>

      <div className="w-full bg-zinc-700 rounded-full h-4 mt-5">
        <div
          className={`h-4 rounded-full ${
            confidence >= 80
              ? "bg-green-500"
              : confidence >= 60
              ? "bg-cyan-500"
              : confidence >= 40
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${confidence}%` }}
        />
      </div>

      <p className="text-3xl font-bold mt-4">
        {confidence}%
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          EMA Trend:{" "}
          {data?.ema9 > data?.ema21 ? "✅ Bullish" : "🔴 Bearish"}
        </p>

        <p>
          MACD:{" "}
          {data?.macd > data?.signalLine
            ? "✅ Bullish"
            : "🔴 Bearish"}
        </p>

        <p>
          RSI: {Number(data?.rsi ?? 0).toFixed(2)}
        </p>

        <p>
          Signal: <b>{data?.signal ?? "--"}</b>
        </p>

        <p>
          AI Score: <b>{confidence}%</b>
        </p>
      </div>
    </div>
  );
}
