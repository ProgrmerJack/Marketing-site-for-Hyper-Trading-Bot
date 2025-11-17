"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@hyper/ui";
import { Shield, Zap, Scale, Eye, ArrowRight } from "lucide-react";
import { GlareHover, ClickSpark, StarBorder, SpotlightCard } from "@/components/reactbits/dynamic";
import { MorphingShape } from "@/components/motion/MorphingShape";
import { MouseFollower } from "@/components/motion/MouseFollower";
import { ParallaxSection } from "@/components/motion/ParallaxSection";
// Using UnifiedBackground globally; local AnimatedBackground per-section removed
import { useMotion } from "@/components/motion/MotionProvider";

const founderStory = {
  name: "Abduxoliq Ashuraliyev",
  role: "Founder & Chief Systems Architect",
  story: [
    {
      title: "The Problem I Witnessed",
      content:
        "After years building risk and execution systems across traditional finance and digital assets, I saw the same pattern repeat: platforms making bold performance claims without verifiable proof, systems failing when markets turned volatile, and retail investors bearing the consequences of inadequate risk controls.",
    },
    {
      title: "Why I Built This",
      content:
        "Inflation erodes purchasing power at 3-5% annually in stable economies, and much more in volatile periods. Meanwhile, traditional fund managers charge 2% management fees plus 20% performance fees while providing quarterly reports with no real-time transparency. I believed there had to be a better way—automation that works for investors, not against them.",
    },
    {
      title: "The Technical Philosophy",
      content:
        "Every design decision prioritizes verifiability over velocity. Our 120+ component architecture processes market signals in under 120ms, but speed means nothing without accuracy. Every trade goes through multi-layered risk checks. Every decision is logged. Every claim is backed by signed data you can verify independently.",
    },
    {
      title: "Building for Oversight, Not Avoiding It",
      content:
        "Most crypto platforms operate in gray areas, avoiding regulation. We're doing the opposite—actively engaging with government agencies, preparing for independent audits, and building systems designed to meet institutional oversight standards. It's harder and slower, but it's the only way to build something that lasts.",
    },
  ],
  principles: [
    {
      icon: Shield,
      title: "Risk First",
      description:
        "No position without verified risk controls. Circuit breakers, drawdown limits, and venue health checks are non-negotiable.",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: Zap,
      title: "Technical Rigor",
      description:
        "Sub-120ms signal processing, drift monitoring, transparent feature engineering. Every claim is measurable.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Scale,
      title: "Aligned Incentives",
      description:
        "Profit-share only model. We only earn when you earn. No upfront fees, no hidden charges, no management fees.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Eye,
      title: "Radical Transparency",
      description:
        "Public demo with signed data, incident logs, status page. You see what we see, in real-time.",
      gradient: "from-purple-500 to-pink-500",
    },
  ],
};

const leadership = [
  {
    name: "Abduxoliq Ashuraliyev",
    role: "Founder & Systems Lead",
    bio: "Built risk and execution systems across traditional and digital asset markets. Obsessed with verifiable controls, not storytelling.",
    credentials: [
      "10+ years building trading infrastructure",
      "Experience across TradFi and crypto markets",
      "Specialized in risk management systems",
      "Focus on verifiable, audit-ready architectures",
    ],
  },
  {
    name: "Compliance & Risk Advisory Board",
    role: "In progress",
    bio: "Independent advisors spanning regulatory, legal, and operational due diligence. Names published after contracts execute.",
    credentials: [
      "Regulatory compliance specialists",
      "Legal experts in crypto regulation",
      "Operational due diligence advisors",
      "Names disclosed after agreements finalize",
    ],
  },
];

const roadmap = [
  {
    title: "Independent performance audit",
    timeframe: "Q1 2026",
    summary:
      "Third-party verification covering net performance, controls, and operational resilience.",
  },
  {
    title: "Regulatory engagement",
    timeframe: "Ongoing",
    summary:
      "Preliminary conversations with government agencies for oversight-friendly automation. All labelled as exploratory until agreements finalize.",
  },
  {
    title: "Expanded demo data",
    timeframe: "Q2 2026",
    summary:
      "Additional assets, factor attribution, and signed risk events surfaced in the public sandbox.",
  },
];

export default function AboutPage() {
  // Use motion via MotionProvider globally; avoid local destructuring when unused
  useMotion();
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative isolate min-h-[90vh] overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 py-20 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 md:py-32">
        {/* Use unified global AnimatedBackground for consistent hyperspeed animation.
            Avoid duplicating AnimatedBackground here to maintain consistent behavior. */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.12),rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.08),rgba(96,165,250,0.06),transparent_70%)]" />
        <div className="absolute right-[-5rem] top-10 opacity-80 dark:opacity-40 pointer-events-none">
          <MorphingShape size={300} className="motion-zone" color="rgb(var(--accent))" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center rounded-full border border-blue-300 bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
            >
              About
            </motion.span>
            <MouseFollower strength={0.7} className="motion-zone">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl"
            >
              Revolutionizing crypto trading through automation and intelligence
            </motion.h1>
            </MouseFollower>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl"
            >
              Hyper Trading Automation combines cutting-edge technology with institutional-grade risk management to deliver superior trading performance. Experience the future of automated crypto trading.*
            </motion.p>

            {/* Principle Cards in Hero */}
            <ParallaxSection speed={0.2} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {founderStory.principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group"
                  >
                    <SpotlightCard
                      className="relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-slate-700/50 dark:bg-slate-900/80 motion-zone"
                      spotlightColor="rgba(59, 130, 246, 0.2)"
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${principle.gradient} shadow-md transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-sm font-bold text-slate-900 dark:text-white">{principle.title}</h3>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{principle.description}</p>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>
            </ParallaxSection>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <ClickSpark sparkColor="rgba(59, 130, 246, 0.6)" sparkCount={12} sparkRadius={32} sparkSize={10}>
                <div className="inline-block">
                  <div className="rounded-full [&>div]:!bg-transparent [&>div]:!shadow-none [&>div]:dark:!bg-transparent">
                    <StarBorder as="div" color="rgb(59, 130, 246)" className="rounded-full !bg-transparent !shadow-none dark:!bg-transparent" speed="3s">
                      <Link
                        href={("/contact" as Route)}
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <span className="relative z-10">Get started</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </StarBorder>
                  </div>
                </div>
              </ClickSpark>
              <Link
                href={("/how-it-works" as Route)}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Founder Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 py-24 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 md:py-32">
        {/* Background */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          </div>
          {/* Radial color overlay similar to homepage hero */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.08),rgba(59,130,246,0.06),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.05),rgba(96,165,250,0.04),transparent_70%)]" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Meet Our Visionary Founder
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Discover the passion, expertise, and innovation driving the next generation of crypto trading automation.
              </p>
            </div>

            <div className="mb-16 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-3xl font-bold text-white shadow-xl">
                AA
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-foreground">{founderStory.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {founderStory.role}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {founderStory.story.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.3 } 
                  }}
                >
                  <GlareHover className="h-full rounded-3xl" glareColor="rgba(59, 130, 246, 0.2)">
                    <article className="h-full rounded-3xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                      <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h4 className="mb-4 text-xl font-bold text-foreground">{section.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                    </article>
                  </GlareHover>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Core Principles Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 py-24 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 md:py-32">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Our Uncompromising Standards
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Four core principles that set us apart and deliver exceptional results for our traders.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {founderStory.principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -12,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <GlareHover className="h-full rounded-3xl" glareColor="rgba(59, 130, 246, 0.2)">
                      <article className="group h-full rounded-3xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${principle.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="mb-3 text-xl font-bold text-foreground">{principle.title}</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {principle.description}
                        </p>
                      </article>
                    </GlareHover>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 py-24 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 md:py-32">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.15),transparent_60%)]" />
          </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                World-Class Leadership Team
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Industry veterans bringing decades of combined experience in trading automation and risk management.*
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {leadership.map((person, index) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlareHover className="h-full rounded-3xl" glareColor="rgba(99, 102, 241, 0.2)">
                    <article className="h-full rounded-3xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                      <h3 className="font-display text-2xl font-bold text-foreground">{person.name}</h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {person.role}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                      <ul className="mt-6 space-y-2">
                        {person.credentials.map((credential) => (
                          <li
                            key={credential}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                            {credential}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </GlareHover>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Roadmap Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 py-24 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 md:py-32">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Exciting Developments Ahead
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Transparent milestones and upcoming innovations that will transform your trading experience.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {roadmap.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlareHover className="h-full rounded-3xl" glareColor="rgba(59, 130, 246, 0.2)">
                    <article className="h-full rounded-3xl border border-border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        {item.timeframe}
                      </span>
                      <h3 className="mt-4 text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                    </article>
                  </GlareHover>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Footnotes Section */}
      <section className="border-t border-border bg-muted/30 py-12">
        <Container>
          <div className="mx-auto max-w-4xl space-y-4 text-xs text-muted-foreground">
            <p>
              * Performance claims, testimonials, and forward-looking statements are illustrative and not guarantees of future results. Trading cryptocurrency involves substantial risk of loss. Past performance does not indicate future returns. Full team biographies will be published following completion of background checks and legal approvals.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
