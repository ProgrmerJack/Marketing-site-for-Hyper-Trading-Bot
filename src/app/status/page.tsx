"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import { CheckCircle2, AlertCircle, Activity, Zap, Shield } from "lucide-react";
import SectionMini3D from "@/components/mini/SectionMini3D";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
// UnifiedBackground provides site-wide background animation; removed local AnimatedBackground

const statusItems = [
  {
    service: "API / SSE Demo Stream",
    status: "Operational",
    uptime: "99.98%",
    note: "Heartbeat healthy · auto reconnect active",
    icon: Zap,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    service: "Chart rendering",
    status: "Operational",
    uptime: "100%",
    note: "No incidents reported",
    icon: Activity,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    service: "Consent & privacy services",
    status: "Operational",
    uptime: "100%",
    note: "Last audit Oct 12 2025",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
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
      <PageHeaderAnimated
        eyebrow="Status"
        title="Realtime transparency: uptime, latency, and incident history"
        description="If something degrades, we surface it here – not buried in release notes. Demo infrastructure and compliance services are monitored 24/7."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard className="w-96 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service status</div>
            <div className="mb-3 text-lg font-bold">API / SSE Stream Operational</div>
            <p className="text-xs text-muted-foreground">Our demo stream is online and updates in real-time. See recent incident details below.</p>
            <div className="mt-4">
              <motion.a href="/status" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Subscribe for updates
              </motion.a>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Services Overview Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <SectionMini3D icon={Zap} color="emerald" size={180} position="left" className="hidden xl:block opacity-35" />
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
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Services overview
              </span>
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
                return (
                  <motion.article
                    key={item.service}
                    custom={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className="modern-card-emerald group relative overflow-hidden md:p-10"
                  >
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 dark:from-emerald-500/15 dark:to-teal-500/15" />

                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {item.service}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:pl-20">
                          {item.note}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 md:items-end md:pl-4">
                        <span className="inline-flex w-fit items-center rounded-full border-2 border-emerald-300 bg-emerald-100 px-6 py-2.5 text-sm font-bold text-emerald-700 shadow-sm transition-all duration-300 group-hover:scale-105 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                          {item.status}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          Uptime: {item.uptime}
                        </span>
                      </div>
                    </div>

                    {/* Animated gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-5`} />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
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
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-7xl space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={revealUp} className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                <AlertCircle className="mr-2 h-4 w-4" />
                Incident history
              </span>
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border-2 border-amber-200/70 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-amber-50/40 to-orange-50/30 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-amber-300/80 hover:shadow-2xl dark:border-amber-700/70 dark:from-slate-900/95 dark:via-amber-950/40 dark:to-orange-950/30 md:p-10"
                >
                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-orange-500/8 dark:from-amber-500/15 dark:to-orange-500/15" />

                  <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1 space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                          <AlertCircle className="h-7 w-7 text-white" />
                        </div>
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
                    <span className="inline-flex w-fit items-center rounded-full border-2 border-emerald-300 bg-emerald-100 px-5 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 md:ml-4">
                      {incident.status}
                    </span>
                  </div>

                  {/* Shimmer effect */}
                  <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-full dark:via-white/10" />
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
