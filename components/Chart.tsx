"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";

export default function Chart() {
  const chartRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!chartRef.current || !data?.chartData) return;

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

    const candleSeries = chart.addSeries(CandlestickSeries);

    candleSeries.setData(data.chartData);

    const lows = data.chartData.map((c: any) => c.low);
    const highs = data.chartData.map((c: any) => c.high);

    const support = Math.min(...lows);
    const resistance = Math.max(...highs);

    const supportSeries = chart.addSeries(LineSeries, {
      color: "#00ff66",
      lineWidth: 2,
    });

    const resistanceSeries = chart.addSeries(LineSeries, {
      color: "#ff4444",
      lineWidth: 2,
    });

    const supportData = data.chartData.map((c: any) => ({
      time: c.time,
      value: support,
    }));

    const resistanceData = data.chartData.map((c: any) => ({
      time: c.time,
      value: resistance,
    }));

    supportSeries.setData(supportData);
    resistanceSeries.setData(resistanceData);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [data]);

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        📈 NIFTY 50 Chart + Support / Resistance
      </h2>

      <div ref={chartRef}></div>
    </div>
  );
}
