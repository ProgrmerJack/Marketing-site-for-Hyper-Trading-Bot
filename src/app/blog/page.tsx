"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import { HolographicBookHero } from "@/components/hero/HolographicBookHero";
import { Unified3DBackground } from "@/components/backgrounds/Unified3DBackground";
import { Icon3D } from "@/components/3d-icons/Icon3D";
// Use UnifiedBackground for consistent site-wide animation; remove local AnimatedBackground
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Cpu,
  BookOpen,
  Lightbulb,
  Zap,
} from "lucide-react";
import SectionMini3D from "@/components/mini/SectionMini3D";

const categories = [
  {
    name: "Technical Deep Dives",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-500",
    count: 12,
  },
  {
    name: "Trading Strategy",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-500",
    count: 8,
  },
  {
    name: "Risk Management",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
    count: 15,
  },
  {
    name: "Market Analysis",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
    count: 20,
  },
];

const blogPosts = [
  {
    title: "Building Transparent Trading Systems: Our Journey",
    excerpt:
      "Learn how we're building a crypto trading platform that prioritizes transparency, compliance, and risk management over flashy ROI promises.",
    date: "2025-03-15",
    readTime: "8 min read",
    category: "Technical Deep Dives",
    gradient: "from-blue-500 to-cyan-500",
    icon: Cpu,
    featured: true,
  },
  {
    title: "Risk-First Approach to Algorithmic Trading",
    excerpt:
      "Why we put risk management at the core of our trading system, and how it protects capital in volatile crypto markets.",
    date: "2025-03-10",
    readTime: "6 min read",
    category: "Risk Management",
    gradient: "from-purple-500 to-pink-500",
    icon: Shield,
  },
  {
    title: "Understanding Market Microstructure in Crypto",
    excerpt:
      "Deep dive into how we process venue data, on-chain metrics, and funding rates to generate actionable trading signals.",
    date: "2025-03-05",
    readTime: "10 min read",
    category: "Market Analysis",
    gradient: "from-amber-500 to-orange-500",
    icon: Lightbulb,
  },
  {
    title: "The Importance of Independent Audits",
    excerpt:
      "Why we're waiting for third-party verification before making performance claims, and why you should demand the same from any trading platform.",
    date: "2025-02-28",
    readTime: "5 min read",
    category: "Risk Management",
    gradient: "from-emerald-500 to-teal-500",
    icon: Shield,
  },
  {
    title: "Latency Optimization in Trading Systems",
    excerpt:
      "How we achieve sub-150ms p95 latency for market data ingestion and why every millisecond matters in automated trading.",
    date: "2025-02-20",
    readTime: "12 min read",
    category: "Technical Deep Dives",
    gradient: "from-blue-500 to-purple-500",
    icon: Cpu,
  },
  {
    title: "Position Sizing and Drawdown Management",
    excerpt:
      "Mathematical approaches to position sizing that balance growth potential with capital preservation in crypto markets.",
    date: "2025-02-15",
    readTime: "9 min read",
    category: "Trading Strategy",
    gradient: "from-emerald-500 to-green-500",
    icon: TrendingUp,
  },
];

export default function BlogPage() {
  return (
    <div className="relative">
      <PageHeaderAnimated
        eyebrow="Insights & Updates"
        title="Trading wisdom, technical deep-dives, and transparency reports"
        description="No fluff, no hype. Just honest insights into building responsible automated trading systems for cryptocurrency markets."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard className="w-96 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Featured</div>
            <div className="mb-3 text-xl font-bold">Building Transparent Trading Systems</div>
            <p className="text-xs text-muted-foreground">How we prioritize auditability and risk controls over shallow ROI claims.</p>
            <div className="mt-4">
              <motion.a href="#newsletter" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Subscribe to updates
              </motion.a>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Categories Section */}
      <section id="newsletter" className="relative isolate overflow-hidden py-24 md:py-32 bg-gradient-to-br from-orange-50/50 via-amber-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20">
        <SectionMini3D icon={BookOpen} color="amber" size={200} position="left" className="hidden xl:block opacity-25" />
        <Unified3DBackground variant="blog" intensity={0.35} />
        
        {/* HolographicBookHero - 3D Book Visualization */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 dark:opacity-20 pointer-events-none hidden xl:block">
          <div className="w-[450px] h-[450px]">
            <HolographicBookHero />
          </div>
        </div>
        
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-[rgb(5,8,15)]/65 dark:to-[rgb(5,8,15)]/65" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-cyan-100 border-2 border-cyan-300 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:border-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
                <BookOpen className="mr-2 h-4 w-4" />
                Categories
              </span>
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Explore by topic
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                From technical architecture to trading philosophy, find insights that matter.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const iconColor = index === 0 ? "cyan" : index === 1 ? "emerald" : index === 2 ? "purple" : "orange";

                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3 } }}
                    className="group relative overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-slate-50/50 to-blue-50/30 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300/80 hover:shadow-2xl dark:border-slate-700/70 dark:from-slate-900/95 dark:via-slate-850/90 dark:to-blue-950/40 dark:hover:border-blue-600/70"
                  >
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-purple-500/8 dark:from-blue-500/15 dark:to-purple-500/15" />

                    <div className="relative space-y-6">
                      <div className="flex justify-start">
                        <Icon3D icon={Icon} color={iconColor} size={64} />
                      </div>

                      <div>
                        <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                          {category.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {category.count} articles
                        </p>
                      </div>
                    </div>

                    {/* Shimmer effect */}
                    <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent transition-all duration-1000 group-hover:left-full dark:via-blue-400/20" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Post Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-slate-950/60 dark:to-slate-950/60" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-slate-950/60 dark:to-slate-950/60" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {blogPosts
                .filter((post) => post.featured)
                .map((post) => {
                  const Icon = post.icon;
                  return (
                    <div
                      key={post.title}
                      className="group relative overflow-hidden rounded-3xl border-2 border-pink-200/60 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-pink-50/40 to-purple-50/30 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-pink-300/80 hover:shadow-3xl dark:border-pink-800/60 dark:from-slate-900/95 dark:via-pink-950/40 dark:to-purple-950/30 dark:hover:border-pink-700/80"
                    >
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/8 via-transparent to-purple-500/8 dark:from-pink-500/15 dark:to-purple-500/15" />

                      <div className="relative grid gap-12 p-12 lg:grid-cols-[1.5fr_1fr]">
                        <div className="space-y-8">
                          <div>
                            <span className="inline-flex items-center rounded-full border-2 border-pink-300 bg-pink-100 px-5 py-2 text-xs font-bold uppercase tracking-widest text-pink-700 dark:border-pink-800 dark:bg-pink-950/50 dark:text-pink-400">
                              <Zap className="mr-2 h-4 w-4" />
                              Featured
                            </span>
                          </div>

                          <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                            {post.title}
                          </h2>

                          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <Link
                            href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` as Route}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-pink-300 bg-pink-100 px-8 py-4 font-semibold text-pink-700 transition-all duration-300 hover:border-pink-400 hover:bg-pink-200 hover:shadow-lg dark:border-pink-800 dark:bg-pink-950/50 dark:text-pink-400 dark:hover:border-pink-700 dark:hover:bg-pink-900/50"
                          >
                            Read full article
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>

                        <div className="flex items-center justify-center">
                          <Icon3D icon={Icon} color="cyan" size={160} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* All Posts Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Animated Background (replaced with consistent UnifiedBackground fallback) */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-slate-950/60 dark:to-slate-950/60" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-slate-950/60 dark:to-slate-950/60" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Latest articles
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Deep insights into building transparent, risk-first trading systems.
              </p>
            </motion.div>

            {/* Posts Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts
                .filter((post) => !post.featured)
                .map((post, index) => {
                  const Icon = post.icon;
                  const iconColor = post.gradient.includes("emerald") ? "emerald" : post.gradient.includes("purple") ? "purple" : post.gradient.includes("amber") ? "orange" : "cyan";

                  return (
                    <motion.article
                      key={post.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-slate-50/60 to-blue-50/40 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300/80 hover:shadow-2xl dark:border-slate-700/70 dark:from-slate-900/95 dark:via-slate-850/90 dark:to-blue-950/40 dark:hover:border-blue-600/70"
                    >
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-purple-500/8 dark:from-blue-500/15 dark:to-purple-500/15" />

                      <div className="relative flex-1 space-y-6 p-8">
                        <div className="flex justify-start">
                          <Icon3D icon={Icon} color={iconColor} size={64} />
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {post.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative border-t border-slate-200/70 bg-slate-50/50 px-8 py-6 dark:border-slate-700/70 dark:bg-slate-800/50">
                        <Link
                          href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` as Route}
                          className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Read more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>

                      {/* Shimmer effect */}
                      <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent transition-all duration-1000 group-hover:left-full dark:via-blue-400/20" />
                    </motion.article>
                  );
                })}
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Animated Background (replaced with consistent UnifiedBackground fallback) */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-slate-950/60 dark:to-slate-950/60" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-slate-950/60 dark:to-slate-950/60" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-emerald-50/40 to-teal-50/30 p-12 shadow-2xl backdrop-blur-sm dark:border-emerald-800/60 dark:from-slate-900/95 dark:via-emerald-950/40 dark:to-teal-950/30 md:p-16">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 dark:from-emerald-500/15 dark:to-teal-500/15" />

              <div className="relative space-y-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>

                <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                  Stay updated
                </h2>

                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  Get notified when we publish new articles, transparency reports, and technical insights. No spam, just quality content.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-300 bg-emerald-100 px-8 py-4 font-semibold text-emerald-700 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-200 hover:shadow-lg dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/50"
                >
                  Subscribe to updates
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
