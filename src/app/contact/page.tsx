"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { ContactForm } from "@/components/forms/contact-form";
import { revealUp, staggerContainer } from "@/lib/advanced-animations";

import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { Mail, Shield, FileCheck, CheckCircle2, HelpCircle } from "lucide-react";
import { Icon3D } from "@/components/3d-icons/Icon3D";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { R3FScene } from "@/components/3d/R3FScene";
import { scenes } from "@/components/3d/sceneRegistry";

const ContactScene = scenes.contact.Component;
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
      {/* Global Aurora Background */}
      <AuroraBackground variant="contact" intensity={0.5} />

      <PageHeaderAnimated
        eyebrow="Contact"
        title="Tell us about your mandate -- no sales fluff, just validation"
        description="Complete the consent-aware form below. You&apos;ll receive a double opt-in email with our postal address and unsubscribe option per CAN-SPAM."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(5,8,15,1)", "rgba(34,211,238,1)", "rgba(99,102,241,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <PremiumCard variant="glass-primary" accent="blue" className="w-96 p-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Request gated demo</div>
            <div className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Qualified access</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">We gate demos; provide minimal context and we&apos;ll reach out to qualify access.</p>
            <div className="mt-4">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/50" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Request gated demo
              </motion.a>
            </div>
          </PremiumCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Why Contact Us Section - Extended Content */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-b border-blue-200/50 dark:border-blue-900/50">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <Shield className="mr-2 h-4 w-4" />
                Why reach out
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl drop-shadow-sm">
                What to expect when you contact us
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                We treat every inquiry with the same diligence we apply to trading operations. Our team is distributed globally to ensure 24/7 coverage for critical operational issues, while our compliance and sales teams operate during major market hours.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CheckCircle2,
                  title: "Compliance-first approach",
                  description: "Every request goes through verification. We gate demo access to qualified institutional and professional investors only.",
                  gradient: "from-blue-500 to-cyan-500",
                  accent: "cyan"
                },
                {
                  icon: Shield,
                  title: "No custody, no risk",
                  description: "We never ask for funds, passwords, or account credentials. API integration happens only after legal review and technical sandbox validation.",
                  gradient: "from-purple-500 to-pink-500",
                  accent: "purple"
                },
                {
                  icon: FileCheck,
                  title: "Transparent timeline",
                  description: "Initial response within 24 hours. Full operational due diligence and sandbox walkthrough scheduled within 5 business days.",
                  gradient: "from-emerald-500 to-teal-500",
                  accent: "emerald"
                },
                {
                  icon: Mail,
                  title: "Double opt-in confirmation",
                  description: "You'll receive a confirmation email with unsubscribe link and our postal address per CAN-SPAM. No automated drip campaigns.",
                  gradient: "from-amber-500 to-orange-500",
                  accent: "orange"
                },
                {
                  icon: HelpCircle,
                  title: "Qualify before onboarding",
                  description: "We screen for regulatory fit, jurisdiction, mandate, and technical readiness. Not every inquiry leads to access.",
                  gradient: "from-indigo-500 to-purple-500",
                  accent: "purple"
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <PremiumCard
                      variant="glass-secondary"
                      accent={item.accent as "cyan" | "purple" | "emerald" | "orange"}
                      hover={true}
                      className="h-full p-8"
                    >
                      <div className="relative space-y-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
                          {item.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Signal Globe 3D Scene */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-60 dark:opacity-40 pointer-events-none hidden lg:block">
          <div className="w-[500px] h-[500px]">
            <R3FScene
              className="w-full h-full"
              fallbackSrc={scenes.contact.fallback}
              fallbackAlt={scenes.contact.alt}
            >
              <ContactScene />
            </R3FScene>
          </div>
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
                <PremiumCard
                  variant="glass-secondary"
                  accent="blue"
                  hover={true}
                  className="p-8 glow-multi"
                >
                  <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
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
                </PremiumCard>

                {/* FAQ Card */}
                <PremiumCard
                  variant="glass-secondary"
                  accent="emerald"
                  hover={true}
                  className="p-8 glow-multi"
                >
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
                          className="relative space-y-2"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-none mt-1">
                              <Icon3D icon={Icon} color="emerald" size={20} />
                            </div>
                            <p className="font-semibold text-slate-900 dark:text-white pt-1">
                              {faq.question}
                            </p>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 pl-14">
                            {faq.answer}
                          </p>
                        </motion.li>
                      );
                    })}
                  </ul>
                </PremiumCard>
              </motion.aside>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* NEW SECTION: Support Hours & Locations */}
      <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-slate-200 dark:border-slate-800">
        <Container>
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Global Support
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Our team is distributed across key financial hubs to ensure 24/7 coverage.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { city: "New York", hours: "9:00 AM - 5:00 PM EST", email: "ny@hyperbot.com" },
                { city: "London", hours: "9:00 AM - 5:00 PM GMT", email: "ldn@hyperbot.com" },
                { city: "Singapore", hours: "9:00 AM - 5:00 PM SGT", email: "sg@hyperbot.com" },
              ].map((office, i) => (
                <div key={i} className="rounded-2xl border border-slate-200/60 bg-white/50 p-8 text-center shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/50">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{office.city}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{office.hours}</p>
                  <a href={`mailto:${office.email}`} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">
                    {office.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
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
            <div className="relative overflow-hidden rounded-3xl border border-purple-200/50 bg-white/40 p-12 shadow-2xl backdrop-blur-md dark:border-purple-800/50 dark:bg-slate-900/40">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10" />

              <div className="relative mb-8 flex items-center gap-4">
                <Icon3D icon={Shield} color="purple" size={32} />
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
