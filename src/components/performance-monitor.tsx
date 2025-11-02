"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Performance Monitor Component
 * Integrates Vercel Speed Insights and custom Web Vitals tracking
 * Tracks Core Web Vitals: LCP, FID, CLS, FCP, TTFB, INP
 */
export function PerformanceMonitor() {
  const pathname = usePathname();

  useEffect(() => {
    // Track route changes for analytics
    if (typeof window !== "undefined") {
      // Custom analytics tracking
      console.log(`[Performance] Route changed: ${pathname}`);
      
      // Mark performance for route navigation
      if (performance.mark) {
        performance.mark(`route-${pathname}`);
      }
    }
  }, [pathname]);

  return <SpeedInsights />;
}

/**
 * Web Vitals Reporter
 * Reports Core Web Vitals to console (development) and analytics (production)
 */
interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  rating: "good" | "needs-improvement" | "poor";
}

export function reportWebVitals(metric: WebVitalMetric) {
  const { name, value, id, rating } = metric;

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(name === "CLS" ? value * 1000 : value),
      id,
      rating,
    });
  }

  // Send to analytics in production
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    const w = window as unknown as { gtag?: (command: string, name: string, params: Record<string, unknown>) => void; Sentry?: { captureMessage: (message: string, options: Record<string, unknown>) => void } };
    // Send to Google Analytics if available
    if (w.gtag) {
      w.gtag("event", name, {
        event_category: "Web Vitals",
        event_label: id,
        value: Math.round(name === "CLS" ? value * 1000 : value),
        non_interaction: true,
      });
    }

    // Send to Sentry performance monitoring
    if (w.Sentry) {
      w.Sentry.captureMessage(`Web Vital: ${name}`, {
        level: rating === "good" ? "info" : rating === "needs-improvement" ? "warning" : "error",
        tags: {
          metric: name,
          rating,
        },
        extra: {
          value,
          id,
        },
      });
    }
  }
}

/**
 * Performance Observer Hook
 * Monitors long tasks and layout shifts
 */
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    // Observe long tasks (>50ms)
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
          
          // Report to Sentry
          const w = window as unknown as { Sentry?: { captureMessage: (message: string, options: Record<string, unknown>) => void } };
          if (w.Sentry) {
            w.Sentry.captureMessage("Long Task Detected", {
              level: "warning",
              tags: {
                type: "performance",
                metric: "long-task",
              },
              extra: {
                duration: entry.duration,
                name: entry.name,
                startTime: entry.startTime,
              },
            });
          }
        }
      }
    });

    try {
      longTaskObserver.observe({ entryTypes: ["longtask"] });
    } catch {
      // longtask not supported
    }

    // Observe layout shifts
    const layoutShiftObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutEntry = entry as unknown as { hadRecentInput?: boolean; value?: number };
        if (layoutEntry.hadRecentInput) {
          continue; // Ignore layout shifts from user input
        }

        const value = layoutEntry.value || 0;
        if (value > 0.1) {
          console.warn(`[Performance] Significant layout shift: ${value.toFixed(4)}`, entry);
        }
      }
    });

    try {
      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
    } catch {
      // layout-shift not supported
    }

    return () => {
      longTaskObserver.disconnect();
      layoutShiftObserver.disconnect();
    };
  }, []);
}

/**
 * Resource Timing Monitor
 * Tracks slow resources and provides optimization suggestions
 */
export function monitorResourceTiming() {
  if (typeof window === "undefined" || !performance.getEntriesByType) {
    return;
  }

  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  
  const slowResources = resources.filter((resource) => resource.duration > 1000);

  if (slowResources.length > 0) {
    console.warn(`[Performance] ${slowResources.length} slow resources detected:`);
    slowResources.forEach((resource) => {
      console.warn(`  - ${resource.name}: ${resource.duration.toFixed(2)}ms`);
    });

    // Provide optimization suggestions
    const suggestions = [];
    if (slowResources.some((r) => r.name.includes(".js"))) {
      suggestions.push("Consider code splitting or lazy loading JavaScript");
    }
    if (slowResources.some((r) => r.name.includes(".css"))) {
      suggestions.push("Consider critical CSS extraction or CSS code splitting");
    }
    if (slowResources.some((r) => r.name.match(/\.(jpg|png|gif)/))) {
      suggestions.push("Consider using next/image for automatic image optimization");
    }

    if (suggestions.length > 0) {
      console.log("[Performance] Optimization suggestions:");
      suggestions.forEach((suggestion) => console.log(`  - ${suggestion}`));
    }
  }
}
