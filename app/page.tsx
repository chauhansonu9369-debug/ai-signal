import Header from "../components/Header";
import PriceCard from "../components/PriceCard";
import SignalCard from "../components/SignalCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-5">
      <div className="max-w-md mx-auto">
        <Header />
        <PriceCard />
        <SignalCard />
      </div>
    </main>
  );
}
