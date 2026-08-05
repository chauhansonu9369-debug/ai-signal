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

  const price = Number(data?.price ?? 0);

  return (
    <div className="rounded-2xl bg-zinc-900 p-5 mt-6">
      <h2
        className={`text-center text-3xl font-bold ${
          String(data?.signal).includes("BUY")
            ? "text-green-500"
            : String(data?.signal).includes("SELL")
            ? "text-red-500"
            : "text-yellow-400"
        }`}
      >
        {data?.signal ?? "WAIT"}
      </h2>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between">
          <span>Live Price</span>
          <b>{price.toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>RSI</span>
          <b>{Number(data?.rsi ?? 0).toFixed(2)}</b>
        </div>

        <div className="flex justify-between">
          <span>AI Score</span>
          <b className="text-cyan-400">
            {data?.score ?? 0}%
          </b>
        </div>

        <div className="mt-5">
          <h3 className="font-bold text-lg mb-2">
            Why this Signal?
          </h3>

          <ul className="space-y-1 text-sm">
            {data?.reasons?.map((reason: string, index: number) => (
              <li key={index}>
                ✅ {reason}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
