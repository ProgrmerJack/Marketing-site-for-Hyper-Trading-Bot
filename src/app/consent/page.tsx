import { Section } from "@hyper/ui";
import { PageHeader } from "@/components/page-header";
import { DsrForm } from "@/components/forms/dsr-form";

const consentOptions = [
  {
    label: "Essential cookies",
    description: "Required for site operation (security headers, load balancing, session tracking).",
    defaultState: "Always on",
  },
  {
    label: "Performance analytics",
    description: "Anonymous Core Web Vitals for improving speed and accessibility. Opt-in only.",
    defaultState: "Off by default",
  },
  {
    label: "Communication consent",
    description: "Stores proof of opt-in for transactional updates. Required for demo access requests.",
    defaultState: "On when you submit the form",
  },
];

export default function ConsentPage() {
  return (
    <div className="space-y-0">
      <PageHeader
        eyebrow="Consent management"
        title="Control how your data is used"
        description="Adjust cookie and communication preferences. We honor Global Privacy Control signals automatically."
      />

      <Section
        id="preferences"
        title="Your preferences"
        description="These settings update instantly and are stored with a timestamp for auditability."
      >
        <div className="space-y-4">
          {consentOptions.map((option) => (
            <article
              key={option.label}
              className="flex flex-col gap-2 rounded-3xl border border-[color:var(--color-line-muted)]/50 bg-white/80 p-6 text-sm text-black/70 dark:bg-slate-900/90 dark:text-white/70 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-base font-semibold text-[color:var(--color-surface-900)] dark:text-white">
                  {option.label}
                </h2>
                <p>{option.description}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
                {option.defaultState}
              </span>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="opt-out"
        title="Do Not Sell/Share"
        description="Regulators require a clear workflow for opting out of data sales or sharing. Submit a request and we’ll acknowledge it within the mandated window."
      >
        <DsrForm />
      </Section>
    </div>
  );
}
