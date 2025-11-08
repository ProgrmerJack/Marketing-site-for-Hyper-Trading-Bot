"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { DsrForm } from "@/components/forms/dsr-form";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { Cookie, Shield, CheckCircle2, XCircle, Settings, Eye, Lock } from "lucide-react";

const consentOptions = [
  {
    label: "Essential cookies",
    description: "Required for site operation (security headers, load balancing, session tracking).",
    defaultState: "Always on",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    required: true,
  },
  {
    label: "Performance analytics",
    description: "Anonymous Core Web Vitals for improving speed and accessibility. Opt-in only.",
    defaultState: "Off by default",
    icon: Eye,
    gradient: "from-purple-500 to-pink-500",
    required: false,
  },
  {
    label: "Communication consent",
    description: "Stores proof of opt-in for transactional updates. Required for demo access requests.",
    defaultState: "On when you submit the form",
    icon: Lock,
    gradient: "from-emerald-500 to-teal-500",
    required: true,
  },
];

const privacyFeatures = [
  {
    title: "Global Privacy Control",
    description: "We automatically honor GPC signals from your browser. No manual opt-out needed.",
    icon: Settings,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Transparent Tracking",
    description: "Every consent decision is timestamped and stored with audit trails for your review.",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    title: "Easy Withdrawal",
    description: "Change your preferences anytime. Updates take effect immediately across all services.",
    icon: XCircle,
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function ConsentPage() {
  return (
    <div className="relative">
      <PageHeaderAnimated
        eyebrow="Consent management"
        title="Control how your data is used"
        description="Adjust cookie and communication preferences. We honor Global Privacy Control signals automatically and provide full transparency into our data practices."
        backgroundVariant="threads"
        backgroundColors={["rgba(139, 92, 246, 0.4)", "rgba(236, 72, 153, 0.3)", "rgba(59, 130, 246, 0.25)"]}
      />

      {/* Preferences Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <AnimatedBackground
            variant="liquid"
            colors={["rgba(139, 92, 246, 0.45)", "rgba(236, 72, 153, 0.35)", "rgba(59, 130, 246, 0.3)"]}
            speed="28s"
            opacity={0.75}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 dark:from-slate-950/60 dark:to-slate-950/60" />
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
              <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                <Cookie className="mr-2 h-4 w-4" />
                Your preferences
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Granular control over your data
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                These settings update instantly and are stored with a timestamp for auditability.
              </p>
            </motion.div>

            {/* Consent Options Grid */}
            <div className="grid gap-8 md:grid-cols-3">
              {consentOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.article
                    key={option.label}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-purple-300/80 hover:shadow-2xl dark:border-slate-700/70 dark:from-slate-900/95 dark:via-purple-950/30 dark:to-pink-950/20 dark:hover:border-purple-600/70"
                  >
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-pink-500/8 dark:from-purple-500/15 dark:to-pink-500/15" />

                    {/* Icon with gradient */}
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${option.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <div className="relative flex-1 space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {option.label}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {option.description}
                      </p>
                    </div>

                    <div className="relative">
                      <span className={`inline-flex items-center rounded-full border-2 px-5 py-2 text-xs font-bold uppercase tracking-widest ${
                        option.required
                          ? "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400"
                      }`}>
                        {option.defaultState}
                      </span>
                    </div>

                    {/* Shimmer effect */}
                    <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent transition-all duration-1000 group-hover:left-full dark:via-purple-400/20" />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Privacy Features Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <AnimatedBackground
            variant="beams"
            colors={["rgba(16, 185, 129, 0.45)", "rgba(59, 130, 246, 0.35)", "rgba(245, 158, 11, 0.3)"]}
            speed="24s"
            opacity={0.8}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 dark:from-slate-950/60 dark:to-slate-950/60" />
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
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Shield className="mr-2 h-4 w-4" />
                Privacy by design
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Built with your privacy in mind
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                We implement industry-leading privacy practices to ensure your data is always protected.
              </p>
            </motion.div>

            {/* Privacy Features Grid */}
            <div className="grid gap-8 md:grid-cols-3">
              {privacyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    className="group relative overflow-hidden rounded-3xl border-2 border-emerald-200/70 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-emerald-300/80 hover:shadow-2xl dark:border-emerald-700/70 dark:from-slate-900/95 dark:via-emerald-950/40 dark:to-teal-950/30 dark:hover:border-emerald-600/80"
                  >
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 dark:from-emerald-500/15 dark:to-teal-500/15" />

                    <div className="relative space-y-6">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {feature.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {feature.description}
                      </p>
                    </div>

                    {/* Pulsing glow effect */}
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-emerald-400/0 via-emerald-400/10 to-teal-400/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100 dark:from-emerald-400/0 dark:via-emerald-400/20 dark:to-teal-400/0"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Opt-Out Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <AnimatedBackground
            variant="dither"
            colors={["rgba(59, 130, 246, 0.45)", "rgba(236, 72, 153, 0.35)", "rgba(139, 92, 246, 0.3)"]}
            speed="26s"
            opacity={0.75}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 dark:from-slate-950/60 dark:to-slate-950/60" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl space-y-12">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                Data rights
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Do Not Sell/Share
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Regulators require a clear workflow for opting out of data sales or sharing. Submit a request and we&apos;ll acknowledge it within the mandated window.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DsrForm />
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
