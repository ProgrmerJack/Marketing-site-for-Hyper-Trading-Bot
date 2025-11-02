/**
 * Sentry Configuration for Next.js
 * Error tracking and performance monitoring
 */

import * as Sentry from "@sentry/nextjs";
import { browserTracingIntegration, replayIntegration } from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    
    // Environment
    environment: SENTRY_ENVIRONMENT,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Ignore certain errors
    ignoreErrors: [
      // Browser extensions
      "top.GLOBALS",
      "chrome-extension://",
      "moz-extension://",
      // Network errors
      "NetworkError",
      "Network request failed",
      // Common user errors
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
    ],
    
  // Filter out sensitive data
  beforeSend(event) {
    // Remove sensitive query parameters
    if (event.request?.url) {
      try {
        const url = new URL(event.request.url);
        const sensitiveParams = ["token", "key", "password", "secret"];
        sensitiveParams.forEach((param) => {
          if (url.searchParams.has(param)) {
            url.searchParams.set(param, "[FILTERED]");
          }
        });
        event.request.url = url.toString();
      } catch {
        // Invalid URL, leave as is
      }
    }      // Filter out local development errors in production
      if (process.env.NODE_ENV === "production" && event.request?.url?.includes("localhost")) {
        return null;
      }
      
      return event;
    },
    
    // Configure integrations
    integrations: [
      browserTracingIntegration(),
      replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}

export { Sentry };
