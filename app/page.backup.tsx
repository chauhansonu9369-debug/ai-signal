"use client";

import { useState } from "react";

import Header from "../components/Header";
import TimeframeSelector from "../components/TimeframeSelector";
import PriceCard from "../components/PriceCard";
import Chart from "../components/Chart";
import SignalCard from "../components/SignalCard";
import ConfidenceCard from "../components/ConfidenceCard";
import MacdCard from "../components/MacdCard";
import SupportResistance from "../components/SupportResistance";
import Footer from "../components/Footer";
import DisclaimerPopup from "@/components/DisclaimerPopup";
import SignalPerformance from "../components/SignalPerformance";

export default function Home() {
  const [timeframe, setTimeframe] = useState("15m");

  return (
    <>
      <DisclaimerPopup />

      <main className="min-h-screen bg-black text-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">

         <Header />
         
         <TimeframeSelector
           selected={timeframe}
           onChange={setTimeframe}
         />
         
         <PriceCard />
         
         <Chart timeframe={timeframe} />
         
         <SignalCard timeframe={timeframe} />
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <ConfidenceCard timeframe={timeframe} />
           <MacdCard timeframe={timeframe} />
           <SupportResistance timeframe={timeframe} />
           
           <SignalPerformance />
           
         </div>
         
         <Footer />

        </div>
      </main>
    </>
  );
}
