import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
import { EMA, RSI } from "technicalindicators";

const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    const quote = await yahooFinance.quote("^NSEI");

    const history = await yahooFinance.chart("^NSEI", {
      period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      interval: "1d",
    });

    const quotes = history.quotes ?? [];

    const closes = quotes
      .map((q) => q.close)
      .filter((v): v is number => v != null);

    const chartData = quotes
      .filter(
        (q) =>
          q.date &&
          q.open != null &&
          q.high != null &&
          q.low != null &&
          q.close != null
      )
      .map((q) => ({
        time: q.date.toISOString().slice(0, 10),
        open: q.open!,
        high: q.high!,
        low: q.low!,
        close: q.close!,
      }));

    const price = quote.regularMarketPrice ?? 0;
    const change = quote.regularMarketChange ?? 0;
    const changePercent = quote.regularMarketChangePercent ?? 0;
    const marketState = quote.marketState ?? "UNKNOWN";

    const ema9 =
      closes.length >= 9
        ? EMA.calculate({
            period: 9,
            values: closes,
          }).at(-1) ?? price
        : price;

    const ema21 =
      closes.length >= 21
        ? EMA.calculate({
            period: 21,
            values: closes,
          }).at(-1) ?? price
        : price;

    const rsi =
      closes.length >= 14
        ? RSI.calculate({
            period: 14,
            values: closes,
          }).at(-1) ?? 50
        : 50;

    let signal = "WAIT";

    if (ema9 > ema21 && rsi < 70) {
      signal = "BUY";
    } else if (ema9 < ema21 && rsi > 30) {
      signal = "SELL";
    }

    return NextResponse.json({
      symbol: quote.symbol,
      price,
      change,
      changePercent,
      marketState,
      ema9,
      ema21,
      rsi,
      signal,
      chartData,
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
