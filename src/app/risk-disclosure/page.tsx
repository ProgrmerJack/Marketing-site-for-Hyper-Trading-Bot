"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
// Using UnifiedBackground globally; remove per-section AnimatedBackground usage
import Link from "next/link";
import type { Route } from "next";
import { AlertTriangle, TrendingDown, Cpu, Scale, Shield, CheckCircle2 } from "lucide-react";

const riskSections = [
  {
    id: "warning",
    icon: AlertTriangle,
    gradient: "from-red-500 to-orange-500",
    title: "⚠️ Critical Warning",
    summary: "Trading involves substantial risk of loss and is not suitable for all investors.",
    content: [
      "Hyper Trading Automation is currently in analysis and testing phase. This site provides demo data only — no live trading is available. Past performance, whether actual or simulated, is not indicative of future results.",
      "You can lose all capital invested. Leverage amplifies both gains and losses. Market volatility can result in rapid and substantial losses, including losses exceeding initial deposits.",
    ],
  },
  {
    id: "market",
    icon: TrendingDown,
    gradient: "from-amber-500 to-red-500",
    title: "Market & Trading Risks",
    summary: "Cryptocurrency markets are highly volatile and unpredictable.",
    details: [
      { label: "Price Volatility", text: "Cryptocurrency prices can fluctuate dramatically within minutes. Sudden price movements of 10-50% or more are common and can occur without warning." },
      { label: "Leverage Amplification", text: "Leverage magnifies both gains and losses. A small adverse price movement can result in losses exceeding your initial investment." },
      { label: "Liquidity Risk", text: "During market stress, liquidity can evaporate instantly. You may be unable to exit positions at reasonable prices or at all." },
      { label: "24/7 Markets", text: "Cryptocurrency markets never close. Significant price movements can occur at any time, including when you're unable to monitor positions." },
    ],
  },
  {
    id: "technology",
    icon: Cpu,
    gradient: "from-blue-500 to-purple-500",
    title: "Technology & System Risks",
    summary: "Automated trading systems face numerous technical challenges.",
    details: [
      { label: "System Failures", text: "Hardware failures, software bugs, network outages, or connectivity issues can prevent order execution or cause unintended trades." },
      { label: "Data Errors", text: "Incorrect, delayed, or missing market data can lead to poor trading decisions and substantial losses." },
      { label: "Model Drift", text: "Trading strategies can become less effective over time as market conditions evolve. Past success does not guarantee future performance." },
      { label: "Latency Issues", text: "Delays in data feeds or order execution can result in slippage, missed opportunities, or unexpected losses." },
      { label: "Cyber Security", text: "Despite security measures, systems remain vulnerable to hacking, unauthorized access, and data breaches." },
    ],
  },
  {
    id: "regulatory",
    icon: Scale,
    gradient: "from-purple-500 to-pink-500",
    title: "Regulatory & Legal Risks",
    summary: "The cryptocurrency regulatory landscape is rapidly evolving.",
    details: [
      { label: "Regulatory Uncertainty", text: "Cryptocurrency regulations vary by jurisdiction and are subject to sudden changes that may restrict or prohibit trading activities." },
      { label: "Compliance Requirements", text: "New regulations may impose additional compliance obligations, costs, or operational restrictions." },
      { label: "Tax Implications", text: "Cryptocurrency trading has complex tax implications. You are responsible for understanding and complying with all applicable tax laws." },
      { label: "Legal Status", text: "The legal status of cryptocurrencies and automated trading services varies globally and may change without notice." },
    ],
  },
  {
    id: "operational",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    title: "Operational & Counterparty Risks",
    summary: "Third-party dependencies create additional risk factors.",
    details: [
      { label: "Exchange Insolvency", text: "Cryptocurrency exchanges can become insolvent, be hacked, or cease operations, potentially resulting in total loss of funds held on the exchange." },
      { label: "Custody Risks", text: "Assets held at exchanges or custodians are subject to counterparty risk. Insurance coverage for cryptocurrency assets is limited or unavailable." },
      { label: "Service Provider Failures", text: "Failures by data providers, hosting services, or other third parties can disrupt operations and impact trading performance." },
      { label: "Early-Stage Company", text: "Hyper Trading Automation is an early-stage company with limited operating history. There is no guarantee of service continuity or success." },
      { label: "Key Person Risk", text: "Operations depend significantly on founder Abduxoliq Ashuraliyev. Loss of key personnel could disrupt operations or strategy execution." },
    ],
  },
];

const acknowledgments = [
  {
    title: "Performance Disclaimer",
    text: "Past performance does not guarantee future results. This system has not been independently audited. Demo data may not reflect live trading conditions. Extended losing periods (drawdowns of 20-50% or more) are possible. Strategy effectiveness can decay over time as markets evolve.",
  },
  {
    title: "Security Acknowledgment",
    text: "Despite security measures, digital systems face persistent threats including hacking, unauthorized access, and data breaches. Your security practices directly impact risk. We implement industry-standard protections, but no system is completely secure.",
  },
  {
    title: "Financial Responsibility",
    text: "You can afford to lose the entire amount allocated to trading without impacting your financial security. You will consult with qualified financial, legal, and tax advisors before proceeding. You are not relying solely on information provided by Hyper Trading Automation.",
  },
];

const relatedDocs = [
  { href: "/terms" as Route, title: "Terms of Service", description: "Legal terms governing use of the platform" },
  { href: "/privacy" as Route, title: "Privacy Policy", description: "How we collect, use, and protect your data" },
  { href: "/safety" as Route, title: "Safety & Security", description: "Compliance controls and fraud prevention" },
  { href: "/contact" as Route, title: "Contact Us", description: "Questions? Reach out to our team" },
];

export default function RiskDisclosurePage() {
  return (
    <div className="relative">
      <PageHeaderAnimated
        eyebrow="Legal"
        title="Risk Disclosure"
        description="Trading involves substantial risk of loss. This disclosure summarizes key risks. Read carefully before requesting demo access. No guarantees of returns are made."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard className="w-96 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk overview</div>
            <div className="mb-3 text-lg font-bold">Trade risk highlights</div>
            <p className="text-xs text-muted-foreground">Trading involves losses. Read the full disclosure before interacting with demo data.</p>
            <div className="mt-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white"
              >
                Contact compliance
              </a>
            </div>
            <div className="mt-4">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Contact compliance
              </motion.a>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Main Content Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 py-24 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.06),rgba(59,130,246,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.04),rgba(96,165,250,0.03),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl space-y-12">
            {/* Risk Sections */}
            {riskSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-3xl border border-slate-200 bg-card/90 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 md:p-10"
                >
                  <div className="mb-6 flex items-start gap-4">
                    <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {section.title}
                      </h2>
                      <p className={`text-sm leading-relaxed ${section.id === 'warning' ? 'font-semibold text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {section.summary}
                      </p>
                    </div>
                  </div>

                  {section.content && (
                    <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {section.content.map((text, idx) => (
                        <p key={idx} className={section.id === 'warning' ? 'font-semibold text-amber-900 dark:text-amber-200' : ''}>
                          {text}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.details && (
                    <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {section.details.map((detail, idx) => (
                        <p key={idx}>
                          <strong className="text-slate-900 dark:text-white">{detail.label}:</strong> {detail.text}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Your Acknowledgment */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-3xl border border-red-200 bg-gradient-to-br from-white via-red-50/30 to-orange-50/20 p-8 shadow-lg dark:border-red-800/50 dark:from-slate-900 dark:via-red-950/30 dark:to-orange-950/20 md:p-10"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
                  <AlertTriangle className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                    Your Acknowledgment
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    By requesting demo access, you acknowledge understanding these risks.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {acknowledgments.map((ack, idx) => (
                  <p key={idx}>
                    <strong className="text-slate-900 dark:text-white">{ack.title}:</strong> {ack.text}
                  </p>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 font-bold text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
                You understand this is a startup in analysis phase. You can lose all capital invested.
                We do not provide financial advice or investment recommendations.
              </div>
            </motion.div>

            {/* Related Documentation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 p-8 shadow-lg dark:border-blue-800/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-cyan-950/20 md:p-10"
            >
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Related Documentation</h2>
              <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
                Review these documents for complete information:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedDocs.map((doc, idx) => (
                  <Link
                    key={idx}
                    href={doc.href}
                    className="group rounded-2xl border border-slate-200 bg-card/80 p-6 transition-all hover:border-blue-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-500"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-600 dark:text-blue-400" />
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">{doc.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{doc.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Final Notice */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="rounded-3xl border border-slate-200 bg-slate-100 p-8 text-center dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                By using this Site, you acknowledge that you have read, understood, and agree to be bound by this Risk Disclosure.
              </p>
              <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
                Version 1.0 | Last Updated: October 16, 2025
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
