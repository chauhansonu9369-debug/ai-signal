import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
import { sql } from "@/lib/db";

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

async function checkPendingSignals() {
  try {
    const pendingSignals = await sql`
      SELECT
        id,
        timeframe,
        signal,
        entry,
        stop_loss,
        target1,
        target2,
        created_at,
        status,
        result,
        result_price,
        completed_at
      FROM signals
      WHERE status = 'PENDING'
      ORDER BY created_at DESC
    `;

    if (pendingSignals.length === 0) return;

    const quote = await yahooFinance.quote("^NSEI");
    const price = quote.regularMarketPrice ?? 0;

    for (const signal of pendingSignals) {
      let status: "SUCCESS" | "UNSUCCESSFUL" | null = null;
      let result: "TARGET" | "STOP_LOSS" | null = null;

      if (signal.signal === "BUY") {
        if (price <= Number(signal.stop_loss)) {
          status = "UNSUCCESSFUL";
          result = "STOP_LOSS";
        } else if (price >= Number(signal.target1)) {
          status = "SUCCESS";
          result = "TARGET";
        }
      }

      if (signal.signal === "SELL") {
        if (price >= Number(signal.stop_loss)) {
          status = "UNSUCCESSFUL";
          result = "STOP_LOSS";
        } else if (price <= Number(signal.target1)) {
          status = "SUCCESS";
          result = "TARGET";
        }
      }

      if (status && result) {
        await sql`
          UPDATE signals
          SET
            status = ${status},
            result = ${result},
            result_price = ${price},
            completed_at = NOW()
          WHERE id = ${signal.id}
        `;
      }
    }
  } catch (error) {
    console.error("Signal Check Error:", error);
  }
}

function mapSignal(row: any): SignalRecord {
  return {
    id: row.id,
    timeframe: row.timeframe,
    signal: row.signal,
    entry: Number(row.entry),
    stopLoss: Number(row.stop_loss),
    target1: Number(row.target1),
    target2: Number(row.target2),
    createdAt: row.created_at,
    status: row.status,
    ...(row.result ? { result: row.result } : {}),
    ...(row.result_price !== null
      ? { resultPrice: Number(row.result_price) }
      : {}),
    ...(row.completed_at
      ? { completedAt: row.completed_at }
      : {}),
  };
}

export async function GET() {
  try {
    await checkPendingSignals();

    const rows = await sql`
      SELECT
        id,
        timeframe,
        signal,
        entry,
        stop_loss,
        target1,
        target2,
        created_at,
        status,
        result,
        result_price,
        completed_at
      FROM signals
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      signals: rows.map(mapSignal),
    });
  } catch (error) {
    console.error("Signal GET Error:", error);

    return NextResponse.json(
      { error: "Failed to load signals" },
      { status: 500 }
    );
  }
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

    const id = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const rows = await sql`
      INSERT INTO signals (
        id,
        timeframe,
        signal,
        entry,
        stop_loss,
        target1,
        target2,
        status
      )
      VALUES (
        ${id},
        ${timeframe},
        ${signal},
        ${entry},
        ${stopLoss},
        ${target1},
        ${target2},
        'PENDING'
      )
      RETURNING
        id,
        timeframe,
        signal,
        entry,
        stop_loss,
        target1,
        target2,
        created_at,
        status,
        result,
        result_price,
        completed_at
    `;

    return NextResponse.json({
      success: true,
      signal: mapSignal(rows[0]),
    });
  } catch (error) {
    console.error("Signal Save Error:", error);

    return NextResponse.json(
      { error: "Failed to save signal" },
      { status: 500 }
    );
  }
}
