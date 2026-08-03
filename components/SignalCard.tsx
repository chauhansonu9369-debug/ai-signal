"use client";

import { useEffect, useState } from "react";

export default function SignalCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = () => {
      fetch("/api/market", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((json) => setData(json));
    };

    load();

    const timer = setInterval(load, 5000);

    return () => clearInterval(timer);
  }, []);

  const price = Number(data?.price ?? 0);

  const entry = price.toFixed(2);
  const target = (price + 100).toFixed(2);
  const stopLoss = (price - 50).toFixed(2);

  return (
    <div className="rounded-2xl bg-zinc-900 p-5 mt-6">
      <h2
        className={`text-center text-3xl font-bold ${
          data?.signal === "BUY"
            ? "text-green-500"
            : data?.signal === "SELL"
            ? "text-red-500"
            : "text-yellow-400"
        }`}
      >
        {data?.signal || "WAIT"}
      </h2>

      <div className="mt-6 space-y-3 text-lg">
        <div className="flex justify-between">
          <span>Live Price</span>
          <span>{price || "--"}</span>
        </div>

        <div className="flex justify-between">
          <span>Entry</span>
          <span>{entry}</span>
        </div>

        <div className="flex justify-between">
          <span>Target</span>
          <span className="text-green-400">{target}</span>
        </div>

        <div className="flex justify-between">
          <span>Stop Loss</span>
          <span className="text-red-400">{stopLoss}</span>
        </div>

        <div className="flex justify-between">
          <span>Market</span>
          <span>{data?.marketState ?? "--"}</span>
        </div>

        <div className="flex justify-between">
          <span>RSI</span>
          <span>{data?.rsi?.toFixed(2) ?? "--"}</span>
        </div>

        <div className="flex justify-between">
          <span>Updated</span>
          <span>{data?.updatedAt ? "Live" : "--"}</span>
        </div>
      </div>
    </div>
  );
}
