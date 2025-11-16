"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import { ContactForm } from "@/components/forms/contact-form";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
import { Mail, Shield, FileCheck, CheckCircle2, HelpCircle } from "lucide-react";
// UnifiedBackground provides site-wide background animation; remove local AnimatedBackground usage

const faqs = [
  {
    question: "Do you ever take custody?",
    answer:
      "No. We integrate with venues via API and never take possession of client funds. You maintain custody and revoke access whenever you choose.",
    icon: Shield,
  },
  {
    question: "Can I see live performance numbers?",
    answer:
      "Not on the public site. Verified, net performance is only available to qualified investors through a gated experience once independent audits finish.",
    icon: FileCheck,
  },
  {
    question: "What does the onboarding process look like?",
    answer:
      "We complete compliance questionnaires, operational due diligence, and technical sandbox walkthroughs before activating any live trading.",
    icon: CheckCircle2,
  },
];

const processSteps = [
  {
    number: 1,
    title: "Verification",
    description: "We verify your jurisdiction, regulatory status, and mandate.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    title: "Confirmation",
    description: "You receive a double opt-in confirmation email with disclosures.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: 3,
    title: "Walkthrough",
    description: "Compliance schedules a walkthrough of the signed demo data.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function ContactPage() {
  return (
    <div className="relative space-y-0">
      <PageHeaderAnimated
        eyebrow="Contact"
        title="Tell us about your mandate -- no sales fluff, just validation"
        description="Complete the consent-aware form below. You&apos;ll receive a double opt-in email with our postal address and unsubscribe option per CAN-SPAM."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard className="w-96 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Request gated demo</div>
            <div className="mb-3 text-xl font-bold">Qualified access</div>
            <p className="text-xs text-muted-foreground">We gate demos; provide minimal context and we&apos;ll reach out to qualify access.</p>
            <div className="mt-4">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Request gated demo
              </motion.a>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Contact Form Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Animated Background */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
            {/* Local AnimatedBackground removed in favor of UnifiedBackground */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.06),rgba(59,130,246,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.04),rgba(96,165,250,0.03),transparent_70%)]" />
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
                <Mail className="mr-2 h-4 w-4" />
                Request gated demo access
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Provide enough context for evaluation
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Share your details so compliance and engineering can evaluate whether we&apos;re a fit.
              </p>
            </motion.div>

            {/* Form and Sidebar Grid */}
            <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ContactForm />
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-8"
              >
                {/* What Happens Next Card */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-blue-200/60 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30 p-8 shadow-xl backdrop-blur-sm dark:border-blue-700/60 dark:from-slate-900/95 dark:via-blue-950/40 dark:to-cyan-950/30">
                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-cyan-500/8 dark:from-blue-500/15 dark:to-cyan-500/15" />

                  <h2 className="relative mb-6 text-xl font-bold text-slate-900 dark:text-white">
                    What happens next
                  </h2>
                  <ol className="relative space-y-6">
                    {processSteps.map((step) => (
                      <motion.li
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: step.number * 0.1 }}
                        className="relative flex gap-4"
                      >
                        <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} text-sm font-bold text-white shadow-lg`}>
                          {step.number}
                        </span>
                        <div className="relative flex-1 pt-1">
                          <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                            {step.description}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* FAQ Card */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 p-8 shadow-xl backdrop-blur-sm dark:border-emerald-700/60 dark:from-slate-900/95 dark:via-emerald-950/40 dark:to-teal-950/30">
                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 dark:from-emerald-500/15 dark:to-teal-500/15" />

                  <div className="relative mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                      <HelpCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Frequently asked
                    </h3>
                  </div>
                  <ul className="relative space-y-5">
                    {faqs.map((faq, index) => {
                      const Icon = faq.icon;
                      return (
                        <motion.li
                          key={faq.question}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative space-y-2"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="mt-0.5 h-5 w-5 flex-none text-emerald-600 dark:text-emerald-400" />
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {faq.question}
                            </p>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                            {faq.answer}
                          </p>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Trust Section */}
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200/60 bg-gradient-to-br from-white via-purple-50/40 to-pink-50/30 p-12 shadow-2xl backdrop-blur-sm dark:border-purple-700/60 dark:from-slate-900/95 dark:via-purple-950/40 dark:to-pink-950/30">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-pink-500/8 dark:from-purple-500/15 dark:to-pink-500/15" />

              <div className="relative mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Privacy and transparency
                </h3>
              </div>

              <div className="relative space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  Your information is handled with the same care we apply to trading operations: encrypted at rest,
                  transmitted over TLS, and accessible only to authorized personnel with a legitimate business need.
                </p>
                <p>
                  We don&apos;t sell contact lists, we don&apos;t share data with third-party marketers, and we honor opt-out
                  requests immediately. Every email includes a one-click unsubscribe and our postal address per
                  CAN-SPAM requirements.
                </p>
                <p className="rounded-2xl border border-purple-200 bg-purple-50 p-6 font-semibold text-purple-900 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300">
                  Questions about our data practices? Review our privacy policy or submit a data subject request
                  through the form above.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
