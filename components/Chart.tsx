"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";

type ChartProps = {
  timeframe: string;
};

export default function Chart({ timeframe }: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(null);

  // Fetch market/chart data
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `/api/market?timeframe=${timeframe}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch market data");
        }

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Chart fetch error:", error);
      }
    };

    load();

    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, [timeframe]);

  // Create chart
  useEffect(() => {
    if (!chartRef.current || !data?.chartData?.length) {
      return;
    }

    const container = chartRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 550,

      layout: {
        background: {
          color: "#0f172a",
        },
        textColor: "#f8fafc",
      },

      grid: {
        vertLines: {
          color: "#1e293b",
        },
        horzLines: {
          color: "#1e293b",
        },
      },

      rightPriceScale: {
        borderColor: "#475569",

        scaleMargins: {
          top: 0.08,
          bottom: 0.08,
        },

        minimumWidth: 75,
      },

      timeScale: {
        borderColor: "#475569",
        timeVisible: true,
        secondsVisible: false,

        rightOffset: 5,

        barSpacing: 8,

        minBarSpacing: 3,
      },

      crosshair: {
        vertLine: {
          color: "#64748b",
          width: 1,
          style: 2,
          labelBackgroundColor: "#334155",
        },

        horzLine: {
          color: "#64748b",
          width: 1,
          style: 2,
          labelBackgroundColor: "#334155",
        },
      },

      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },

      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: true,
      },
    });

    // Candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",

      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",

      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",

      priceLineVisible: true,
      lastValueVisible: true,
    });

    candleSeries.setData(data.chartData);

    // Find support and resistance
    const lows = data.chartData.map(
      (c: any) => Number(c.low)
    );

    const highs = data.chartData.map(
      (c: any) => Number(c.high)
    );

    const support = Math.min(...lows);
    const resistance = Math.max(...highs);

    // Support line
    const supportSeries = chart.addSeries(LineSeries, {
      color: "#22c55e",
      lineWidth: 3,
      lineStyle: 2,

      priceLineVisible: true,
      lastValueVisible: true,

      title: "Support",
    });

    supportSeries.setData(
      data.chartData.map((c: any) => ({
        time: c.time,
        value: support,
      }))
    );

    // Resistance line
    const resistanceSeries = chart.addSeries(LineSeries, {
      color: "#ef4444",
      lineWidth: 3,
      lineStyle: 2,

      priceLineVisible: true,
      lastValueVisible: true,

      title: "Resistance",
    });

    resistanceSeries.setData(
      data.chartData.map((c: any) => ({
        time: c.time,
        value: resistance,
      }))
    );

    // Fit chart to available data
    chart.timeScale().fitContent();

    // Resize chart with screen
    const handleResize = () => {
      if (!chartRef.current) {
        return;
      }

      chart.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      chart.remove();
    };
  }, [data]);

  const timeframeLabel =
    timeframe === "1h"
      ? "1H"
      : timeframe === "1d"
      ? "1D"
      : timeframe === "15m"
      ? "15M"
      : timeframe === "5m"
      ? "5M"
      : timeframe === "1m"
      ? "1M"
      : timeframe;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mt-6 shadow-xl">

      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">

        <h2 className="text-2xl font-bold text-cyan-400">
          📈 NIFTY 50 Chart
        </h2>

        <span className="text-sm font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg">
          {timeframeLabel}
        </span>

      </div>

      {/* Indicator labels */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm">

        <span className="flex items-center gap-1 text-green-400">
          🟢 Support
        </span>

        <span className="flex items-center gap-1 text-red-400">
          🔴 Resistance
        </span>

        <span className="text-zinc-400">
          🕯️ Candles
        </span>

      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        className="w-full rounded-xl overflow-hidden"
        style={{
          minHeight: "550px",
        }}
      />

    </div>
  );
}
