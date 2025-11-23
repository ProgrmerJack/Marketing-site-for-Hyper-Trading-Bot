"use client";

import { motion } from "framer-motion";
import { Section } from "@hyper/ui";
import { Activity } from "lucide-react";
import { DemoTelemetry } from "@/components/demo-telemetry";
import { DemoChart } from "@/components/charts/demo-chart";
import { DemoStreamClient } from "@/components/live-demo-client";
import MarketDataDemo from "@/components/market-data-demo";
import { AdvancedChartsDemo } from "@/components/charts/advanced-charts-demo";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import { TradingCockpit3D } from "@/components/hero/TradingCockpit3D";
import { FloatingParticles, DataStream, OrbitingSpheres } from "@/components/3d-decorations";
import SectionMini3D from "@/components/mini/SectionMini3D";

export default function LiveDemoPage() {
  // Live demo page uses global UnifiedBackground; motion hooks not required here

  return (
    <div className="relative space-y-0">
      {/* Hero Section */}
      <PageHeaderAnimated
        eyebrow="Live demo"
        title="Experience Professional-Grade Trading Technology in Action"
        description="Witness the power of our advanced trading platform with institutional-quality charts, real-time market data, and cutting-edge technical indicators. See why traders choose our platform for superior performance.*"
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(5,8,15,1)", "rgba(34,211,238,1)", "rgba(99,102,241,1)"]}
      >
        {/* TradingCockpit3D - 3D Trading Cockpit Visualization positioned as background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center">
            <TradingCockpit3D />
          </div>
        </div>
        
        {/* Floating chart particles */}
        <FloatingParticles count={15} color="rgb(99,102,241)" />
        
        {/* Data streams from multiple directions */}
        <div className="absolute right-20 top-1/4 hidden xl:block">
          <DataStream count={6} color="rgb(34,211,238)" direction="left" />
        </div>
        <div className="absolute left-20 bottom-1/4 hidden xl:block">
          <DataStream count={6} color="rgb(79,244,207)" direction="right" />
        </div>
        
        {/* Orbiting indicators */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block">
          <OrbitingSpheres radius={150} count={5} color="rgb(168,85,247)" duration={12} />
        </div>
        
        <div className="relative z-10">
          <div className="hidden lg:block">
          <SpotlightCard className="w-96 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live demo</div>
            <div className="mb-3 text-xl font-bold">Interactive trading visualization</div>
            <p className="text-xs text-muted-foreground">Latency-aware charts, signed demo telemetry, and a professional analytics dashboard. Try the interactive demo below.</p>
            <div className="mt-4">
              <motion.a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.18 }}
              >
                Try demo
                <span aria-hidden>→</span>
              </motion.a>
            </div>
          </SpotlightCard>
        </div>
        </div>
      </PageHeaderAnimated>

      <Section
        id="advanced-charts"
        title="Institutional-Quality Charts & Advanced Technical Analysis"
        description="Professional candlestick charts powered by cutting-edge technology, featuring comprehensive technical indicators including SMA, EMA, RSI, MACD, Bollinger Bands, and lightning-fast real-time updates for optimal trading decisions."
      >
        {/* Decorative 3D Mini */}
        <SectionMini3D icon={Activity} color="emerald" />
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
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[rgb(var(--card))/0.9] via-slate-50/50 to-blue-50/30 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 dark:border-slate-700/50 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-blue-950/40"
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
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-300/60 bg-gradient-to-br from-slate-100 to-white p-3 shadow-inner dark:border-slate-600/50 dark:from-slate-900 dark:to-slate-800">
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

