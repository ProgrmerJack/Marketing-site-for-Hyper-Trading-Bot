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
    <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-white p-6 shadow-2xl backdrop-blur dark:border-orange-800 dark:bg-slate-900">
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white">
          Cookies & consent
        </p>
        <p>
          We use essential cookies for security. Analytics cookies are optional and used solely for
          Core Web Vitals monitoring. You can change your mind anytime on the{" "}
          <Link href="/consent" className="font-semibold text-orange-600 underline dark:text-orange-400">
            consent page
          </Link>
          . Postal address: {CONTACT_POSTAL_ADDRESS}.
        </p>
        {gpcApplied ? (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Global Privacy Control detected -- non-essential cookies already disabled.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-orange-600 hover:to-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
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



