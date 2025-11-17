"use client";

import * as React from 'react';

import { useEffect, useState } from "react";
import Link from "next/link";
// clsx import removed - not used
import { CONTACT_POSTAL_ADDRESS } from "@/lib/compliance";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION, ConsentPreferences } from "@/lib/consent";

type ConsentState = {
  analytics: boolean;
  timestamp: string;
  gpcApplied?: boolean;
};

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [gpcApplied, setGpcApplied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    const gpcEnabled = Boolean((navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl);
    setGpcApplied(gpcEnabled);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure analytics cookie is set if already stored
        if (parsed && typeof parsed.analytics !== "undefined") {
          document.cookie = `analytics_consent=${parsed.analytics ? "yes" : "no"}; path=/; SameSite=Lax`;
        }
      } catch {
        // ignore parse errors
      }
      return;
    }
    if (gpcEnabled) {
      persist({ analytics: false, timestamp: new Date().toISOString(), gpcApplied: true });
      return;
    }
    setOpen(true);
  }, []);

  function persist(state: ConsentState) {
    // Persist in the same shape used by ConsentManager to prevent repeated banners
    const preferences: ConsentPreferences = {
      marketing: false,
      analytics: !!state.analytics,
      functional: true,
      gpcDetected: state.gpcApplied,
      timestamp: state.timestamp,
      version: CONSENT_VERSION,
    };
    // Close immediately to avoid racy tests and ensure DOM removal is synchronous
    setOpen(false);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    // Debug log for Playwright tests to assert persist was called
    if (typeof window !== 'undefined') console.log('[CookieBanner] persist', preferences);
    document.cookie = `analytics_consent=${state.analytics ? "yes" : "no"}; path=/; SameSite=Lax`;
  }

  if (!open) {
    return null;
  }

  return (
    // Raise z-index above cinematic overlays so banner receives clicks reliably
    <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-white p-6 shadow-2xl backdrop-blur dark:border-orange-800 dark:bg-slate-900 pointer-events-auto">
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300" data-testid="cookie-banner">
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
            onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
              if (!e.isPrimary) return;
              persist({
                analytics: true,
                timestamp: new Date().toISOString(),
                gpcApplied,
              });
            }}
            onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => {
              if (!e.isPrimary) return;
              persist({
                analytics: true,
                timestamp: new Date().toISOString(),
                gpcApplied,
              });
            }}
            onClick={() => {
              if (typeof window !== 'undefined') console.debug('[CookieBanner] accept clicked');
                if (typeof window !== 'undefined') console.log('[CookieBanner] accept clicked');
              persist({
                analytics: true,
                timestamp: new Date().toISOString(),
                gpcApplied,
              })
            }
            }
            data-testid="cookie-banner-accept-all"
          >
            Accept all
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
              if (!e.isPrimary) return;
              persist({
                analytics: false,
                timestamp: new Date().toISOString(),
                gpcApplied,
              });
            }}
            onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => {
              if (!e.isPrimary) return;
              persist({
                analytics: false,
                timestamp: new Date().toISOString(),
                gpcApplied,
              });
            }}
            onClick={() => {
              if (typeof window !== 'undefined') console.debug('[CookieBanner] decline clicked');
                if (typeof window !== 'undefined') console.log('[CookieBanner] decline clicked');
              persist({
                analytics: false,
                timestamp: new Date().toISOString(),
                gpcApplied,
              })
            }
            }
            data-testid="cookie-banner-decline-optional"
          >
            Decline optional
          </button>
        </div>
      </div>
    </div>
  );
}



