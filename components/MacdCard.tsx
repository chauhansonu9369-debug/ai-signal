"use client";

import { useEffect, useState } from "react";

export default function MacdCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/market", {
          cache: "no-store",
        });

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    load();

    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, []);

  const bullish = (data?.macd ?? 0) > (data?.signalLine ?? 0);

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6">
      <h2 className="text-2xl font-bold text-orange-400">
        📊 MACD Indicator
      </h2>

      <div className="mt-4 space-y-2">
        <p>
          <span className="text-gray-400">MACD:</span>{" "}
          <b>{Number(data?.macd ?? 0).toFixed(2)}</b>
        </p>

        <p>
          <span className="text-gray-400">Signal Line:</span>{" "}
          <b>{Number(data?.signalLine ?? 0).toFixed(2)}</b>
        </p>

        <p>
          <span className="text-gray-400">Histogram:</span>{" "}
          <b>{Number(data?.histogram ?? 0).toFixed(2)}</b>
        </p>

        <div className="mt-4">
          {bullish ? (
            <span className="text-green-400 font-bold">
              🟢 Bullish Crossover
            </span>
          ) : (
            <span className="text-red-400 font-bold">
              🔴 Bearish Crossover
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
