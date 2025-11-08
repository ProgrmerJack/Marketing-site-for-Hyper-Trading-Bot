"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { PageHeaderAnimated } from "@/components/page-header-animated";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
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
    ],
  },
  {
    id: "service",
    number: "2",
    icon: Monitor,
    gradient: "from-purple-500 to-pink-500",
    title: "Service Description",
    summary: "This is a demonstration site only — no live trading services are currently available.",
    details: [
      { label: "Demo Site", text: "This Site provides demonstration and educational content about an automated cryptocurrency trading system currently under development and analysis. All market data, performance metrics, and visualizations are for demonstration purposes only." },
      { label: "No Live Trading", text: "This Site does not offer, provide, or enable live trading services. No actual trades are executed through this Site. This Site does not accept customer funds." },
      { label: "Not Financial Advice", text: "Nothing on this Site constitutes financial advice, investment recommendations, or trading signals. You should consult qualified financial, legal, and tax advisors before making any investment decisions." },
      { label: "Analysis Phase", text: "The trading system is currently undergoing analysis, error correction, performance validation, and regulatory review. No independent audit has been completed. Launch timeline is uncertain." },
    ],
  },
  {
    id: "use",
    number: "3",
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
    ],
  },
  {
    id: "ip",
    number: "4",
    icon: Copyright,
    gradient: "from-amber-500 to-orange-500",
    title: "Intellectual Property",
    summary: "Ownership of content and trademarks.",
    content: [
      { text: "All content, design, code, logos, trademarks, and materials on this Site are owned by or licensed to Hyper Trading Automation and are protected by copyright, trademark, and other intellectual property laws." },
    ],
    details: [
      { label: "Limited License", text: "We grant you a limited, non-exclusive, non-transferable license to access and view Site content for personal, non-commercial use only. This license does not include rights to download, modify, distribute, or create derivative works." },
      { label: "Trademarks", text: '"Hyper Trading Automation," logos, and related marks are our trademarks. Unauthorized use is prohibited.' },
    ],
  },
  {
    id: "disclaimers",
    number: "5",
    icon: AlertTriangle,
    gradient: "from-red-500 to-orange-500",
    title: "Disclaimers & Warranties",
    summary: 'THIS SITE IS PROVIDED "AS-IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND.',
    details: [
      { label: "No Warranty", text: "We expressly disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, completeness, and non-infringement." },
      { label: "No Performance Guarantee", text: "Demo data, simulated results, and historical performance do not guarantee future results. Trading involves substantial risk including total loss of capital." },
      { label: "Data Accuracy", text: "While we strive for accuracy, we do not guarantee that Site content, data, or functionality will be error-free, uninterrupted, or current." },
    ],
  },
  {
    id: "liability",
    number: "6",
    icon: Scale,
    gradient: "from-indigo-500 to-purple-500",
    title: "Limitation of Liability",
    summary: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THIS SITE.",
    content: [
      { text: "This includes, but is not limited to, direct, indirect, incidental, consequential, special, or punitive damages, including lost profits, lost data, or investment losses, even if we have been advised of the possibility of such damages." },
      { text: "Some jurisdictions do not allow limitation of implied warranties or liability for incidental or consequential damages. In such jurisdictions, our liability is limited to the maximum extent permitted by law." },
    ],
  },
  {
    id: "law",
    number: "7",
    icon: Gavel,
    gradient: "from-blue-500 to-indigo-500",
    title: "Governing Law & Disputes",
    summary: "Legal jurisdiction and dispute resolution.",
    details: [
      { label: "Governing Law", text: "These Terms are governed by the laws of [JURISDICTION TO BE DETERMINED], without regard to conflict of law provisions." },
      { label: "Dispute Resolution", text: "Any disputes arising from these Terms or Site use shall first be subject to good faith negotiation. If negotiation fails, disputes may be resolved through binding arbitration." },
    ],
  },
  {
    id: "contact",
    number: "8",
    icon: Phone,
    gradient: "from-emerald-500 to-teal-500",
    title: "Contact Information",
    summary: "How to reach us with questions about these Terms.",
    contact: [
      { label: "Email", value: "legal@hypertrader.io", link: "mailto:legal@hypertrader.io" },
      { label: "Founder", value: "Abduxoliq Ashuraliyev" },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative">
      <PageHeaderAnimated
        eyebrow="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before accessing this site or requesting demo access. Last updated: October 16, 2025."
        backgroundVariant="threads"
        backgroundColors={["rgba(59, 130, 246, 0.4)", "rgba(139, 92, 246, 0.3)", "rgba(16, 185, 129, 0.25)"]}
      />

      {/* Main Content Section */}
      <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-950 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-35">
          <AnimatedBackground
            variant="liquid"
            colors={["rgba(59, 130, 246, 0.45)", "rgba(139, 92, 246, 0.35)", "rgba(16, 185, 129, 0.3)"]}
            speed="30s"
            opacity={0.7}
          />
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
                  className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 md:p-10"
                >
                  <div className="mb-6 flex items-start gap-4">
                    <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${term.gradient} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
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
                            <XCircle className="mt-0.5 h-5 w-5 flex-none text-red-600 dark:text-red-400" />
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
              className="rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 p-8 shadow-lg dark:border-blue-800/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-cyan-950/20 md:p-10"
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
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-600 dark:text-blue-400" />
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
              className="rounded-3xl border border-slate-200 bg-slate-100 p-8 text-center dark:border-slate-700 dark:bg-slate-800"
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
