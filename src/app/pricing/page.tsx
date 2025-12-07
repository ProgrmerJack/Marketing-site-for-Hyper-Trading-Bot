"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { Calculator, TrendingUp, Check, X, DollarSign, Shield, ArrowRight } from "lucide-react";
import { ClickSpark, StarBorder } from "@/components/reactbits/dynamic";
import { MorphingShape } from "@/components/motion/MorphingShape";
import { MouseFollower } from "@/components/motion/MouseFollower";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
import { useMotion } from "@/components/motion/MotionProvider";
import { PremiumCard } from "@/components/cards/PremiumCard";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { PremiumBlock } from "@/components/blocks/PremiumBlock";
import type { Route } from "next";

const pricingHighlights = [
  {
    title: "Profit-share model",
    description:
      "Fees only trigger after net performance (after trading costs) clears the preferred return hurdles. No management fee, no monthly retainers.",
    icon: DollarSign,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Illustrative example",
    description:
      "If an account realised $10,000 in net profit over a quarter, the illustrative 20% share would be $2,000. This is not a guarantee of future performance.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Transparent structure",
    description:
      "Clear pricing structure with real-time data and signed records. We're working towards third-party verification and operational compliance. Everything remains in demo/analysis mode.",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function PricingPage() {
  useMotion();

  return (
    <div className="relative">
      {/* Hero Section - Vibrant emerald/cyan theme */}
      <section className="relative isolate min-h-[90vh] overflow-hidden bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 py-20 dark:bg-gradient-to-br dark:from-[rgb(5,8,15)] dark:via-emerald-950/40 dark:to-cyan-950/40 md:py-32">
        <Unified2DBackground variant="pricing" intensity={0.55} />

        <div className="absolute left-[-6rem] -bottom-12 opacity-90 dark:opacity-60 pointer-events-none">
          <MorphingShape size={280} className="motion-zone" color="rgb(var(--primary))" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <motion.span
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center rounded-full border-2 border-cyan-300 bg-cyan-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:border-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300"
            >
              Pricing
            </motion.span>
            <MouseFollower strength={0.7} className="motion-zone">
              <motion.h1
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl"
              >
                Only Pay When You Profit. No Management Fees. Ever.
              </motion.h1>
            </MouseFollower>
            <motion.p
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl"
            >
              Unlike 95% of platforms, we don&apos;t charge fees regardless of performance. Our profit-share model means we only succeed when you do. Zero management fees, zero monthly charges.*
            </motion.p>

            {/* Pricing Highlight Cards */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid gap-4 pt-8 sm:grid-cols-3"
            >
              {pricingHighlights.map((item, index) => {
                const Icon = item.icon;
                const gradientClass = index === 0 ? "from-blue-500 to-cyan-500" :
                  index === 1 ? "from-emerald-500 to-teal-500" : "from-purple-500 to-pink-500";
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <PremiumCard
                      variant="glass-primary"
                      accent="emerald"
                      shadowColor={accentToShadowColor(index === 0 ? 'blue' : index === 1 ? 'emerald' : 'purple')}
                      hover={true}
                      className="h-full p-8"
                    >
                      <div className="mb-6 flex justify-center">
                        <ColorIcon Icon={Icon} gradient={gradientClass} size="h-14 w-14" shadowColor={accentToShadowColor(index === 0 ? 'blue' : index === 1 ? 'emerald' : 'purple')} />
                      </div>
                      <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.description}</p>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <ClickSpark sparkColor="rgba(59, 130, 246, 0.6)" sparkCount={12} sparkRadius={32} sparkSize={10}>
                <div className="inline-block">
                  <div className="rounded-full [&>div]:!bg-transparent [&>div]:!shadow-none [&>div]:dark:!bg-transparent">
                    <StarBorder as="div" color="rgb(59, 130, 246)" className="rounded-full !bg-transparent !shadow-none dark:!bg-transparent" speed="3s">
                      <Link
                        href={("/contact" as Route)}
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 motion-zone"
                      >
                        <span className="relative z-10">Get started today</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </StarBorder>
                  </div>
                </div>
              </ClickSpark>
              <Link
                href={("/live-demo" as Route)}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20 motion-zone"
              >
                Try live demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Why Profit Sharing Section - Extended Content (removes duplicate cards) */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.06),rgba(59,130,246,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.04),rgba(96,165,250,0.03),transparent_70%)]" />
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                  <TrendingUp className="h-3 w-3 text-white" />
                </div>
                Aligned Incentives
              </span>
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Why Profit Sharing Works Better
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                The fairest pricing model in crypto trading. We succeed only when you succeed.
              </p>
            </div>

            {/* Extended Content Block with enhanced styling */}
            <PremiumBlock accent="emerald" padding="lg" className="glow-multi">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Traditional Fees vs Our Model</h3>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                    Traditional management fees eat into your capital regardless of performance.
                    Our model ensures that we are only compensated when we generate real, verified value for you.
                  </p>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    This creates a powerful partnership where our goals are perfectly synchronized with yours. No hidden fees, no monthly retainers, no costs during drawdowns.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-800 dark:bg-emerald-950/50">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Zero management fees during any period</span>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-800 dark:bg-emerald-950/50">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Fees only after verified net profit</span>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-800 dark:bg-emerald-950/50">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Independent third-party audit required</span>
                  </div>
                </div>
              </div>
            </PremiumBlock>
          </div>
        </Container>
      </section>

      {/* Fee Calculator Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Per-section AnimatedBackground removed to rely on UnifiedBackground */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                Estimator
              </span>
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Interactive Fee Calculator
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                See how much you could save compared to traditional fund management fees.*
              </p>
            </div>

            <FeeCalculator />
          </div>
        </Container>
      </section>

      {/* Comparison Table Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Per-section AnimatedBackground removed to rely on UnifiedBackground */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_70%)]" />
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Why We&apos;re Superior to Traditional Funds
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                See the dramatic advantages of our modern, transparent approach to fee structures.*
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/40">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 dark:from-emerald-500/10 dark:to-blue-500/10" />

              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/20 bg-white/50 dark:bg-slate-800/50 dark:border-white/10">
                      <th className="p-6 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">Feature</th>
                      <th className="p-6 font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider text-xs">
                        Hyper Trading Automation
                      </th>
                      <th className="p-6 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">Traditional Hedge Fund</th>
                      <th className="p-6 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">Typical Crypto Bot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Management Fee",
                        hyper: { text: "0%", icon: Check, positive: true },
                        traditional: "2% annually",
                        crypto: "0–1% monthly",
                      },
                      {
                        feature: "Performance Fee",
                        hyper: { text: "Profit-share (pending verification)", positive: true },
                        traditional: "20% of profits",
                        crypto: "10–30% of profits",
                      },
                      {
                        feature: "Transparency",
                        hyper: { text: "Real-time, signed data", icon: Check, positive: true },
                        traditional: "Quarterly reports",
                        crypto: "Varies widely",
                      },
                      {
                        feature: "Third-party Verification",
                        hyper: { text: "Planned (post-launch)", icon: Check, positive: true },
                        traditional: "Annual financial audit",
                        crypto: { text: "Rare", icon: X, negative: true },
                      },
                      {
                        feature: "Fee Charged in Loss Years",
                        hyper: { text: "No", icon: Check, positive: true },
                        traditional: { text: "Yes (management fee)", icon: X, negative: true },
                        crypto: "Depends on subscription model",
                      },
                      {
                        feature: "Minimum Investment",
                        hyper: { text: "TBD (post-launch)", positive: true },
                        traditional: "$500k–$5M+",
                        crypto: "$100–$10k",
                      },
                      {
                        feature: "Withdrawal Restrictions",
                        hyper: { text: "TBD (reasonable notice)", positive: true },
                        traditional: "Quarterly with 30–90 day notice",
                        crypto: "Instant (exchange custody risk)",
                      },
                    ].map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-slate-200/60 even:bg-[rgb(var(--card))/0.02] transition-colors hover:bg-[rgb(var(--card))/0.06] dark:border-slate-700/60 dark:even:bg-[rgb(var(--card))/0.02] dark:hover:bg-[rgb(var(--card))/0.06]"
                      >
                        <td className="p-4 font-medium text-slate-900 dark:text-slate-100">{row.feature}</td>
                        <td className="p-4">
                          {typeof row.hyper === "object" ? (
                            <span className={row.hyper.positive ? "font-semibold text-emerald-600 dark:text-emerald-300" : ""}>
                              {row.hyper.icon && (
                                <span className="mb-0.5 mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500">
                                  <row.hyper.icon className="h-3 w-3 text-white" />
                                </span>
                              )}
                              {row.hyper.text}
                            </span>
                          ) : (
                            <span className="font-semibold text-emerald-600 dark:text-emerald-300">{row.hyper}</span>
                          )}
                        </td>
                        <td className="p-4 font-medium text-slate-700 dark:text-slate-200">
                          {typeof row.traditional === "object" ? (
                            <span className="text-red-600 dark:text-red-400">
                              {row.traditional.icon && (
                                <span className="mb-0.5 mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-red-500 to-rose-500">
                                  <row.traditional.icon className="h-3 w-3 text-white" />
                                </span>
                              )}
                              {row.traditional.text}
                            </span>
                          ) : (
                            row.traditional
                          )}
                        </td>
                        <td className="p-4 font-medium text-slate-700 dark:text-slate-200">
                          {typeof row.crypto === "object" ? (
                            <span className="text-red-600 dark:text-red-400">
                              {row.crypto.icon && (
                                <span className="mb-0.5 mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-red-500 to-rose-500">
                                  <row.crypto.icon className="h-3 w-3 text-white" />
                                </span>
                              )}
                              {row.crypto.text}
                            </span>
                          ) : (
                            row.crypto
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t-2 border-slate-300/60 bg-slate-100/80 p-4 dark:border-slate-600/60 dark:bg-slate-800/80">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  * Comparison based on typical industry structures. Actual terms may vary. See{" "}
                  <Link href="/risk-disclosure" className="text-blue-600 underline dark:text-blue-400">
                    full disclaimers
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Fee Examples Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.1),transparent_70%)]" />
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Real-World Fee Examples
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                See exactly how our profit-share model works in both profitable and challenging market conditions.*
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <PremiumCard
                  variant="glass-secondary"
                  accent="emerald"
                  hover={true}
                  className="h-full p-8"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <ColorIcon Icon={TrendingUp} gradient="from-emerald-500 to-teal-500" size="h-12 w-12" iconClass="h-6 w-6" shadowColor={accentToShadowColor('emerald')} />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Profitable Quarter (Hypothetical)
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">Starting Balance:</span>
                      <span className="font-bold text-slate-900 dark:text-white">$100,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">Net Profit (after costs):</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">+$12,000</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-emerald-200 pt-4 text-sm dark:border-emerald-900/30">
                      <span className="text-slate-700 dark:text-slate-300">Profit-Share (20% illustrative):</span>
                      <span className="font-bold text-slate-900 dark:text-white">$2,400</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="font-bold text-slate-900 dark:text-white">Your Net Gain:</span>
                      <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$9,600</span>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <PremiumCard
                  variant="glass-secondary"
                  accent="purple"
                  hover={true}
                  className="h-full p-8 border-red-300 dark:border-red-700/50"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <ColorIcon Icon={TrendingUp} gradient="from-red-500 to-pink-600" size="h-12 w-12" iconClass="h-6 w-6 rotate-180" shadowColor="rgba(239, 68, 68, 0.4)" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Loss Quarter (Hypothetical)
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">Starting Balance:</span>
                      <span className="font-bold text-slate-900 dark:text-white">$100,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">Net Loss (after costs):</span>
                      <span className="font-bold text-red-600 dark:text-red-400">-$3,000</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-red-200 pt-4 text-sm dark:border-red-900/30">
                      <span className="text-slate-700 dark:text-slate-300">Profit-Share Fee:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">$0</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="font-bold text-slate-900 dark:text-white">Your Net Loss:</span>
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">-$3,000</span>
                    </div>
                  </div>
                  <p className="mt-6 text-xs text-slate-600 dark:text-slate-400">
                    No fees charged in loss periods. We only earn when you earn.
                  </p>
                </PremiumCard>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footnotes Section */}
      <section className="border-t border-border bg-muted/30 py-12">
        <Container>
          <div className="mx-auto max-w-4xl space-y-4 text-xs text-muted-foreground">
            <p>
              * All pricing information, fee examples, and comparisons are illustrative and subject to change. Final terms require legal review and investor qualification. Hypothetical examples do not constitute guarantees or projections of actual performance. Cryptocurrency trading involves substantial risk of loss. Traditional hedge funds offer regulatory protections and institutional oversight that may not be available for crypto automation platforms. Actual performance, fees, and terms may vary. This is not financial, legal, or investment advice. See full risk disclosures for complete details.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

function FeeCalculator() {
  const [profit, setProfit] = useState(10000);
  const profitShareRate = 0.2; // 20% illustrative

  const profitShare = Math.max(0, profit * profitShareRate);
  const yourNet = profit - profitShare;

  // Traditional fund comparison (2% + 20%)
  const accountSize = 100000;
  const managementFee = accountSize * 0.02;
  const traditionalPerfFee = Math.max(0, profit * 0.2);
  const traditionalTotal = managementFee + traditionalPerfFee;
  const traditionalNet = profit - traditionalTotal;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-purple-100/60 to-blue-100/50 p-8 shadow-2xl backdrop-blur-md dark:border-slate-700/70 dark:from-slate-900/95 dark:via-purple-900/40 dark:to-blue-900/30 md:p-10">
        {/* Vibrant Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 dark:from-purple-500/30 dark:to-blue-500/30 mix-blend-overlay" />

        {/* Animated Glow Orb behind */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl filter dark:bg-purple-500/20" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl filter dark:bg-blue-500/20" />

        <div className="relative mb-8 flex items-center gap-4">
          <ColorIcon Icon={Calculator} gradient="from-blue-600 to-purple-600" size="h-16 w-16" shadowColor={accentToShadowColor('purple')} />
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white drop-shadow-sm">Profit-Share Estimator</h3>
        </div>

        <div className="relative mb-10">
          <label className="mb-4 block text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Hypothetical Net Profit (after trading costs)
          </label>
          <div className="relative h-16">
            <input
              type="range"
              min="-10000"
              max="50000"
              step="1000"
              value={profit}
              onChange={(e) => setProfit(Number(e.target.value))}
              className="absolute top-1/2 -translate-y-1/2 h-4 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-red-400 via-slate-300 to-emerald-400 shadow-inner dark:from-red-900 dark:via-slate-700 dark:to-emerald-600"
            />
            {/* Custom Thumb styling would be ideal here, but standard range input is robust */}
          </div>

          <div className="mt-2 text-center">
            <span className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              ${profit.toLocaleString()}
            </span>
          </div>
        </div>        <div className="relative grid gap-6 md:grid-cols-2">
          <div className="space-y-4 modern-card-emerald p-6">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Hyper Trading Automation</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-200">Management Fee (Annual):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-300">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-200">Profit-Share (20% illustrative):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  ${profitShare.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t-2 border-emerald-300/60 pt-3 dark:border-emerald-800/60">
                <span className="font-bold text-slate-900 dark:text-slate-100">Your Net Gain/Loss:</span>
                <span
                  className={`text-xl font-bold ${yourNet >= 0 ? "text-emerald-600 dark:text-emerald-300" : "text-red-600 dark:text-red-400"}`}
                >
                  ${yourNet.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 modern-card p-6">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Traditional Fund (2% + 20%)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-200">Management Fee (2% of $100k):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  ${managementFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-200">Performance Fee (20%):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  ${traditionalPerfFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t-2 border-orange-300/60 pt-3 dark:border-orange-800/60">
                <span className="font-bold text-slate-900 dark:text-slate-100">Your Net Gain/Loss:</span>
                <span
                  className={`text-xl font-bold ${traditionalNet >= 0 ? "text-emerald-600 dark:text-emerald-300" : "text-red-600 dark:text-red-400"}`}
                >
                  ${traditionalNet.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="relative mt-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          * Hypothetical calculation based on $100,000 account size. Results may vary. Not financial advice.
        </p>
      </div>
    </div>
  );
}
