"use client";

import { useEffect, useState } from "react";

export default function PriceCard() {
  const [data, setData] = useState<any>(null);

  const loadData = async () => {
    try {
      const res = await fetch("/api/market", {
        cache: "no-store",
      });

      const json = await res.json();
      console.log(json);

      setData(json);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-800 rounded-2xl p-6 mt-6">
      <h2 className="text-3xl font-bold text-yellow-400">
        Live NIFTY 50
      </h2>

      <p className="text-5xl font-bold mt-4">
        {data?.price ?? "--"}
      </p>

      <p
        className={`mt-2 text-lg ${
          data?.change >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {data
          ? `${data.change.toFixed(2)} (${data.changePercent.toFixed(2)}%)`
          : "Waiting for live market data..."}
      </p>

      <p className="text-gray-400 mt-2">
        Market: {data?.marketState ?? "--"}
      </p>
    </div>
  );
}
