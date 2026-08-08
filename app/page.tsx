import Footer from "../components/Footer";
import DisclaimerPopup from "@/components/DisclaimerPopup";
import Header from "../components/Header";
import PriceCard from "../components/PriceCard";
import Chart from "../components/Chart";
import SignalCard from "../components/SignalCard";
import ConfidenceCard from "../components/ConfidenceCard";
import MacdCard from "../components/MacdCard";
import SignalHistory from "../components/SignalHistory";
import SupportResistance from "../components/SupportResistance";

export default function Home() {
  return (
    <>
      <DisclaimerPopup />

      <main className="min-h-screen bg-black text-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header */}
          <Header />

          {/* Live Price */}
          <PriceCard />

          {/* Chart - Full Width */}
          <Chart />

          {/* Main Signal - Full Width */}
          <SignalCard />

          {/* Indicator Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfidenceCard />
            <MacdCard />
            <SupportResistance />
            <SignalHistory />
          </div>

          {/* Footer */}
          <Footer />

        </div>
      </main>
    </>
  );
}
