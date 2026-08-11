"use client";

import { useState } from "react";

import Header from "../../components/Header";
import TimeframeSelector from "../../components/TimeframeSelector";
import Chart from "../../components/Chart";
import SignalCard from "../../components/SignalCard";
import ConfidenceCard from "../../components/ConfidenceCard";
import MacdCard from "../../components/MacdCard";
import SupportResistance from "../../components/SupportResistance";
import Footer from "../../components/Footer";
import DisclaimerPopup from "@/components/DisclaimerPopup";

export default function AnalysisPage() {
  const [timeframe, setTimeframe] = useState("15m");

  return (
    <>
      <DisclaimerPopup />

      <main className="min-h-screen bg-black text-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">

          <Header />

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-400">
            🕯️ Candle & Timeframe Analysis
          </h1>

          <TimeframeSelector
            selected={timeframe}
            onChange={setTimeframe}
          />

          <Chart timeframe={timeframe} />

          <SignalCard timeframe={timeframe} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfidenceCard timeframe={timeframe} />
            <MacdCard timeframe={timeframe} />
            <SupportResistance timeframe={timeframe} />
          </div>

          <Footer />

        </div>
      </main>
    </>
  );
}
