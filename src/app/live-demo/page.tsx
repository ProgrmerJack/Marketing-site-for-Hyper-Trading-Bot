"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { Activity } from "lucide-react";
import { DemoTelemetry } from "@/components/demo-telemetry";
import { DemoChart } from "@/components/charts/demo-chart";
import { DemoStreamClient } from "@/components/live-demo-client";
import MarketDataDemo from "@/components/market-data-demo";
import { AdvancedChartsDemo } from "@/components/charts/advanced-charts-demo";
import { PageHeaderAnimated } from "@/components/page-header-animated";

import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { CheckCircle2, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { PremiumCard } from "@/components/cards/PremiumCard";

export default function LiveDemoPage() {
  // Live demo page uses global UnifiedBackground; motion hooks not required here

  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="trading" intensity={0.5} />

      {/* Hero Section */}
      <PageHeaderAnimated
        eyebrow="Live demo"
        title="See 486 ML Models and 380 Strategies in Real-Time Action"
        description="Watch our Model Factory and Strategy Expander at work. Real-time market data, institutional-quality execution, and performance-based selection - all visible through our live dashboard.*"
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(5,8,15,1)", "rgba(34,211,238,1)", "rgba(99,102,241,1)"]}
      >
        {/* Hero Card with Key Stats */}
        <motion.div 
          className="hidden lg:block relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PremiumCard variant="glass-primary" accent="cyan" className="w-[500px] p-8">
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, label: "486 ML Models", sublabel: "25+ architectures" },
                { icon: Zap, label: "380 Strategies", sublabel: "63 core templates" },
                { icon: BarChart3, label: "<120ms", sublabel: "Signal latency" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                    <stat.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="text-sm font-bold text-white">{stat.label}</div>
                  <div className="text-xs text-slate-400">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </motion.div>

        {/* Added Content: Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
          {[
            "Real-time SSE Data",
            "Institutional Execution",
            "Full Depth Visibility"
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-200">{feature}</span>
            </div>
          ))}
        </div>
      </PageHeaderAnimated>

      {/* Advanced Charts Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                <Activity className="mr-2 h-4 w-4" />
                Advanced Charts
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Institutional-Quality Charts & Advanced Technical Analysis
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Professional candlestick charts powered by cutting-edge technology, featuring comprehensive technical indicators including SMA, EMA, RSI, MACD, Bollinger Bands, and lightning-fast real-time updates for optimal trading decisions. Our charting engine is built for performance, handling millions of data points with zero lag.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              {/* Extended Content Block */}
              <div className="mb-12 rounded-3xl border border-cyan-200/50 bg-cyan-50/50 p-8 backdrop-blur-sm dark:border-cyan-800/30 dark:bg-cyan-900/20">
                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Powered by Lightweight Charts™</h3>
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  We leverage the same rendering engine used by top-tier financial institutions.
                  Our charts are optimized for high-frequency updates, ensuring that you never miss a tick.
                  With WebGL acceleration and efficient data structures, we deliver smooth 60fps performance even during periods of extreme market volatility.
                </p>
              </div>

              <PremiumCard
                variant="glass-secondary"
                accent="cyan"
                className="p-8"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-sky-500/5 dark:from-cyan-500/10 dark:to-sky-500/10" />
                <div className="relative">
                  <AdvancedChartsDemo />
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Market Data Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-cyan-200/50 dark:border-cyan-900/50">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-700 dark:bg-sky-950/50 dark:text-sky-400">
                <Activity className="mr-2 h-4 w-4" />
                Market Data
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Ultra-Fast Real-Time Market Data Streaming
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Experience millisecond-accurate market data delivered via advanced Server-Sent Events technology with automatic reconnection and enterprise-grade TypeScript reliability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <PremiumCard
                variant="glass-secondary"
                accent="cyan"
                className="p-8"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-blue-500/5 dark:from-sky-500/10 dark:to-blue-500/10" />
                <div className="relative">
                  <MarketDataDemo />
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Live Trading Dashboard Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-sky-200/50 dark:border-sky-900/50">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <Activity className="mr-2 h-4 w-4" />
                Live Dashboard
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Live Trading Dashboard with Professional Analytics
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Multi-pane professional interface featuring real-time latency monitoring and advanced connection state indicators. Experience the future of crypto trading visualization.*
              </p>
            </motion.div>

            <DemoStreamClient />
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <PremiumCard
                  variant="glass-secondary"
                  accent="cyan"
                  className="p-8"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10" />
                  <div className="relative">
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
                    <div className="mt-6 overflow-hidden rounded-2xl border-2 border-cyan-200/80 bg-gradient-to-br from-slate-50/80 to-cyan-50/40 p-1 shadow-inner dark:border-cyan-700/80 dark:from-slate-900/80 dark:to-cyan-950/40">
                      <DemoChart />
                    </div>
                    <p className="mt-6 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      * Powered by industry-leading TradingView Lightweight Charts technology (Apache-2.0).
                    </p>
                  </div>
                </PremiumCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <DemoTelemetry />
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Recent Activity Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-cyan-200/50 dark:border-cyan-900/50">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.06),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                <Activity className="mr-2 h-4 w-4" />
                Execution Feed
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl drop-shadow-sm">
                Live Execution Feed
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Real-time stream of executed trades on the demo network.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <PremiumCard
                variant="glass-secondary"
                accent="cyan"
                className="mx-auto max-w-5xl p-8"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-sky-500/5 dark:from-cyan-500/10 dark:to-sky-500/10" />
                <div className="relative">
                  <div className="grid grid-cols-4 gap-4 border-b border-cyan-200/50 bg-cyan-50/50 p-4 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:border-cyan-700/50 dark:bg-cyan-900/20 dark:text-cyan-300">
                    <div>Time</div>
                    <div>Pair</div>
                    <div>Side</div>
                    <div className="text-right">Price</div>
                  </div>
                  <div className="divide-y divide-cyan-100 dark:divide-cyan-900/30">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="grid grid-cols-4 gap-4 p-4 text-sm text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-cyan-50/80 hover:to-sky-50/40 dark:hover:from-cyan-900/30 dark:hover:to-sky-900/20 transition-all duration-200"
                      >
                        <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{new Date().toLocaleTimeString()}</div>
                        <div className="font-bold text-cyan-600 dark:text-cyan-400">BTC/USDT</div>
                        <div className={i % 2 === 0 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-red-600 dark:text-red-400 font-medium"}>
                          {i % 2 === 0 ? "BUY" : "SELL"}
                        </div>
                        <div className="text-right font-mono text-slate-900 dark:text-white">{(64000 + Math.random() * 100).toFixed(2)}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </Container>
      </section>

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

