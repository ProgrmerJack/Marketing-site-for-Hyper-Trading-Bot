"use client";

import * as React from 'react';

/**
 * GDPR/ICO Compliant Consent Manager
 * - Freely given (no pre-checked boxes)
 * - Specific (separate consent for each purpose)
 * - Informed (clear explanations)
 * - Unambiguous (explicit action required)
 * - GPC honoring
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsentPreferences {
  marketing: boolean;
  analytics: boolean;
  functional: boolean; // Always required
  gpcDetected: boolean;
  timestamp: string;
  version: string; // Consent policy version
}

interface ConsentLog {
  timestamp: string;
  preferences: ConsentPreferences;
  ipAddress?: string;
  userAgent: string;
  gpcStatus: boolean;
}

import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/lib/consent";

export function ConsentManager() {
  const [showBanner, setShowBanner] = useState(false);
  const [renderBanner, setRenderBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [gpcDetected, setGpcDetected] = useState(false);

  // Separate state for each consent type (NOT pre-checked)
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ConsentPreferences;
      // If version changed, show banner again
      if (parsed.version !== CONSENT_VERSION) {
        setShowBanner(true);
        setRenderBanner(true);
      }
    } else {
      setShowBanner(true);
      setRenderBanner(true);
    }

    // Detect GPC signal
    if (typeof navigator !== "undefined") {
      const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
      if (nav.globalPrivacyControl === true) {
        setGpcDetected(true);
        // Auto-reject non-essential if GPC detected
        setMarketingConsent(false);
        setAnalyticsConsent(false);
      }
    }
  }, []);

  const saveConsent = async (preferences: Partial<ConsentPreferences>) => {
    const fullPreferences: ConsentPreferences = {
      marketing: preferences.marketing || false,
      analytics: preferences.analytics || false,
      functional: true, // Always true
      gpcDetected,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    // Save locally
    localStorage.setItem("consent-preferences", JSON.stringify(fullPreferences));

    // Debug logs to make Playwright traces easier to follow
    if (typeof window !== 'undefined') console.debug('[ConsentManager] saveConsent', fullPreferences);

    // Hide UI immediately (fire-and-forget server log)
    if (typeof window !== 'undefined') console.debug('[ConsentManager] hiding banner');
    setShowBanner(false);
    // Immediately remove the DOM to avoid cross-browser animation timing issues that Playwright tests hit
    setRenderBanner(false);

    // Log to server for compliance audit trail (don't block UI)
    const log: ConsentLog = {
      timestamp: fullPreferences.timestamp,
      preferences: fullPreferences,
      userAgent: navigator.userAgent,
      gpcStatus: gpcDetected,
    };

    // Fire-and-forget server log; no await to avoid blocking UI hide in slow/networked test envs
    fetch("/api/privacy/consent-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    }).catch((error) => console.error("Failed to log consent:", error));
  };

  const handleAcceptAll = () => {
    if (typeof window !== 'undefined') console.debug('[ConsentManager] acceptAll clicked');
    setMarketingConsent(true);
    setAnalyticsConsent(true);
    saveConsent({ marketing: true, analytics: true });
  };

  const handleRejectAll = () => {
    // Only functional (essential) cookies
    setMarketingConsent(false);
    setAnalyticsConsent(false);
    saveConsent({ marketing: false, analytics: false });
  };

  const handleSavePreferences = () => {
    saveConsent({ marketing: marketingConsent, analytics: analyticsConsent });
  };

  if (!renderBanner) {
    return null;
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.15 } }}
          data-testid="cookie-banner"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Cookies & consent
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    We use cookies and similar technologies to improve your experience. 
                    We respect your privacy and only use data as you permit.
                    {gpcDetected && (
                      <span className="block mt-2 text-blue-600 dark:text-blue-400 font-medium">
                        ✓ Global Privacy Control detected - non-essential tracking is disabled by default
                      </span>
                    )}
                  </p>

                  {!showDetails ? (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
                          if (!e.isPrimary) return;
                          handleAcceptAll();
                        }}
                        onPointerUp={(e) => {
                          if (!(e as React.PointerEvent<HTMLButtonElement>).isPrimary) return;
                          handleAcceptAll();
                        }}
                        onClick={handleAcceptAll}
                        data-testid="cookie-banner-accept-all"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Accept All
                      </button>
                      <button
                        onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
                          if (!e.isPrimary) return;
                          handleRejectAll();
                        }}
                        onPointerUp={(e) => {
                          if (!(e as React.PointerEvent<HTMLButtonElement>).isPrimary) return;
                          handleRejectAll();
                        }}
                        onClick={handleRejectAll}
                        data-testid="cookie-banner-decline-optional"
                        className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
                      >
                        Reject Non-Essential
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                      >
                        Customize
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Essential - Always enabled */}
                      <div className="flex items-start gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="mt-1 w-5 h-5"
                        />
                        <div className="flex-1">
                          <label className="font-medium text-sm text-gray-900 dark:text-white">
                            Essential Cookies (Required)
                          </label>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Necessary for the website to function. Includes authentication, security, and accessibility features.
                          </p>
                        </div>
                      </div>

                      {/* Marketing - User choice */}
                      <div className="flex items-start gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="mt-1 w-5 h-5 cursor-pointer"
                          id="marketing-consent"
                        />
                        <div className="flex-1">
                          <label htmlFor="marketing-consent" className="font-medium text-sm cursor-pointer text-gray-900 dark:text-white">
                            Marketing & Communication
                          </label>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Allows us to send you updates, newsletters, and promotional content. You can unsubscribe anytime.
                          </p>
                        </div>
                      </div>

                      {/* Analytics - User choice */}
                      <div className="flex items-start gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <input
                          type="checkbox"
                          checked={analyticsConsent}
                          onChange={(e) => setAnalyticsConsent(e.target.checked)}
                          className="mt-1 w-5 h-5 cursor-pointer"
                          id="analytics-consent"
                        />
                        <div className="flex-1">
                          <label htmlFor="analytics-consent" className="font-medium text-sm cursor-pointer text-gray-900 dark:text-white">
                            Analytics & Performance
                          </label>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Helps us understand how visitors use our site to improve performance and user experience.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          onClick={handleSavePreferences}
                          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Save Preferences
                        </button>
                        <button
                          onClick={() => setShowDetails(false)}
                          className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                Learn more about how we handle your data in our{" "}
                <a href="/legal/privacy-policy" className="underline hover:text-blue-600">
                  Privacy Policy
                </a>
                {" and "}
                <a href="/legal/cookie-policy" className="underline hover:text-blue-600">
                  Cookie Policy
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
