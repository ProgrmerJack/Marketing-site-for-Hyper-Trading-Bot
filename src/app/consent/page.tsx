"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import { DsrForm } from "@/components/forms/dsr-form";
// UnifiedBackground used globally; per-section AnimatedBackground removed
import { Cookie, Shield, CheckCircle2, XCircle, Settings, Eye, Lock, FileText, AlertTriangle, Globe, Clock, Scale, Mail, Users, RefreshCw } from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";

const consentOptions = [
  {
    label: "Essential Cookies (Strictly Necessary)",
    description: "Required for core site functionality including security headers, CSRF protection, load balancing, session management, and remembering your cookie preferences. These cannot be disabled as they are essential for the website to function properly.",
    defaultState: "Always on",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    required: true,
    legalBasis: "Legitimate Interest (Article 6(1)(f) GDPR)",
    retention: "Session or up to 12 months for preferences",
  },
  {
    label: "Performance & Analytics Cookies",
    description: "Anonymous performance metrics including Core Web Vitals, page load times, and error tracking to help us improve site speed, accessibility, and user experience. All data is aggregated and IP addresses are anonymized.",
    defaultState: "Off by default",
    icon: Eye,
    gradient: "from-purple-500 to-pink-500",
    required: false,
    legalBasis: "Consent (Article 6(1)(a) GDPR)",
    retention: "26 months maximum",
  },
  {
    label: "Communication Consent",
    description: "Stores cryptographic proof of your opt-in for transactional updates, demo access notifications, and service announcements. Required when you submit contact forms or request demo access. You can withdraw consent at any time.",
    defaultState: "On when you submit",
    icon: Mail,
    gradient: "from-emerald-500 to-teal-500",
    required: true,
    legalBasis: "Consent (Article 6(1)(a) GDPR)",
    retention: "Until consent withdrawal + 3 years for records",
  },
  {
    label: "Functional Cookies",
    description: "Remember your theme preference (light/dark), language settings, and accessibility options to provide a consistent experience across visits. These enhance usability but are not strictly necessary.",
    defaultState: "Off by default",
    icon: Settings,
    gradient: "from-amber-500 to-orange-500",
    required: false,
    legalBasis: "Consent (Article 6(1)(a) GDPR)",
    retention: "12 months",
  },
];

const privacyFeatures = [
  {
    title: "Global Privacy Control (GPC)",
    description: "We automatically detect and honor GPC signals from your browser per CCPA requirements. When GPC is detected, non-essential cookies are blocked without requiring manual opt-out. This preference is respected site-wide.",
    icon: Globe,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Transparent Consent Records",
    description: "Every consent decision is cryptographically timestamped and stored with audit trails including your IP address (hashed), browser fingerprint (hashed), and consent string. You can export your consent record at any time for verification.",
    icon: FileText,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    title: "Easy Withdrawal & Modification",
    description: "Change or withdraw consent anytime through this page, the cookie banner, or by contacting privacy@hypertrader.io. Updates take effect immediately across all services. Withdrawal does not affect lawfulness of prior processing.",
    icon: RefreshCw,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Privacy by Design",
    description: "Our systems are built with data minimization principles. We collect only what's necessary, anonymize where possible, and delete data when retention periods expire automatically.",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "No Third-Party Advertising",
    description: "We do not use advertising cookies, tracking pixels, or share data with advertising networks. Your browsing behavior is never sold or used for targeted advertising across other websites.",
    icon: XCircle,
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "Verifiable Compliance",
    description: "Our consent management platform is designed to meet GDPR Article 7, CCPA/CPRA, ePrivacy Directive, and UK GDPR requirements. Consent records are available for regulatory audit upon request.",
    icon: Scale,
    gradient: "from-violet-500 to-purple-500",
  },
];

const dataSubjectRights = [
  {
    right: "Right to Access (GDPR Article 15 / CCPA §1798.100)",
    description: "Request a copy of all personal data we hold about you, including consent records, form submissions, and processing logs. We respond within 30 days (45 days for complex requests).",
    icon: Eye,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    right: "Right to Rectification (GDPR Article 16)",
    description: "Request correction of inaccurate personal data. We will verify your identity and update records within 30 days.",
    icon: FileText,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    right: "Right to Erasure (GDPR Article 17 / CCPA §1798.105)",
    description: "Request deletion of your personal data. We will delete data unless we have a legal obligation to retain it. Some data may persist in backups for up to 90 days.",
    icon: XCircle,
    gradient: "from-red-500 to-pink-500",
  },
  {
    right: "Right to Restrict Processing (GDPR Article 18)",
    description: "Request that we stop processing your data while you contest accuracy or object to processing. We will mark data as restricted and cease processing.",
    icon: Lock,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    right: "Right to Data Portability (GDPR Article 20)",
    description: "Receive your data in a structured, commonly used, machine-readable format (JSON or CSV). You can request transfer to another controller where technically feasible.",
    icon: RefreshCw,
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    right: "Right to Object (GDPR Article 21)",
    description: "Object to processing based on legitimate interests, direct marketing, or profiling. We will cease processing unless we demonstrate compelling legitimate grounds.",
    icon: AlertTriangle,
    gradient: "from-orange-500 to-red-500",
  },
  {
    right: "Right to Opt-Out of Sale/Sharing (CCPA §1798.120)",
    description: "Opt out of the sale or sharing of personal information. Note: We do not sell personal information. We honor this right through GPC signals and the form below.",
    icon: Shield,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    right: "Right to Non-Discrimination (CCPA §1798.125)",
    description: "Exercise your privacy rights without receiving discriminatory treatment. We will not deny services, charge different prices, or provide different quality based on privacy choices.",
    icon: Users,
    gradient: "from-teal-500 to-green-500",
  },
];

const consentRequirements = [
  {
    title: "Freely Given",
    description: "Consent is not a condition for accessing the Site. You can browse without enabling non-essential cookies. Demo access requires communication consent to send you credentials.",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    title: "Specific & Informed",
    description: "Each consent category is clearly explained with its purpose, legal basis, retention period, and data recipients. We don't bundle consents or use dark patterns.",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Unambiguous",
    description: "Consent requires a clear affirmative action (clicking 'Accept' or toggling a switch). Pre-ticked boxes are not used. Silence or inactivity does not constitute consent.",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Withdrawable",
    description: "Withdrawal of consent is as easy as giving it. Use the banner, this page, or contact us directly. Withdrawal takes effect immediately and does not affect prior processing.",
    icon: RefreshCw,
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
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard className="w-96 rounded-2xl border border-slate-200/50 bg-white/10 p-6 shadow-xl backdrop-blur-md hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/50">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Privacy controls</div>
            <div className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Opt-in transparency</div>
            <p className="text-xs text-muted-foreground">Easily manage consent and export a signed record of your choices for auditability.</p>
            <div className="mt-4 flex gap-3">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/50" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Export record
              </motion.a>
              <motion.button
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.18 }}
              >
                Download Form
              </motion.button>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Preferences Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          {/* Per-section AnimatedBackground removed in favour of UnifiedBackground */}
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
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                <ColorIcon Icon={Cookie} gradient="from-purple-500 to-fuchsia-500" size="h-5 w-5" shadowColor={accentToShadowColor('purple')} wrapperClass="rounded-lg" />
                Cookie Preferences
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Granular control over your data
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                These settings update instantly and are stored with a timestamp for auditability. Each category shows its legal basis under GDPR.
              </p>
            </motion.div>

            {/* Consent Options Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {consentOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.article
                    key={option.label}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <SpotlightCard
                      className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/40 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/40"
                      spotlightColor="rgba(147, 51, 234, 0.15)"
                    >
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10" />

                      <div className="relative flex items-start gap-4">
                        {/* Icon with gradient */}
                        <ColorIcon
                          Icon={Icon}
                          gradient={option.gradient}
                          size="h-14 w-14"
                          iconClass="h-7 w-7"
                          shadowColor={accentToShadowColor(option.gradient.includes('blue') ? 'blue' : option.gradient.includes('emerald') ? 'emerald' : option.gradient.includes('purple') ? 'purple' : option.gradient.includes('amber') ? 'orange' : 'indigo')}
                        />

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {option.label}
                          </h3>
                          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${option.required
                            ? "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400"
                            }`}>
                            {option.defaultState}
                          </span>
                        </div>
                      </div>

                      <div className="relative flex-1 space-y-4">
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {option.description}
                        </p>

                        <div className="space-y-2 rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-700/60 dark:bg-slate-800/50">
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            <strong className="text-slate-900 dark:text-white">Legal Basis:</strong> {option.legalBasis}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            <strong className="text-slate-900 dark:text-white">Retention:</strong> {option.retention}
                          </p>
                        </div>
                      </div>

                      {/* Shimmer effect */}
                      <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent transition-all duration-1000 group-hover:left-full dark:via-purple-400/20" />
                    </SpotlightCard>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* GDPR Consent Requirements Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
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
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <ColorIcon Icon={Scale} gradient="from-blue-500 to-indigo-500" size="h-5 w-5" shadowColor={accentToShadowColor('blue')} wrapperClass="rounded-lg" />
                GDPR Article 7 Compliance
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                How we ensure valid consent
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Under GDPR, consent must meet specific requirements to be valid. Here&apos;s how we comply.
              </p>
            </motion.div>

            {/* Consent Requirements Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {consentRequirements.map((req, index) => {
                const Icon = req.icon;
                return (
                  <motion.div
                    key={req.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <SpotlightCard
                      className="group relative h-full overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-blue-50/30 to-indigo-50/20 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-blue-700/50 dark:from-slate-900/95 dark:via-blue-950/30 dark:to-indigo-950/20"
                      spotlightColor="rgba(59, 130, 246, 0.15)"
                    >
                      <div className="relative space-y-4">
                        <ColorIcon
                          Icon={Icon}
                          gradient={req.gradient}
                          size="h-12 w-12"
                          iconClass="h-6 w-6"
                          shadowColor={accentToShadowColor(req.gradient.includes('blue') ? 'blue' : req.gradient.includes('emerald') ? 'emerald' : req.gradient.includes('purple') ? 'purple' : 'orange')}
                        />

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {req.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {req.description}
                        </p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Privacy Features Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
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
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <ColorIcon Icon={Shield} gradient="from-emerald-500 to-teal-500" size="h-5 w-5" shadowColor={accentToShadowColor('emerald')} wrapperClass="rounded-lg" />
                Privacy by design
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Built with your privacy in mind
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                We implement industry-leading privacy practices and comply with GDPR, CCPA/CPRA, UK GDPR, and ePrivacy Directive.
              </p>
            </motion.div>

            {/* Privacy Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {privacyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <SpotlightCard
                      className="group relative h-full overflow-hidden rounded-3xl border border-emerald-200/50 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-emerald-50/40 to-teal-50/30 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-300/80 hover:shadow-2xl hover:-translate-y-2 dark:border-emerald-700/50 dark:from-slate-900/95 dark:via-emerald-950/40 dark:to-teal-950/30 dark:hover:border-emerald-600/80"
                      spotlightColor="rgba(16, 185, 129, 0.15)"
                    >
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 dark:from-emerald-500/15 dark:to-teal-500/15" />

                      <div className="relative space-y-4">
                        <ColorIcon
                          Icon={Icon}
                          gradient={feature.gradient}
                          size="h-12 w-12"
                          iconClass="h-6 w-6"
                          shadowColor={accentToShadowColor(feature.gradient.includes('blue') ? 'blue' : feature.gradient.includes('emerald') ? 'emerald' : feature.gradient.includes('purple') ? 'purple' : feature.gradient.includes('red') ? 'red' : feature.gradient.includes('amber') ? 'orange' : 'indigo')}
                        />

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
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
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Data Subject Rights Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
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
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400">
                <ColorIcon Icon={Users} gradient="from-indigo-500 to-purple-500" size="h-5 w-5" shadowColor={accentToShadowColor('purple')} wrapperClass="rounded-lg" />
                Your Legal Rights
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Data Subject Rights (GDPR & CCPA)
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                You have extensive rights over your personal data under GDPR, UK GDPR, and CCPA/CPRA. Exercise any right by contacting privacy@hypertrader.io.
              </p>
            </motion.div>

            {/* Data Subject Rights Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {dataSubjectRights.map((right, index) => {
                const Icon = right.icon;
                return (
                  <motion.div
                    key={right.right}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                  >
                    <SpotlightCard
                      className="group relative h-full overflow-hidden rounded-3xl border border-indigo-200/50 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-indigo-50/30 to-purple-50/20 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-indigo-700/50 dark:from-slate-900/95 dark:via-indigo-950/30 dark:to-purple-950/20"
                      spotlightColor="rgba(99, 102, 241, 0.15)"
                    >
                      <div className="relative flex items-start gap-4">
                        <ColorIcon
                          Icon={Icon}
                          gradient={right.gradient}
                          size="h-12 w-12"
                          iconClass="h-6 w-6"
                          shadowColor={accentToShadowColor(right.gradient.includes('blue') ? 'blue' : right.gradient.includes('emerald') ? 'emerald' : right.gradient.includes('purple') ? 'purple' : right.gradient.includes('red') ? 'red' : right.gradient.includes('amber') ? 'orange' : 'indigo')}
                        />

                        <div className="flex-1 space-y-2">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {right.right}
                          </h3>

                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                            {right.description}
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Opt-Out Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.6] via-transparent to-[rgb(var(--card))/0.6] dark:from-slate-950/60 dark:to-slate-950/60" />
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
              <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-700 dark:bg-red-950/50 dark:text-red-400">
                <ColorIcon Icon={XCircle} gradient="from-red-500 to-pink-500" size="h-5 w-5" shadowColor={accentToShadowColor('red')} wrapperClass="rounded-lg" />
                CCPA/CPRA Compliance
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Do Not Sell or Share My Personal Information
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Under California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), you have the right to opt out of the sale or sharing of your personal information. <strong className="text-slate-900 dark:text-white">Note: We do not sell your personal information.</strong> However, we provide this form for regulatory compliance and transparency.
              </p>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/50"
            >
              <div className="flex items-start gap-4">
                <ColorIcon Icon={AlertTriangle} gradient="from-blue-500 to-cyan-500" size="h-10 w-10" iconClass="h-5 w-5" shadowColor={accentToShadowColor('blue')} />
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-blue-900 dark:text-blue-100">Important Information About This Request</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>We will verify your identity before processing any request</li>
                    <li>Requests will be acknowledged within 10 business days</li>
                    <li>Complete responses provided within 45 days (may extend to 90 days for complex requests)</li>
                    <li>You may designate an authorized agent to submit requests on your behalf</li>
                    <li>We honor Global Privacy Control (GPC) signals as automatic opt-out</li>
                  </ul>
                </div>
              </div>
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

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800/50"
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Alternative Contact Methods:</strong> You can also exercise your rights by emailing <a href="mailto:privacy@hypertrader.io" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">privacy@hypertrader.io</a> with &ldquo;Data Subject Request&rdquo; in the subject line, or by contacting our Data Protection Officer at <a href="mailto:dpo@hypertrader.io" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">dpo@hypertrader.io</a>.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
