"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeader } from "@/components/page-header";
import { Calculator, TrendingUp, Check, X, DollarSign, Shield, Zap } from "lucide-react";
import { GlareHover, SpotlightCard } from "@/components/reactbits/dynamic";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";
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
    title: "Independent verification",
    description:
      "We will not activate fees until third-party audit and operational due diligence are complete. Until then, everything remains in demo mode.",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function PricingPage() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <div className="relative">
      <PageHeader
        eyebrow="Pricing"
        title="Revolutionary profit-share model designed for your success"
        description="We only succeed when you succeed. Zero management fees, zero monthly charges. Experience true alignment with your trading partner.*"
      />

      {/* Pricing Highlights Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="threads"
              colors={["rgba(59,130,246,0.4)", "rgba(16,185,129,0.3)", "rgba(147,51,234,0.25)"]}
              speed="32s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          )}
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                The Fairest Profit-Share Model in Crypto Trading
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Transparent, performance-based pricing that puts your interests first. Pay only when you profit.*
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {pricingHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <SpotlightCard
                      className="h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-slate-700/50 dark:from-slate-900 dark:via-blue-950/40 dark:to-purple-950/30"
                      spotlightColor="rgba(59, 130, 246, 0.25)"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
                      <div className="relative flex h-full flex-col gap-6">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                        <p className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Fee Calculator Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="liquid"
              colors={["rgba(139, 92, 246, 0.3)", "rgba(236, 72, 153, 0.25)", "rgba(59, 130, 246, 0.2)"]}
              speed="30s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
          )}
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                Estimator
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="beams"
              colors={["rgba(16,185,129,0.4)", "rgba(59,130,246,0.3)", "rgba(245,158,11,0.25)"]}
              speed="28s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_70%)]" />
          )}
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Why We&apos;re Superior to Traditional Funds
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                See the dramatic advantages of our modern, transparent approach to fee structures.*
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:from-slate-900 dark:via-slate-850 dark:to-emerald-950/30">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 dark:from-emerald-500/10 dark:to-blue-500/10" />

              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
                      <th className="p-4 font-bold text-slate-900 dark:text-white">Feature</th>
                      <th className="p-4 font-bold text-emerald-700 dark:text-emerald-400">
                        Hyper Trading Automation
                      </th>
                      <th className="p-4 font-bold text-slate-900 dark:text-white">Traditional Hedge Fund</th>
                      <th className="p-4 font-bold text-slate-900 dark:text-white">Typical Crypto Bot</th>
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
                        hyper: { text: "Profit-share (after audit)", positive: true },
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
                        feature: "Independent Audit",
                        hyper: { text: "In progress (Q1 2026)", icon: Check, positive: true },
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
                        hyper: { text: "TBD (post-audit)", positive: true },
                        traditional: "$500k–$5M+",
                        crypto: "$100–$10k",
                      },
                      {
                        feature: "Withdrawal Restrictions",
                        hyper: { text: "TBD (reasonable notice)", positive: true },
                        traditional: "Quarterly with 30–90 day notice",
                        crypto: "Instant (exchange custody risk)",
                      },
                    ].map((row, index) => (
                      <tr
                        key={row.feature}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-700/50"
                      >
                        <td className="p-4 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                        <td className="p-4">
                          {typeof row.hyper === "object" ? (
                            <span className={row.hyper.positive ? "font-semibold text-emerald-600 dark:text-emerald-400" : ""}>
                              {row.hyper.icon && (
                                <row.hyper.icon className="mb-0.5 inline h-5 w-5" />
                              )}{" "}
                              {row.hyper.text}
                            </span>
                          ) : (
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{row.hyper}</span>
                          )}
                        </td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">
                          {typeof row.traditional === "object" ? (
                            <span className="text-red-600 dark:text-red-400">
                              {row.traditional.icon && <row.traditional.icon className="mb-0.5 inline h-5 w-5" />}{" "}
                              {row.traditional.text}
                            </span>
                          ) : (
                            row.traditional
                          )}
                        </td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">
                          {typeof row.crypto === "object" ? (
                            <span className="text-red-600 dark:text-red-400">
                              {row.crypto.icon && <row.crypto.icon className="mb-0.5 inline h-5 w-5" />}{" "}
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
              <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs text-slate-600 dark:text-slate-400">
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
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="dither"
              colors={["rgba(16, 185, 129, 0.3)", "rgba(239, 68, 68, 0.25)", "rgba(245, 158, 11, 0.2)"]}
              speed="28s"
              opacity={0.65}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.1),transparent_70%)]" />
          )}
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
                className="group relative h-full overflow-hidden rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-emerald-700/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/40"
              >
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10" />

                  <div className="relative h-full">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <TrendingUp className="h-6 w-6" />
                      </div>
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
                  </div>

                {/* Shimmer effect */}
                <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent transition-all duration-1000 group-hover:left-full dark:via-emerald-400/15" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative h-full overflow-hidden rounded-3xl border-2 border-red-300 bg-gradient-to-br from-red-50 via-white to-orange-50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-red-700/50 dark:from-red-950/40 dark:via-slate-900 dark:to-orange-950/40"
              >
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 dark:from-red-500/10 dark:to-orange-500/10" />

                  <div className="relative h-full">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
                        <TrendingUp className="h-6 w-6 rotate-180" />
                      </div>
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
                  </div>

                {/* Shimmer effect */}
                <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-red-400/20 to-transparent transition-all duration-1000 group-hover:left-full dark:via-red-400/15" />
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
      <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:from-slate-900 dark:via-purple-950/40 dark:to-blue-950/30">
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10" />

        <div className="relative mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
            <Calculator className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Profit-Share Estimator</h3>
        </div>

        <div className="relative mb-8">
          <label className="mb-3 block text-sm font-bold text-slate-900 dark:text-white">
            Hypothetical Net Profit (after trading costs)
          </label>
          <input
            type="range"
            min="-10000"
            max="50000"
            step="1000"
            value={profit}
            onChange={(e) => setProfit(Number(e.target.value))}
            className="h-3 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-red-200 via-slate-200 to-emerald-200 dark:from-red-900 dark:via-slate-700 dark:to-emerald-900"
          />
          <div className="mt-3 text-center">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">
              ${profit.toLocaleString()}
            </span>
          </div>
        </div>        <div className="relative grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h4 className="font-bold text-slate-900 dark:text-white">Hyper Trading Automation</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Management Fee (Annual):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Profit-Share (20% illustrative):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ${profitShare.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t-2 border-emerald-200 pt-3 dark:border-emerald-900/30">
                  <span className="font-bold text-slate-900 dark:text-white">Your Net Gain/Loss:</span>
                  <span
                    className={`text-xl font-bold ${yourNet >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    ${yourNet.toLocaleString()}
                  </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-6 dark:from-orange-950/30 dark:to-amber-950/30">
            <h4 className="font-bold text-slate-900 dark:text-white">Traditional Fund (2% + 20%)</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Management Fee (2% of $100k):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ${managementFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Performance Fee (20%):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ${traditionalPerfFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t-2 border-orange-200 pt-3 dark:border-orange-900/30">
                  <span className="font-bold text-slate-900 dark:text-white">Your Net Gain/Loss:</span>
                  <span
                    className={`text-xl font-bold ${traditionalNet >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    ${traditionalNet.toLocaleString()}
                  </span>
              </div>
            </div>
          </div>
        </div>

        <p className="relative mt-6 text-xs text-slate-600 dark:text-slate-400">
          * Hypothetical calculation based on $100,000 account size. Results may vary. Not financial advice.
        </p>
      </div>
    </div>
  );
}
