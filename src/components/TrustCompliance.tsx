"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle2, Award } from "lucide-react";

type ComplianceBadge = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
};

const badges: ComplianceBadge[] = [
  {
    icon: Shield,
    label: "Enterprise Security",
    description: "Bank-grade encryption and security protocols",
  },
  {
    icon: Lock,
    label: "Data Privacy",
    description: "Your data is never shared or sold",
  },
  {
    icon: CheckCircle2,
    label: "Compliance Ready",
    description: "SOC 2 Type II compliant infrastructure",
  },
  {
    icon: Award,
    label: "Industry Leading",
    description: "Trusted by professional traders worldwide",
  },
];

export function TrustCompliance() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Built on Trust & Security
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            Your security and privacy are our top priorities. We implement
            industry-leading standards to protect your assets and data.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {badge.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 rounded-2xl border border-border bg-muted/50 p-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Regulatory Compliance:
            </span>{" "}
            Our platform adheres to strict regulatory standards and best
            practices. We maintain comprehensive audit trails and implement
            robust risk management protocols to ensure the highest level of
            operational integrity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
