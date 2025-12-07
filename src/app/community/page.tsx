"use client";

import Link from "next/link";
import { ArrowRight, Users, MessageSquare, Zap, Globe, BookOpen, Code2, Star, Heart, Shield, Trophy } from "lucide-react";
import { Container } from "@hyper/ui";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";

const channels = [
  {
    icon: MessageSquare,
    name: "Discord Server",
    description: "Join our active community to discuss strategies, share ideas, get support, and connect with fellow algorithmic traders.",
    link: "#",
    gradient: "from-indigo-500 to-purple-500",
    members: "2.5K+",
    status: "active",
  },
  {
    icon: Globe,
    name: "Community Forum",
    description: "Deep technical discussions, strategy breakdowns, backtesting results, and documentation from the team and community.",
    link: "#",
    gradient: "from-blue-500 to-cyan-500",
    members: "1.2K+",
    status: "growing",
  },
  {
    icon: Zap,
    name: "Twitter / X",
    description: "Follow @hypertrader for real-time updates, market insights, feature announcements, and community highlights.",
    link: "https://twitter.com/hypertrader",
    gradient: "from-sky-400 to-blue-500",
    members: "5K+",
    status: "active",
  },
  {
    icon: Code2,
    name: "GitHub",
    description: "Explore our open-source strategy templates, SDKs, and contribute to the ecosystem. Star our repos!",
    link: "#",
    gradient: "from-slate-600 to-slate-800",
    members: "500+",
    status: "open-source",
  },
];

const communityHighlights = [
  {
    icon: Trophy,
    title: "Strategy Competitions",
    description: "Monthly competitions to showcase your backtesting skills. Top performers get featured and early access to new features.",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Educational Content",
    description: "Weekly webinars, tutorials, and deep-dives into algorithmic trading, risk management, and ML model development.",
    color: "blue",
  },
  {
    icon: Heart,
    title: "Mentorship Program",
    description: "Connect with experienced traders and our team for personalized guidance on your trading journey.",
    color: "pink",
  },
  {
    icon: Shield,
    title: "Verified Strategies",
    description: "Community-vetted strategy templates with transparent backtesting results and risk metrics.",
    color: "emerald",
  },
];

export default function CommunityPage() {
  return (
    <div className="relative space-y-0">
      {/* Global Aurora Background */}
      <AuroraBackground variant="default" intensity={0.4} />

      <PageHeaderAnimated
        eyebrow="Community"
        title="Join a Global Network of Algorithmic Traders"
        description="Connect with 5,000+ traders, share strategies, get support, and grow together. From beginners to institutional professionals."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(139,92,246,1)", "rgba(236,72,153,1)"]}
      >
        <motion.div 
          className="hidden lg:block relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PremiumCard variant="glass-primary" accent="purple" className="w-80 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-bold text-white">5,000+ Members</div>
            </div>
            <p className="text-xs text-slate-300">Active traders sharing strategies, insights, and support 24/7.</p>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Community Channels */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Connect Everywhere
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Join the conversation on your preferred platform.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.a
                    key={channel.name}
                    href={channel.link}
                    target={channel.link.startsWith("http") ? "_blank" : undefined}
                    rel={channel.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <PremiumCard
                      variant="glass-secondary"
                      accent="purple"
                      hover={true}
                      className="h-full p-8"
                    >
                      <ColorIcon Icon={Icon} gradient={channel.gradient} size="h-14 w-14" wrapperClass="mb-6" shadowColor={accentToShadowColor('purple')} />

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                          {channel.members} members
                        </span>
                        <span className={`h-2 w-2 rounded-full ${
                          channel.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-blue-500"
                        }`} />
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                        {channel.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {channel.description}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:underline">
                        Join Now <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </PremiumCard>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Community Highlights */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-purple-200/50 dark:border-purple-900/50">
        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 mb-6">
                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm">
                  <Star className="h-3 w-3 text-white" />
                </span>
                Community Programs
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                More Than Just a Community
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Exclusive programs and resources for our members.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {communityHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                const colorClasses = {
                  amber: "from-amber-500 to-orange-500",
                  blue: "from-blue-500 to-cyan-500",
                  pink: "from-pink-500 to-rose-500",
                  emerald: "from-emerald-500 to-teal-500",
                }[highlight.color];

                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="h-full rounded-2xl border border-slate-200 bg-white/60 p-8 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses} shadow-lg mb-6`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Start connecting with traders worldwide. Ask questions, share insights, and grow together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-purple-600 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm">
                  <MessageSquare className="h-3.5 w-3.5 text-white" />
                </span>
                Join Discord
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Contact Team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
