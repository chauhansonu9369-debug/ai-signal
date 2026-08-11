import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

type SignalRecord = {
  id: string;
  timeframe: string;
  signal: "BUY" | "SELL";
  entry: number;
  stopLoss: number;
  target1: number;
  target2: number;
  createdAt: string;
  status: "PENDING" | "SUCCESS" | "UNSUCCESSFUL";
  result?: "TARGET" | "STOP_LOSS";
  resultPrice?: number;
  completedAt?: string;
};

const signals: SignalRecord[] = [];

async function checkPendingSignals() {
  if (signals.length === 0) return;

  const pendingSignals = signals.filter(
    (s) => s.status === "PENDING"
  );

  if (pendingSignals.length === 0) return;

  try {
    const quote = await yahooFinance.quote("^NSEI");
    const price = quote.regularMarketPrice ?? 0;

    for (const signal of pendingSignals) {
      if (signal.signal === "BUY") {
        if (price <= signal.stopLoss) {
          signal.status = "UNSUCCESSFUL";
          signal.result = "STOP_LOSS";
          signal.resultPrice = price;
          signal.completedAt = new Date().toISOString();
        } else if (price >= signal.target1) {
          signal.status = "SUCCESS";
          signal.result = "TARGET";
          signal.resultPrice = price;
          signal.completedAt = new Date().toISOString();
        }
      }

      if (signal.signal === "SELL") {
        if (price >= signal.stopLoss) {
          signal.status = "UNSUCCESSFUL";
          signal.result = "STOP_LOSS";
          signal.resultPrice = price;
          signal.completedAt = new Date().toISOString();
        } else if (price <= signal.target1) {
          signal.status = "SUCCESS";
          signal.result = "TARGET";
          signal.resultPrice = price;
          signal.completedAt = new Date().toISOString();
        }
      }
    }
  } catch (error) {
    console.error("Signal Check Error:", error);
  }
}

export async function GET() {
  await checkPendingSignals();

  return NextResponse.json({
    signals,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      timeframe,
      signal,
      entry,
      stopLoss,
      target1,
      target2,
    } = body;

    if (
      !timeframe ||
      !["BUY", "SELL"].includes(signal) ||
      typeof entry !== "number" ||
      typeof stopLoss !== "number" ||
      typeof target1 !== "number" ||
      typeof target2 !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid signal data" },
        { status: 400 }
      );
    }

    const newSignal: SignalRecord = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

      timeframe,
      signal,
      entry,
      stopLoss,
      target1,
      target2,

      createdAt: new Date().toISOString(),

      status: "PENDING",
    };

    signals.push(newSignal);

    return NextResponse.json({
      success: true,
      signal: newSignal,
    });
  } catch (error) {
    console.error("Signal Save Error:", error);

    return NextResponse.json(
      {
        error: "Failed to save signal",
      },
      { status: 500 }
    );
  }
}
