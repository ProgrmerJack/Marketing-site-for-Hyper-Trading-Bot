"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
import { FileText, Shield, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { OrbitalDataLab3D } from "@/components/hero/OrbitalDataLab3D";
import { Unified3DBackground } from "@/components/backgrounds/Unified3DBackground";
import { Icon3D } from "@/components/3d-icons/Icon3D";
import SectionMini3D from "@/components/mini/SectionMini3D";
// Use site-wide UnifiedBackground for consistent animation; removed per-section AnimatedBackground

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
  return (
    <div className="relative space-y-0">
      <PageHeaderAnimated
        eyebrow="Research & methodology"
        title="Transparent methodology, audits-in-progress, and what we refuse to publish publicly"
        description="You will not find ROI call-outs or cherry-picked equity curves here. Instead, we document process, controls, and independent verification steps."
          backgroundVariant="hyperspeed"
          backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <Unified3DBackground variant="research" intensity={0.6} />
        
        {/* 3D Orbital Data Lab - positioned as floating background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40 pointer-events-none hidden lg:block">
          <OrbitalDataLab3D />
        </div>
        
        <motion.div className="hidden lg:block relative z-10" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard className="w-96 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roadmap</div>
            <div className="mb-3 text-lg font-bold">Methodology whitepaper</div>
            <p className="text-xs text-muted-foreground">We publish audited methodology once legal review completes. Request access to our draft materials.</p>
            <div className="mt-4">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Request access
              </motion.a>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Commitments Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <SectionMini3D icon={FileText} color="purple" size={180} position="right" className="hidden xl:block opacity-25" />
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
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-blue-50/40 to-purple-50/30 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-blue-300/80 hover:shadow-2xl hover:-translate-y-2 dark:border-slate-700/70 dark:from-slate-900/95 dark:via-blue-950/50 dark:to-purple-950/40 dark:hover:border-blue-600/70"
                  >
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-purple-500/8 dark:from-blue-500/15 dark:to-purple-500/15" />

                    {/* Icon with gradient */}
                    <div className="relative flex justify-start">
                      <Icon3D icon={Icon} color={iconColor} size={64} />
                    </div>

                    <header className="relative space-y-3">
                      <h2 className="heading-contrast text-xl font-bold text-slate-900 dark:text-white">
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
                <Shield className="mr-2 h-4 w-4" />
                Transparency principles
              </span>
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
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
              <div className="relative overflow-hidden modern-card-info p-12 shadow-2xl">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-cyan-500/8 dark:from-blue-500/15 dark:to-cyan-500/15" />

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
