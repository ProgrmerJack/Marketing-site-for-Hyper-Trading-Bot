import Link from "next/link";
import { Section } from "@hyper/ui";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <Section
      id="not-found"
      title="Nothing to see here"
      description="The page you’re after doesn’t exist. No secret performance dashboards tucked behind 404s."
      padding="compact"
    >
      <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
        <p>Return to the home page or explore the signed demo.</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[color:var(--color-accent-primary)] px-6 py-3 text-sm font-semibold text-white"
          >
            Home
          </Link>
          <Link
            href="/live-demo"
            className="inline-flex items-center rounded-full border border-[color:var(--color-line-muted)] px-6 py-3 text-sm font-semibold text-[color:var(--color-surface-900)] dark:text-white"
          >
            Live demo
          </Link>
        </div>
      </div>
    </Section>
  );
}
