"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
import {
  ArrowRight,
  Database,
  LineChart,
  Cpu,
  Brain,
  Shield,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  Lock,
  AlertTriangle,
  Target,
  Layers,
  RefreshCcw,
  CheckCircle2,
  Clock,
  Server,
  GitBranch,
} from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
import { PremiumCard } from "@/components/cards/PremiumCard";
import type { PageAccent } from "@/styles/design-tokens";

/* =============================================================================
   PIPELINE ARCHITECTURE - 7 Layers from Data to Monitoring
============================================================================= */

const pipelineStages = [
  {
    id: 1,
    title: "Data Layer",
    subtitle: "Multi-Source Aggregation",
    description: "CCXT integration with 100+ exchanges via WebSocket streaming. Tick-by-tick order book data, trade flow, and funding rates. Alternative data from NewsAPI, FRED economic indicators, and LunarCrush social sentiment.",
    icon: Database,
    gradient: "from-blue-500 to-cyan-500",
    accent: "cyan" as PageAccent,
    details: [
      "Real-time WebSocket streams from 100+ exchanges",
      "Order book depth (L2/L3 data)",
      "Funding rates, open interest, liquidation data",
      "NewsAPI, FRED, LunarCrush integrations",
    ],
  },
  {
    id: 2,
    title: "Analysis Layer",
    subtitle: "40+ Technical Indicators",
    description: "Feature engineering pipeline with 40+ technical indicators: MACD, RSI, Bollinger Bands, ATR, OBV, ADX, and more. VPIN calculations for toxic flow detection and microprice modeling for true value estimation.",
    icon: LineChart,
    gradient: "from-indigo-500 to-blue-500",
    accent: "blue" as PageAccent,
    details: [
      "40+ technical indicators (MACD, RSI, BB, ATR, OBV, ADX)",
      "VPIN toxic flow detection",
      "Microprice calculations",
      "Order flow imbalance analysis",
    ],
  },
  {
    id: 3,
    title: "Strategy Layer",
    subtitle: "380 Configurations",
    description: "Strategy Expander generates 380 configurations from 63 core templates. Categories: Technical (15), ML-driven (2), Arbitrage (3), Event-driven (1), Grid bots (5), Hedge fund replication (22), Microstructure (6), Advanced (7).",
    icon: GitBranch,
    gradient: "from-purple-500 to-pink-500",
    accent: "purple" as PageAccent,
    details: [
      "63 core templates → 380 configurations",
      "Mean reversion, momentum, arbitrage, microstructure",
      "Hedge fund strategy replication (22 templates)",
      "Performance-based auto-selection",
    ],
  },
  {
    id: 4,
    title: "ML Layer",
    subtitle: "486 Model Configurations",
    description: "Model Factory generates 486 unique configurations from 25+ base architectures: LSTM, GRU, Transformers, TCN, BiLSTM, Random Forest, XGBoost, LightGBM. Each expanded across 5 lookback windows and 8 feature sets.",
    icon: Brain,
    gradient: "from-violet-500 to-fuchsia-500",
    accent: "purple" as PageAccent,
    details: [
      "25+ architectures: LSTM, Transformers, TCN, XGBoost",
      "5 lookback windows × 8 feature sets",
      "Automatic hyperparameter optimization",
      "Ensemble methods and model stacking",
    ],
  },
  {
    id: 5,
    title: "Risk Layer",
    subtitle: "Institutional-Grade Controls",
    description: "Kelly Criterion position sizing (0.25-0.5 fractional), dynamic leverage caps (3x crypto, 2x stocks), VaR monitoring, drawdown throttling, correlation limits, and automatic circuit breakers.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    accent: "emerald" as PageAccent,
    details: [
      "Kelly Criterion (0.25-0.5 fractional sizing)",
      "VaR monitoring with dynamic leverage",
      "Drawdown throttling and circuit breakers",
      "Correlation limits across positions",
    ],
  },
  {
    id: 6,
    title: "Execution Layer",
    subtitle: "Smart Order Routing",
    description: "Adaptive smart order routing splits flow across venues. Real-time slippage estimation, market impact modeling, and order splitting algorithms. Latency-optimized execution with microsecond precision.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    accent: "orange" as PageAccent,
    details: [
      "Multi-venue smart order routing",
      "Slippage estimation and market impact modeling",
      "TWAP, VWAP, POV execution algorithms",
      "Latency optimization < 5ms",
    ],
  },
  {
    id: 7,
    title: "Monitoring Layer",
    subtitle: "Real-Time Observability",
    description: "Signed telemetry for every decision. Cryptographic audit trails, real-time P&L tracking, latency monitoring, and automated alerting. Full post-trade analysis with replayable execution logs.",
    icon: Activity,
    gradient: "from-red-500 to-rose-500",
    accent: "orange" as PageAccent,
    details: [
      "Cryptographically signed audit trails",
      "Real-time P&L and latency monitoring",
      "Automated alerting and incident response",
      "Replayable execution logs",
    ],
  },
];

/* =============================================================================
   MODEL FACTORY - 486 ML Configurations
============================================================================= */

const modelArchitectures = [
  {
    category: "Deep Learning",
    models: [
      { name: "LSTM", description: "Long Short-Term Memory networks for sequential pattern recognition" },
      { name: "GRU", description: "Gated Recurrent Units with faster training convergence" },
      { name: "BiLSTM", description: "Bidirectional LSTM for both past and future context" },
      { name: "Transformer", description: "Attention mechanisms for long-range dependencies" },
      { name: "TCN", description: "Temporal Convolutional Networks for causal convolutions" },
      { name: "TFT", description: "Temporal Fusion Transformers for multi-horizon forecasting" },
    ],
    gradient: "from-purple-500 to-pink-500",
    accent: "purple" as PageAccent,
  },
  {
    category: "Ensemble Methods",
    models: [
      { name: "Random Forest", description: "Bagged decision trees for robust predictions" },
      { name: "XGBoost", description: "Gradient boosted trees with regularization" },
      { name: "LightGBM", description: "Leaf-wise gradient boosting for large datasets" },
      { name: "CatBoost", description: "Categorical feature handling with ordered boosting" },
      { name: "AdaBoost", description: "Adaptive boosting with weighted weak learners" },
      { name: "Stacking", description: "Meta-learning with heterogeneous base models" },
    ],
    gradient: "from-blue-500 to-cyan-500",
    accent: "cyan" as PageAccent,
  },
];

const expansionFactors = [
  { label: "Base Architectures", value: "25+", description: "LSTM, Transformers, TCN, XGBoost, and more" },
  { label: "Lookback Windows", value: "5", description: "1h, 4h, 1d, 1w, 1m time horizons" },
  { label: "Feature Sets", value: "8", description: "Technical, sentiment, on-chain, fundamental" },
  { label: "Final Configurations", value: "486", description: "Unique model variants for selection" },
];

/* =============================================================================
   STRATEGY EXPANDER - 380 Configurations
============================================================================= */

const strategyCategories = [
  {
    category: "Technical Strategies",
    count: 15,
    templates: ["Trend Following", "Mean Reversion", "Breakout", "RSI Divergence", "MACD Cross"],
    gradient: "from-blue-500 to-cyan-500",
    accent: "cyan" as PageAccent,
  },
  {
    category: "ML-Driven Strategies",
    count: 2,
    templates: ["Prediction Ensemble", "Regime Classification"],
    gradient: "from-purple-500 to-pink-500",
    accent: "purple" as PageAccent,
  },
  {
    category: "Arbitrage Strategies",
    count: 3,
    templates: ["Cross-Exchange", "Triangular", "Statistical Pairs"],
    gradient: "from-emerald-500 to-teal-500",
    accent: "emerald" as PageAccent,
  },
  {
    category: "Microstructure Strategies",
    count: 6,
    templates: ["Order Flow", "VPIN-Based", "Microprice", "Toxicity Avoidance", "Queue Priority", "Latency Arb"],
    gradient: "from-amber-500 to-orange-500",
    accent: "orange" as PageAccent,
  },
  {
    category: "Hedge Fund Replication",
    count: 22,
    templates: ["Momentum Factor", "Value Factor", "Carry Trade", "Vol Targeting", "Risk Parity"],
    gradient: "from-indigo-500 to-violet-500",
    accent: "purple" as PageAccent,
  },
  {
    category: "Grid & Advanced",
    count: 12,
    templates: ["Grid Trading", "DCA", "Martingale", "Anti-Martingale", "Pyramiding"],
    gradient: "from-red-500 to-rose-500",
    accent: "orange" as PageAccent,
  },
];

/* =============================================================================
   RISK CONTROLS - Institutional-Grade Safety
============================================================================= */

const riskControls = [
  {
    title: "Kelly Criterion Position Sizing",
    description: "Fractional Kelly (0.25-0.5) with volatility scaling and confidence adjustments. Mathematically optimal bet sizing prevents overexposure while maximizing long-term geometric growth.",
    icon: Target,
    gradient: "from-emerald-500 to-teal-500",
    formula: "f* = (bp - q) / b",
    explanation: "Where f* is optimal fraction, b is odds, p is win probability, q is loss probability",
  },
  {
    title: "Value at Risk (VaR) Monitoring",
    description: "Real-time VaR calculations at 95% and 99% confidence intervals. Dynamic position adjustment when portfolio risk exceeds thresholds. Monte Carlo simulation for tail risk estimation.",
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-500",
    formula: "VaR = μ - σ × z(α)",
    explanation: "95% VaR: maximum expected loss with 95% confidence",
  },
  {
    title: "Drawdown Throttling",
    description: "Automatic position reduction at 10%, 15%, and 20% drawdown levels. Complete trading halt at 24% max drawdown. Recovery protocols ensure measured re-entry after drawdown events.",
    icon: AlertTriangle,
    gradient: "from-amber-500 to-orange-500",
    levels: ["10% → 50% position reduction", "15% → 75% reduction", "20% → 90% reduction", "24% → Full halt"],
  },
  {
    title: "Circuit Breakers",
    description: "Multi-level circuit breakers for flash crash protection. Automatic pause on unusual volatility, liquidity gaps, or execution anomalies. Manual override requires dual-key authorization.",
    icon: Lock,
    gradient: "from-red-500 to-rose-500",
    triggers: ["Volatility spike > 3σ", "Liquidity gap > 2%", "Execution failure > 3 consecutive", "Exchange API timeout"],
  },
];

/* =============================================================================
   EVALUATION METHODOLOGY - No Fake Backtests
============================================================================= */

const backtestingPrinciples = [
  {
    title: "Realistic Transaction Costs",
    value: "0.1-0.5%",
    description: "All backtests include maker/taker fees, funding rates, and borrowing costs. No fantasy assumptions about zero-fee execution.",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Dynamic Slippage Modeling",
    value: "Adaptive",
    description: "Order size-dependent slippage estimation based on historical order book depth and volume profiles. Larger orders get more slippage.",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "No Look-Ahead Bias",
    value: "Strict",
    description: "Walk-forward optimization with out-of-sample testing. Parameters are never fitted on data that would be unavailable at trade time.",
    icon: Clock,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Market Impact Modeling",
    value: "Square Root",
    description: "Impact = σ × √(Volume/ADV). Larger trades move the market against you. We account for this in all simulations.",
    icon: BarChart3,
    gradient: "from-amber-500 to-orange-500",
  },
];

const performanceMetrics = [
  { label: "Win Rate Range", value: "52-68%", sublabel: "Across top strategies" },
  { label: "Sharpe Ratio", value: "1.2-2.8", sublabel: "Risk-adjusted returns" },
  { label: "Max Drawdown", value: "12-24%", sublabel: "With recovery protocols" },
  { label: "Annual Return", value: "25-85%", sublabel: "Gross, before costs" },
];

/* =============================================================================
   PAGE COMPONENT
============================================================================= */

export default function HowItWorksPage() {
  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="default" intensity={0.5} />
      <Unified2DBackground variant="home" intensity={0.4} />

      {/* Hero Header */}
      <PageHeaderAnimated
        eyebrow="How It Works"
        title="From raw data to executed trades: 7 layers of institutional-grade automation"
        description="Our pipeline processes market data through 486 ML models and 380 strategy configurations, protected by Kelly Criterion sizing, VaR monitoring, and automatic circuit breakers. Every decision is cryptographically signed and auditable."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(99,102,241,1)", "rgba(236,72,153,1)"]}
      >
        {/* Header Stats */}
        <motion.div
          className="hidden lg:flex gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: "486", label: "ML Configs" },
            { value: "380", label: "Strategies" },
            { value: "7", label: "Pipeline Layers" },
            { value: "24/7", label: "Monitoring" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </PageHeaderAnimated>

      {/* Section 1: Pipeline Architecture */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400">
                <ColorIcon Icon={Layers} gradient="from-indigo-500 to-purple-500" size="h-5 w-5" iconClass="h-3 w-3" />
                System Architecture
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                7-Layer Pipeline: Data to Execution
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Every trade flows through a rigorous pipeline. Each layer is observable, each decision is signed, and every control must pass before capital is deployed.
              </p>
            </motion.div>

            {/* Pipeline Cards */}
            <div className="space-y-6">
              {pipelineStages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <PremiumCard
                      variant="glass-primary"
                      accent={stage.accent}
                      hover={true}
                      className="p-8 md:p-10"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                        {/* Stage Number & Icon */}
                        <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xl font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                            {stage.id}
                          </div>
                          <ColorIcon
                            Icon={Icon}
                            gradient={stage.gradient}
                            size="h-16 w-16"
                            shadowColor={accentToShadowColor(stage.accent)}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              {stage.subtitle}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {stage.title}
                            </h3>
                          </div>
                          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                            {stage.description}
                          </p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {stage.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm">
                                  <CheckCircle2 className="h-3 w-3 text-white" />
                                </span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Arrow to next stage */}
                        {index < pipelineStages.length - 1 && (
                          <div className="hidden lg:flex items-center justify-center">
                            <ArrowRight className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                          </div>
                        )}
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Section 2: Model Factory */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06),transparent_70%)]" />
        </div>

        <Container>
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                <ColorIcon Icon={Brain} gradient="from-purple-500 to-pink-500" size="h-5 w-5" iconClass="h-3 w-3" />
                Model Factory
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                486 ML Configurations, Automatically Generated
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Our Model Factory generates 486 unique configurations from 25+ base architectures. Each variant is backtested, scored, and ranked. Top performers are auto-selected for live trading.
              </p>
            </motion.div>

            {/* Expansion Formula */}
            <div className="grid gap-4 md:grid-cols-4">
              {expansionFactors.map((factor, i) => (
                <motion.div
                  key={factor.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PremiumCard variant="glass-secondary" accent="purple" className="p-6 text-center h-full">
                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">{factor.value}</div>
                    <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{factor.label}</div>
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">{factor.description}</div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>

            {/* Architecture Categories */}
            <div className="grid gap-8 md:grid-cols-2">
              {modelArchitectures.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <PremiumCard
                    variant="glass-primary"
                    accent={category.accent}
                    className="h-full p-8"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <ColorIcon
                        Icon={category.category === "Deep Learning" ? Brain : Server}
                        gradient={category.gradient}
                        size="h-14 w-14"
                        shadowColor={accentToShadowColor(category.accent)}
                      />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {category.models.map((model) => (
                        <div key={model.name} className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3 dark:border-slate-700/60 dark:bg-slate-800/50">
                          <div className="font-semibold text-slate-900 dark:text-white">{model.name}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{model.description}</div>
                        </div>
                      ))}
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Strategy Expander */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_70%)]" />
        </div>

        <Container>
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <ColorIcon Icon={GitBranch} gradient="from-blue-500 to-cyan-500" size="h-5 w-5" iconClass="h-3 w-3" />
                Strategy Expander
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                380 Strategies from 63 Core Templates
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Each template expands across multiple timeframes, parameter sets, and market conditions. Strategies compete for activation based on live performance metrics.
              </p>
            </motion.div>

            {/* Strategy Categories Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {strategyCategories.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PremiumCard
                    variant="glass-secondary"
                    accent={category.accent}
                    hover={true}
                    className="h-full p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 dark:text-white">{category.category}</h3>
                      <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">{category.count}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.templates.map((template) => (
                        <span
                          key={template}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {template}
                        </span>
                      ))}
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>

            {/* Total Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-4 rounded-2xl border-2 border-blue-200 bg-blue-50 px-8 py-4 dark:border-blue-800 dark:bg-blue-950/50">
                <ColorIcon Icon={RefreshCcw} gradient="from-blue-500 to-cyan-500" size="h-10 w-10" iconClass="h-5 w-5" />
                <div>
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">63 templates × 6 expansions = 380 configurations</span>
                  <p className="text-sm text-blue-600 dark:text-blue-300">Top 10-15 auto-activated based on Sharpe ratio, win rate, and drawdown</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Section 4: Risk Controls */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.06),transparent_70%)]" />
        </div>

        <Container>
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <ColorIcon Icon={Shield} gradient="from-emerald-500 to-teal-500" size="h-5 w-5" iconClass="h-3 w-3" />
                Risk Engine
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Institutional-Grade Risk Controls
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Capital preservation comes before profit pursuit. Every trade passes through Kelly Criterion sizing, VaR monitoring, drawdown throttling, and automatic circuit breakers.
              </p>
            </motion.div>

            {/* Risk Control Cards */}
            <div className="grid gap-8 md:grid-cols-2">
              {riskControls.map((control, index) => {
                const Icon = control.icon;
                return (
                  <motion.div
                    key={control.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <PremiumCard
                      variant="glass-primary"
                      accent="emerald"
                      hover={true}
                      className="h-full p-8"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <ColorIcon
                          Icon={Icon}
                          gradient={control.gradient}
                          size="h-14 w-14"
                          shadowColor={accentToShadowColor("emerald")}
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {control.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                        {control.description}
                      </p>
                      
                      {/* Formula or Levels */}
                      {"formula" in control && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/50">
                          <code className="block text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                            {control.formula}
                          </code>
                          <p className="text-xs text-emerald-600 dark:text-emerald-300">{control.explanation}</p>
                        </div>
                      )}
                      {"levels" in control && control.levels && (
                        <div className="space-y-2">
                          {control.levels.map((level, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                                <AlertTriangle className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                              </span>
                              <span className="text-slate-700 dark:text-slate-300">{level}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {"triggers" in control && control.triggers && (
                        <div className="space-y-2">
                          {control.triggers.map((trigger, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-red-500 to-rose-500 shadow-sm">
                                <Lock className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                              </span>
                              <span className="text-slate-700 dark:text-slate-300">{trigger}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Section 5: Backtesting & Evaluation */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <Container>
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                <ColorIcon Icon={BarChart3} gradient="from-amber-500 to-orange-500" size="h-5 w-5" iconClass="h-3 w-3" />
                Evaluation Methodology
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                No Cherry-Picked Backtests
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                All performance metrics include realistic transaction costs, dynamic slippage, and market impact. No look-ahead bias. No fantasy assumptions.
              </p>
            </motion.div>

            {/* Backtesting Principles */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {backtestingPrinciples.map((principle, i) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <PremiumCard variant="glass-secondary" accent="orange" hover={true} className="h-full p-6 text-center">
                      <ColorIcon
                        Icon={Icon}
                        gradient={principle.gradient}
                        size="h-12 w-12"
                        wrapperClass="mx-auto mb-4"
                        shadowColor={accentToShadowColor("orange")}
                      />
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">{principle.value}</div>
                      <div className="font-semibold text-slate-900 dark:text-white mb-2">{principle.title}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{principle.description}</p>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl"
            >
              <PremiumCard variant="glass-primary" accent="purple" className="p-8">
                <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-8">
                  Validated Performance Ranges
                </h3>
                <div className="grid gap-6 md:grid-cols-4">
                  {performanceMetrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{metric.value}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{metric.label}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{metric.sublabel}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
                  *Performance metrics based on comprehensive backtesting with realistic transaction costs (0.1-0.5%). Past performance does not guarantee future results.
                </p>
              </PremiumCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <PremiumCard variant="glass-primary" accent="cyan" className="p-12">
              <ColorIcon Icon={Cpu} gradient="from-cyan-500 to-blue-500" size="h-16 w-16" iconClass="h-8 w-8" shadowColor="rgba(6,182,212,0.4)" wrapperClass="mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Ready to See the System in Action?
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
                Schedule a private walkthrough with our engineering team. No sales pitch — just a transparent demonstration of the pipeline, risk controls, and execution quality.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={"/contact" as Route}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Schedule Walkthrough
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={"/research" as Route}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  View Research
                </Link>
              </div>
            </PremiumCard>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
