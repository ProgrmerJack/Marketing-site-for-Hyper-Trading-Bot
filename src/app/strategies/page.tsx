"use client";

import Link from "next/link";
import { ArrowRight, Library, Search, TrendingUp, Brain, BarChart3, GitBranch, Zap, Shield, Filter, Target, Activity, Percent } from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { Container } from "@hyper/ui";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { useState } from "react";

export default function StrategiesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const strategyCategories = [
    { id: "all", label: "All Strategies", count: 380 },
    { id: "technical", label: "Technical", count: 15 },
    { id: "ml", label: "ML-Driven", count: 2 },
    { id: "arbitrage", label: "Arbitrage", count: 3 },
    { id: "sentiment", label: "Sentiment", count: 5 },
    { id: "hybrid", label: "Hybrid", count: 12 },
  ];

  const strategies = [
    {
      name: "Momentum Alpha",
      category: "technical",
      description: "Capitalize on market trends using ML-optimized entry/exit points with adaptive position sizing.",
      winRate: "58%",
      sharpe: "1.8",
      riskLevel: "Medium",
      gradient: "from-blue-500 to-indigo-600",
      icon: TrendingUp,
    },
    {
      name: "Mean Reversion Pro",
      category: "technical",
      description: "Profit from temporary price deviations with Bollinger Band and RSI confluence signals.",
      winRate: "62%",
      sharpe: "2.1",
      riskLevel: "Low",
      gradient: "from-emerald-500 to-teal-600",
      icon: Activity,
    },
    {
      name: "Cross-Exchange Arbitrage",
      category: "arbitrage",
      description: "Exploit price differences across major exchanges with sub-second execution.",
      winRate: "78%",
      sharpe: "2.8",
      riskLevel: "Very Low",
      gradient: "from-violet-500 to-purple-600",
      icon: GitBranch,
    },
    {
      name: "Neural Trend Predictor",
      category: "ml",
      description: "LSTM neural network trained on 9+ years of data for trend direction prediction.",
      winRate: "54%",
      sharpe: "1.5",
      riskLevel: "Medium-High",
      gradient: "from-orange-500 to-amber-600",
      icon: Brain,
    },
    {
      name: "Volatility Breakout",
      category: "technical",
      description: "Capture explosive moves after consolidation periods using ATR-based triggers.",
      winRate: "52%",
      sharpe: "1.4",
      riskLevel: "High",
      gradient: "from-rose-500 to-pink-600",
      icon: Zap,
    },
    {
      name: "Statistical Pairs Trading",
      category: "arbitrage",
      description: "Market-neutral strategy exploiting cointegrated cryptocurrency pairs.",
      winRate: "65%",
      sharpe: "2.3",
      riskLevel: "Low",
      gradient: "from-cyan-500 to-blue-600",
      icon: BarChart3,
    },
    {
      name: "Sentiment Analyzer",
      category: "sentiment",
      description: "NLP-based strategy analyzing social media and news sentiment for trading signals.",
      winRate: "56%",
      sharpe: "1.6",
      riskLevel: "Medium",
      gradient: "from-fuchsia-500 to-violet-600",
      icon: Target,
    },
    {
      name: "Adaptive Grid Bot",
      category: "hybrid",
      description: "Dynamic grid trading with ML-adjusted levels based on volatility regime.",
      winRate: "68%",
      sharpe: "2.5",
      riskLevel: "Medium",
      gradient: "from-lime-500 to-emerald-600",
      icon: Filter,
    },
  ];

  const filteredStrategies = activeCategory === "all"
    ? strategies
    : strategies.filter(s => s.category === activeCategory);

  const performanceMetrics = [
    { label: "Total Strategies", value: "380+", description: "Pre-built templates" },
    { label: "ML Configurations", value: "486", description: "Optimized models" },
    { label: "Avg Win Rate", value: "52-68%", description: "Across all strategies" },
    { label: "Backtesting Period", value: "9+ Years", description: "2015-2024 data" },
  ];

  const riskColors: Record<string, string> = {
    "Very Low": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    "Low": "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    "Medium": "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    "Medium-High": "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    "High": "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-6xl space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-sm">
                <Library className="h-3 w-3 text-white" />
              </span>
              380+ Automated Strategies
            </div>
            <h1 className="font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Strategy Library
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-700 dark:text-slate-300">
              Explore our comprehensive collection of ML-optimized trading strategies,
              each backtested across 9+ years of market data with verified performance metrics.
            </p>
          </div>

          {/* Performance Overview */}
          <div className="grid gap-6 md:grid-cols-4">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PremiumCard variant="glass-secondary" className="p-6 text-center">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">{metric.label}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{metric.description}</p>
                </PremiumCard>
              </motion.div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {strategyCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
              >
                {category.label}
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Strategy Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <motion.div
                  key={strategy.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PremiumCard variant="glass-secondary" className="group h-full p-6 transition-all hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <ColorIcon Icon={Icon} gradient={strategy.gradient} size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor(strategy.gradient.includes('blue') ? 'blue' : strategy.gradient.includes('emerald') ? 'emerald' : strategy.gradient.includes('violet') ? 'purple' : strategy.gradient.includes('orange') ? 'orange' : strategy.gradient.includes('rose') ? 'red' : strategy.gradient.includes('cyan') ? 'cyan' : strategy.gradient.includes('fuchsia') ? 'purple' : 'emerald')} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                            {strategy.name}
                          </h3>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${riskColors[strategy.riskLevel]}`}>
                            {strategy.riskLevel} Risk
                          </span>
                        </div>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                          {strategy.description}
                        </p>

                        {/* Performance Metrics */}
                        <div className="mt-4 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm">
                              <Percent className="h-3 w-3 text-white" />
                            </span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{strategy.winRate}</span>
                            <span className="text-slate-500">Win Rate</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                              <TrendingUp className="h-3 w-3 text-white" />
                            </span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{strategy.sharpe}</span>
                            <span className="text-slate-500">Sharpe</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <button className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            View Details <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>

          {/* Strategy Categories Detail */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Strategy Categories</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Technical Analysis",
                  count: "15 Templates",
                  description: "Classic TA strategies including MACD, RSI, Bollinger Bands, and custom indicator combinations.",
                  icon: BarChart3,
                  gradient: "from-blue-500 to-indigo-600",
                },
                {
                  title: "ML-Driven Models",
                  count: "486 Configurations",
                  description: "LSTM, Random Forest, and ensemble models trained on 9+ years of historical data.",
                  icon: Brain,
                  gradient: "from-violet-500 to-purple-600",
                },
                {
                  title: "Arbitrage Strategies",
                  count: "3 Templates",
                  description: "Cross-exchange, triangular, and statistical arbitrage with sub-second execution.",
                  icon: GitBranch,
                  gradient: "from-emerald-500 to-teal-600",
                },
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PremiumCard variant="glass-secondary" className="h-full p-6">
                      <div className="mb-4">
                        <ColorIcon Icon={Icon} gradient={category.gradient} size="h-12 w-12" iconClass="h-6 w-6" shadowColor={accentToShadowColor(category.gradient.includes('blue') ? 'blue' : category.gradient.includes('violet') ? 'purple' : 'emerald')} />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{category.title}</h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{category.count}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Risk Disclaimer */}
          <PremiumCard variant="glass-primary" className="p-6">
            <div className="flex items-start gap-4">
              <ColorIcon Icon={Shield} gradient="from-amber-500 to-orange-500" size="h-10 w-10" iconClass="h-5 w-5" shadowColor={accentToShadowColor('orange')} />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Important Risk Information</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Past performance does not guarantee future results. All trading strategies involve risk, and you may lose some or all of your invested capital.
                  The win rates and Sharpe ratios shown are based on backtesting from 2015-2024 and may not reflect future performance.
                  Always use proper position sizing and risk management.
                </p>
              </div>
            </div>
          </PremiumCard>

          {/* CTA */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/20">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              📚 <strong>Full Strategy Documentation Coming Soon:</strong> Detailed strategy parameters, backtesting results, and recommended configurations.
              <Link href="/contact" className="ml-1 font-semibold underline hover:no-underline">
                Contact us
              </Link>{" "}
              for early access to our complete strategy documentation.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
