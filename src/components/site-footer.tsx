"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { complianceLinks } from "@/lib/navigation";
import { CONTACT_POSTAL_ADDRESS, RISK_STATEMENTS } from "@/lib/compliance";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-secondary to-muted py-20 text-foreground">
      <Container className="grid gap-16 md:grid-cols-[2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <span className="font-display text-3xl font-semibold tracking-tight text-foreground">
              Hyper Trading Automation
            </span>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Demo environment for regulated automated trading. No guarantees, no
              speculative promises—focused purely on disciplined execution and transparent
              controls.
            </p>
          </div>

          <address className="not-italic text-sm text-muted-foreground">
            {CONTACT_POSTAL_ADDRESS}
          </address>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">
              Compliance
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {complianceLinks.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
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

