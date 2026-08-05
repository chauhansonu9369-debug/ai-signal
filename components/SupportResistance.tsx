"use client";

import { useEffect, useState } from "react";

export default function SupportResistance() {
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

  const candles = data?.chartData ?? [];

  const support =
    candles.length > 0
      ? Math.min(...candles.map((c: any) => c.low))
      : 0;

  const resistance =
    candles.length > 0
      ? Math.max(...candles.map((c: any) => c.high))
      : 0;

  const price = data?.price ?? 0;

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6">
      <h2 className="text-2xl font-bold text-purple-400">
        📊 Support & Resistance
      </h2>

      <div className="mt-4 space-y-3">
        <p>
          🟢 <b>Support:</b> {support.toFixed(2)}
        </p>

        <p>
          🔴 <b>Resistance:</b> {resistance.toFixed(2)}
        </p>

        <p>
          📍 <b>Current Price:</b> {price.toFixed(2)}
        </p>

        <p>
          ⬆️ <b>Distance to Resistance:</b>{" "}
          {(resistance - price).toFixed(2)}
        </p>

        <p>
          ⬇️ <b>Distance to Support:</b>{" "}
          {(price - support).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
