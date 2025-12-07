"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Zap, Shield, Activity, FileText, Code2, Terminal, Settings, Users, AlertTriangle, Clock, Lightbulb, GraduationCap, Cpu, BarChart3, Lock, Layers, CheckCircle2, Info } from "lucide-react";
import { Container } from "@hyper/ui";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import type { Route } from "next";

const docSections = [
  {
    title: "Platform Overview",
    description: "Understand our multi-model architecture, data pipelines, and how 63 specialized models work together for institutional-grade trading.",
    icon: Layers,
    href: "/how-it-works" as Route,
    gradient: "from-blue-500 to-cyan-500",
    status: "available",
    items: ["Multi-Model Architecture", "Data Ingestion Pipeline", "Signal Generation", "Execution Engine", "Real-Time Monitoring"],
  },
  {
    title: "Getting Started Guide",
    description: "Step-by-step guide to understanding our platform capabilities, strategy concepts, and preparation for when live trading launches.",
    icon: GraduationCap,
    href: "/how-it-works" as Route,
    gradient: "from-emerald-500 to-teal-500",
    status: "available",
    items: ["Platform Concepts", "Strategy Fundamentals", "Risk Management Basics", "Demo Environment", "Pre-Launch Preparation"],
  },
  {
    title: "Strategy Development",
    description: "Learn about our 63 core strategy templates, backtesting framework, and how machine learning models adapt to market conditions.",
    icon: Activity,
    href: "/strategies" as Route,
    gradient: "from-purple-500 to-pink-500",
    status: "available",
    items: ["63 Strategy Templates", "Backtesting Methodology", "ML Model Integration", "Signal Validation", "Performance Metrics"],
  },
  {
    title: "Risk Management",
    description: "Comprehensive guide to Kelly Criterion sizing, leverage controls, circuit breakers, and capital preservation techniques.",
    icon: Shield,
    href: "/safety" as Route,
    gradient: "from-orange-500 to-red-500",
    status: "available",
    items: ["Position Sizing (Kelly)", "VaR & CVaR Limits", "Drawdown Controls", "Kill Switches", "Capital Allocation"],
  },
  {
    title: "System Architecture",
    description: "Deep dive into our Model Factory, Strategy Expander, WebSocket infrastructure, and how we achieve sub-second execution.",
    icon: Cpu,
    href: "/how-it-works" as Route,
    gradient: "from-indigo-500 to-violet-500",
    status: "available",
    items: ["Model Factory", "Strategy Expander", "Execution Layer", "Data Infrastructure", "Monitoring Stack"],
  },
  {
    title: "Performance & Analytics",
    description: "Understanding our performance metrics, real-time dashboards, Sharpe ratio calculations, and reporting capabilities.",
    icon: BarChart3,
    href: "/changelog" as Route,
    gradient: "from-cyan-500 to-blue-500",
    status: "available",
    items: ["Key Metrics Explained", "Dashboard Navigation", "Sharpe & Sortino Ratios", "Drawdown Analysis", "Report Generation"],
  },
  {
    title: "API Reference",
    description: "Complete REST API documentation with authentication, endpoints, WebSocket streams, and code examples. Coming with platform launch.",
    icon: Code2,
    href: "/docs/api" as Route,
    gradient: "from-slate-500 to-gray-500",
    status: "coming-soon",
    items: ["Authentication (OAuth 2.0)", "REST Endpoints", "WebSocket Streams", "Rate Limits", "SDKs & Libraries"],
  },
  {
    title: "CLI & Developer Tools",
    description: "Command-line interface for advanced automation, custom integrations, and programmatic strategy management.",
    icon: Terminal,
    href: "/docs/api" as Route,
    gradient: "from-slate-500 to-gray-500",
    status: "coming-soon",
    items: ["CLI Installation", "Configuration", "Command Reference", "Automation Scripts", "CI/CD Integration"],
  },
];

const upcomingFeatures = [
  {
    title: "Interactive API Playground",
    description: "Test API endpoints directly in your browser with our interactive documentation and live response previews.",
    icon: Code2,
    gradient: "from-purple-500 to-pink-500",
    eta: "With Platform Launch",
  },
  {
    title: "Video Tutorials",
    description: "Comprehensive video series covering platform setup, strategy development, risk management, and advanced techniques.",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-500",
    eta: "Q1 2025",
  },
  {
    title: "Strategy Builder GUI",
    description: "Visual strategy creation tool with drag-and-drop components, no coding required for basic strategies.",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
    eta: "Post-Launch",
  },
  {
    title: "Community Forum",
    description: "Join discussions with other traders, share strategies, and get support from our community and team.",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
    eta: "Post-Launch",
  },
];

const faqItems = [
  {
    question: "When will the API be available?",
    answer: "The API will be available when the platform launches for live trading. We're currently in the analysis and development phase. Join our waitlist to be notified of launch dates.",
  },
  {
    question: "Can I test strategies before the API is live?",
    answer: "Yes! Our demo environment allows you to explore strategy concepts and understand our approach. Request demo access via the contact form to get early insights into our methodology.",
  },
  {
    question: "What programming languages will the SDK support?",
    answer: "At launch, we'll provide official SDKs for Python and JavaScript/TypeScript. Community SDKs for other languages will be welcomed and supported.",
  },
  {
    question: "Will there be WebSocket support for real-time data?",
    answer: "Yes, WebSocket streams will be available for real-time market data, order updates, and portfolio changes. Full documentation will be released with the API.",
  },
  {
    question: "Is there a sandbox environment for testing?",
    answer: "A sandbox environment for API testing will be available before the live trading launch, allowing you to integrate and test without risking real capital.",
  },
];

export default function DocsPage() {
  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="default" intensity={0.4} />

      <PageHeaderAnimated
        eyebrow="Documentation"
        title="Comprehensive Guides & Documentation"
        description="Learn about our multi-model trading platform, strategy development, risk management, and prepare for when the API launches. Note: API access is not yet available — we're in the analysis and development phase."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(59,130,246,1)", "rgba(147,51,234,1)"]}
      >
        <motion.div 
          className="hidden lg:block relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PremiumCard variant="glass-primary" accent="cyan" className="w-96 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-bold text-white">Platform Overview</div>
            </div>
            <p className="text-xs text-slate-300">Explore our multi-model architecture and understand how 63 specialized models work together.</p>
            <Link href="/how-it-works" className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/20 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/30">
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* API Not Available Notice */}
      <section className="relative isolate py-8 md:py-12">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-amber-50/80 to-orange-50/60 p-8 backdrop-blur-sm dark:border-amber-700 dark:from-amber-950/50 dark:via-amber-950/30 dark:to-orange-950/30">
              <div className="flex items-start gap-4">
                <ColorIcon Icon={AlertTriangle} gradient="from-amber-500 to-orange-500" size="h-12 w-12" iconClass="h-6 w-6" shadowColor={accentToShadowColor('orange')} />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">API & Live Trading Not Yet Available</h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                    Hyper Trading Automation is currently in the <strong>analysis and development phase</strong>. The API, SDK, and live trading capabilities are not yet available. 
                    This documentation provides conceptual information about our platform architecture, strategy methodology, and risk management approach to help you prepare for launch.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 transition-all hover:bg-amber-200 dark:border-amber-600 dark:bg-amber-900/50 dark:text-amber-100 dark:hover:bg-amber-800/50">
                      <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                        <Clock className="h-3 w-3 text-white" />
                      </span>
                      Join Waitlist
                    </Link>
                    <Link href="/how-it-works" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-700/50">
                      <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                        <Layers className="h-3 w-3 text-white" />
                      </span>
                      Explore Architecture
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Available Documentation */}
      <section className="relative isolate overflow-hidden py-16 md:py-24">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <ColorIcon Icon={CheckCircle2} gradient="from-emerald-500 to-teal-500" size="h-5 w-5" shadowColor={accentToShadowColor('emerald')} wrapperClass="rounded-lg" />
                Available Now
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Documentation & Guides
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Explore our platform concepts, strategy methodology, and risk management framework. These resources help you understand our approach before the platform launches.
              </p>
            </motion.div>

            {/* Available Documentation Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {docSections.filter(s => s.status === 'available').map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={section.href}>
                      <PremiumCard
                        variant="glass-secondary"
                        accent={section.gradient.includes("blue") || section.gradient.includes("cyan") ? "cyan" : section.gradient.includes("purple") || section.gradient.includes("pink") ? "purple" : section.gradient.includes("emerald") || section.gradient.includes("teal") ? "emerald" : "orange"}
                        shadowColor={accentToShadowColor(section.gradient.includes("blue") || section.gradient.includes("cyan") ? "cyan" : section.gradient.includes("purple") || section.gradient.includes("pink") ? "purple" : section.gradient.includes("emerald") || section.gradient.includes("teal") ? "emerald" : "orange")}
                        hover={true}
                        className="h-full p-8 group"
                      >
                        <ColorIcon Icon={Icon} gradient={section.gradient} size="h-14 w-14" shadowColor={accentToShadowColor(section.gradient.includes("blue") || section.gradient.includes("cyan") ? "cyan" : section.gradient.includes("purple") || section.gradient.includes("pink") ? "purple" : section.gradient.includes("emerald") || section.gradient.includes("teal") ? "emerald" : "orange")} wrapperClass="mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{section.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{section.description}</p>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                              <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </PremiumCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Coming Soon Documentation */}
      <section className="relative isolate overflow-hidden py-16 md:py-24">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                <ColorIcon Icon={Clock} gradient="from-slate-500 to-gray-500" size="h-5 w-5" shadowColor={accentToShadowColor('slate')} wrapperClass="rounded-lg" />
                Coming With Platform Launch
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                API & Developer Tools
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                These resources will be available when the platform launches for live trading. Join the waitlist to be notified.
              </p>
            </motion.div>

            {/* Coming Soon Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {docSections.filter(s => s.status === 'coming-soon').map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SpotlightCard
                      className="h-full rounded-3xl border border-slate-200 bg-slate-50/50 p-8 opacity-75 dark:border-slate-700 dark:bg-slate-800/30"
                      spotlightColor="rgba(100, 116, 139, 0.1)"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <ColorIcon Icon={Icon} gradient={section.gradient} size="h-14 w-14" shadowColor={accentToShadowColor('slate')} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">{section.title}</h3>
                            <span className="inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                              Coming Soon
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-500">{section.description}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming Features */}
      <section className="relative isolate overflow-hidden py-16 md:py-24">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <ColorIcon Icon={Lightbulb} gradient="from-blue-500 to-cyan-500" size="h-5 w-5" shadowColor={accentToShadowColor('blue')} wrapperClass="rounded-lg" />
                Roadmap
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Upcoming Features
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                We&apos;re actively building these features to enhance your trading experience.
              </p>
            </motion.div>

            {/* Upcoming Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {upcomingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SpotlightCard
                      className="h-full rounded-3xl border border-blue-200/50 bg-gradient-to-br from-white/80 via-blue-50/30 to-cyan-50/20 p-6 shadow-lg backdrop-blur-md dark:border-blue-800/50 dark:from-slate-900/80 dark:via-blue-950/30 dark:to-cyan-950/20"
                      spotlightColor="rgba(59, 130, 246, 0.15)"
                    >
                      <ColorIcon Icon={Icon} gradient={feature.gradient} size="h-12 w-12" iconClass="h-6 w-6" shadowColor={accentToShadowColor(feature.gradient.includes('blue') ? 'blue' : feature.gradient.includes('emerald') ? 'emerald' : feature.gradient.includes('purple') ? 'purple' : 'orange')} wrapperClass="mb-4" />
                      <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                      <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        <span className="mr-1.5 flex h-4 w-4 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500">
                          <Clock className="h-2.5 w-2.5 text-white" />
                        </span>
                        {feature.eta}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="relative isolate overflow-hidden py-16 md:py-24">
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                <ColorIcon Icon={Info} gradient="from-purple-500 to-pink-500" size="h-5 w-5" shadowColor={accentToShadowColor('purple')} wrapperClass="rounded-lg" />
                FAQ
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Frequently Asked Questions
              </h2>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <SpotlightCard
                    className="rounded-2xl border border-slate-200 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50"
                    spotlightColor="rgba(147, 51, 234, 0.1)"
                  >
                    <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">{item.question}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="relative isolate overflow-hidden py-16 md:py-24">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-4"
            >
              {[
                { label: "Changelog", href: "/changelog" as Route, icon: FileText, description: "Latest updates" },
                { label: "Status", href: "/status" as Route, icon: Activity, description: "System status" },
                { label: "Safety", href: "/safety" as Route, icon: Shield, description: "Risk controls" },
                { label: "Contact", href: "/contact" as Route, icon: Users, description: "Get in touch" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 p-4 backdrop-blur-sm transition-all hover:border-blue-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50"
                >
                  <ColorIcon Icon={link.icon} gradient="from-blue-500 to-cyan-500" size="h-10 w-10" iconClass="h-5 w-5" shadowColor={accentToShadowColor('blue')} />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">{link.label}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{link.description}</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-blue-50/80 to-cyan-50/60 p-8 text-center backdrop-blur-sm dark:border-blue-800 dark:from-blue-950/50 dark:via-blue-950/30 dark:to-cyan-950/30">
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Have Questions?</h3>
                <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                  Our team is here to help you understand our platform and prepare for launch.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
                  Contact Support <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
