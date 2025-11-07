"use client";

import { motion } from "framer-motion";
import { Section } from "@hyper/ui";
import { PageHeader } from "@/components/page-header";
import { DemoTelemetry } from "@/components/demo-telemetry";
import { DemoChart } from "@/components/charts/demo-chart";
import { DemoStreamClient } from "@/components/live-demo-client";
import MarketDataDemo from "@/components/market-data-demo";
import { AdvancedChartsDemo } from "@/components/charts/advanced-charts-demo";
import { FlowingMenu } from "@/components/reactbits/dynamic";

const buildGradient = (from: string, to: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='${from}'/><stop offset='100%' stop-color='${to}'/></linearGradient></defs><rect width='200' height='200' fill='url(%23g)' rx='40' ry='40'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const menuItems = [
  { link: "#advanced-charts", text: "Charts", image: buildGradient("#38bdf8", "#0ea5e9") },
  { link: "#market-data", text: "Market data", image: buildGradient("#6366f1", "#ec4899") },
  { link: "#demo", text: "Signed feed", image: buildGradient("#14b8a6", "#0ea5e9") },
];

export default function LiveDemoPage() {
  return (
    <div className="space-y-20">
      <PageHeader
        eyebrow="Live demo"
        title="Experience Professional-Grade Trading Technology in Action"
        description="Witness the power of our advanced trading platform with institutional-quality charts, real-time market data, and cutting-edge technical indicators. See why traders choose our platform for superior performance.*"
      />

      <Section
        id="advanced-charts"
        title="Institutional-Quality Charts & Advanced Technical Analysis"
        description="Professional candlestick charts powered by cutting-edge technology, featuring comprehensive technical indicators including SMA, EMA, RSI, MACD, Bollinger Bands, and lightning-fast real-time updates for optimal trading decisions."
      >
        <AdvancedChartsDemo />
      </Section>

      <Section
        id="market-data"
        title="Ultra-Fast Real-Time Market Data Streaming"
        description="Experience millisecond-accurate market data delivered via advanced Server-Sent Events technology with automatic reconnection and enterprise-grade TypeScript reliability."
      >
        <MarketDataDemo />
      </Section>

      <Section
        id="demo"
        title="Live Trading Dashboard with Professional Analytics"
        description="Multi-pane professional interface featuring real-time latency monitoring and advanced connection state indicators. Experience the future of crypto trading visualization.*"
      >
        <DemoStreamClient />
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="group rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              <span>BTC/USDT - Demo only</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-emerald-600 dark:text-emerald-400"
              >
                ● Live
              </motion.span>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-3 shadow-inner dark:border-slate-700 dark:bg-slate-900">
              <DemoChart />
            </div>
            <p className="mt-6 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              * Powered by industry-leading TradingView Lightweight Charts technology (Apache-2.0).
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <DemoTelemetry />
          </motion.div>
        </div>
      </Section>

      {/* Footnotes Section */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-4 text-xs text-muted-foreground">
            <p>
              * All data shown in this demo is for illustrative and demonstration purposes only and does not represent live trading activity. Charts, market data streams, and performance indicators are simulated and should not be used for actual trading decisions. Real-time features may experience delays or interruptions. System performance and capabilities shown are representative of ideal conditions and may vary in production environments. Trading cryptocurrency involves substantial risk of loss and is not suitable for all investors. This demo does not constitute financial, investment, or trading advice. Actual trading performance, execution speeds, and platform features may differ from demonstration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

