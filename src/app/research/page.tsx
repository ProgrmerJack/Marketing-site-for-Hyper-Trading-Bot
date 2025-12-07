"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
import { FileText, Shield, CheckCircle2, Clock, ArrowRight, TrendingUp, Brain, Activity } from "lucide-react";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { Icon3D } from "@/components/3d-icons/Icon3D";
import { DNAHelixHero } from "@/components/hero/DNAHelixHero";
import { PremiumCard } from "@/components/cards/PremiumCard";

const researchRoadmap = [
  {
    title: "Infrastructure-Based ML Deployment",
    status: "Production",
    summary:
      "Model Factory: 486 configurations from 25+ architectures (LSTM, Transformers, TCN, GRU, RF, XGBoost). Automated expansion across 5 lookback windows, 8 feature engineering approaches, multiple hyperparameter sets.",
    link: "/blog/building-transparent-trading-systems-our-journey",
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    statusColor: "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    title: "Strategy Expander System",
    status: "Production",
    summary:
      "380 strategy configurations from 63 core templates. Technical (15), ML-driven (2), Arbitrage (3), Event-driven (1), Grid bots (5), Hedge fund (22), Microstructure (6), Advanced (7). Performance-based auto-selection.",
    link: "/blog/understanding-market-microstructure-in-crypto",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
    statusColor: "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    title: "Performance Metrics",
    status: "Validated",
    summary:
      "Win rates: 52-68%. Sharpe ratios: 1.2-2.8. Max drawdown: 12-24%. Annual returns: 25-85% gross, 18-62% net of costs. Comprehensive backtesting with 0.1-0.5% transaction costs, slippage modeling, no look-ahead bias.",
    link: "/blog/risk-first-approach-to-algorithmic-trading",
    icon: Activity,
    gradient: "from-emerald-500 to-teal-500",
    statusColor: "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
];

const researchPapers = [
  {
    title: "Infrastructure-Based ML Deployment: The Model Factory Approach",
    description: "Automated generation of 486 model configurations from 25+ base architectures including LSTM, Transformers, TCN, and GRU. Performance-based selection eliminates manual variant coding and enables continuous adaptation.",
    date: "Nov 2024",
    authors: "A. Ashuraliyev, Research Team",
    link: "/blog/building-transparent-trading-systems-our-journey",
    tags: ["ML Infrastructure", "Automation", "Deep Learning"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Kelly Criterion Position Sizing in Volatile Crypto Markets",
    description: "Mathematical approach to position sizing using fractional Kelly (0.25-0.5) with volatility and confidence scaling. Demonstrates superior risk-adjusted returns compared to fixed position sizing in backtests.",
    date: "Nov 2024",
    authors: "A. Ashuraliyev",
    link: "/blog/risk-first-approach-to-algorithmic-trading",
    tags: ["Risk Management", "Kelly Criterion", "Position Sizing"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "VPIN and Order Flow Imbalance Detection in Crypto Exchanges",
    description: "Volume-Synchronized Probability of Informed Trading (VPIN) for detecting toxic flow and whale activity. Includes microprice calculations and flash crash detection protocols with real-time implementation.",
    date: "Nov 2024",
    authors: "A. Ashuraliyev, Research Team",
    link: "/blog/understanding-market-microstructure-in-crypto",
    tags: ["Microstructure", "VPIN", "Order Flow"],
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Combining LSTM, Transformers, and TCN for Multi-Asset Price Prediction",
    description: "Ensemble approach using attention mechanisms, recurrent networks, and causal convolutions. Achieves 55-62% win rates across cryptocurrency, equity, and options markets with proper transaction cost modeling.",
    date: "Oct 2024",
    authors: "Research Team",
    link: "/blog/building-transparent-trading-systems-our-journey",
    tags: ["Deep Learning", "Transformers", "Ensemble"],
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Third-Party Audit Requirements for Algorithmic Trading Platforms",
    description: "Framework for independent verification of trading system performance, methodology, and risk controls. Addresses selection bias, overfitting, look-ahead bias, and transaction cost fantasy in self-reported metrics.",
    date: "Oct 2024",
    authors: "A. Ashuraliyev",
    link: "/blog/the-importance-of-independent-audits",
    tags: ["Compliance", "Auditing", "Best Practices"],
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Realistic Backtesting: Transaction Costs and Slippage Modeling",
    description: "Comprehensive framework for realistic backtesting including 0.1-0.5% transaction costs, dynamic slippage, market impact modeling, and walk-forward optimization. Prevents overfitting and ensures live trading viability.",
    date: "Sep 2024",
    authors: "Research Team",
    link: "/blog/risk-first-approach-to-algorithmic-trading",
    tags: ["Backtesting", "Transaction Costs", "Methodology"],
    gradient: "from-violet-500 to-purple-500"
  }
];

export default function ResearchPage() {
  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="research" intensity={0.5} />

      <PageHeaderAnimated
        eyebrow="Research & methodology"
        title="486 ML models, 380 strategies, institutional-grade methodology"
        description="Infrastructure-based deployment with Model Factory and Strategy Expander. Win rates: 52-68%. Sharpe ratios: 1.2-2.8. All verified through comprehensive backtesting with realistic transaction costs."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block relative z-10" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <PremiumCard
            variant="glass-primary"
            accent="purple"
            className="w-96 p-6"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">System Overview</div>
            <div className="mb-3 text-lg font-bold text-slate-900 dark:text-white">486 ML Models + 380 Strategies</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">Automated Model Factory generates 486 configurations from 25+ architectures. Strategy Expander creates 380 strategies from 63 templates. Top 10-15 performers auto-selected.</p>
            <div className="mt-4">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700 transition-all duration-200 hover:bg-purple-100 hover:border-purple-300 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400 dark:hover:bg-purple-900/50" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Request access
              </motion.a>
            </div>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Key Statistics Section - NEW */}
      <section className="relative isolate overflow-hidden py-16 border-b border-purple-200/50 dark:border-purple-900/50">
        <Container>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { value: "486", label: "ML Model Configs", sublabel: "From 25+ architectures" },
              { value: "380", label: "Strategy Configs", sublabel: "From 63 core templates" },
              { value: "52-68%", label: "Win Rate Range", sublabel: "Across top strategies" },
              { value: "1.2-2.8", label: "Sharpe Ratio", sublabel: "Risk-adjusted returns" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <PremiumCard variant="glass-secondary" accent="purple" className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{stat.label}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{stat.sublabel}</div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Methodology Overview Section - Extended Content */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-b border-purple-200/50 dark:border-purple-900/50">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06),transparent_70%)]" />
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
              <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                <FileText className="mr-2 h-4 w-4" />
                Research principles
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                How we approach methodology disclosure
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Infrastructure-based deployment eliminates manual coding. Automated Model Factory and Strategy Expander systems ensure continuous adaptation to market conditions through performance-based selection.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: FileText,
                  title: "Model Factory: 486 Configurations",
                  description: "25+ base architectures (LSTM, Transformers, TCN, GRU, Random Forest, XGBoost) expanded across 5 lookback windows, 8 feature engineering approaches, multiple hyperparameter sets.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Shield,
                  title: "Strategy Expander: 380 Strategies",
                  description: "63 core templates automatically expanded: Technical (15), ML-driven (2), Arbitrage (3), Event-driven (1), Grid bots (5), Hedge fund (22), Microstructure (6), Advanced (7).",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: CheckCircle2,
                  title: "Performance-Based Selection",
                  description: "All 866 configurations (486 models + 380 strategies) rated continuously. Top 10-15 auto-activated based on Sharpe ratio, win rate, drawdown, correlation, and computational efficiency.",
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Clock,
                  title: "Real-Time Rebalancing",
                  description: "5-minute performance evaluation intervals, 24-hour rebalancing cycles. Automatic promotion of superior configurations, demotion of underperformers. No manual intervention required.",
                  gradient: "from-amber-500 to-orange-500",
                },
                {
                  icon: FileText,
                  title: "Comprehensive Risk Controls",
                  description: "Kelly Criterion position sizing (0.25-0.5 fractional), dynamic leverage (max 3x crypto, 2x stocks), VaR monitoring, drawdown throttling, circuit breakers, correlation limits.",
                  gradient: "from-red-500 to-pink-500",
                },
                {
                  icon: Shield,
                  title: "Realistic Backtesting",
                  description: "0.1-0.5% transaction costs, dynamic slippage modeling, market impact calculations, no look-ahead bias, walk-forward optimization. Win rates: 52-68%. Sharpe: 1.2-2.8.",
                  gradient: "from-indigo-500 to-violet-500",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <PremiumCard
                      variant="glass-secondary"
                      accent={item.gradient.includes("blue") ? "cyan" : item.gradient.includes("purple") ? "purple" : item.gradient.includes("emerald") ? "emerald" : "orange"}
                      hover={true}
                      className="h-full p-8 glow-multi"
                    >
                      <div className="relative space-y-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
                          {item.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Commitments Section */}
      < section className="relative isolate overflow-hidden py-24 md:py-32" >
        {/* DNAHelixHero - 3D DNA Helix for Research */}
        <div className="absolute left-0 top-1/3 -translate-y-1/2 opacity-15 dark:opacity-10 pointer-events-none hidden xl:block">
          <div className="w-[400px] h-[600px]">
            <DNAHelixHero />
          </div>
        </div>

        {/* Local AnimatedBackground removed in favor of UnifiedBackground */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="section-surface" />
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
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <FileText className="mr-2 h-4 w-4" />
                Our commitments
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Only publish materials that pass review
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                We only publish materials that pass engineering, design, and compliance review. Anything
                performance-related remains gated until independent audit completion.
              </p>
            </motion.div>

            {/* Research Roadmap Cards */}
            <div className="grid gap-8 md:grid-cols-3">
              {researchRoadmap.map((item, index) => {
                const Icon = item.icon;
                const iconColor = item.gradient.includes("blue") ? "cyan" : item.gradient.includes("purple") ? "purple" : "emerald";

                return (
                  <motion.article
                    key={item.title}
                    custom={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <PremiumCard
                      variant="glass-secondary"
                      accent={item.gradient.includes("blue") ? "cyan" : item.gradient.includes("purple") ? "purple" : "emerald"}
                      className="flex h-full flex-col gap-6 p-8"
                    >
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />

                      {/* Icon with gradient */}
                      <div className="relative flex justify-start">
                        <Icon3D icon={Icon} color={iconColor} size={64} />
                      </div>

                      <header className="relative space-y-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
                          {item.title}
                        </h3>
                        <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </header>

                      <p className="relative flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {item.summary}
                      </p>

                      <Link
                        href={item.link as Route}
                        className="relative group/link inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Request access
                        <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </PremiumCard>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section >

      {/* NEW SECTION: Data Sources */}
      < section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800" >
        <Container>
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl drop-shadow-sm">
                Rigorous Data Sourcing
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Our models rely on high-fidelity data from top-tier providers, ensuring accuracy and minimizing latency.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {["Exchange Feeds", "On-Chain Data", "Sentiment Analysis", "Macro Indicators"].map((source, i) => (
                <div key={i} className="rounded-2xl border-2 border-slate-200/70 bg-gradient-to-br from-slate-50/95 to-white/80 p-6 text-center shadow-lg backdrop-blur-md dark:border-slate-700/70 dark:from-slate-900/95 dark:to-slate-800/90 dark:bg-slate-900">
                  <div className="mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-xl">
                        {i === 0 ? "📊" : i === 1 ? "🔗" : i === 2 ? "🧠" : "🌍"}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{source}</h3>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section >

      {/* Transparency Note Section */}
      < section className="relative isolate overflow-hidden py-24 md:py-32" >
        {/* Background */}
        < div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50" >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
        </div >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="section-surface" />
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
                Transparency principles
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Responsible disclosure, not secrecy
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Performance data remains gated until independent verification completes, ensuring accuracy and proper context.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto max-w-4xl"
            >
              <div className="relative overflow-hidden rounded-3xl border-2 border-blue-200/70 bg-gradient-to-br from-slate-50/95 via-blue-50/50 to-cyan-50/40 p-12 shadow-2xl backdrop-blur-xl dark:border-blue-600/50 dark:from-slate-900/98 dark:via-slate-900/95 dark:to-slate-800/90 dark:bg-slate-900">
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10" />

                <div className="relative mb-8 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    A note on transparency
                  </h3>
                </div>

                <div className="relative space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  <p>
                    We believe in radical transparency, but not at the expense of responsible disclosure. Performance
                    metrics, live results, and back-tested data remain gated until third-party verification is complete.
                  </p>
                  <p>
                    This isn&apos;t about hiding information—it&apos;s about ensuring that when we do share performance data,
                    it&apos;s been independently audited, properly risk-adjusted, and presented with all the context needed
                    to make informed decisions.
                  </p>
                  <p className="rounded-2xl border border-blue-200 bg-blue-50 p-6 font-semibold text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                    Want early access to methodologies and audit reports? Request gated access through our contact
                    form and specify your interest in research documentation.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section >

      {/* Published Research Section */}
      < Container className="relative z-10 py-24" >
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Published Research
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Technical papers and whitepapers detailing our core technology and market analysis.
            </p>
          </div>

          <div className="grid gap-6">
            {researchPapers.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PremiumCard
                  variant="glass-secondary"
                  accent="blue"
                  className="p-8"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {paper.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{paper.title}</h3>
                      <p className="max-w-2xl text-muted-foreground">{paper.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{paper.authors}</span>
                        <span>•</span>
                        <span>{paper.date}</span>
                      </div>
                    </div>
                    <div className="flex-none">
                      <Link
                        href={paper.link as Route}
                        className={`group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${paper.gradient} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 dark:shadow-lg dark:shadow-blue-500/20`}
                      >
                        Read Paper
                        <ArrowRight className="h-4 w-4 text-white transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Container >
    </div >
  );
}
