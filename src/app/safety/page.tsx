"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { RISK_STATEMENTS } from "@/lib/compliance";
import {
  revealUp,
  revealScale,
  staggerContainer,
  staggerItem,
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
} from "lucide-react";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";

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

export default function SafetyPage() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <div className="relative space-y-0">
      <PageHeaderAnimated
        eyebrow="Safety & risk"
        title="Plain-language risks and the controls we put in place"
        description="Crypto markets are volatile and speculative. There are no guarantees. This page summarises what you should expect, what to avoid in the wider market, and how we keep the public demo honest."
        backgroundVariant="threads"
        backgroundColors={["rgba(239, 68, 68, 0.4)", "rgba(251, 146, 60, 0.3)", "rgba(249, 115, 22, 0.25)"]}
      />

      {/* Key Risks Section */}
      <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-950 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="threads"
              colors={["rgba(239, 68, 68, 0.3)", "rgba(251, 146, 60, 0.25)", "rgba(249, 115, 22, 0.2)"]}
              speed="32s"
              opacity={0.3}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.06),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.03),transparent_70%)]" />
          )}
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-700 dark:bg-red-950/50 dark:text-red-400">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Key risks
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Understand the downside before entertaining upside
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                We encourage a sceptical stance. Read these carefully before proceeding.
              </p>
            </motion.div>

            {/* Risk Cards Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2"
            >
              {RISK_STATEMENTS.map((item, index) => {
                const Icon = AlertTriangle;
                return (
                  <motion.div
                    key={item}
                    custom={index}
                    variants={cardEntrance}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className="group relative overflow-hidden rounded-3xl border border-red-200 bg-gradient-to-br from-white via-red-50/30 to-orange-50/20 p-8 shadow-lg transition-all duration-300 hover:border-red-300 hover:shadow-xl dark:border-red-800/50 dark:from-slate-900 dark:via-red-950/30 dark:to-orange-950/20"
                  >
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {item}
                      </p>
                    </div>
                    {/* Animated gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Fraud Red Flags Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="dither"
              colors={["rgba(245, 158, 11, 0.3)", "rgba(251, 146, 60, 0.25)", "rgba(239, 68, 68, 0.2)"]}
              speed="28s"
              opacity={0.65}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.1),transparent_70%)]" />
          )}
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                Fraud red flags
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Spot the classic crypto-cons
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Regulators regularly warn about fraudulent trading websites. If you see these behaviours
                elsewhere, disengage immediately.
              </p>
            </motion.div>

            {/* Fraud Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {fraudSignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <motion.div
                    key={signal.text}
                    custom={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    className="group relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/20 p-8 shadow-lg transition-all duration-300 hover:border-amber-300 hover:shadow-xl dark:border-amber-800/50 dark:from-slate-900 dark:via-amber-950/30 dark:to-yellow-950/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br ${signal.color} shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <p className="flex-1 pt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {signal.text}
                      </p>
                    </div>
                    {/* Shimmer effect */}
                    <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-full dark:via-white/10" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Compliance Controls Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="beams"
              colors={["rgba(59, 130, 246, 0.3)", "rgba(16, 185, 129, 0.25)", "rgba(139, 92, 246, 0.2)"]}
              speed="30s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.1),transparent_70%)]" />
          )}
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Shield className="mr-2 h-4 w-4" />
                Compliance controls
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Controls baked into the experience
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Each control has an owner, a measurable test, and a documented audit trail.
              </p>
            </motion.div>

            {/* Controls Grid */}
            <div className="grid gap-8 md:grid-cols-3">
              {complianceControls.map((control, index) => {
                const Icon = control.icon;
                return (
                  <motion.article
                    key={control.name}
                    custom={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/10 p-8 shadow-lg transition-all duration-300 hover:border-blue-300 hover:shadow-2xl dark:border-slate-700/50 dark:from-slate-900/90 dark:via-blue-950/30 dark:to-purple-950/20 dark:hover:border-blue-600/50"
                  >
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />

                    {/* Icon with gradient */}
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${control.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h2 className="relative text-xl font-bold text-slate-900 dark:text-white">
                      {control.name}
                    </h2>

                    <ul className="relative space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {control.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600 dark:text-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Animated border gradient */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${control.gradient} opacity-10 dark:opacity-15`} />
                    </div>

                    {/* Shimmer effect */}
                    <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent transition-all duration-1000 group-hover:left-full dark:via-blue-400/20" />
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
