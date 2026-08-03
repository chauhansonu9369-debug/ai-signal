"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const lineSeries = chart.addLineSeries();

    lineSeries.setData([
      { time: "2026-07-28", value: 24310 },
      { time: "2026-07-29", value: 24350 },
      { time: "2026-07-30", value: 24290 },
      { time: "2026-07-31", value: 24383 },
    ]);

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mt-6">
      <h2 className="text-xl font-bold mb-4 text-white">
        NIFTY 50 Chart
      </h2>

      <div ref={chartContainerRef} />
    </div>
  );
}
