"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { CheckCircle2, AlertCircle, Activity, Zap, Shield } from "lucide-react";
import { revealUp, staggerContainer, cardEntrance } from "@/lib/advanced-animations";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";

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
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <div className="relative space-y-0">
      <PageHeaderAnimated
        eyebrow="Status"
        title="Realtime transparency: uptime, latency, and incident history"
        description="If something degrades, we surface it here – not buried in release notes. Demo infrastructure and compliance services are monitored 24/7."
        backgroundVariant="threads"
        backgroundColors={["rgba(16, 185, 129, 0.4)", "rgba(59, 130, 246, 0.3)", "rgba(139, 92, 246, 0.25)"]}
      />

      {/* Services Overview Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="threads"
              colors={["rgba(16, 185, 129, 0.4)", "rgba(59, 130, 246, 0.3)", "rgba(139, 92, 246, 0.25)"]}
              speed="32s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
          )}
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
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
                    className="group relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/10 p-8 shadow-lg transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl dark:border-emerald-800/50 dark:from-slate-900 dark:via-emerald-950/20 dark:to-teal-950/10 md:p-10"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="dither"
              colors={["rgba(245, 158, 11, 0.3)", "rgba(239, 68, 68, 0.25)", "rgba(251, 146, 60, 0.2)"]}
              speed="28s"
              opacity={0.65}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.1),transparent_70%)]" />
          )}
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
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
                  className="group relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-white via-amber-50/20 to-orange-50/10 p-8 shadow-lg transition-all duration-300 hover:border-amber-300 hover:shadow-2xl dark:border-amber-800/50 dark:from-slate-900 dark:via-amber-950/20 dark:to-orange-950/10 md:p-10"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
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
