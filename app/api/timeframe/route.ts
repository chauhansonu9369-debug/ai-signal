import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
import { EMA, RSI, MACD, ATR, ADX } from "technicalindicators";

const yahooFinance = new YahooFinance();

const allowedTimeframes = ["1m", "5m", "15m", "1h", "1d"];

function getPeriod1(timeframe: string) {
  const now = Date.now();

  if (timeframe === "1m") {
    return new Date(now - 5 * 24 * 60 * 60 * 1000);
  }

  if (timeframe === "5m" || timeframe === "15m") {
    return new Date(now - 59 * 24 * 60 * 60 * 1000);
  }

  if (timeframe === "1h") {
    return new Date(now - 365 * 24 * 60 * 60 * 1000);
  }

  return new Date(now - 1000 * 24 * 60 * 60 * 1000);
}

function getIntervalSeconds(timeframe: string) {
  if (timeframe === "1m") return 60;
  if (timeframe === "5m") return 300;
  if (timeframe === "15m") return 900;
  if (timeframe === "1h") return 3600;
  return 86400;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const requestedTimeframe =
      searchParams.get("timeframe") || "15m";

    const timeframe = allowedTimeframes.includes(
      requestedTimeframe
    )
      ? requestedTimeframe
      : "15m";

    // Current market price
    const quote = await yahooFinance.quote("^NSEI");

    const price = quote.regularMarketPrice ?? 0;
    const change = quote.regularMarketChange ?? 0;
    const changePercent =
      quote.regularMarketChangePercent ?? 0;
    const marketState = quote.marketState ?? "UNKNOWN";

    // Get candle data
    const history = await yahooFinance.chart("^NSEI", {
      period1: getPeriod1(timeframe),
      interval: timeframe as any,
    });

    const quotes = history.quotes ?? [];

    /*
     * IMPORTANT:
     * Do not use the currently forming candle.
     * Signal is calculated only from completed candles.
     */
    const intervalSeconds =
      getIntervalSeconds(timeframe);

    const currentBucket =
      Math.floor(Date.now() / 1000 / intervalSeconds) *
      intervalSeconds;

    const completedQuotes = quotes.filter((q) => {
      if (!q.date) return false;

      const candleTime = Math.floor(
        q.date.getTime() / 1000
      );

      return candleTime < currentBucket;
    });

    const closes = completedQuotes
      .map((q) => q.close)
      .filter((v): v is number => v != null);

    const highs = completedQuotes
      .map((q) => q.high)
      .filter((v): v is number => v != null);

    const lows = completedQuotes
      .map((q) => q.low)
      .filter((v): v is number => v != null);

    const chartData = completedQuotes
      .filter(
        (q) =>
          q.date &&
          q.open != null &&
          q.high != null &&
          q.low != null &&
          q.close != null
      )
      .map((q) => ({
        time: Math.floor(
          q.date!.getTime() / 1000
        ),
        open: q.open!,
        high: q.high!,
        low: q.low!,
        close: q.close!,
      }));

    // EMA 9
    const ema9 =
      closes.length >= 9
        ? EMA.calculate({
            period: 9,
            values: closes,
          }).at(-1) ?? price
        : price;

    // EMA 21
    const ema21 =
      closes.length >= 21
        ? EMA.calculate({
            period: 21,
            values: closes,
          }).at(-1) ?? price
        : price;

    // RSI 14
    const rsi =
      closes.length >= 14
        ? RSI.calculate({
            period: 14,
            values: closes,
          }).at(-1) ?? 50
        : 50;

    // MACD
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

    // ATR
    const atr =
      highs.length >= 14 &&
      lows.length >= 14 &&
      closes.length >= 14
        ? ATR.calculate({
            high: highs,
            low: lows,
            close: closes,
            period: 14,
          }).at(-1) ?? 0
        : 0;

    // ADX
    const adx =
      highs.length >= 14 &&
      lows.length >= 14 &&
      closes.length >= 14
        ? ADX.calculate({
            high: highs,
            low: lows,
            close: closes,
            period: 14,
          }).at(-1)?.adx ?? 0
        : 0;

    // Support / Resistance
    const support =
      lows.length >= 10
        ? Math.min(...lows.slice(-10))
        : price;

    const resistance =
      highs.length >= 10
        ? Math.max(...highs.slice(-10))
        : price;

    // =========================
    // SCORING
    // =========================

    let score = 50;
    const reasons: string[] = [];

    // EMA
    if (ema9 > ema21) {
      score += 15;
      reasons.push("EMA Trend Bullish");
    } else if (ema9 < ema21) {
      score -= 15;
      reasons.push("EMA Trend Bearish");
    } else {
      reasons.push("EMA Trend Neutral");
    }

    // MACD
    if (macd > signalLine && histogram > 0) {
      score += 15;
      reasons.push("MACD Bullish");
    } else if (
      macd < signalLine &&
      histogram < 0
    ) {
      score -= 15;
      reasons.push("MACD Bearish");
    } else {
      reasons.push("MACD Neutral");
    }

    // RSI
    if (rsi >= 50 && rsi <= 65) {
      score += 10;
      reasons.push("RSI Healthy Bullish");
    } else if (rsi > 65 && rsi <= 70) {
      score += 5;
      reasons.push("RSI Strong");
    } else if (rsi > 70) {
      score -= 10;
      reasons.push("RSI Overbought");
    } else if (rsi >= 35 && rsi < 50) {
      score -= 5;
      reasons.push("RSI Weak");
    } else if (rsi < 30) {
      score += 5;
      reasons.push("RSI Oversold");
    } else {
      score -= 10;
      reasons.push("RSI Bearish");
    }

    // ADX
    if (adx >= 25) {
      reasons.push("Strong Trend ADX");
    } else if (adx >= 20) {
      reasons.push("Moderate Trend ADX");
    } else {
      score = score > 50
        ? score - 5
        : score + 5;

      reasons.push("Weak Trend ADX");
    }

    // Price vs EMA21
    if (price > ema21) {
      score += 10;
      reasons.push("Price Above EMA21");
    } else if (price < ema21) {
      score -= 10;
      reasons.push("Price Below EMA21");
    }

    // Support / Resistance
    const range = resistance - support;

    if (range > 0) {
      const resistanceDistance =
        ((resistance - price) / range) * 100;

      const supportDistance =
        ((price - support) / range) * 100;

      if (resistanceDistance <= 10) {
        score -= 10;
        reasons.push("Price Near Resistance");
      } else if (supportDistance <= 10) {
        score += 10;
        reasons.push("Price Near Support");
      } else {
        reasons.push(
          "Price Away From Key Levels"
        );
      }
    }

    // ATR / Volatility
    if (atr > 0 && price > 0) {
      const atrPercent =
        (atr / price) * 100;

      if (atrPercent > 2) {
        score -= 5;
        reasons.push("High Volatility");
      } else {
        reasons.push("Normal Volatility");
      }
    }

    score = Math.max(
      0,
      Math.min(100, Math.round(score))
    );

    // =========================
    // SIGNAL
    // =========================

    let signal = "WAIT";

    if (score >= 85) {
      signal = "STRONG BUY";
    } else if (score >= 68) {
      signal = "BUY";
    } else if (score >= 45) {
      signal = "WAIT";
    } else if (score >= 28) {
      signal = "SELL";
    } else {
      signal = "STRONG SELL";
    }

    // Confirmation
    const bullishConfirmation =
      ema9 > ema21 &&
      macd > signalLine &&
      histogram > 0 &&
      rsi >= 50 &&
      rsi <= 70;

    const bearishConfirmation =
      ema9 < ema21 &&
      macd < signalLine &&
      histogram < 0 &&
      rsi < 50;

    if (
      signal === "STRONG BUY" &&
      !bullishConfirmation
    ) {
      signal = "BUY";

      reasons.push(
        "Strong Buy Confirmation Not Complete"
      );
    }

    if (
      signal === "STRONG SELL" &&
      !bearishConfirmation
    ) {
      signal = "SELL";

      reasons.push(
        "Strong Sell Confirmation Not Complete"
      );
    }

    return NextResponse.json({
      symbol: quote.symbol,

      timeframe,

      // Live price can change every 10 seconds
      price,
      change,
      changePercent,
      marketState,

      // Indicators are based on completed candles
      ema9,
      ema21,
      rsi,

      macd,
      signalLine,
      histogram,

      atr,
      adx,

      signal,
      score,
      reasons,

      entry: price,

      stopLoss: Number(
        (price - atr).toFixed(2)
      ),

      target1: Number(
        (price + atr * 2).toFixed(2)
      ),

      target2: Number(
        (price + atr * 4).toFixed(2)
      ),

      support,
      resistance,

      chartData,

      completedCandles:
        completedQuotes.length,

      updatedAt:
        new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "Timeframe API Error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch timeframe data",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
