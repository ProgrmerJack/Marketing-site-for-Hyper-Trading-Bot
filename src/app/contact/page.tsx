"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { ContactForm } from "@/components/forms/contact-form";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";
import { Mail, Shield, FileCheck, CheckCircle2, HelpCircle } from "lucide-react";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";

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
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <div className="relative space-y-0">
      <PageHeaderAnimated
        eyebrow="Contact"
        title="Tell us about your mandate -- no sales fluff, just validation"
        description="Complete the consent-aware form below. You&apos;ll receive a double opt-in email with our postal address and unsubscribe option per CAN-SPAM."
        backgroundVariant="threads"
        backgroundColors={["rgba(59, 130, 246, 0.4)", "rgba(139, 92, 246, 0.3)", "rgba(16, 185, 129, 0.25)"]}
      />

      {/* Contact Form Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
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
                Share your details so compliance and engineering can evaluate whether we're a fit.
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
                <div className="overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 p-8 shadow-lg dark:border-blue-800/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-cyan-950/20">
                  <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                    What happens next
                  </h2>
                  <ol className="space-y-6">
                    {processSteps.map((step) => (
                      <motion.li
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: step.number * 0.1 }}
                        className="flex gap-4"
                      >
                        <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} text-sm font-bold text-white shadow-lg`}>
                          {step.number}
                        </span>
                        <div className="flex-1 pt-1">
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
                <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 p-8 shadow-lg dark:border-emerald-800/50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-teal-950/20">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                      <HelpCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Frequently asked
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {faqs.map((faq, index) => {
                      const Icon = faq.icon;
                      return (
                        <motion.li
                          key={faq.question}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="space-y-2"
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
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="beams"
              colors={["rgba(139, 92, 246, 0.3)", "rgba(236, 72, 153, 0.25)", "rgba(59, 130, 246, 0.2)"]}
              speed="28s"
              opacity={0.65}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_70%)]" />
          )}
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-4xl"
          >
            <div className="overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 p-12 shadow-2xl dark:border-purple-800/50 dark:from-slate-900 dark:via-purple-950/30 dark:to-pink-950/20">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Privacy and transparency
                </h3>
              </div>

              <div className="space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
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
