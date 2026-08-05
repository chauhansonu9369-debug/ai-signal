import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
import { EMA, RSI, MACD } from "technicalindicators";

const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    const quote = await yahooFinance.quote("^NSEI");

    const history = await yahooFinance.chart("^NSEI", {
      period1: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
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

    const macdResult =
      closes.length >= 35
        ? MACD.calculate({
            values: closes,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false,
          }).at(-1)
        : undefined;

    const macd = macdResult?.MACD ?? 0;
    const signalLine = macdResult?.signal ?? 0;
    const histogram = macdResult?.histogram ?? 0;

    console.log("MACD Result:", macdResult);
    console.log("Closes Length:", closes.length);
    
    let score = 50;
    const reasons: string[] = [];
    
    // EMA
    if (ema9 > ema21) {
      score += 20;
      reasons.push("EMA Bullish");
    } else {
      score -= 20;
      reasons.push("EMA Bearish");
    }
    
    // MACD
    if (macd > signalLine) {
      score += 20;
      reasons.push("MACD Bullish");
    } else {
      score -= 20;
      reasons.push("MACD Bearish");
    }
    
    // RSI
    if (rsi >= 45 && rsi <= 65) {
      score += 15;
      reasons.push("Healthy RSI");
    } else if (rsi > 70) {
      score -= 15;
      reasons.push("Overbought");
    } else if (rsi < 30) {
      score += 15;
      reasons.push("Oversold");
    }
    
    // Price vs EMA21
    if (price > ema21) {
      score += 10;
      reasons.push("Price Above EMA21");
    } else {
      score -= 10;
      reasons.push("Price Below EMA21");
    }
    
    // Limit score
    score = Math.max(0, Math.min(100, score));
    
    let signal = "WAIT";
    
    if (score >= 80) {
      signal = "STRONG BUY";
    } else if (score >= 60) {
      signal = "BUY";
    } else if (score >= 40) {
      signal = "WAIT";
    } else if (score >= 20) {
      signal = "SELL";
    } else {
      signal = "STRONG SELL";
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

      macd,
      signalLine,
      histogram,

      signal,

      score,
      reasons,

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
