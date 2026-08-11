"use client";

import { useEffect, useState } from "react";

type Signal = {
  status: "PENDING" | "SUCCESS" | "UNSUCCESSFUL";
};

export default function SignalPerformance() {
  const [signals, setSignals] = useState<Signal[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/signals", {
          cache: "no-store",
        });

        const data = await res.json();
        setSignals(data.signals ?? []);
      } catch (error) {
        console.error("Performance Error:", error);
      }
    };

    load();

    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, []);

  const successful = signals.filter(
    (s) => s.status === "SUCCESS"
  ).length;

  const unsuccessful = signals.filter(
    (s) => s.status === "UNSUCCESSFUL"
  ).length;

  const completed = successful + unsuccessful;

  const accuracy =
    completed > 0
      ? Math.round((successful / completed) * 100)
      : 0;

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-6 border border-zinc-800">
      <h2 className="text-2xl font-bold text-cyan-400">
        📊 Signal Performance
      </h2>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-zinc-800 rounded-xl p-4">
          <p className="text-zinc-400 text-sm">
            Successful
          </p>
          <p className="text-3xl font-bold text-green-400 mt-1">
            {successful}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-4">
          <p className="text-zinc-400 text-sm">
            Unsuccessful
          </p>
          <p className="text-3xl font-bold text-red-400 mt-1">
            {unsuccessful}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between mb-2">
          <span className="text-zinc-300">
            📈 Accuracy
          </span>

          <b className="text-cyan-400">
            {accuracy}%
          </b>
        </div>

        <div className="w-full h-4 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-500 rounded-full transition-all"
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-zinc-500 mt-4">
        Accuracy is calculated only from completed signals.
      </p>
    </div>
  );
}
