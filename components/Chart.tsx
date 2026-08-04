"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
} from "lightweight-charts";

export default function Chart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/market", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.chartData) {
        setChartData(data.chartData);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!chartRef.current || chartData.length === 0) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 350,
      layout: {
        background: { color: "#18181b" },
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#333333" },
        horzLines: { color: "#333333" },
      },
    });

    const series = chart.addSeries(CandlestickSeries);

    series.setData(chartData);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [chartData]);

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        📈 NIFTY 50 Candlestick Chart
      </h2>

      <div ref={chartRef}></div>
    </div>
  );
}
