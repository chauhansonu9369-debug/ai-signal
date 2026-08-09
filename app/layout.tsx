import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Signal — NIFTY 50 Live Trading Signals",
  description:
    "AI-Signal provides NIFTY 50 live market data, technical analysis, BUY, SELL and WAIT signals with multiple timeframes and indicators.",
  keywords: [
    "NIFTY 50 live signal",
    "NIFTY 50 BUY SELL signal",
    "NIFTY 50 technical analysis",
    "NIFTY 50 market analysis",
    "NIFTY 50 RSI MACD",
    "NIFTY 50 support resistance",
    "NIFTY 50 trading signals",
  ],
  authors: [{ name: "AI-Signal" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI-Signal — NIFTY 50 Live Trading Signals",
    description:
      "NIFTY 50 live market data, technical indicators and rule-based BUY, SELL and WAIT signals.",
    type: "website",
    siteName: "AI-Signal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token":"1cacaea177604286a82128d0449cea0a"}'
        />
      </body>
    </html>
  );
}
