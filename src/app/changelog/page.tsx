"use client";

import Link from "next/link";
import { ArrowRight, Zap, Calendar, Shield, Activity, Bug, Sparkles, Wrench, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Container } from "@hyper/ui";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";

const releases = [
  {
    version: "1.0.0",
    date: "Coming Q1 2025",
    status: "upcoming",
    description: "Official launch of Hyper Trading Automation platform with full production-ready infrastructure.",
    features: [
      { type: "feature", text: "486 ML model configurations from 25+ base architectures (LSTM, Transformers, TCN, GRU)" },
      { type: "feature", text: "380 strategy configurations from 63 core templates" },
      { type: "feature", text: "Real-time performance dashboard with SSE streaming" },
      { type: "feature", text: "REST API with WebSocket support for developers" },
      { type: "feature", text: "Kelly Criterion position sizing and risk controls" },
      { type: "feature", text: "Multi-asset support: crypto, stocks, options, futures" },
    ],
  },
  {
    version: "0.9.0-beta",
    date: "Nov 2024",
    status: "current",
    description: "Public beta release with enhanced risk management and performance improvements.",
    features: [
      { type: "improvement", text: "Signal latency reduced to <120ms across all venues" },
      { type: "improvement", text: "Enhanced circuit breakers with automatic recovery" },
      { type: "feature", text: "VPIN-based toxicity detection for whale activity" },
      { type: "feature", text: "Advanced backtesting with realistic slippage modeling" },
      { type: "fix", text: "Fixed memory leak in long-running strategy instances" },
      { type: "security", text: "HMAC-SHA256 signing for all telemetry payloads" },
    ],
  },
  {
    version: "0.8.0-alpha",
    date: "Oct 2024",
    status: "past",
    description: "Alpha release with Model Factory and Strategy Expander systems.",
    features: [
      { type: "feature", text: "Model Factory: automated ML model generation pipeline" },
      { type: "feature", text: "Strategy Expander: template-based strategy multiplication" },
      { type: "feature", text: "Performance-based auto-selection of top 10-15 configurations" },
      { type: "improvement", text: "Walk-forward optimization for realistic backtesting" },
      { type: "fix", text: "Resolved timing issues in high-frequency signal generation" },
    ],
  },
  {
    version: "0.7.0-alpha",
    date: "Sep 2024",
    status: "past",
    description: "Initial alpha with core trading infrastructure.",
    features: [
      { type: "feature", text: "Core trading engine with multi-venue connectivity" },
      { type: "feature", text: "Basic risk management with position limits" },
      { type: "feature", text: "Market data normalization under 150ms SLO" },
      { type: "feature", text: "Initial dashboard prototype with basic metrics" },
    ],
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature": return Sparkles;
    case "improvement": return Zap;
    case "fix": return Bug;
    case "security": return Shield;
    default: return CheckCircle2;
  }
};

const getTypeGradient = (type: string) => {
  switch (type) {
    case "feature": return "from-blue-500 to-cyan-500";
    case "improvement": return "from-emerald-500 to-teal-500";
    case "fix": return "from-amber-500 to-orange-500";
    case "security": return "from-purple-500 to-pink-500";
    default: return "from-slate-500 to-slate-600";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "feature": return "text-blue-500";
    case "improvement": return "text-emerald-500";
    case "fix": return "text-amber-500";
    case "security": return "text-purple-500";
    default: return "text-slate-500";
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "upcoming": return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
    case "current": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400";
    default: return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
  }
};

export default function ChangelogPage() {
  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="default" intensity={0.4} />

      <PageHeaderAnimated
        eyebrow="Changelog"
        title="Platform Updates & Release Notes"
        description="Track our progress from alpha to production. Every update brings us closer to institutional-grade algorithmic trading for everyone."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(34,211,238,1)", "rgba(16,185,129,1)"]}
      >
        <motion.div 
          className="hidden lg:block relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PremiumCard variant="glass-primary" accent="emerald" className="w-80 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-bold text-white">v0.9.0-beta</div>
            </div>
            <p className="text-xs text-slate-300">Current release with enhanced risk management and sub-120ms signal latency.</p>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Timeline */}
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-slate-300 dark:to-slate-700" />

              {releases.map((release, index) => {
                return (
                  <motion.div
                    key={release.version}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-4 top-8 h-7 w-7 rounded-full border-4 border-white dark:border-slate-900 ${
                      release.status === "upcoming" ? "bg-blue-500" :
                      release.status === "current" ? "bg-emerald-500" : "bg-slate-400"
                    }`} />

                    <PremiumCard
                      variant="glass-secondary"
                      accent={release.status === "upcoming" ? "cyan" : release.status === "current" ? "emerald" : "purple"}
                      className="p-8"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                              v{release.version}
                            </h2>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${getStatusStyle(release.status)}`}>
                              {release.status === "upcoming" ? "Coming Soon" : release.status === "current" ? "Current" : "Released"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                              <Calendar className="h-3 w-3 text-white" />
                            </span>
                            <span className="text-sm">{release.date}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        {release.description}
                      </p>

                      <div className="space-y-3">
                        {release.features.map((feature, idx) => {
                          const Icon = getTypeIcon(feature.type);
                          return (
                            <div key={idx} className="flex items-start gap-3">
                              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${getTypeGradient(feature.type)} shadow-sm`}>
                                <Icon className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                              </span>
                              <span className="text-sm text-slate-700 dark:text-slate-300">{feature.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Subscribe CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 dark:border-blue-900 dark:from-blue-950/30 dark:to-cyan-950/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Stay Updated</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Follow our{" "}
                      <Link href="/blog" className="font-semibold text-blue-600 dark:text-blue-400 underline hover:no-underline">
                        blog
                      </Link>{" "}
                      for detailed announcements, technical deep-dives, and early access to new features.
                    </p>
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                  >
                    Read Blog <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
