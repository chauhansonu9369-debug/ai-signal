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
      height: 400,

      layout: {
        background: {
          color: "#0f172a",
        },
        textColor: "#f8fafc",
      },

      grid: {
        vertLines: {
          color: "#334155",
        },
        horzLines: {
          color: "#334155",
        },
      },

      rightPriceScale: {
        borderColor: "#475569",
      },

      timeScale: {
        borderColor: "#475569",
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    candleSeries.setData(data.chartData);

    const lows = data.chartData.map((c: any) => c.low);
    const highs = data.chartData.map((c: any) => c.high);

    const support = Math.min(...lows);
    const resistance = Math.max(...highs);

    const supportSeries = chart.addSeries(LineSeries, {
      color: "#22c55e",
      lineWidth: 2,
      lineStyle: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    const resistanceSeries = chart.addSeries(LineSeries, {
      color: "#ef4444",
      lineWidth: 2,
      lineStyle: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    supportSeries.setData(
      data.chartData.map((c: any) => ({
        time: c.time,
        value: support,
      }))
    );

    resistanceSeries.setData(
      data.chartData.map((c: any) => ({
        time: c.time,
        value: resistance,
      }))
    );

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: chartRef.current?.clientWidth ?? 400,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mt-6 shadow-xl">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        📈 NIFTY 50 Chart
      </h2>

      <div
        ref={chartRef}
        className="w-full rounded-xl overflow-hidden"
      />
    </div>
  );
}
