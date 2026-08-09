"use client";

import { useEffect, useState } from "react";

export default function SignalHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/market?timeframe=15m", {
          cache: "no-store",
        });

        const data = await res.json();

        const item = {
          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          signal: data.signal,
          price: data.price,
        };

        setHistory((old) => [item, ...old].slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };

    load();

    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6">
      <h2 className="text-xl font-bold mb-1">
        📜 Signal History — 15M
      </h2>

      <p className="text-sm text-zinc-400 mb-4">
        Previous signals from the 15-minute timeframe
      </p>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Time</th>
            <th className="text-center">Signal</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>

        <tbody>
          {history.map((row, i) => (
            <tr key={i}>
              <td>{row.time}</td>

              <td className="text-center">
                {row.signal}
              </td>

              <td className="text-right">
                {Number(row.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
