"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { Unified3DBackground } from "@/components/backgrounds/Unified3DBackground";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { Icon3D } from "@/components/3d-icons/Icon3D";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/data/blog-posts";
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Cpu,
  BookOpen,
  Lightbulb,
  Scale,
  Bell,
} from "lucide-react";

// Icon mapping for dynamic rendering
const iconMap = {
  Cpu,
  TrendingUp,
  Shield,
  Lightbulb,
  Scale,
  Bell,
} as const;

const categories = [
  {
    name: "Technical Deep Dives",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-500",
    count: 2,
  },
  {
    name: "Trading Strategy",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-500",
    count: 1,
  },
  {
    name: "Risk Management",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
    count: 2,
  },
  {
    name: "Market Analysis",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
    count: 1,
  },
  {
    name: "Regulatory Updates",
    icon: Scale,
    gradient: "from-indigo-500 to-violet-500",
    count: 0,
  },
  {
    name: "Platform News",
    icon: Bell,
    gradient: "from-rose-500 to-red-500",
    count: 0,
  },
];

export default function BlogPage() {
  return (
    <div className="relative">
      {/* Global Aurora Background */}
      <AuroraBackground variant="blog" intensity={0.5} />

      <PageHeaderAnimated
        eyebrow="Insights & Updates"
        title="Trading wisdom, technical deep-dives, and transparency reports"
        description="No fluff, no hype. Just honest insights into building responsible automated trading systems for cryptocurrency markets."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        {/* Featured Articles Preview */}
        <motion.div 
          className="hidden lg:block relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PremiumCard variant="glass-primary" accent="orange" className="w-[400px] p-6">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">Featured Content</div>
            <div className="space-y-3">
              {getFeaturedBlogPosts().slice(0, 2).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}` as Route} className="block group">
                  <div className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-orange-500/10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-white text-xs">
                      {post.category.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 line-clamp-1">{post.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{post.readTime}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-orange-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Categories Section */}
      <section id="newsletter" className="relative isolate overflow-hidden py-24 md:py-32 bg-gradient-to-br from-orange-50/50 via-amber-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20">
        <Unified3DBackground variant="blog" intensity={0.35} />

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-[rgb(5,8,15)]/65 dark:to-[rgb(5,8,15)]/65" />
        </div>        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-cyan-100 border border-cyan-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
                <BookOpen className="mr-2 h-4 w-4" />
                Categories
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Explore by topic
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                From technical architecture to trading philosophy, find insights that matter. Our engineering team regularly publishes deep dives into our system architecture, risk management protocols, and market analysis methodologies to foster transparency and trust.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon;
                // Fix: Ensure we only use valid PageAccent values (cyan, emerald, purple, orange, blue)
                // Index 0: cyan, 1: emerald, 2: purple, 3: orange, 4: blue (was indigo), 5: purple (was rose)
                const iconColor = index === 0 ? "cyan" : index === 1 ? "emerald" : index === 2 ? "purple" : index === 3 ? "orange" : index === 4 ? "blue" : "purple";

                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <PremiumCard
                      variant="glass-secondary"
                      accent={iconColor}
                      hover={true}
                      className="h-full p-8"
                    >
                      <div className="flex flex-col h-full justify-between gap-6">
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
                    </PremiumCard>
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
              {getFeaturedBlogPosts().map((post) => {
                const Icon = iconMap[post.icon as keyof typeof iconMap] || Cpu;
                return (
                  <PremiumCard
                    key={post.slug}
                    variant="glass-secondary"
                    accent="cyan"
                    hover={true}
                    className="group p-8 lg:p-12"
                  >
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                      <div className="flex-1 space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
                            Featured
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {post.category}
                          </span>
                        </div>

                        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                          {post.title}
                        </h2>

                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <Link
                          href={`/blog/${post.slug}` as Route}
                          className="group/link inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Read full article
                          <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>

                      <div className="flex justify-center lg:justify-end">
                        <Icon3D icon={Icon} color="cyan" size={120} />
                      </div>
                    </div>
                  </PremiumCard>
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
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Latest articles
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Deep insights into building transparent, risk-first trading systems.
              </p>
            </motion.div>

            {/* Posts Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {getAllBlogPosts()
                .filter((post) => !post.featured)
                .map((post, index) => {
                  const Icon = iconMap[post.icon as keyof typeof iconMap] || Cpu;
                  const iconColor = post.gradient.includes("emerald") ? "emerald" : post.gradient.includes("purple") ? "purple" : post.gradient.includes("amber") ? "orange" : "cyan";

                  return (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <PremiumCard
                        variant="glass-secondary"
                        accent={iconColor}
                        hover={true}
                        className="flex h-full flex-col gap-6 p-8"
                      >
                        <div className="flex justify-start">
                          <Icon3D icon={Icon} color={iconColor} size={64} />
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                              {post.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {post.title}
                          </h3>

                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/blog/${post.slug}` as Route}
                          className="group/link inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Read article
                          <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </PremiumCard>
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
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200/50 bg-white/40 p-12 shadow-2xl backdrop-blur-md dark:border-emerald-800/50 dark:bg-slate-900/40 md:p-16">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10" />

              <div className="relative space-y-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>

                <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                  Stay updated
                </h2>

                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  Get notified when we publish new articles, transparency reports, and technical insights. No spam, just quality content.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-8 py-4 font-semibold text-emerald-700 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-100 hover:shadow-lg dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/50"
                >
                  Subscribe to updates
                  <ArrowRight className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
