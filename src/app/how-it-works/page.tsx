"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeader } from "@/components/page-header";
import { GlareHover, SpotlightCard } from "@/components/reactbits/dynamic";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";
import { Zap, Shield, Activity, Check } from "lucide-react";

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
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <div className="relative">
      <PageHeader
        eyebrow="System architecture"
        title="Lightning-fast execution pipeline delivering exceptional trading performance"
        description="Experience our cutting-edge four-stage automation system designed to maximize profits while maintaining industry-leading safety standards.*"
      />

      {/* Pipeline Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="threads"
              colors={["rgba(59,130,246,0.4)", "rgba(147,51,234,0.3)", "rgba(236,72,153,0.25)"]}
              speed="32s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)]" />
          )}
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                The Four-Stage Power Pipeline
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Unmatched speed, precision, and intelligent automation working together to deliver superior trading results.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {pipeline.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <SpotlightCard
                      className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
                      spotlightColor="rgba(59, 130, 246, 0.2)"
                    >
                      <div className="flex h-full flex-col gap-6">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stage.gradient} shadow-lg`}>
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                              {stage.title}
                            </h3>
                          </div>
                        </div>

                        <ul className="flex-1 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                          {stage.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-950/30 dark:to-purple-950/30">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
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
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="beams"
              colors={["rgba(16,185,129,0.4)", "rgba(59,130,246,0.3)", "rgba(168,85,247,0.25)"]}
              speed="28s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_70%)]" />
          )}
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                Safety rails
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Your Capital Protected by Advanced Safety Systems
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Multi-layered protection mechanisms ensuring your funds are always secure and trading stays transparent.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {safetyRails.map((rail, index) => (
                <motion.div
                  key={rail}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlareHover className="h-full rounded-3xl" glareColor="rgba(16, 185, 129, 0.25)">
                    <div className="flex h-full items-start gap-4 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-emerald-900/30 dark:from-emerald-950/30 dark:via-slate-900 dark:to-teal-950/30">
                      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{rail}</p>
                    </div>
                  </GlareHover>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Performance Metrics Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Industry-Leading Performance Metrics
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Exceptional speed and reliability metrics that set new standards in automated crypto trading.*
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
                      <th className="p-4 font-bold text-slate-900 dark:text-white">Metric</th>
                      <th className="p-4 font-bold text-slate-900 dark:text-white">Target (SLO)</th>
                      <th className="p-4 font-bold text-slate-900 dark:text-white">Current (Demo)</th>
                      <th className="p-4 font-bold text-slate-900 dark:text-white">Monitoring</th>
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
                    ].map((row, index) => (
                      <tr
                        key={row[0]}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-700/50"
                      >
                        <td className="p-4 font-medium text-slate-900 dark:text-white">{row[0]}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">{row[1]}</td>
                        <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">{row[2]}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  * Metrics shown are from demo/sandbox environment. Live production performance may vary based on market conditions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footnotes Section */}
      <section className="border-t border-border bg-muted/30 py-12">
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
