"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
// UnifiedBackground provides consistent site-wide animation; local AnimatedBackground removed
import { SpotlightCard } from "@/components/reactbits/dynamic";
import Link from "next/link";
import {
  FileText,
  Monitor,
  Shield,
  Copyright,
  AlertTriangle,
  Scale,
  Gavel,
  Phone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import ColorIcon from "@/components/ui/ColorIcon";
import { accentToShadowColor } from "@/lib/color-shadows";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
import { TrustDNAHelix } from "@/components/hero/TrustDNAHelix";

const terms = [
  {
    id: "agreement",
    number: "1",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    title: "Agreement to Terms",
    summary: "By accessing this website, you agree to be bound by these Terms of Service.",
    content: [
      { text: 'This website ("Site") is operated by Hyper Trading Automation ("we," "us," or "Company"). By accessing or using this Site, you agree to comply with and be bound by these Terms of Service ("Terms").' },
      { text: "If you do not agree to these Terms, you must not access or use this Site. We reserve the right to modify these Terms at any time. Your continued use after changes constitutes acceptance of the modified Terms." },
      { text: "These Terms constitute a legally binding agreement between you and the Company. You represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms. If you are accessing or using the Site on behalf of an entity, you represent that you have the authority to bind that entity to these Terms." },
    ],
  },
  {
    id: "definitions",
    number: "2",
    icon: FileText,
    gradient: "from-slate-500 to-gray-500",
    title: "Definitions",
    summary: "Key terms used throughout this agreement.",
    details: [
      { label: '"Site"', text: 'Refers to this website located at hypertrader.io and all associated subdomains, pages, and content.' },
      { label: '"Services"', text: 'Refers to any demonstration, educational, or informational content provided through the Site, including but not limited to market data displays, performance visualizations, and documentation.' },
      { label: '"User" or "You"', text: 'Refers to any individual or entity accessing or using the Site.' },
      { label: '"Content"', text: 'Refers to all text, graphics, images, data, code, software, video, audio, and other materials displayed on or available through the Site.' },
      { label: '"Demo Data"', text: 'Refers to any simulated, hypothetical, or historical trading data, performance metrics, or visualizations displayed on the Site.' },
    ],
  },
  {
    id: "service",
    number: "3",
    icon: Monitor,
    gradient: "from-purple-500 to-pink-500",
    title: "Service Description",
    summary: "This is a demonstration site only — no live trading services are currently available.",
    details: [
      { label: "Demo Site", text: "This Site provides demonstration and educational content about an automated cryptocurrency trading system currently under development and analysis. All market data, performance metrics, and visualizations are for demonstration purposes only." },
      { label: "No Live Trading", text: "This Site does not offer, provide, or enable live trading services. No actual trades are executed through this Site. This Site does not accept customer funds." },
      { label: "Not Financial Advice", text: "Nothing on this Site constitutes financial advice, investment recommendations, or trading signals. You should consult qualified financial, legal, and tax advisors before making any investment decisions." },
      { label: "Analysis Phase", text: "The trading system is currently undergoing analysis, error correction, performance validation, and regulatory review. No independent audit has been completed. Launch timeline is uncertain." },
      { label: "No Guarantee of Availability", text: "We do not guarantee that the Site or Services will be available continuously, securely, or error-free. We may suspend, withdraw, or restrict access to all or any part of the Site at any time without notice." },
    ],
  },
  {
    id: "eligibility",
    number: "4",
    icon: Shield,
    gradient: "from-cyan-500 to-blue-500",
    title: "Eligibility & Access",
    summary: "Requirements for accessing and using this Site.",
    details: [
      { label: "Age Requirement", text: "You must be at least 18 years of age to access this Site. By accessing the Site, you represent and warrant that you meet this age requirement." },
      { label: "Jurisdictional Restrictions", text: "Access to this Site may be restricted in certain jurisdictions. You are responsible for compliance with all local laws. We make no representation that the Site or its Content is appropriate or available in all locations." },
      { label: "Prohibited Users", text: "You may not access this Site if you are a citizen or resident of a jurisdiction where such access is prohibited, or if you are subject to economic sanctions or on any restricted party list maintained by any government authority." },
      { label: "Account Security", text: "If you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activities under your account. You must notify us immediately of any unauthorized use." },
    ],
  },
  {
    id: "use",
    number: "5",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    title: "Acceptable Use",
    summary: "Rules for accessing and using this Site.",
    prohibitions: [
      "Misrepresent demo data as live trading results or verified performance",
      "Claim endorsement or affiliation without explicit written permission",
      "Attempt to access restricted areas, APIs, or bypass security controls",
      "Use automated systems to scrape content or overwhelm server resources",
      "Reverse engineer, decompile, or extract source code from the Site",
      "Upload malicious code, viruses, or conduct security attacks",
      "Violate any applicable laws or regulations",
      "Reproduce, modify, or distribute content without proper attribution",
      "Impersonate any person or entity or falsely represent your affiliation",
      "Engage in any activity that interferes with or disrupts the Site's operation",
      "Collect personal information of other users without their consent",
      "Use the Site for any commercial purpose without express written permission",
    ],
  },
  {
    id: "ip",
    number: "6",
    icon: Copyright,
    gradient: "from-amber-500 to-orange-500",
    title: "Intellectual Property",
    summary: "Ownership of content and trademarks.",
    content: [
      { text: "All content, design, code, logos, trademarks, and materials on this Site are owned by or licensed to Hyper Trading Automation and are protected by copyright, trademark, and other intellectual property laws." },
      { text: "The compilation, organization, and display of Content on this Site is the exclusive property of the Company and is protected by U.S. and international copyright laws." },
    ],
    details: [
      { label: "Limited License", text: "We grant you a limited, non-exclusive, non-transferable, revocable license to access and view Site content for personal, non-commercial use only. This license does not include rights to download, modify, distribute, or create derivative works." },
      { label: "Trademarks", text: '"Hyper Trading Automation," "HyperTrader," logos, and related marks are our trademarks. Unauthorized use is prohibited.' },
      { label: "User Submissions", text: "By submitting any content or feedback to us, you grant us a worldwide, royalty-free, perpetual, irrevocable license to use, modify, publish, and distribute such content for any purpose." },
      { label: "Third-Party Content", text: "The Site may contain third-party content or links to third-party websites. We are not responsible for such content and do not endorse any third-party materials." },
    ],
  },
  {
    id: "privacy",
    number: "7",
    icon: Shield,
    gradient: "from-violet-500 to-purple-500",
    title: "Privacy & Data Protection",
    summary: "How we collect, use, and protect your information.",
    content: [
      { text: "Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Site, you consent to the practices described in our Privacy Policy." },
    ],
    details: [
      { label: "Data Collection", text: "We may collect personal information you provide directly, as well as usage data collected automatically through cookies and similar technologies." },
      { label: "Data Security", text: "We implement reasonable security measures to protect your information, but no transmission over the Internet is completely secure. You provide information at your own risk." },
      { label: "Third-Party Services", text: "We may use third-party services that collect, monitor, and analyze data. These services have their own privacy policies." },
    ],
  },
  {
    id: "disclaimers",
    number: "8",
    icon: AlertTriangle,
    gradient: "from-red-500 to-orange-500",
    title: "Disclaimers & Warranties",
    summary: 'THIS SITE IS PROVIDED "AS-IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND.',
    details: [
      { label: "No Warranty", text: "WE EXPRESSLY DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, COMPLETENESS, TITLE, AND NON-INFRINGEMENT." },
      { label: "No Performance Guarantee", text: "DEMO DATA, SIMULATED RESULTS, AND HISTORICAL PERFORMANCE DO NOT GUARANTEE FUTURE RESULTS. TRADING INVOLVES SUBSTANTIAL RISK INCLUDING TOTAL LOSS OF CAPITAL." },
      { label: "Data Accuracy", text: "WHILE WE STRIVE FOR ACCURACY, WE DO NOT GUARANTEE THAT SITE CONTENT, DATA, OR FUNCTIONALITY WILL BE ERROR-FREE, UNINTERRUPTED, SECURE, OR CURRENT." },
      { label: "Third-Party Content", text: "WE DISCLAIM ALL LIABILITY FOR ANY THIRD-PARTY CONTENT, LINKS, PRODUCTS, OR SERVICES REFERENCED ON OR ACCESSIBLE THROUGH THE SITE." },
      { label: "Technical Issues", text: "WE ARE NOT LIABLE FOR ANY TECHNICAL ISSUES, BUGS, VIRUSES, OR OTHER HARMFUL COMPONENTS THAT MAY AFFECT YOUR EQUIPMENT." },
    ],
  },
  {
    id: "liability",
    number: "9",
    icon: Scale,
    gradient: "from-indigo-500 to-purple-500",
    title: "Limitation of Liability",
    summary: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THIS SITE.",
    content: [
      { text: "IN NO EVENT SHALL THE COMPANY, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES." },
      { text: "OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS OR THE SITE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100)." },
      { text: "Some jurisdictions do not allow limitation of implied warranties or liability for incidental or consequential damages. In such jurisdictions, our liability is limited to the maximum extent permitted by law." },
    ],
  },
  {
    id: "indemnification",
    number: "10",
    icon: Shield,
    gradient: "from-rose-500 to-pink-500",
    title: "Indemnification",
    summary: "You agree to defend and indemnify us against claims arising from your use of the Site.",
    content: [
      { text: "You agree to defend, indemnify, and hold harmless the Company and its officers, directors, employees, agents, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site." },
      { text: "We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims." },
    ],
  },
  {
    id: "termination",
    number: "11",
    icon: XCircle,
    gradient: "from-gray-500 to-slate-600",
    title: "Termination",
    summary: "Terms for terminating access to the Site.",
    details: [
      { label: "Our Right to Terminate", text: "We may suspend or terminate your access to the Site at any time, for any reason, without notice or liability, including for violation of these Terms." },
      { label: "Effect of Termination", text: "Upon termination, your right to use the Site immediately ceases. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability." },
      { label: "No Liability", text: "We shall not be liable to you or any third party for any termination of your access to the Site." },
    ],
  },
  {
    id: "law",
    number: "12",
    icon: Gavel,
    gradient: "from-blue-500 to-indigo-500",
    title: "Governing Law & Disputes",
    summary: "Legal jurisdiction and dispute resolution.",
    details: [
      { label: "Governing Law", text: "These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions." },
      { label: "Arbitration Agreement", text: "Any dispute arising from these Terms or Site use shall be resolved through binding arbitration administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules." },
      { label: "Class Action Waiver", text: "YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION." },
      { label: "Venue", text: "Any litigation not subject to arbitration shall be brought exclusively in the federal or state courts located in Delaware, and you consent to personal jurisdiction in those courts." },
    ],
  },
  {
    id: "modifications",
    number: "13",
    icon: FileText,
    gradient: "from-teal-500 to-cyan-500",
    title: "Modifications to Terms",
    summary: "How we update these Terms.",
    content: [
      { text: "We reserve the right to modify these Terms at any time in our sole discretion. When we make changes, we will update the 'Last Updated' date at the top of these Terms and, where appropriate, provide additional notice." },
      { text: "Your continued use of the Site after any modifications constitutes acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using the Site." },
    ],
  },
  {
    id: "severability",
    number: "14",
    icon: Scale,
    gradient: "from-green-500 to-emerald-500",
    title: "Severability & Waiver",
    summary: "How invalid provisions and waivers are handled.",
    details: [
      { label: "Severability", text: "If any provision of these Terms is found to be invalid or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect." },
      { label: "No Waiver", text: "Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative of the Company." },
      { label: "Entire Agreement", text: "These Terms, together with our Privacy Policy and any other legal notices published on the Site, constitute the entire agreement between you and the Company regarding the Site." },
    ],
  },
  {
    id: "contact",
    number: "15",
    icon: Phone,
    gradient: "from-emerald-500 to-teal-500",
    title: "Contact Information",
    summary: "How to reach us with questions about these Terms.",
    contact: [
      { label: "Legal Inquiries", value: "legal@hypertrader.io", link: "mailto:legal@hypertrader.io" },
      { label: "General Support", value: "support@hypertrader.io", link: "mailto:support@hypertrader.io" },
      { label: "Founder", value: "Abduxoliq Ashuraliyev" },
      { label: "Response Time", value: "We aim to respond to all inquiries within 5-7 business days." },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative">
      <PageHeaderAnimated
        eyebrow="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before accessing this site or requesting demo access. Last updated: October 16, 2025. These terms govern your use of our website and services, including any content, functionality, and services offered on or through the site."
        backgroundVariant="hyperspeed"
        backgroundOpacity={0.9}
        backgroundColors={["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"]}
      >
        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard className="w-96 rounded-2xl border border-slate-200/50 bg-white/10 p-6 shadow-xl backdrop-blur-md hover:shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/50">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal summary</div>
            <div className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Important highlights</div>
            <p className="text-xs text-muted-foreground">Accessing the site means you accept terms. Contact legal@hypertrader.io for inquiries.</p>
            <div className="mt-4 flex gap-3">
              <motion.a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/50" whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                Contact legal
              </motion.a>
              <motion.button
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.18 }}
              >
                Download PDF
              </motion.button>
            </div>
          </SpotlightCard>
        </motion.div>
      </PageHeaderAnimated>

      {/* Add a subtle 3D mini to the top of the Terms page */}

      {/* Main Content Section */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Unified2DBackground variant="legal" intensity={0.5} />

        {/* TrustDNAHelix - 3D Trust Visualization */}
        <div className="absolute right-0 top-1/3 -translate-y-1/2 opacity-18 dark:opacity-12 pointer-events-none hidden xl:block">
          <div className="w-[400px] h-[600px]">
            <TrustDNAHelix />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-35">
          {/* Per-section AnimatedBackground removed; rely on UnifiedBackground */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.06),rgba(59,130,246,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.04),rgba(96,165,250,0.03),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl space-y-12">
            {terms.map((term, index) => {
              const Icon = term.icon;
              return (
                <motion.div
                  key={term.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-white/95 via-slate-50/50 to-gray-50/40 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-slate-400/80 hover:shadow-2xl hover:-translate-y-2 dark:border-slate-700/70 dark:from-slate-900/95 dark:via-slate-900/50 dark:to-gray-900/40 dark:hover:border-slate-600/80"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
                  <div className="relative mb-6 flex items-start gap-4">
                    <ColorIcon Icon={Icon} gradient={term.gradient} size="h-14 w-14" iconClass="h-7 w-7" shadowColor={accentToShadowColor(term.gradient.includes('blue') ? 'blue' : term.gradient.includes('emerald') ? 'emerald' : term.gradient.includes('purple') ? 'purple' : term.gradient.includes('amber') ? 'orange' : term.gradient.includes('red') ? 'red' : 'indigo')} />
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {term.number}. {term.title}
                      </h2>
                      <p className={`text-sm leading-relaxed ${term.id === 'disclaimers' || term.id === 'liability' ? 'font-semibold uppercase text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {term.summary}
                      </p>
                    </div>
                  </div>

                  {term.content && (
                    <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {term.content.map((item, idx) => (
                        <p key={idx}>{item.text}</p>
                      ))}
                    </div>
                  )}

                  {term.details && (
                    <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {term.details.map((detail, idx) => (
                        <p key={idx}>
                          <strong className="text-slate-900 dark:text-white">{detail.label}:</strong> {detail.text}
                        </p>
                      ))}
                    </div>
                  )}

                  {term.prohibitions && (
                    <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      <p className="font-semibold text-slate-900 dark:text-white">You agree NOT to:</p>
                      <ul className="space-y-2">
                        {term.prohibitions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-sm">
                              <XCircle className="h-3 w-3 text-white" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
                        Violation of these rules may result in immediate termination of access, legal action, and notification to law enforcement if appropriate.
                      </p>
                    </div>
                  )}

                  {term.contact && (
                    <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {term.contact.map((item, idx) => (
                        <p key={idx}>
                          <strong className="text-slate-900 dark:text-white">{item.label}:</strong>{" "}
                          {item.link ? (
                            <a
                              href={item.link}
                              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Related Documents */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="rounded-3xl border border-blue-200/50 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-blue-50/30 to-cyan-50/20 p-8 shadow-lg backdrop-blur-md dark:border-blue-800/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-cyan-950/20 md:p-10"
            >
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Related Documents</h2>
              <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">Please also review these important documents:</p>
              <ul className="space-y-3 text-sm">
                {([
                  { href: "/risk-disclosure" as const, label: "Risk Disclosure", desc: "Trading risks and system limitations" },
                  { href: "/privacy" as const, label: "Privacy Policy", desc: "How we handle your data" },
                  { href: "/safety" as const, label: "Safety & Security", desc: "Platform security measures" },
                ] as const).map((link, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </span>
                    <Link
                      href={link.href}
                      className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {link.label}
                    </Link>
                    <span className="text-slate-600 dark:text-slate-400">— {link.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Acknowledgment */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="rounded-3xl border border-slate-200/50 bg-slate-100/50 p-8 text-center backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/50"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                By using this Site, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
                Version 1.0 | Last Updated: October 16, 2025
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
