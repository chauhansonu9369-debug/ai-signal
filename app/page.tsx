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
    <main className="min-h-screen bg-black text-white p-5">
      <div className="max-w-md mx-auto space-y-6">
        <Header />

        <PriceCard />

        <Chart />

        <SignalCard />

        <ConfidenceCard />

        <MacdCard />

        <SupportResistance />
        
        <SignalHistory />
      </div>
    </main>
  );
}
