"use client";

import Link from "next/link";

import Header from "../components/Header";
import PriceCard from "../components/PriceCard";
import Chart from "../components/Chart";
import SignalPerformance from "../components/SignalPerformance";
import Footer from "../components/Footer";
import DisclaimerPopup from "@/components/DisclaimerPopup";

export default function Home() {
  return (
    <>
      <DisclaimerPopup />
  
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-900 text-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">

          <Header />

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-400">
            🏠 NIFTY 50 AI Signal
          </h1>

          {/* Current Price */}
          <PriceCard />

          {/* NIFTY 50 Chart */}
          <Chart timeframe="15m" />

          {/* Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Link
              href="/live"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-center rounded-2xl p-5 transition"
            >
              ⚡ Live 10-Second Signal
            </Link>

            <Link
              href="/analysis"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-center rounded-2xl p-5 transition"
            >
              🕯️ Candle & Timeframe Analysis
            </Link>

          </div>

          {/* Signal Performance */}
          <SignalPerformance />

          <Footer />

        </div>
      </main>
    </>
  );
}
