"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
// Using UnifiedBackground globally; remove per-section AnimatedBackground usage
import Link from "next/link";
import type { Route } from "next";
import { AlertTriangle, TrendingDown, Cpu, Scale, Shield, CheckCircle2 } from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
import { RiskShield3D } from "@/components/hero/RiskShield3D";

const riskSections = [
  {
    id: "warning",
    icon: AlertTriangle,
    gradient: "from-red-500 to-orange-500",
    title: "⚠️ Critical Warning",
    summary: "Trading involves substantial risk of loss and is not suitable for all investors. You should not trade with money you cannot afford to lose.",
    content: [
      "IMPORTANT NOTICE: Hyper Trading Automation is currently in analysis, development, and testing phase. This website provides demonstration data only — no live trading functionality is available. All performance figures, statistics, and metrics displayed are simulated or hypothetical. Past performance, whether actual, backtested, or simulated, is NOT indicative of future results.",
      "RISK OF LOSS: You can lose 100% of all capital invested. Cryptocurrency trading with leverage amplifies both potential gains and losses. A small adverse price movement can result in rapid and substantial losses, including losses that may exceed your initial deposit. You should carefully consider whether trading is appropriate for you in light of your financial circumstances, investment experience, and risk tolerance.",
      "NO GUARANTEES: This is not a 'get rich quick' scheme. We make absolutely no guarantees, representations, or warranties of any kind regarding profitability, returns, or investment outcomes. Many traders lose money. Only risk capital you can afford to lose entirely without affecting your lifestyle.",
    ],
  },
  {
    id: "market",
    icon: TrendingDown,
    gradient: "from-amber-500 to-red-500",
    title: "Market & Trading Risks",
    summary: "Cryptocurrency markets are highly volatile, unpredictable, and operate 24/7/365 without circuit breakers or trading halts.",
    details: [
      { label: "Extreme Volatility", text: "Cryptocurrency prices can fluctuate 10-50% or more within minutes. Flash crashes of 80%+ have occurred historically. Sudden price movements can trigger liquidations and margin calls with no warning." },
      { label: "Leverage Danger", text: "Leverage of 10x, 20x, or higher is common in crypto. At 20x leverage, a 5% adverse move equals 100% loss. Leverage magnifies both gains AND losses proportionally." },
      { label: "Liquidity Risk", text: "During market stress, order book depth can vanish instantly. You may be unable to close positions at any reasonable price. Stop-loss orders may execute at prices far worse than specified (slippage)." },
      { label: "Market Manipulation", text: "Cryptocurrency markets are less regulated than traditional markets. Practices like wash trading, spoofing, and pump-and-dump schemes are prevalent. Prices can be artificially manipulated." },
      { label: "Correlation Risk", text: "Cryptocurrency assets often move in tandem during market stress. Diversification within crypto may not provide meaningful risk reduction during crashes." },
      { label: "Funding Rate Risk", text: "Perpetual futures have funding rates that can swing dramatically. Holding positions during extreme funding can erode capital regardless of price direction." },
    ],
  },
  {
    id: "technology",
    icon: Cpu,
    gradient: "from-blue-500 to-purple-500",
    title: "Technology & System Risks",
    summary: "Automated trading systems face numerous technical challenges that can result in unexpected losses.",
    details: [
      { label: "System Failures", text: "Hardware failures, software bugs, network outages, power outages, or connectivity issues can prevent order execution, cause duplicate orders, or trigger unintended trades. No system is 100% reliable." },
      { label: "API Failures", text: "Exchange APIs can experience downtime, rate limiting, or unexpected changes. Order placement may fail silently. Positions may not be properly hedged or closed during API outages." },
      { label: "Data Feed Errors", text: "Incorrect, delayed, stale, or missing market data can lead to poor trading decisions. Bad tick data can trigger false signals and substantial losses." },
      { label: "Model Degradation", text: "All trading strategies experience alpha decay over time as markets evolve and adapt. Strategies that worked historically may cease to be profitable. Backtested performance does not predict future results." },
      { label: "Execution Latency", text: "Delays in data feeds, order routing, or exchange processing can result in significant slippage, missed opportunities, or execution at unfavorable prices." },
      { label: "Algorithmic Risk", text: "Complex algorithms can behave unexpectedly in market conditions not present in training/testing data. Edge cases and black swan events may not be handled correctly." },
      { label: "Cyber Security Threats", text: "Despite industry-standard security measures, all internet-connected systems are vulnerable to hacking, DDoS attacks, malware, phishing, and data breaches. API keys can be compromised." },
    ],
  },
  {
    id: "regulatory",
    icon: Scale,
    gradient: "from-purple-500 to-pink-500",
    title: "Regulatory & Legal Risks",
    summary: "The cryptocurrency regulatory landscape is rapidly evolving globally with significant uncertainty.",
    details: [
      { label: "Regulatory Uncertainty", text: "Cryptocurrency regulations vary dramatically by jurisdiction and are subject to sudden, unpredictable changes that may restrict or completely prohibit trading activities, sometimes with retroactive effect." },
      { label: "Exchange Regulations", text: "Exchanges may be required to comply with new regulations that restrict access, require additional verification, or limit trading activities for certain jurisdictions." },
      { label: "Tax Complexity", text: "Cryptocurrency trading has complex, evolving tax implications in most jurisdictions. You are solely responsible for understanding and complying with all applicable tax laws. Consult a qualified tax professional." },
      { label: "Securities Classification", text: "Some tokens may be classified as securities, potentially subjecting them to additional regulations and legal restrictions. Token classification can change after purchase." },
      { label: "AML/KYC Requirements", text: "Anti-money laundering and know-your-customer requirements may restrict access to services, require disclosure of trading activities, or result in account freezes." },
      { label: "Cross-Border Issues", text: "Operating across jurisdictions creates legal complexity. Laws in your jurisdiction may conflict with laws in jurisdictions where exchanges operate." },
      { label: "Enforcement Actions", text: "Regulatory enforcement actions against exchanges, stablecoins, or DeFi protocols can impact asset values and access to funds." },
    ],
  },
  {
    id: "operational",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    title: "Operational & Counterparty Risks",
    summary: "Third-party dependencies create additional risk factors beyond your control.",
    details: [
      { label: "Exchange Insolvency", text: "Cryptocurrency exchanges have historically become insolvent (e.g., FTX, Mt. Gox), been hacked, or ceased operations, resulting in total loss of customer funds. Exchange deposits are generally not insured." },
      { label: "Custody Risks", text: "Assets held at exchanges or custodians are subject to counterparty risk. You typically do not hold private keys. Insurance coverage for cryptocurrency is limited or unavailable." },
      { label: "Withdrawal Restrictions", text: "Exchanges may halt withdrawals during market stress, regulatory pressure, or liquidity issues. You may be unable to access funds when needed most." },
      { label: "Stablecoin Risk", text: "Stablecoins can depeg, become illiquid, or face regulatory action. USDT, USDC, and other stablecoins carry credit and regulatory risk. Depeg events can cascade rapidly." },
      { label: "Smart Contract Risk", text: "DeFi protocols and smart contracts can contain bugs, be exploited, or fail in unexpected ways. Funds deposited in smart contracts can be permanently lost." },
      { label: "Early-Stage Company", text: "Hyper Trading Automation is an early-stage startup with limited operating history and unaudited financials. There is no guarantee of service continuity, success, or viability." },
      { label: "Key Person Dependency", text: "Operations depend significantly on founder Abduxoliq Ashuraliyev and a small team. Loss of key personnel could disrupt operations, development, or strategy execution." },
      { label: "No Investor Protection", text: "Unlike regulated securities, cryptocurrency investments generally lack investor protection schemes, deposit insurance, or guaranteed compensation mechanisms." },
    ],
  },
];

const acknowledgments = [
  {
    title: "Investment Risk Acknowledgment",
    text: "I understand that cryptocurrency trading involves substantial risk of loss, including the possibility of losing 100% of my invested capital. I am investing only risk capital that I can afford to lose entirely without affecting my lifestyle, financial security, or ability to meet financial obligations.",
  },
  {
    title: "No Investment Advice",
    text: "I acknowledge that Hyper Trading Automation does not provide investment, financial, tax, or legal advice. Nothing on this Site constitutes a recommendation to buy, sell, or hold any investment. I am solely responsible for my trading decisions and will consult with qualified professionals before proceeding.",
  },
  {
    title: "Performance Disclaimer",
    text: "I understand that past performance does not guarantee future results. All performance data displayed is simulated, hypothetical, or from limited testing periods. This system has not been independently audited. Extended losing periods (drawdowns of 20-50% or more) are possible and expected. Strategy effectiveness can and will decay over time as markets evolve.",
  },
  {
    title: "Technology Limitations",
    text: "I acknowledge that automated trading systems can fail, experience bugs, or behave unexpectedly. I understand that system outages, API failures, data errors, and cyber attacks can result in substantial losses. I accept these technology risks as part of using automated trading systems.",
  },
  {
    title: "Counterparty & Exchange Risks",
    text: "I understand that funds held at cryptocurrency exchanges are subject to counterparty risk including exchange insolvency, hacking, regulatory seizure, or operational failure. Exchange deposits are typically not insured. I accept the risk that I may lose access to or ownership of funds held at exchanges.",
  },
  {
    title: "Security Responsibility",
    text: "I acknowledge that despite Hyper Trading Automation implementing industry-standard security measures, no system is completely secure. I accept responsibility for my own security practices including API key management, device security, and account protection. I will not hold Hyper Trading Automation liable for losses resulting from my own security failures.",
  },
  {
    title: "Regulatory Compliance",
    text: "I confirm that I have verified that cryptocurrency trading is legal in my jurisdiction. I am solely responsible for compliance with all applicable laws and regulations. I will report and pay taxes on any trading gains as required by law in my jurisdiction.",
  },
  {
    title: "Age and Capacity",
    text: "I confirm that I am at least 18 years old (or the age of majority in my jurisdiction) and have the legal capacity to enter into binding contracts. I am not a citizen or resident of any jurisdiction where cryptocurrency trading is prohibited.",
  },
  {
    title: "Independent Decision",
    text: "I confirm that my decision to trade is made independently, based on my own research and judgment. I am not relying solely on information provided by Hyper Trading Automation, its website, marketing materials, or representatives.",
  },
];

const additionalDisclosures = [
  {
    title: "Hypothetical Performance Limitations",
    text: "Hypothetical or simulated performance results have inherent limitations. Unlike actual trading records, simulated results do not represent actual trading. Also, since the trades have not been executed, the results may have under- or over-compensated for the impact, if any, of certain market factors, such as lack of liquidity. Simulated trading programs in general are also subject to the fact that they are designed with the benefit of hindsight. No representation is being made that any account will or is likely to achieve profit or losses similar to those shown.",
  },
  {
    title: "Third-Party Content",
    text: "This Site may contain links to third-party websites or references to third-party services. Such references are provided for informational purposes only and do not constitute endorsement. We are not responsible for the content, accuracy, or practices of any third-party websites or services.",
  },
  {
    title: "No Fiduciary Relationship",
    text: "Nothing on this Site creates, or is intended to create, a fiduciary, advisory, or professional relationship between you and Hyper Trading Automation. We do not act as your investment advisor, broker, or agent. You bear sole responsibility for all trading decisions.",
  },
  {
    title: "Forward-Looking Statements",
    text: "This Site may contain forward-looking statements about our business, strategy, or technology. Such statements are based on current expectations and are subject to risks and uncertainties that could cause actual results to differ materially. We undertake no obligation to update forward-looking statements.",
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
          <SpotlightCard className="w-96 rounded-2xl border border-slate-200/50 bg-white/10 p-6 shadow-xl backdrop-blur-md hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/50">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk overview</div>
            <div className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Trade risk highlights</div>
            <p className="text-xs text-muted-foreground">Trading involves losses. Read the full disclosure before interacting with demo data.</p>
            <div className="mt-4 flex gap-3">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/50" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Contact compliance
              </motion.a>
              <motion.button
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.18 }}
              >
                Download PDF
              </motion.button>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Main Content Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Unified2DBackground variant="legal" intensity={0.5} />

        {/* RiskShield3D - 3D Risk Shield Visualization */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-18 dark:opacity-12 pointer-events-none hidden xl:block">
          <div className="w-[450px] h-[450px]">
            <RiskShield3D />
          </div>
        </div>

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
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/40 p-8 shadow-lg backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/40 md:p-10"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
                  <div className="mb-6 flex items-start gap-4">
                    <ColorIcon Icon={Icon} gradient={section.gradient} size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor(section.gradient.includes('red') ? 'red' : section.gradient.includes('amber') ? 'orange' : section.gradient.includes('blue') ? 'blue' : section.gradient.includes('purple') ? 'purple' : 'emerald')} />
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
              className="rounded-3xl border border-red-200/50 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-red-50/30 to-orange-50/20 p-8 shadow-lg backdrop-blur-md dark:border-red-800/50 dark:from-slate-900 dark:via-red-950/30 dark:to-orange-950/20 md:p-10"
            >
              <div className="mb-6 flex items-start gap-4">
                <ColorIcon Icon={AlertTriangle} gradient="from-red-500 to-orange-500" size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor('red')} />
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                    Your Acknowledgment
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    By requesting demo access or using this Site, you confirm and acknowledge all of the following:
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {acknowledgments.map((ack, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-sm">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </span>
                    <p>
                      <strong className="text-slate-900 dark:text-white">{ack.title}:</strong> {ack.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 font-bold text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
                <p className="mb-2">⚠️ FINAL WARNING</p>
                <p>You understand this is an early-stage startup in analysis and development phase. You can lose 100% of all capital invested. We do not provide financial, investment, tax, or legal advice. You should consult with qualified professionals before making any investment decisions.</p>
              </div>
            </motion.div>

            {/* Additional Disclosures */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="rounded-3xl border border-amber-200/50 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-amber-50/20 to-yellow-50/10 p-8 shadow-lg backdrop-blur-md dark:border-amber-800/50 dark:from-slate-900 dark:via-amber-950/20 dark:to-yellow-950/10 md:p-10"
            >
              <div className="mb-6 flex items-start gap-4">
                <ColorIcon Icon={Scale} gradient="from-amber-500 to-yellow-500" size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor('orange')} />
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                    Additional Legal Disclosures
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    Important supplementary disclosures required for compliance and transparency.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {additionalDisclosures.map((disclosure, idx) => (
                  <p key={idx}>
                    <strong className="text-slate-900 dark:text-white">{disclosure.title}:</strong> {disclosure.text}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Related Documentation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-3xl border border-blue-200/50 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-blue-50/30 to-cyan-50/20 p-8 shadow-lg backdrop-blur-md dark:border-blue-800/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-cyan-950/20 md:p-10"
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
                    className="group rounded-2xl border border-slate-200/60 bg-white/50 p-6 transition-all hover:border-blue-400 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-800/50 dark:hover:border-blue-500"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                      </span>
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
              className="rounded-3xl border border-slate-200/50 bg-slate-100/50 p-8 text-center backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/50"
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
