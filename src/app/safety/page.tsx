"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { PremiumBlock } from "@/components/blocks/PremiumBlock";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";

import { RISK_STATEMENTS } from "@/lib/compliance";
import {
  revealUp,
  staggerContainer,
  cardEntrance,
} from "@/lib/advanced-animations";
import {
  AlertTriangle,
  Shield,
  Lock,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Activity,
  TrendingUp,
  Bell,
} from "lucide-react";
import { useMotion } from "@/components/motion/MotionProvider";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { DefenseDome3D } from "@/components/hero/DefenseDome3D";
// Icon3D removed - using inline icons with gradient containers instead

const fraudSignals = [
  {
    text: "Guaranteed returns, no-risk marketing pitches.",
    icon: XCircle,
    color: "from-red-500 to-orange-500",
  },
  {
    text: "Pressure to deposit quickly or surrender custody.",
    icon: AlertTriangle,
    color: "from-amber-500 to-yellow-500",
  },
  {
    text: "No disclosures about methodology or independent review.",
    icon: Eye,
    color: "from-orange-500 to-red-500",
  },
  {
    text: "Unverifiable back-tested charts presented as live results.",
    icon: AlertCircle,
    color: "from-red-500 to-pink-500",
  },
];

const complianceControls = [
  {
    name: "SEC marketing rule alignment",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    items: [
      "No hypothetical or back-tested performance to general audiences.",
      "If any performance is shown later, it will be net of fees, time-bounded, and audience-gated with required policies.",
      "Balanced risk language on every page -- no cherry-picked wins.",
    ],
  },
  {
    name: "Privacy & consent",
    icon: Lock,
    gradient: "from-purple-500 to-pink-500",
    items: [
      "Cookie consent captures opt-in for non-essential storage.",
      "CAN-SPAM double opt-in email with postal address and one-click unsubscribe.",
      "CCPA/CPRA: Do Not Sell/Share workflow plus Global Privacy Control recognition.",
    ],
  },
  {
    name: "Operational safeguards",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    items: [
      "Rate-limited forms, bot protection, and audit trail for each submission.",
      "Security headers (CSP, HSTS, COOP/COEP/CORP) enforced at the edge.",
      "Dependency and vulnerability scanning on every build.",
    ],
  },
];

// Proof points for hero section
const safetyMetrics = [
  {
    title: "200+ Health Checks",
    description: "Real-time monitoring across latency, balances, API health, and error spikes",
    icon: Activity,
  },
  {
    title: "99.7% Uptime",
    description: "Public status page with signed telemetry and incident history",
    icon: TrendingUp,
  },
  {
    title: "Instant Alerts",
    description: "Mean time to detect anomalies: 1.2 minutes with automatic circuit breakers",
    icon: Bell,
  },
];

export default function SafetyPage() {
  useMotion();
  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="safety" intensity={0.5} />

      <PageHeaderAnimated
        eyebrow="Safety & risk"
        title="Institutional-Grade Risk Controls Built to Survive Market Crashes"
        description="Kelly Criterion position sizing, VaR monitoring, circuit breakers, and drawdown throttling protect capital in volatile markets. No overrides, no hero trades.*"
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <PremiumCard variant="glass-primary" accent="emerald" className="w-96 p-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Safety & compliance</div>
            <div className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Key controls</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">Learn about circuit breakers, signed telemetry, and our risk-first approach.</p>
            <div className="mt-4">
              <a href="/how-it-works" className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-100 hover:border-emerald-300 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:bg-emerald-900/50">
                How it works
              </a>
            </div>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* NEW: Safety Metrics Proof Points - Enhanced */}
      <section className="relative isolate overflow-hidden py-20 md:py-24 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 dark:to-transparent">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/20" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/20" />
        </div>

        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <motion.span
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-6"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 mr-2">
                <Shield className="h-3 w-3 text-white" />
              </div>
              Always Monitoring
            </motion.span>
            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl drop-shadow-sm"
            >
              Real-time Health & Safety
            </motion.h2>
            <motion.p
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl text-slate-600 dark:text-slate-400"
            >
              Our platform maintains rigorous operational standards with continuous monitoring and automated fail-safes.
            </motion.p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {safetyMetrics.map((metric, index) => {
              return (
                <motion.div
                  key={metric.title}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="safety-metric-card"
                >
                  <PremiumCard variant="glass-primary" accent="emerald" hover={true} className="p-8 h-full glow-multi">
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-4">
                        <ColorIcon Icon={metric.icon} gradient="from-emerald-500 to-teal-500" size="h-16 w-16" shadowColor={accentToShadowColor('emerald')} />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{metric.title}</h3>
                        </div>
                      </div>
                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">{metric.description}</p>
                      <div className="mt-auto pt-4 border-t border-emerald-200/50 dark:border-emerald-800/50">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Verified & Active
                        </span>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>

          {/* Additional stats bar */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Health Checks", value: "200+", color: "emerald" },
              { label: "Uptime SLA", value: "99.7%", color: "cyan" },
              { label: "Alert Response", value: "<2min", color: "blue" },
              { label: "Auto Circuit Breakers", value: "Active", color: "purple" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Key Risks Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial={false}
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            <motion.div variants={revealUp} initial={false} whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-700 dark:bg-red-950/50 dark:text-red-400">
                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-sm">
                  <AlertTriangle className="h-3 w-3 text-white" />
                </span>
                Key risks
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Understand the downside before entertaining upside
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                We encourage a sceptical stance. Read these carefully before proceeding.
              </p>
            </motion.div>

            <motion.div variants={revealUp}>
              <PremiumBlock accent="emerald" padding="lg">
                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Our Commitment to Radical Transparency</h3>
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  In an industry often plagued by opacity, we believe that trust is earned through verification, not promises.
                  We publish our failure rates, latency histograms, and risk incidents in real-time.
                  Understanding the mechanics of failure is just as important as understanding the mechanics of success.
                  We don&apos;t just list risks to satisfy legal requirements; we design our entire architecture to mitigate them.
                </p>
              </PremiumBlock>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2">
              {RISK_STATEMENTS.map((item, index) => (
                <motion.div key={item} custom={index} variants={cardEntrance}>
                  <PremiumCard variant="glass-secondary" accent="emerald" hover={true} className="p-8 h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/25">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                      <p className="flex-1 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">{item}</p>
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Fraud Red Flags */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        </div>
        <Container className="relative z-10">
          <motion.div variants={staggerContainer} initial={false} whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-7xl space-y-16">
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 mr-2">
                  <AlertTriangle className="h-3 w-3 text-white" />
                </div>
                Fraud red flags
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Spot the classic crypto-cons
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Regulators regularly warn about fraudulent trading websites. If you see these behaviours elsewhere, disengage immediately.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {fraudSignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <motion.div
                    key={signal.text}
                    custom={index}
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <PremiumCard variant="glass-secondary" accent="orange" hover={true} className="p-8 h-full">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <p className="flex-1 pt-2 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">{signal.text}</p>
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Compliance Controls */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Container className="relative z-10">
          <motion.div variants={staggerContainer} initial={false} whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-7xl space-y-16">
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 mr-2">
                  <Shield className="h-3 w-3 text-white" />
                </div>
                Compliance controls
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Controls baked into the experience
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Each control has an owner, a measurable test, and a documented audit trail.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {complianceControls.map((control, index) => {
                const Icon = control.icon;
                return (
                  <motion.article
                    key={control.name}
                    custom={index}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <PremiumCard variant="glass-primary" accent="emerald" hover={true} className="p-8 h-full flex flex-col gap-6">
                      <ColorIcon Icon={Icon} gradient={control.gradient} size="h-16 w-16" shadowColor={accentToShadowColor('emerald')} />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{control.name}</h3>
                      <ul className="flex-1 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {control.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm">
                              <CheckCircle2 className="h-3 w-3 text-white" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </PremiumCard>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Real-time Monitoring */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                    <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 mr-2">
                      <Activity className="h-3 w-3 text-white" />
                    </span>
                    Live Oversight
                  </span>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                    Real-time Anomaly Detection
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    Our systems don&apos;t just execute trades; they watch them. Every order is scrutinized by an independent risk engine.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Flash Crash Protection", desc: "Circuit breakers trigger instantly if market volatility exceeds safe thresholds." },
                    { title: "Liquidity Scouting", desc: "Orders are routed only to venues with confirmed depth to prevent slippage." },
                    { title: "Drift Monitoring", desc: "AI models are constantly evaluated against baseline performance to detect degradation." }
                  ].map((feature, i) => (
                    <motion.div key={i} initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <PremiumBlock accent="cyan" padding="md">
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/25">
                            <Activity className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                          </div>
                        </div>
                      </PremiumBlock>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative lg:h-[500px] w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden dark:border-slate-800 dark:from-slate-900/95 dark:to-slate-950/90">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 dark:from-emerald-900/50 dark:to-emerald-800/50 animate-pulse" />
                    <p className="text-sm font-mono text-slate-700 dark:text-slate-300">System Status: Operational</p>
                    <div className="flex gap-2 justify-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
                <Unified2DBackground variant="safety" intensity={0.5} className="opacity-50" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
