"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@hyper/ui";
import { SpotlightCard, ClickSpark, StarBorder } from "@/components/reactbits/dynamic";
import { MorphingShape } from "@/components/motion/MorphingShape";
import { MouseFollower } from "@/components/motion/MouseFollower";
import { ParallaxSection } from "@/components/motion/ParallaxSection";
import { NetworkNodeHero } from "@/components/hero/NetworkNodeHero";
import { Icon3D } from "@/components/3d-icons/Icon3D";
import { Unified3DBackground } from "@/components/backgrounds/Unified3DBackground";
import { useMotion } from "@/components/motion/MotionProvider";
import { Zap, Shield, Activity, Check, ArrowRight } from "lucide-react";
import SectionMini3D from "@/components/mini/SectionMini3D";

const pipeline = [
  {
    title: "Data acquisition",
    details: [
      "Multi-venue market data normalised under 120 ms.",
      "On-chain telemetry, funding, sentiment, and risk-factor feeds.",
      "Automatic schema validation, replay-on-fail, and backfill checks.",
    ],
    slo: "SLO: Fresh tick <= 150 ms, missing feed alert <= 3s.",
    icon: Activity,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Signal engine",
    details: [
      "Model ensembles with guard-railed feature store and drift monitoring.",
      "Policy-based evaluation: no signal bypasses risk gating.",
      "Continuous evaluation uses net performance metrics, never gross headline numbers.",
    ],
    slo: "SLO: Signal latency <= 60 ms, drift detection < 3 mins.",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Risk controller",
    details: [
      "Position sizing, leverage caps, correlation checks, and drawdown envelope.",
      "Kill-switch monitors venue stability, balance anomalies, and circuit breakers.",
      "Signed decision log emitted for every accept/deny event.",
    ],
    slo: "SLO: Decision log write < 15 ms, fail-closed default.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Execution layer",
    details: [
      "Smart order routing with exchange health weighting and throttle limits.",
      "Slippage monitor compares expected vs realised; breaches halt strategy.",
      "Post-trade reconciliation with venue receipts and simulated testing ledger.",
    ],
    slo: "SLO: Venue submit < 120 ms, fill confirmation < 1.5 s.",
    icon: Activity,
    gradient: "from-orange-500 to-red-500",
  },
];

const safetyRails = [
  "No custodial control: the system never takes possession of user funds.",
  "No discretionary overrides: manual trades cannot bypass risk controller.",
  "Real-time health monitor: 200+ checks on latency, balances, API health, and error spikes.",
  "Fail closed: if any critical dependency degrades, the engine pauses and surfaces the incident publicly.",
];

export default function HowItWorksPage() {
  // Motion toggles are handled globally; avoid local destructuring when unused
  useMotion();

  return (
    <div className="relative">
      {/* Hero Section - Vibrant purple/indigo theme */}
      <section className="relative isolate min-h-[90vh] overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-20 dark:bg-gradient-to-br dark:from-[rgb(5,8,15)] dark:via-purple-950/40 dark:to-indigo-950/40 md:py-32">
        <SectionMini3D icon={Activity} color="purple" size={240} position="right" className="hidden xl:block opacity-20" />
        <Unified3DBackground variant="how-it-works" intensity={0.6} />
        
        {/* NetworkNodeHero - 3D Network Node Visualization */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center">
            <NetworkNodeHero />
          </div>
        </div>
        
        <div className="absolute -left-24 -top-12 opacity-80 dark:opacity-40 pointer-events-none">
          <MorphingShape size={320} className="motion-zone" color="rgb(var(--accent))" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center rounded-full border-2 border-cyan-300 bg-cyan-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:border-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300"
            >
              System architecture
            </motion.span>
            <MouseFollower strength={0.7} className="motion-zone">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl"
            >
              Lightning-fast execution pipeline delivering exceptional trading performance
            </motion.h1>
            </MouseFollower>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl"
            >
              Experience our cutting-edge four-stage automation system designed to maximize profits while maintaining industry-leading safety standards.*
            </motion.p>

            {/* Pipeline Preview Cards */}
            <ParallaxSection speed={0.2} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {pipeline.slice(0, 4).map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group"
                  >
                    <SpotlightCard
                      className="relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-[rgb(var(--card))/0.85] p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-slate-700/50 dark:bg-slate-900/80 motion-zone"
                      spotlightColor="rgba(59, 130, 246, 0.2)"
                    >
                      <div className="mb-6">
                        <Icon3D 
                          icon={Icon} 
                          color={
                            index === 0 ? "cyan" :
                            index === 1 ? "purple" :
                            index === 2 ? "emerald" :
                            "orange"
                          }
                          size={28}
                          className="flex-none"
                        />
                      </div>
                      <h3 className="mb-2 text-sm font-bold text-slate-900 dark:text-white">{stage.title}</h3>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">{stage.details[0]}</p>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>
            </ParallaxSection>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <ClickSpark sparkColor="rgba(59, 130, 246, 0.6)" sparkCount={12} sparkRadius={32} sparkSize={10}>
                <div className="inline-block">
                  <div className="rounded-full [&>div]:!bg-transparent [&>div]:!shadow-none [&>div]:dark:!bg-transparent">
                    <StarBorder as="div" color="rgb(59, 130, 246)" className="rounded-full !bg-transparent !shadow-none dark:!bg-transparent" speed="3s">
                      <Link
                        href={("/live-demo" as Route)}
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 motion-zone"
                      >
                        <span className="relative z-10">Try live demo</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </StarBorder>
                  </div>
                </div>
              </ClickSpark>
              <Link
                href={("/contact" as Route)}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Pipeline Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Per-section AnimatedBackground removed; using UnifiedBackground instead */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)]" />
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                The Four-Stage Power Pipeline
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Unmatched speed, precision, and intelligent automation working together to deliver superior trading results.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {pipeline.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.15,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <SpotlightCard
                      className="group relative h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-slate-50/40 to-slate-50/20 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300/60 dark:border-slate-700/50 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-900/80 dark:hover:border-blue-600/40"
                      spotlightColor="rgba(147, 51, 234, 0.25)"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
                      <div className="relative flex h-full flex-col gap-6">
                        <div className="flex items-center gap-4">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stage.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                          >
                            <Icon className="h-7 w-7 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                              {stage.title}
                            </h3>
                          </div>
                        </div>

                        <ul className="flex-1 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                          {stage.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.15 + idx * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 shadow-inner dark:from-blue-950/40 dark:to-purple-950/40">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                            {stage.slo}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Safety Rails Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Per-section AnimatedBackground removed in favor of UnifiedBackground */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_70%)]" />
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                Safety rails
              </span>
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Your Capital Protected by Advanced Safety Systems
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Multi-layered protection mechanisms ensuring your funds are always secure and trading stays transparent.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {safetyRails.map((rail, index) => (
                <motion.div
                  key={rail}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex h-full items-start gap-4 rounded-3xl border-2 border-emerald-200/70 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-emerald-50/30 to-teal-50/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-300/80 dark:border-emerald-700/70 dark:from-emerald-950/50 dark:via-slate-900/95 dark:to-teal-950/50 dark:hover:border-emerald-600/80 dark:hover:shadow-emerald-500/20"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 dark:from-emerald-500/15 dark:to-teal-500/15" />

                  {/* Pulsing glow effect */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-emerald-400/0 via-emerald-400/15 to-teal-400/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100 dark:from-emerald-400/0 dark:via-emerald-400/25 dark:to-teal-400/0"
                  />

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                    className="relative flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                  <p className="relative text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200">{rail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Performance Metrics Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Per-section AnimatedBackground removed in favor of UnifiedBackground */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.1),transparent_70%)]" />
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Industry-Leading Performance Metrics
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Exceptional speed and reliability metrics that set new standards in automated crypto trading.*
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-slate-50/60 to-blue-50/40 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-3xl hover:border-blue-300/80 dark:border-slate-700/70 dark:from-slate-900/95 dark:via-slate-850/95 dark:to-blue-950/40 dark:hover:border-blue-600/70"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-purple-500/8 dark:from-blue-500/15 dark:to-purple-500/15" />

              {/* Animated gradient overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/8 to-blue-500/0 dark:via-purple-500/15"
              />

              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300/50 bg-[rgb(var(--card))/0.9] dark:bg-[rgb(var(--card))/0.02] dark:border-slate-600/50">
                      <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Metric</th>
                      <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Target (SLO)</th>
                      <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Current (Demo)</th>
                      <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Monitoring</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Data Ingestion Latency (p95)", "<150 ms", "126 ms", "Real-time histogram"],
                      ["Signal Processing (p95)", "<60 ms", "43 ms", "Per-model tracking"],
                      ["Risk Decision (p95)", "<15 ms", "11 ms", "Signed log every decision"],
                      ["Order Placement (p95)", "<120 ms", "98 ms", "Venue-specific breakdowns"],
                      ["End-to-End Pipeline", "<350 ms", "278 ms", "Full trace available"],
                      ["Uptime", ">99.5%", "99.7%", "Public status page"],
                      ["Data Integrity", "100%", "100%", "Signature verification"],
                      ["Mean Time to Detect (MTTD)", "<3 min", "1.2 min", "Anomaly detection"],
                    ].map((row, rowIndex) => (
                      <motion.tr
                        key={row[0]}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: rowIndex * 0.05 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="group/row border-b border-slate-200/60 even:bg-[rgb(var(--card))/0.02] transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/70 hover:via-purple-50/60 hover:to-blue-50/70 hover:shadow-lg dark:border-slate-700/60 dark:even:bg-[rgb(var(--card))/0.02] dark:hover:from-blue-950/40 dark:hover:via-purple-950/40 dark:hover:to-blue-950/40 dark:hover:shadow-blue-500/10"
                      >
                        <td className="p-4 font-medium text-slate-900 dark:text-slate-100">{row[0]}</td>
                        <td className="p-4 font-medium text-slate-700 dark:text-slate-200">{row[1]}</td>
                        <td className="p-4 font-bold text-emerald-600 dark:text-emerald-300">{row[2]}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{row[3]}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-200 bg-slate-50/80 p-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  * Metrics shown are from demo/sandbox environment. Live production performance may vary based on market conditions.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Footnotes Section */}
      <section className="border-t border-border bg-muted/30 py-12 dark:bg-slate-900/30">
        <Container>
          <div className="mx-auto max-w-4xl space-y-4 text-xs text-muted-foreground">
            <p>
              * Performance metrics and execution speeds shown are from demo/sandbox environments and are illustrative. Actual production performance may vary based on market conditions, network latency, and exchange performance. Cryptocurrency trading involves substantial risk of loss. All technical specifications are subject to change.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
