"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
import { FileText, Shield, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";

const researchRoadmap = [
  {
    title: "Methodology whitepaper",
    status: "In legal review",
    summary:
      "Full methodology covering feature set, model ensembles, and risk-adjusted metrics. Will ship once compliance sign-off is complete.",
    link: "/docs/methodology.pdf",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    statusColor: "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    title: "Audit roadmap",
    status: "Engagement initiated",
    summary:
      "Third-party review covering codebase, deployment pipeline, and performance verification. Timeline published once contract executed.",
    link: "/docs/audit-roadmap.pdf",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
    statusColor: "border-purple-300 bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400",
  },
  {
    title: "Data retention & quality",
    status: "Published",
    summary:
      "Retention windows, synthetic data handling, and quality gating for venue feeds and alternative datasets.",
    link: "/docs/data-quality.pdf",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    statusColor: "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
];

export default function ResearchPage() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <div className="relative space-y-0">
      <PageHeaderAnimated
        eyebrow="Research & methodology"
        title="Transparent methodology, audits-in-progress, and what we refuse to publish publicly"
        description="You will not find ROI call-outs or cherry-picked equity curves here. Instead, we document process, controls, and independent verification steps."
        backgroundVariant="threads"
        backgroundColors={["rgba(59, 130, 246, 0.4)", "rgba(139, 92, 246, 0.3)", "rgba(16, 185, 129, 0.25)"]}
      />

      {/* Commitments Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="threads"
              colors={["rgba(59, 130, 246, 0.4)", "rgba(139, 92, 246, 0.3)", "rgba(16, 185, 129, 0.25)"]}
              speed="32s"
              opacity={0.6}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          )}
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
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
                return (
                  <motion.article
                    key={item.title}
                    custom={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-2xl dark:border-slate-700/50 dark:from-slate-900 dark:via-blue-950/40 dark:to-purple-950/30"
                  >
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />

                    {/* Icon with gradient */}
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <header className="relative space-y-3">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h2>
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
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    {/* Animated gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-5`} />
                    </div>

                    {/* Shimmer effect */}
                    <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-1000 group-hover:left-full dark:via-white/10" />
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Transparency Note Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="beams"
              colors={["rgba(16, 185, 129, 0.3)", "rgba(245, 158, 11, 0.25)", "rgba(59, 130, 246, 0.2)"]}
              speed="28s"
              opacity={0.65}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_70%)]" />
          )}
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
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
              <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 p-12 shadow-2xl backdrop-blur-sm dark:border-blue-800/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-cyan-950/20">
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
      </section>
    </div>
  );
}
