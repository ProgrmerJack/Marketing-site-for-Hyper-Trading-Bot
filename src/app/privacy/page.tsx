"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { SpotlightCard } from "@/components/reactbits/dynamic";
// AnimatedBackground was intentionally removed from per-page usage; UnifiedBackground provides the global animation.
import {
  // Shield not used directly
  Lock,
  CheckCircle2,
  Clock,
  Server,
  Globe,
  Users,
  AlertTriangle,
  Mail,
  Cookie,
  MapPin,
  RefreshCw,
  Phone,
  FileText,
} from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
import { CryptoVaultHero } from "@/components/hero/CryptoVaultHero";

const sections = [
  {
    id: "scope",
    icon: Globe,
    gradient: "from-slate-500 to-gray-600",
    title: "Scope of This Policy",
    summary: "This Privacy Policy applies to all personal data collected through the Site.",
    items: [
      "This Privacy Policy applies to the website hypertrader.io and all associated subdomains.",
      "This Policy describes how we collect, use, disclose, and safeguard your personal information.",
      "By accessing or using the Site, you consent to the practices described in this Policy.",
      "This Policy does not apply to third-party websites, products, or services linked from the Site.",
    ],
  },
  {
    id: "collection",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    title: "Information We Collect",
    summary: "We collect the minimum necessary to administer the demo and respond to qualified requests.",
    details: [
      {
        label: "Information You Provide",
        text: "Contact information (name, email, company) when you submit forms; communications you send to us; and any feedback or content you voluntarily provide.",
      },
      {
        label: "Automatically Collected Data",
        text: "IP address (hashed for privacy), browser type and version, operating system, referring URLs, pages visited, time and date of visits, and other technical data.",
      },
      {
        label: "Cookies and Tracking",
        text: "We use essential cookies required for site functionality. Performance cookies are only set with your consent. We honor Global Privacy Control (GPC) signals.",
      },
      {
        label: "Device Information",
        text: "We may collect device identifiers, screen resolution, and timezone to optimize your experience and detect security threats.",
      },
    ],
  },
  {
    id: "legal-basis",
    icon: FileText,
    gradient: "from-indigo-500 to-blue-500",
    title: "Legal Basis for Processing (GDPR)",
    summary: "We process personal data only when we have a valid legal basis under GDPR.",
    details: [
      {
        label: "Consent",
        text: "We rely on your explicit consent for non-essential cookies, marketing communications, and demo access requests. You may withdraw consent at any time.",
      },
      {
        label: "Legitimate Interests",
        text: "We process data for security monitoring, fraud prevention, service improvement, and analytics where our interests do not override your rights.",
      },
      {
        label: "Contractual Necessity",
        text: "Processing necessary to respond to your inquiries or provide requested services.",
      },
      {
        label: "Legal Obligations",
        text: "Processing required to comply with applicable laws, regulations, or legal processes.",
      },
    ],
  },
  {
    id: "usage",
    icon: Lock,
    gradient: "from-purple-500 to-pink-500",
    title: "How We Use Your Information",
    summary: "We do not sell or share data for advertising.",
    details: [
      {
        label: "Service Provision",
        text: "To respond to demo requests, provide customer support, and communicate about our services.",
      },
      {
        label: "Security & Fraud Prevention",
        text: "To detect and prevent fraudulent transactions, unauthorized access, and other security incidents.",
      },
      {
        label: "Analytics & Improvement",
        text: "To analyze site usage, measure performance, improve functionality, and develop new features.",
      },
      {
        label: "Legal Compliance",
        text: "To comply with applicable laws, regulations, court orders, and government requests.",
      },
      {
        label: "Communications",
        text: "To send you updates about our services (with consent), respond to inquiries, and provide important notices.",
      },
    ],
  },
  {
    id: "sharing",
    icon: Users,
    gradient: "from-cyan-500 to-teal-500",
    title: "Information Sharing & Disclosure",
    summary: "We do not sell your personal information. We share data only in limited circumstances.",
    details: [
      {
        label: "Service Providers",
        text: "We share data with trusted service providers (hosting, analytics, email) who process data on our behalf under contractual obligations to protect your data.",
      },
      {
        label: "Legal Requirements",
        text: "We may disclose data when required by law, subpoena, or government request, or to protect our rights, safety, or property.",
      },
      {
        label: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of assets, your data may be transferred. We will notify you of any change in ownership or control.",
      },
      {
        label: "With Your Consent",
        text: "We may share data with third parties when you explicitly authorize us to do so.",
      },
    ],
  },
  {
    id: "rights",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    title: "Your Privacy Rights",
    summary: "We honour data subject rights under GDPR, UK GDPR, and CCPA. Contact privacy@hypertrader.io.",
    details: [
      {
        label: "Right to Access",
        text: "You have the right to request a copy of the personal data we hold about you.",
      },
      {
        label: "Right to Rectification",
        text: "You have the right to request correction of inaccurate or incomplete personal data.",
      },
      {
        label: "Right to Erasure",
        text: "You have the right to request deletion of your personal data (subject to legal retention requirements).",
      },
      {
        label: "Right to Restrict Processing",
        text: "You have the right to request that we limit how we use your data.",
      },
      {
        label: "Right to Data Portability",
        text: "You have the right to receive your data in a structured, commonly used format.",
      },
      {
        label: "Right to Object",
        text: "You have the right to object to processing based on legitimate interests or for direct marketing.",
      },
      {
        label: "Right to Withdraw Consent",
        text: "Where processing is based on consent, you may withdraw consent at any time without affecting prior processing.",
      },
      {
        label: "Right to Opt-Out (CCPA)",
        text: "California residents have the right to opt-out of the sale/sharing of personal information via Do Not Sell/Share link.",
      },
    ],
  },
  {
    id: "ccpa",
    icon: MapPin,
    gradient: "from-orange-500 to-red-500",
    title: "California Privacy Rights (CCPA/CPRA)",
    summary: "Additional disclosures for California residents under the California Consumer Privacy Act.",
    details: [
      {
        label: "Categories Collected",
        text: "Identifiers (name, email, IP), internet activity (browsing history), and geolocation data (country/region).",
      },
      {
        label: "No Sale of Data",
        text: "We do not sell personal information as defined under CCPA. We do not share data for cross-context behavioral advertising.",
      },
      {
        label: "Sensitive Personal Information",
        text: "We do not collect sensitive personal information as defined under CPRA (Social Security numbers, financial accounts, precise geolocation, etc.).",
      },
      {
        label: "Financial Incentives",
        text: "We do not offer financial incentives or price differences in exchange for the retention or sale of personal information.",
      },
      {
        label: "Authorized Agents",
        text: "You may designate an authorized agent to make requests on your behalf. We will verify both your identity and the agent's authority.",
      },
    ],
  },
  {
    id: "retention",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    title: "Data Retention",
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
        text: "Processed within 30 days of verification (45 days for CCPA requests). Some data may be retained in backups for up to 90 days, but will not be used for processing.",
      },
      {
        label: "Legal Hold",
        text: "Data may be retained longer if required for pending litigation, audit, or regulatory investigation.",
      },
    ],
  },
  {
    id: "security",
    icon: Lock,
    gradient: "from-red-500 to-pink-500",
    title: "Data Security",
    summary: "We implement industry-standard security measures to protect your personal information.",
    details: [
      {
        label: "Encryption",
        text: "All data transmitted to and from our Site is encrypted using TLS 1.3. Data at rest is encrypted using AES-256.",
      },
      {
        label: "Access Controls",
        text: "Access to personal data is restricted to authorized personnel on a need-to-know basis with multi-factor authentication.",
      },
      {
        label: "Security Monitoring",
        text: "We continuously monitor for security threats and vulnerabilities. We conduct regular security assessments.",
      },
      {
        label: "Incident Response",
        text: "We maintain incident response procedures and will notify affected individuals and supervisory authorities of data breaches as required by law.",
      },
      {
        label: "No Guarantee",
        text: "While we implement robust security measures, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "international",
    icon: Globe,
    gradient: "from-blue-500 to-indigo-500",
    title: "International Data Transfers",
    summary: "Your data may be processed in countries outside your jurisdiction.",
    details: [
      {
        label: "Transfer Mechanisms",
        text: "When transferring data outside the EEA/UK, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission.",
      },
      {
        label: "Service Providers",
        text: "Our primary service providers are located in the United States. We ensure adequate safeguards are in place.",
      },
      {
        label: "Your Rights",
        text: "You may request information about the safeguards in place for international transfers by contacting privacy@hypertrader.io.",
      },
    ],
  },
  {
    id: "children",
    icon: AlertTriangle,
    gradient: "from-yellow-500 to-amber-500",
    title: "Children's Privacy",
    summary: "This Site is not intended for children under 18.",
    items: [
      "We do not knowingly collect personal information from children under 18 years of age.",
      "If we learn that we have collected data from a child under 18, we will delete that information promptly.",
      "If you believe we have collected information from a child, please contact privacy@hypertrader.io immediately.",
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    gradient: "from-violet-500 to-purple-500",
    title: "Cookies & Tracking Technologies",
    summary: "We use cookies to enhance your experience. You can manage preferences at any time.",
    details: [
      {
        label: "Essential Cookies",
        text: "Required for site functionality, security, and remembering your preferences. Cannot be disabled.",
      },
      {
        label: "Performance Cookies",
        text: "Help us understand how visitors use the Site. Only set with your consent. Anonymized data used for analytics.",
      },
      {
        label: "Global Privacy Control",
        text: "We honor GPC signals as an opt-out of sale/sharing under CCPA. When detected, non-essential cookies are blocked automatically.",
      },
      {
        label: "Cookie Management",
        text: "You can manage cookie preferences through our consent banner or browser settings. Note that disabling cookies may affect functionality.",
      },
    ],
  },
  {
    id: "changes",
    icon: RefreshCw,
    gradient: "from-teal-500 to-cyan-500",
    title: "Changes to This Policy",
    summary: "We may update this Policy periodically and will notify you of material changes.",
    items: [
      "We will update the 'Last Updated' date when we make changes to this Policy.",
      "For material changes, we will provide prominent notice on the Site or via email.",
      "Your continued use of the Site after changes constitutes acceptance of the updated Policy.",
      "We encourage you to review this Policy periodically for the latest information.",
    ],
  },
  {
    id: "contact",
    icon: Phone,
    gradient: "from-emerald-500 to-green-500",
    title: "Contact Us",
    summary: "Questions about this Policy or your privacy rights? Contact our privacy team.",
    details: [
      {
        label: "Privacy Inquiries",
        text: "privacy@hypertrader.io - For data subject requests, opt-outs, and privacy questions.",
      },
      {
        label: "General Support",
        text: "support@hypertrader.io - For general inquiries and technical support.",
      },
      {
        label: "Data Protection Officer",
        text: "dpo@hypertrader.io - For formal complaints or escalations regarding data protection.",
      },
      {
        label: "Response Time",
        text: "We aim to respond to all privacy inquiries within 30 days (45 days for complex CCPA requests).",
      },
      {
        label: "Supervisory Authority",
        text: "You have the right to lodge a complaint with your local data protection authority if you believe we have violated your privacy rights.",
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
  return (
    <div className="relative">
      <PageHeaderAnimated
        eyebrow="Legal"
        title="Privacy Policy"
        description="UK GDPR, GDPR, and CCPA compliant notice. This page is updated whenever our processing activities change. We are committed to protecting your personal data and ensuring transparency in how we handle your information."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="w-96">
            <div className="rounded-2xl border border-slate-200/50 bg-white/10 p-6 shadow-xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/50">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Privacy</div>
              <div className="mb-3 text-lg font-bold text-slate-900 dark:text-white">We minimise data collection</div>
              <p className="text-xs text-muted-foreground">We collect minimal personal data and we never sell your information. Read the full policy for details.</p>
              <div className="mt-4 flex gap-3">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.18 }}
                >
                  Contact privacy
                </motion.a>
                <motion.button
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.18 }}
                >
                  Download PDF
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </PageHeaderAnimated>

      {/* Main Content Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Unified2DBackground variant="legal" intensity={0.5} />

        {/* CryptoVaultHero - 3D Vault Visualization */}
        <div className="absolute left-0 top-1/3 -translate-y-1/2 opacity-20 dark:opacity-15 pointer-events-none hidden xl:block">
          <div className="w-[450px] h-[450px]">
            <CryptoVaultHero />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
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
                >
                  <SpotlightCard
                    className="group relative overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-white/95 via-slate-50/50 to-gray-50/40 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-slate-400/80 hover:shadow-2xl hover:-translate-y-2 dark:border-slate-700/70 dark:from-slate-900/95 dark:via-slate-900/50 dark:to-gray-900/40 dark:hover:border-slate-600/80"
                    spotlightColor="rgba(99, 102, 241, 0.15)"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
                    <div className="relative mb-6 flex items-start gap-4">
                      <ColorIcon Icon={Icon} gradient={section.gradient} size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor(section.gradient.includes('blue') ? 'blue' : section.gradient.includes('emerald') ? 'emerald' : section.gradient.includes('purple') ? 'purple' : section.gradient.includes('amber') ? 'orange' : 'indigo')} />
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
                      <ul className="relative space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm">
                              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                            </span>
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
                  </SpotlightCard>
                </motion.div>
              );
            })}

            {/* Third-party Service Providers */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SpotlightCard
                className="rounded-3xl border border-slate-200/50 bg-white/40 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/40 md:p-10"
                spotlightColor="rgba(99, 102, 241, 0.15)"
              >
                <div className="mb-8 flex items-start gap-4">
                  <ColorIcon Icon={Server} gradient="from-indigo-500 to-purple-500" size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor('purple')} />
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
                      className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-6 dark:border-slate-700/60 dark:bg-slate-800/50"
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
              </SpotlightCard>
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
                >
                  <SpotlightCard
                    className="rounded-3xl border border-slate-200/50 bg-white/40 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/40 md:p-10"
                    spotlightColor="rgba(99, 102, 241, 0.15)"
                  >
                    <div className="mb-6 flex items-start gap-4">
                      <ColorIcon Icon={Icon} gradient={section.gradient} size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor(section.gradient.includes('blue') ? 'blue' : section.gradient.includes('emerald') ? 'emerald' : section.gradient.includes('purple') ? 'purple' : section.gradient.includes('amber') ? 'orange' : section.gradient.includes('red') ? 'red' : 'indigo')} />
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
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
