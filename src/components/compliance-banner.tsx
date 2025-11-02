"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { Container } from "@hyper/ui";
import { COMPLIANCE_BANNER } from "@/lib/compliance";

export function ComplianceBanner() {
  return (
    <div className="border-b border-[color:var(--color-line-muted)] bg-[color:var(--color-accent-primary)]/8">
      <Container className="flex items-center gap-4 py-3 text-sm text-[color:var(--color-surface-900)]">
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ShieldAlert className="h-5 w-5 text-[color:var(--color-accent-primary)]" />
        </motion.span>
        <div className="space-y-1">
          <p className="font-semibold">{COMPLIANCE_BANNER.headline}</p>
          <p className="text-sm/5 text-black/70 dark:text-white/70">
            {COMPLIANCE_BANNER.body}
          </p>
        </div>
      </Container>
    </div>
  );
}
