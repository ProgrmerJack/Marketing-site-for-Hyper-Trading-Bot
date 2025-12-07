"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";

import { CheckCircle2, AlertCircle, Activity, Zap, Shield } from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
import { NetworkNodeHero } from "@/components/hero/NetworkNodeHero";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { PageAccent } from "@/styles/design-tokens";

const statusItems = [
  {
    service: "API / SSE Demo Stream",
    status: "Operational",
    uptime: "99.98%",
    note: "Heartbeat healthy · auto reconnect active",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    accent: "cyan",
  },
  {
    service: "Chart rendering",
    status: "Operational",
    uptime: "100%",
    note: "No incidents reported",
    icon: Activity,
    gradient: "from-cyan-500 to-sky-500",
    accent: "blue",
  },
  {
    service: "Consent & privacy services",
    status: "Operational",
    uptime: "100%",
    note: "Last audit Oct 12 2025",
    icon: Shield,
    gradient: "from-indigo-500 to-blue-500",
    accent: "blue",
  },
  {
    service: "Order Execution Engine",
    status: "Operational",
    uptime: "99.99%",
    note: "Latency < 5ms",
    icon: Zap,
    gradient: "from-emerald-500 to-green-500",
    accent: "emerald",
  },
  {
    service: "Risk Management System",
    status: "Operational",
    uptime: "100%",
    note: "All checks passing",
    icon: Shield,
    gradient: "from-red-500 to-orange-500",
    accent: "orange",
  },
  {
    service: "Market Data Feed",
    status: "Operational",
    uptime: "99.95%",
    note: "Connected to 12 venues",
    icon: Activity,
    gradient: "from-blue-500 to-indigo-500",
    accent: "blue",
  },
];

const incidents = [
  {
    date: "2025-10-05",
    title: "Demo stream pause",
    summary:
      "Latency spike triggered auto-pause for 12 minutes. Root cause traced to upstream venue replay. Added jitter buffer and status banner.",
    status: "Resolved",
  },
];

export default function StatusPage() {
  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="status" intensity={0.5} />

      <PageHeaderAnimated
        eyebrow="Status"
        title="Realtime transparency: uptime, latency, and incident history"
        description="If something degrades, we surface it here – not buried in release notes. Demo infrastructure and compliance services are monitored 24/7."
        backgroundVariant="liquid"
        backgroundOpacity={0.8}
        backgroundColors={["rgba(16,185,129,1)", "rgba(34,197,94,1)", "rgba(6,182,212,1)"]}
      >
        <motion.div className="hidden lg:block" initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <PremiumCard variant="glass-primary" accent="blue" className="w-96 p-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Service status</div>
            <div className="mb-3 text-lg font-bold text-slate-900 dark:text-white">API / SSE Stream Operational</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">Our demo stream is online and updates in real-time. See recent incident details below.</p>
            <div className="mt-4">
              <motion.a href="/status" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/50" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Subscribe for updates
              </motion.a>
            </div>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* What We Monitor Section - Extended Content */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-b border-blue-200/50 dark:border-blue-900/50">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                  <Activity className="h-3 w-3 text-white" />
                </div>
                Monitoring infrastructure
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                What we monitor 24/7
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Over 200 health checks running continuously to detect degradation before it impacts you.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "API latency",
                  description: "P50, P95, P99 latencies tracked per endpoint. Alerts fire if any percentile exceeds SLO thresholds.",
                  gradient: "from-yellow-500 to-orange-500",
                  metric: "< 150ms P95",
                  accent: "orange",
                },
                {
                  icon: Activity,
                  title: "Error rates",
                  description: "5xx, 4xx, and client-side error rates monitored with automatic spike detection and correlation analysis.",
                  gradient: "from-red-500 to-pink-500",
                  metric: "< 0.1% errors",
                  accent: "rose",
                },
                {
                  icon: Shield,
                  title: "Security events",
                  description: "Rate limiting violations, authentication failures, and CSP violations logged with IP-level analysis.",
                  gradient: "from-indigo-500 to-purple-500",
                  metric: "Real-time alerts",
                  accent: "purple",
                },
                {
                  icon: CheckCircle2,
                  title: "Uptime checks",
                  description: "Multi-region synthetic monitoring with automatic failover and degradation notifications.",
                  gradient: "from-emerald-500 to-teal-500",
                  metric: "99.98% uptime",
                  accent: "emerald",
                },
                {
                  icon: Activity, // Reusing Activity for Database
                  title: "Database health",
                  description: "Replication lag, connection pool status, and query performance metrics tracked continuously.",
                  gradient: "from-cyan-500 to-blue-500",
                  metric: "< 10ms lag",
                  accent: "cyan",
                },
                {
                  icon: Zap, // Reusing Zap for Cache
                  title: "Cache efficiency",
                  description: "Redis cluster hit rates and eviction metrics monitored to ensure sub-millisecond data access.",
                  gradient: "from-violet-500 to-fuchsia-500",
                  metric: "> 95% hit rate",
                  accent: "purple",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                // Map accent string to PageAccent type safely
                const accentColor = (item.accent === "rose" ? "purple" : item.accent) as PageAccent;

                const shadowFromAccent = (accent: string) => accentToShadowColor(accent);

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
                      accent={accentColor}
                      shadowColor={shadowFromAccent(item.accent)}
                      hover={true}
                      className="h-full p-8"
                    >
                      <div className="relative space-y-4">
                        <ColorIcon Icon={Icon} gradient={item.gradient} size="h-14 w-14" shadowColor={shadowFromAccent(item.accent)} />

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
                          {item.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {item.description}
                        </p>

                        <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/50 px-4 py-2 dark:border-emerald-700/70 dark:bg-emerald-900/30">
                          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            {item.metric}
                          </p>
                        </div>
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Services Overview Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Unified2DBackground variant="status" intensity={0.5} />

        {/* NetworkNodeHero - 3D Network Visualization */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 dark:opacity-15 pointer-events-none hidden xl:block">
          <div className="w-[500px] h-[500px]">
            <NetworkNodeHero />
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
            initial={false}
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={revealUp} initial={false} whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                Services overview
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                Current snapshot
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Automated monitors publish updates in under 60 seconds. All systems operational.
              </p>
            </motion.div>

            {/* Status Cards Grid */}
            <div className="grid gap-8 md:gap-10">
              {statusItems.map((item, index) => {
                const Icon = item.icon;
                const accentColor = (item.accent === "rose" ? "purple" : item.accent) as PageAccent;

                return (
                  <motion.article
                    key={item.service}
                    custom={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <PremiumCard
                      variant="glass-primary"
                      accent={accentColor}
                      hover={true}
                      className="md:p-10 p-6"
                    >
                      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                            <ColorIcon Icon={Icon} gradient={item.gradient} size="h-16 w-16" shadowColor={accentToShadowColor(item.accent)} />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {item.service}
                            </h3>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:pl-20">
                            {item.note}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 md:items-end md:pl-4">
                          <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-bold text-blue-700 shadow-sm transition-all duration-300 group-hover:scale-105 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                            {item.status}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Uptime: {item.uptime}
                          </span>
                        </div>
                      </div>
                    </PremiumCard>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* NEW SECTION: System Metrics */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <Container>
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl drop-shadow-sm">
                System Metrics
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Real-time performance indicators across our global infrastructure.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { label: "Global Latency", value: "45ms", trend: "-2ms", color: "text-emerald-600 dark:text-emerald-400" },
                { label: "API Success Rate", value: "99.99%", trend: "+0.01%", color: "text-blue-600 dark:text-blue-400" },
                { label: "Active Connections", value: "12,450", trend: "+150", color: "text-purple-600 dark:text-purple-400" },
              ].map((metric, i) => (
                <div key={i} className="rounded-2xl border border-slate-200/60 bg-white/50 p-8 text-center shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/50">
                  <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">{metric.label}</div>
                  <div className={`text-4xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                  <div className="text-xs font-medium text-slate-400 dark:text-slate-500">Last 24h: <span className="text-emerald-600 dark:text-emerald-400">{metric.trend}</span></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Incident History Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="section-surface" />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial={false}
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                  <AlertCircle className="h-3 w-3 text-white" />
                </div>
                Incident history
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                No cover-up – root cause or bust
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Every incident includes detection time, remediation steps, and the control we improved.
              </p>
            </motion.div>

            {/* Incident Cards */}
            <div className="space-y-8">
              {incidents.map((incident, index) => (
                <motion.article
                  key={incident.title}
                  custom={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <PremiumCard
                    variant="glass-primary"
                    accent="orange"
                    hover={true}
                    className="md:p-10 p-8"
                  >
                    <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1 space-y-5">
                        <div className="flex items-start gap-4">
                          <ColorIcon Icon={AlertCircle} gradient="from-amber-500 to-orange-500" size="h-14 w-14" shadowColor="rgba(251, 146, 60, 0.25)" />
                          <div className="flex-1 space-y-2">
                            <time className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                              {incident.date}
                            </time>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                              {incident.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:pl-18">
                          {incident.summary}
                        </p>
                      </div>
                      <span className="inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 md:ml-4">
                        {incident.status}
                      </span>
                    </div>
                  </PremiumCard>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
