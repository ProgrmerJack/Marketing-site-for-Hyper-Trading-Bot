'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaCheck,
  FaSpinner,
  FaClock,
  FaRocket,
  FaBrain,
  FaMobile,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaExchangeAlt,
  FaCloud,
  FaLock,
  FaBell,
  FaGlobe,
  FaCogs,
  FaDatabase,
  FaArrowRight,
} from 'react-icons/fa';

const phases = [
  {
    id: 'phase-1',
    title: 'Phase 1: Foundation',
    subtitle: 'Core Infrastructure & MVP',
    status: 'completed' as const,
    timeline: 'Q1 2024 - Q2 2024',
    description:
      'Establishing the foundational technology stack, core trading algorithms, and essential infrastructure for the platform.',
    milestones: [
      {
        title: 'Core Trading Engine',
        description:
          'High-performance order execution engine with sub-millisecond latency',
        status: 'completed' as const,
        icon: FaRocket,
      },
      {
        title: 'AI Pattern Recognition',
        description:
          'Machine learning models for market pattern detection and analysis',
        status: 'completed' as const,
        icon: FaBrain,
      },
      {
        title: 'Exchange Integrations',
        description:
          'Binance, Coinbase Pro, and Kraken API integrations with unified interface',
        status: 'completed' as const,
        icon: FaExchangeAlt,
      },
      {
        title: 'Security Framework',
        description:
          'Enterprise-grade encryption, secure key storage, and audit logging',
        status: 'completed' as const,
        icon: FaShieldAlt,
      },
      {
        title: 'Backtesting Engine',
        description:
          'Historical data analysis with tick-by-tick precision and strategy validation',
        status: 'completed' as const,
        icon: FaChartLine,
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Enhancement',
    subtitle: 'Advanced Features & Optimization',
    status: 'in-progress' as const,
    timeline: 'Q3 2024 - Q4 2024',
    description:
      'Building advanced trading capabilities, optimizing performance, and expanding market coverage.',
    milestones: [
      {
        title: 'Advanced Strategy Builder',
        description:
          'Visual no-code strategy builder with drag-and-drop interface',
        status: 'completed' as const,
        icon: FaCogs,
      },
      {
        title: 'Portfolio Management',
        description:
          'Multi-asset portfolio tracking, rebalancing, and risk management tools',
        status: 'completed' as const,
        icon: FaDatabase,
      },
      {
        title: 'Real-time Alerts',
        description:
          'Customizable alert system with multiple notification channels',
        status: 'in-progress' as const,
        icon: FaBell,
      },
      {
        title: 'Mobile Application',
        description:
          'Native iOS and Android apps for monitoring and quick actions',
        status: 'in-progress' as const,
        icon: FaMobile,
      },
      {
        title: 'Additional Exchanges',
        description:
          'FTX, KuCoin, Bybit, and OKX integrations for broader market access',
        status: 'planned' as const,
        icon: FaGlobe,
      },
    ],
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Scale',
    subtitle: 'Enterprise & Institutional Features',
    status: 'planned' as const,
    timeline: 'Q1 2025 - Q2 2025',
    description:
      'Scaling the platform for institutional clients with advanced features and compliance tools.',
    milestones: [
      {
        title: 'Institutional Dashboard',
        description:
          'Multi-account management, team permissions, and audit trails',
        status: 'planned' as const,
        icon: FaUsers,
      },
      {
        title: 'Cloud Infrastructure',
        description:
          'Distributed cloud deployment for 99.99% uptime and global low-latency',
        status: 'planned' as const,
        icon: FaCloud,
      },
      {
        title: 'API v2.0',
        description:
          'Enhanced REST and WebSocket APIs with rate limiting and webhooks',
        status: 'planned' as const,
        icon: FaDatabase,
      },
      {
        title: 'Compliance Suite',
        description:
          'Tax reporting, transaction exports, and regulatory compliance tools',
        status: 'planned' as const,
        icon: FaLock,
      },
      {
        title: 'Social Trading',
        description:
          'Copy trading, strategy marketplace, and community leaderboards',
        status: 'planned' as const,
        icon: FaUsers,
      },
    ],
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Innovation',
    subtitle: 'Next-Generation Capabilities',
    status: 'planned' as const,
    timeline: 'Q3 2025 and Beyond',
    description:
      'Pioneering new frontiers in automated trading with cutting-edge AI and blockchain technologies.',
    milestones: [
      {
        title: 'GPT-4 Integration',
        description:
          'Natural language strategy creation and market sentiment analysis',
        status: 'planned' as const,
        icon: FaBrain,
      },
      {
        title: 'DeFi Integration',
        description:
          'Decentralized exchange support, yield farming, and liquidity provision',
        status: 'planned' as const,
        icon: FaExchangeAlt,
      },
      {
        title: 'Predictive Analytics',
        description:
          'Advanced ML models for price prediction and market regime detection',
        status: 'planned' as const,
        icon: FaChartLine,
      },
      {
        title: 'Cross-Chain Support',
        description:
          'Multi-blockchain asset management and cross-chain arbitrage',
        status: 'planned' as const,
        icon: FaGlobe,
      },
      {
        title: 'Quantum-Ready Security',
        description:
          'Post-quantum cryptography implementation for future-proof security',
        status: 'planned' as const,
        icon: FaShieldAlt,
      },
    ],
  },
];

const recentUpdates = [
  {
    date: 'November 2024',
    title: 'WebSocket API Beta Launch',
    description:
      'Real-time market data streaming now available for all premium users.',
  },
  {
    date: 'October 2024',
    title: 'Strategy Marketplace Preview',
    description:
      'Beta access to community-created strategies with performance metrics.',
  },
  {
    date: 'September 2024',
    title: 'Enhanced Backtesting',
    description:
      'Monte Carlo simulations and walk-forward optimization now available.',
  },
  {
    date: 'August 2024',
    title: 'Portfolio Rebalancing',
    description:
      'Automated portfolio rebalancing with customizable thresholds and schedules.',
  },
];

const StatusBadge = ({ status }: { status: 'completed' | 'in-progress' | 'planned' }) => {
  const styles = {
    completed: {
      bg: 'bg-emerald-100 dark:bg-emerald-500/20',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      icon: FaCheck,
      label: 'Completed',
    },
    'in-progress': {
      bg: 'bg-amber-100 dark:bg-amber-500/20',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-500/30',
      icon: FaSpinner,
      label: 'In Progress',
    },
    planned: {
      bg: 'bg-slate-100 dark:bg-slate-500/20',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-500/30',
      icon: FaClock,
      label: 'Planned',
    },
  };

  const style = styles[status];
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text} border ${style.border}`}
    >
      <Icon className={status === 'in-progress' ? 'animate-spin' : ''} />
      {style.label}
    </span>
  );
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent dark:from-cyan-500/10" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/5" />
          <div className="absolute -right-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/5" />
        </div>

        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-700 dark:text-cyan-400">
              <FaRocket className="text-xs" />
              Product Roadmap
            </span>

            <h1 className="mt-6 bg-gradient-to-r from-slate-900 via-cyan-600 to-cyan-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-cyan-200 dark:to-cyan-400 sm:text-5xl lg:text-6xl">
              Building the Future of
              <br />
              Automated Trading
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Explore our development roadmap and see what&apos;s coming next.
              We&apos;re committed to continuous innovation and delivering
              cutting-edge trading technology.
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">12</div>
              <div className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                Features Completed
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">3</div>
              <div className="text-sm text-amber-700/70 dark:text-amber-300/70">In Development</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-500/30 dark:bg-slate-500/10">
              <div className="text-3xl font-bold text-slate-600 dark:text-slate-400">10</div>
              <div className="text-sm text-slate-500/70 dark:text-slate-300/70">Planned Features</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-16">
            {phases.map((phase, phaseIndex) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: phaseIndex * 0.1 }}
                className="relative"
              >
                {/* Phase Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {phase.title}
                      </h2>
                      <StatusBadge status={phase.status} />
                    </div>
                    <p className="mt-1 text-cyan-600 dark:text-cyan-400">{phase.subtitle}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {phase.timeline}
                    </p>
                  </div>
                </div>

                <p className="mb-6 max-w-3xl text-slate-600 dark:text-slate-400">
                  {phase.description}
                </p>

                {/* Milestones Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {phase.milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return (
                      <motion.div
                        key={milestone.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`group relative rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] ${milestone.status === 'completed'
                            ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-300 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:hover:border-emerald-500/50'
                            : milestone.status === 'in-progress'
                              ? 'border-amber-200 bg-amber-50 hover:border-amber-300 dark:border-amber-500/30 dark:bg-amber-500/5 dark:hover:border-amber-500/50'
                              : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${milestone.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                                : milestone.status === 'in-progress'
                                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                                  : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                              }`}
                          >
                            <Icon className="text-lg" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {milestone.title}
                              </h3>
                              {milestone.status === 'completed' && (
                                <FaCheck className="text-xs text-emerald-500 dark:text-emerald-400" />
                              )}
                            </div>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Connector line */}
                {phaseIndex < phases.length - 1 && (
                  <div className="absolute -bottom-8 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-700" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates Section */}
      <section className="border-t border-slate-200 dark:border-slate-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Recent Updates</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Stay up to date with our latest releases and improvements
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentUpdates.map((update, index) => (
              <motion.div
                key={update.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-cyan-500/30 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                  {update.date}
                </div>
                <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{update.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {update.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-slate-100 to-purple-500/10 p-8 text-center dark:via-slate-800/50 sm:p-12"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Want to Shape Our Roadmap?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
                Join our beta program and help us prioritize features. Your
                feedback directly influences our development decisions.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-3 font-semibold text-slate-900 transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Join Beta Program
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-colors hover:border-cyan-500/50 dark:border-slate-600 dark:bg-slate-800/50 dark:text-white"
                >
                  Request a Feature
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-slate-200 dark:border-slate-800 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs text-slate-500">
            <strong>Disclaimer:</strong> This roadmap represents our current
            development plans and is subject to change. Features and timelines
            may be modified based on user feedback, market conditions, and
            technical requirements. No guarantees are made regarding specific
            release dates or feature availability.
          </p>
        </div>
      </section>
    </div>
  );
}
