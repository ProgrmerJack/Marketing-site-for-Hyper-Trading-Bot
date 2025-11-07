"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";
import {
  Shield,
  Lock,
  CheckCircle2,
  Clock,
  Server,
  Globe,
  Users,
  AlertTriangle,
  Mail,
  Cookie,
  Cpu,
  MapPin,
  RefreshCw,
  Phone,
  FileText,
} from "lucide-react";

const sections = [
  {
    id: "collection",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    title: "Information we collect",
    summary: "We collect the minimum necessary to administer the demo and respond to qualified requests.",
    items: [
      "Contact information when you submit a consented request form.",
      "Technical metadata (browser, device) used for security logging and Core Web Vitals.",
      "Cookie consent preferences stored with a timestamp and IP hash.",
    ],
  },
  {
    id: "usage",
    icon: Lock,
    gradient: "from-purple-500 to-pink-500",
    title: "How we use your information",
    summary: "We do not sell or share data for advertising.",
    items: [
      "Respond to demo requests and perform compliance checks.",
      "Send double opt-in confirmation and essential operational updates.",
      "Monitor platform health, security events, and accessibility metrics.",
    ],
  },
  {
    id: "rights",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    title: "Your rights",
    summary: "We honour data subject rights under GDPR/CCPA. Contact privacy@hypertrader.io.",
    items: [
      "Access, rectification, and deletion.",
      "Opt-out of sale/share (implemented via Do Not Sell/Share and GPC).",
      "Right to withdraw consent at any time.",
    ],
  },
  {
    id: "retention",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    title: "Data retention",
    summary: "We retain data only as long as necessary for the purposes stated, or as required by law.",
    details: [
      {
        label: "Contact Form Submissions",
        text: "Retained for 24 months after last contact, then archived or deleted unless ongoing business relationship exists.",
      },
      {
        label: "Technical Logs",
        text: "Security and error logs retained for 90 days for incident investigation. Aggregated analytics retained indefinitely with IP addresses removed.",
      },
      {
        label: "Cookie Preferences",
        text: "Stored for 12 months, then re-consent requested. You can update preferences anytime via the footer link.",
      },
      {
        label: "Deletion Requests",
        text: "Processed within 30 days of verification. Some data may be retained in backups for up to 90 days, but will not be used for processing.",
      },
    ],
  },
];

const providers = [
  {
    name: "Hosting & Infrastructure",
    provider: "Vercel Inc.",
    location: "USA",
    description: "Hosts the marketing site and demo environment. Data processed: IP addresses, request headers, performance metrics.",
    link: "https://vercel.com/legal/privacy-policy",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Error Monitoring",
    provider: "Sentry.io",
    location: "USA",
    description: "Collects error reports and performance traces. Personal data minimized.",
    link: "https://sentry.io/privacy/",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Analytics (When Enabled)",
    provider: "Privacy-respecting tools",
    location: "TBD",
    description: "We may use privacy-respecting analytics tools with IP anonymization. If deployed, you'll be notified via updated consent banner. No third-party advertising trackers are used.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function PrivacyPage() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <div className="relative">
      <PageHeaderAnimated
        eyebrow="Legal"
        title="Privacy Policy"
        description="UK GDPR, GDPR, and CCPA compliant notice. This page is updated whenever our processing activities change."
        backgroundVariant="threads"
        backgroundColors={["rgba(59, 130, 246, 0.4)", "rgba(139, 92, 246, 0.3)", "rgba(16, 185, 129, 0.25)"]}
      />

      {/* Main Content Section */}
      <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-950 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20">
          {backgroundsEnabled && hydrated ? (
            <AnimatedBackground
              variant="dither"
              colors={["rgba(59, 130, 246, 0.3)", "rgba(139, 92, 246, 0.25)", "rgba(16, 185, 129, 0.2)"]}
              speed="32s"
              opacity={0.5}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/30" />
          )}
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl space-y-12">
            {/* Core Sections */}
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 md:p-10"
                >
                  <div className="mb-6 flex items-start gap-4">
                    <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {section.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {section.summary}
                      </p>
                    </div>
                  </div>

                  {section.items && (
                    <ul className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600 dark:text-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.details && (
                    <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {section.details.map((detail, idx) => (
                        <p key={idx}>
                          <strong className="text-slate-900 dark:text-white">{detail.label}:</strong> {detail.text}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Third-party Service Providers */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 md:p-10"
            >
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                  <Server className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                    Third-party service providers
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    We use limited third-party services to operate the platform. Each processor is contractually bound to GDPR/CCPA standards.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {providers.map((provider, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50"
                  >
                    <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                      {provider.name}
                    </h3>
                    <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
                      <strong>{provider.provider}</strong> ({provider.location}) - {provider.description}
                    </p>
                    {provider.link && (
                      <a
                        href={provider.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Privacy policy →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Sections - Simplified Cards */}
            {[
              {
                icon: Globe,
                gradient: "from-purple-500 to-pink-500",
                title: "International data transfers",
                content: [
                  { label: "Data Transfers to USA", text: "Vercel and Sentry are based in the United States. We rely on Standard Contractual Clauses (SCCs) and their participation in recognized data protection frameworks to ensure GDPR-compliant transfers." },
                  { label: "EU Data Residency", text: "We do not currently offer EU-only hosting, but may do so in future based on regulatory requirements or customer demand." },
                ],
              },
              {
                icon: Users,
                gradient: "from-red-500 to-orange-500",
                title: "Children's privacy",
                content: [
                  { label: "Age Restriction", text: "You must be at least 18 years old to use this service. Trading and investment services are restricted to adults." },
                  { label: "COPPA Compliance", text: "We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided personal information, we will delete it immediately." },
                ],
              },
              {
                icon: AlertTriangle,
                gradient: "from-orange-500 to-red-500",
                title: "Data breach notification",
                content: [
                  { label: "Notification Timeline", text: "If a breach poses a risk to your rights and freedoms, we will notify you within 72 hours of becoming aware of the breach, as required by GDPR Article 33." },
                  { label: "Information Provided", text: "Notifications will include the nature of the breach, categories of data affected, likely consequences, and measures taken to mitigate harm." },
                ],
              },
              {
                icon: Mail,
                gradient: "from-blue-500 to-cyan-500",
                title: "Marketing communications",
                content: [
                  { label: "Double Opt-In", text: "After submitting a contact form, you'll receive a confirmation email requiring you to click a link before receiving any marketing communications." },
                  { label: "Unsubscribe", text: "Every marketing email includes a one-click unsubscribe link at the bottom. Unsubscribe requests are processed within 10 business days." },
                ],
              },
              {
                icon: Cookie,
                gradient: "from-emerald-500 to-teal-500",
                title: "Cookie policy",
                content: [
                  { label: "Essential Cookies", text: "Theme preference, consent record, and session management cookies are always active as they're necessary for the website to function." },
                  { label: "Performance Cookies (Opt-In)", text: "Analytics, error reporting, and Core Web Vitals metrics help us understand how visitors interact with the site. No personal data sold." },
                ],
              },
              {
                icon: MapPin,
                gradient: "from-amber-500 to-yellow-500",
                title: "California residents (CCPA/CPRA)",
                content: [
                  { label: "Rights Overview", text: "You have the right to know, delete, and opt-out. We do not sell personal information and honor Global Privacy Control (GPC) signals." },
                  { label: "Contact", text: "To exercise your rights, email privacy@hypertrader.io with \"CCPA Request\" in the subject line. We will verify your identity and respond within 45 days." },
                ],
              },
              {
                icon: RefreshCw,
                gradient: "from-purple-500 to-indigo-500",
                title: "Policy updates",
                content: [
                  { label: "Last Updated", text: "This Privacy Policy was last updated on October 16, 2025." },
                  { label: "Change Notification", text: "Material changes will be communicated via email to opted-in users and prominently displayed on the site for 30 days." },
                ],
              },
              {
                icon: Phone,
                gradient: "from-emerald-500 to-teal-500",
                title: "Contact information",
                content: [
                  { label: "Email", text: "privacy@hypertrader.io" },
                  { label: "Data Protection Officer", text: "Abduxoliq Ashuraliyev (interim)" },
                  { label: "Response Time", text: "We aim to respond to all inquiries within 5 business days, and complete data subject requests within 30 days." },
                ],
              },
            ].map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 md:p-10"
                >
                  <div className="mb-6 flex items-start gap-4">
                    <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {section.content.map((item, idx) => (
                      <p key={idx}>
                        <strong className="text-slate-900 dark:text-white">{item.label}:</strong> {item.text}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
