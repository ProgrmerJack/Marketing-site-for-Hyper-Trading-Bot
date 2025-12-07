"use client";

import Link from "next/link";
import { ArrowRight, Mail, MessageSquare, HelpCircle, Clock, Users, FileText, ChevronDown, ChevronUp, Phone, Shield, Zap } from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { Container } from "@hyper/ui";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { useState } from "react";
import type { Route } from "next";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            {item.category}
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">{item.question}</span>
        </div>
        {isOpen ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
            <ChevronUp className="h-3 w-3 text-white" />
          </span>
        ) : (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-400 to-slate-500 shadow-sm">
            <ChevronDown className="h-3 w-3 text-white" />
          </span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-slate-200 bg-slate-50 p-5 text-slate-600 dark:border-slate-700 dark:bg-slate-800/30 dark:text-slate-300">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Reach out to our support team with detailed questions. Best for complex technical inquiries.",
      link: "/contact" as Route,
      action: "Contact Us",
      gradient: "from-blue-500 to-indigo-600",
      responseTime: "< 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get quick answers from our team during business hours (9 AM - 6 PM EST).",
      link: "#" as Route,
      action: "Coming Soon",
      gradient: "from-emerald-500 to-teal-600",
      responseTime: "< 5 minutes",
      disabled: true,
    },
    {
      icon: HelpCircle,
      title: "Documentation",
      description: "Find answers to common questions in our comprehensive documentation.",
      link: "/docs" as Route,
      action: "View Docs",
      gradient: "from-violet-500 to-purple-600",
      responseTime: "Instant",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other traders and get peer support from our active community.",
      link: "/community" as Route,
      action: "Join Community",
      gradient: "from-orange-500 to-amber-600",
      responseTime: "< 2 hours",
    },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How do I get started with Hyper Trading Automation?",
      answer: "Getting started is easy! Sign up for an account, complete the onboarding process, and connect your preferred exchange API. Our platform supports major exchanges including Binance, Coinbase, and Kraken. You can start with our demo mode to practice without risking real funds.",
      category: "Getting Started",
    },
    {
      question: "What trading strategies are available?",
      answer: "Hyper Trading offers 380+ pre-built strategies across multiple categories: Technical Analysis (15 templates), ML-Driven models (2 templates with 486 optimized configurations), Statistical Arbitrage (3 templates), and more. Each strategy has been backtested across 9+ years of historical data.",
      category: "Strategies",
    },
    {
      question: "How secure is my data and API keys?",
      answer: "Security is our top priority. All API keys are encrypted using AES-256 encryption and stored in secure, isolated environments. We never have withdrawal access to your exchange accounts. Our platform uses read-only and trade-only API permissions, ensuring your funds remain under your control.",
      category: "Security",
    },
    {
      question: "What are the expected returns?",
      answer: "Based on our research paper covering 2015-2024 data, our ML-optimized strategies achieved 52-68% win rates with Sharpe ratios between 1.2 and 2.8. However, past performance doesn't guarantee future results. Cryptocurrency markets are volatile, and all trading involves risk.",
      category: "Performance",
    },
    {
      question: "Can I customize or create my own strategies?",
      answer: "Yes! While we offer 380+ pre-built strategies, Pro and Enterprise users can create custom strategies using our visual strategy builder or Python SDK. You can combine technical indicators, set custom parameters, and backtest your strategies before deploying them.",
      category: "Customization",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency payments (BTC, ETH, USDC). All subscription payments are processed securely through Stripe with PCI DSS compliance.",
      category: "Billing",
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page and enter your registered email address. You'll receive a password reset link within minutes. For security, reset links expire after 24 hours. If you have 2FA enabled, you'll need your recovery codes.",
      category: "Account",
    },
    {
      question: "Can I export my trading data?",
      answer: "Absolutely! Navigate to Settings > Data Export to download your complete trading history, performance metrics, and strategy reports in CSV, JSON, or PDF formats. Pro users get access to advanced analytics exports and API access for custom integrations.",
      category: "Data",
    },
    {
      question: "What happens if the platform goes down?",
      answer: "Our platform has 99.9% uptime with redundant infrastructure across multiple cloud regions. If our servers become unavailable, all active positions are protected by exchange-level stop losses. We also send immediate notifications so you can take manual control if needed.",
      category: "Reliability",
    },
    {
      question: "How can I cancel my subscription?",
      answer: "You can cancel anytime from Settings > Billing > Manage Subscription. Your access continues until the end of your billing period. We offer prorated refunds for annual plans cancelled within 14 days. Enterprise customers should contact their account manager.",
      category: "Billing",
    },
  ];

  const supportStats = [
    { label: "Average Response Time", value: "< 4 hours", icon: Clock },
    { label: "Customer Satisfaction", value: "98%", icon: Users },
    { label: "Support Articles", value: "200+", icon: FileText },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-5xl space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm">
                <HelpCircle className="h-3 w-3 text-white" />
              </span>
              24/7 Support Available
            </div>
            <h1 className="font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              How Can We Help?
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-700 dark:text-slate-300">
              Our dedicated support team is here to ensure your trading automation runs smoothly. Choose your preferred way to get help.
            </p>
          </div>

          {/* Support Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            {supportStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PremiumCard variant="glass-secondary" className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <ColorIcon Icon={Icon} gradient="from-blue-500 to-indigo-600" size="h-12 w-12" iconClass="h-6 w-6" shadowColor={accentToShadowColor('blue')} />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>

          {/* Support Channels */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Options</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.div
                    key={channel.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PremiumCard
                      variant="glass-secondary"
                      className={`group relative h-full p-6 transition-all ${channel.disabled ? "opacity-60" : "hover:shadow-xl"
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <ColorIcon Icon={Icon} gradient={channel.gradient} size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor(channel.gradient.includes('blue') ? 'blue' : channel.gradient.includes('emerald') ? 'emerald' : channel.gradient.includes('violet') ? 'purple' : 'orange')} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                              {channel.title}
                            </h3>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {channel.responseTime}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            {channel.description}
                          </p>
                          <div className="mt-4">
                            {!channel.disabled ? (
                              <Link
                                href={channel.link}
                                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              >
                                {channel.action} <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                              </Link>
                            ) : (
                              <span className="inline-flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                                {channel.action}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <PremiumCard variant="glass-primary" className="p-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <ColorIcon Icon={Shield} gradient="from-blue-500 to-cyan-500" size="h-10 w-10" iconClass="h-5 w-5" shadowColor={accentToShadowColor('blue')} />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Security Issues</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Report security concerns directly to{" "}
                    <a href="mailto:security@hypertrader.com" className="text-blue-600 hover:underline dark:text-blue-400">
                      security@hypertrader.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ColorIcon Icon={Zap} gradient="from-emerald-500 to-teal-500" size="h-10 w-10" iconClass="h-5 w-5" shadowColor={accentToShadowColor('emerald')} />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Urgent Trading Issues</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    For urgent bot issues, email{" "}
                    <a href="mailto:urgent@hypertrader.com" className="text-blue-600 hover:underline dark:text-blue-400">
                      urgent@hypertrader.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ColorIcon Icon={Phone} gradient="from-violet-500 to-purple-500" size="h-10 w-10" iconClass="h-5 w-5" shadowColor={accentToShadowColor('purple')} />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Enterprise Support</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Enterprise clients get dedicated phone support. Contact your account manager.
                  </p>
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* FAQ Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
              <Link
                href="/docs"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all docs →
              </Link>
            </div>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <FAQAccordion
                  key={index}
                  item={item}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>

          {/* Response Time Notice */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/20">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                <Clock className="h-5 w-5 text-white" />
              </span>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Support Hours & Response Times</h3>
                <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">
                  Our support team is available Monday–Friday, 9 AM–6 PM EST for live assistance. Email support is monitored 24/7 with typical response times under 4 hours.
                  Enterprise customers receive priority support with guaranteed 1-hour response times during business hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
