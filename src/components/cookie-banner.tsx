"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { CONTACT_POSTAL_ADDRESS } from "@/lib/compliance";

const STORAGE_KEY = "hyper-consent";

type ConsentState = {
  analytics: boolean;
  timestamp: string;
  gpcApplied?: boolean;
};

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [gpcApplied, setGpcApplied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const gpcEnabled = Boolean((navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl);
    setGpcApplied(gpcEnabled);
    if (stored) {
      return;
    }
    if (gpcEnabled) {
      persist({ analytics: false, timestamp: new Date().toISOString(), gpcApplied: true });
      return;
    }
    setOpen(true);
  }, []);

  function persist(state: ConsentState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setOpen(false);
    document.cookie = `analytics_consent=${state.analytics ? "yes" : "no"}; path=/; SameSite=Lax`;
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 max-w-3xl rounded-3xl border border-[color:var(--color-line-muted)]/50 bg-white/95 p-6 shadow-2xl backdrop-blur dark:bg-black/85">
      <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
        <p className="font-semibold text-[color:var(--color-surface-900)] dark:text-white">
          Cookies & consent
        </p>
        <p>
          We use essential cookies for security. Analytics cookies are optional and used solely for
          Core Web Vitals monitoring. You can change your mind anytime on the{" "}
          <Link href="/consent" className="text-[color:var(--color-accent-primary)] underline">
            consent page
          </Link>
          . Postal address: {CONTACT_POSTAL_ADDRESS}.
        </p>
        {gpcApplied ? (
          <p className="text-xs text-[color:var(--color-warning)]">
            Global Privacy Control detected -- non-essential cookies already disabled.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={clsx(
              "inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-offset-3 focus-visible:outline-[color:var(--color-accent-secondary)]",
            )}
            onClick={() =>
              persist({
                analytics: true,
                timestamp: new Date().toISOString(),
                gpcApplied,
              })
            }
          >
            Accept all
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-line-muted)] px-6 py-3 text-sm font-semibold text-[color:var(--color-surface-900)] hover:border-transparent hover:bg-[color:var(--color-line-muted)]/20 dark:text-white"
            onClick={() =>
              persist({
                analytics: false,
                timestamp: new Date().toISOString(),
                gpcApplied,
              })
            }
          >
            Decline optional
          </button>
        </div>
      </div>
    </div>
  );
}



