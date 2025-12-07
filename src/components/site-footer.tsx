"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { complianceLinks } from "@/lib/navigation";
import { CONTACT_POSTAL_ADDRESS, RISK_STATEMENTS } from "@/lib/compliance";
import { ArrowRight, Twitter, Github, Linkedin, Send, Shield, Lock, Award } from "lucide-react";
import type { Route } from "next";

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/hypertrader", icon: Twitter },
  { name: "GitHub", href: "https://github.com/hypertrader", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/company/hypertrader", icon: Linkedin },
  { name: "Telegram", href: "https://t.me/hypertrader", icon: Send },
];

const productLinks: { label: string; href: Route }[] = [
  { label: "Features", href: "/#features" as Route },
  { label: "Pricing", href: "/pricing" as Route },
  { label: "Documentation", href: "/docs" as Route },
  { label: "API Reference", href: "/docs/api" as Route },
  { label: "Changelog", href: "/changelog" as Route },
];

const resourceLinks: { label: string; href: Route }[] = [
  { label: "Blog", href: "/blog" as Route },
  { label: "Research Papers", href: "/research" as Route },
  { label: "Strategy Library", href: "/strategies" as Route },
  { label: "Community", href: "/community" as Route },
  { label: "Support", href: "/support" as Route },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-secondary to-muted text-foreground">
      {/* CTA Banner */}
      <div className="border-b border-border bg-gradient-to-r from-[rgb(79,244,207)]/10 via-transparent to-[rgb(0,179,255)]/10">
        <Container className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-between gap-6 md:flex-row"
          >
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Ready to trade smarter?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Join 127+ traders already on the waitlist. Limited early access spots available.
              </p>
            </div>
            <Link
              href="#waitlist"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[rgb(79,244,207)] to-[rgb(0,179,255)] px-8 py-4 font-semibold btn-gradient-text shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[rgb(79,244,207)]/30"
            >
              Get Early Access
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </Container>
      </div>
      
      {/* Main Footer Content */}
      <Container className="py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:col-span-1"
          >
            <div>
              <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
                HyperTrader
              </span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Institutional-grade crypto trading automation powered by 486 ML models and 380 proven strategies.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all hover:border-[rgb(79,244,207)] hover:text-[rgb(79,244,207)] hover:shadow-lg hover:shadow-[rgb(79,244,207)]/20"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <address className="not-italic text-xs text-muted-foreground">
              {CONTACT_POSTAL_ADDRESS}
            </address>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors duration-200 hover:text-[rgb(79,244,207)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resource Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors duration-200 hover:text-[rgb(79,244,207)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Compliance Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">
              Legal & Compliance
            </h3>
            <ul className="space-y-3 text-sm">
              {complianceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors duration-200 hover:text-[rgb(79,244,207)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-12"
        >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 shadow-md shadow-cyan-500/25">
                <Shield className="h-4 w-4 text-white" />
              </span>
              <span>Independent security review in progress</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 shadow-md shadow-cyan-500/25">
                <Lock className="h-4 w-4 text-white" />
              </span>
              <span>Industry-standard encryption in transit and at rest</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 shadow-md shadow-cyan-500/25">
                <Award className="h-4 w-4 text-white" />
              </span>
              <span>OWASP best-practices followed; audits planned</span>
            </div>
        </motion.div>
      </Container>

      {/* Disclaimers Section */}
      <Container className="mt-16 border-t border-border pt-12">
        <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
          <h4 className="font-semibold uppercase tracking-wider text-foreground/80">
            Important Disclaimers
          </h4>
          <div className="space-y-3 max-w-4xl">
            {RISK_STATEMENTS.map((item, index) => (
              <p key={index} className="flex gap-2">
                <span className="text-primary">*</span>
                <span>{item}</span>
              </p>
            ))}
            <p className="flex gap-2">
              <span className="text-primary">*</span>
              <span>
                Emails and updates comply with CAN-SPAM. Unsubscribe links are honored within 10
                business days. Cookie preferences can be updated at any time.
              </span>
            </p>
            <p className="flex gap-2">
              <span className="text-primary">*</span>
              <span>
                This website is a demonstration environment. No live trading occurs on this public site.
                All market data shown is signed and verifiable but does not constitute investment advice.
              </span>
            </p>
            <p className="flex gap-2">
              <span className="text-primary">*</span>
              <span>
                Past performance is not indicative of future results. Cryptocurrency markets are highly
                volatile and speculative. Only invest what you can afford to lose.
              </span>
            </p>
          </div>
          <p className="mt-8 text-muted-foreground/70">
            © {new Date().getFullYear()} Hyper Trading Automation. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

