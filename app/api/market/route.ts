import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    const quote = await yahooFinance.quote("^NSEI");

    const price = quote.regularMarketPrice ?? 0;
    const change = quote.regularMarketChange ?? 0;
    const changePercent = quote.regularMarketChangePercent ?? 0;

    let signal = "WAIT";

    if (changePercent > 0.5) {
      signal = "BUY";
    } else if (changePercent < -0.5) {
      signal = "SELL";
    }

    return NextResponse.json({
      symbol: quote.symbol,
      price,
      change,
      changePercent,
      marketState: quote.marketState,
      signal,
      rsi: 50,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch market data",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
