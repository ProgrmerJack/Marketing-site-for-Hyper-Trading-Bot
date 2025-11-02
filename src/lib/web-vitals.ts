/**
 * Core Web Vitals Monitoring
 * Tracks and reports LCP, FID, CLS, FCP, TTFB, INP
 */

import type { Metric } from "web-vitals";

interface WebVitalsConfig {
  reportToConsole?: boolean;
  reportToAnalytics?: boolean;
  reportToSentry?: boolean;
}

const defaultConfig: WebVitalsConfig = {
  reportToConsole: process.env.NODE_ENV === "development",
  reportToAnalytics: process.env.NODE_ENV === "production",
  reportToSentry: process.env.NODE_ENV === "production",
};

/**
 * Report Web Vitals metrics
 */
export function reportWebVitals(metric: Metric, config: WebVitalsConfig = defaultConfig) {
  const { name, value, id, rating, navigationType } = metric;

  // Format value based on metric type
  const formattedValue = formatMetricValue(name, value);

  // Console reporting (development)
  if (config.reportToConsole) {
    const emoji = rating === "good" ? "✅" : rating === "needs-improvement" ? "⚠️" : "❌";
    console.log(
      `${emoji} [Web Vitals] ${name}: ${formattedValue} (${rating})`,
      {
        id,
        navigationType,
        value,
      }
    );
  }

  // Analytics reporting (production)
  if (config.reportToAnalytics && typeof window !== "undefined") {
    const w = window as unknown as { gtag?: (command: string, name: string, params: Record<string, unknown>) => void; va?: (command: string, name: string, params: Record<string, unknown>) => void; Sentry?: { captureMessage: (message: string, options: Record<string, unknown>) => void } };
    // Google Analytics 4
    if (w.gtag) {
      w.gtag("event", name, {
        event_category: "Web Vitals",
        event_label: id,
        value: Math.round(name === "CLS" ? value * 1000 : value),
        metric_rating: rating,
        metric_navigation_type: navigationType,
        non_interaction: true,
      });
    }

    // Vercel Analytics
    if (w.va) {
      w.va("track", "Web Vitals", {
        metric: name,
        value: formattedValue,
        rating,
        navigationType,
      });
    }
  }

  // Sentry reporting (production)
  if (config.reportToSentry && typeof window !== "undefined") {
    const w = window as unknown as { Sentry?: { captureMessage: (message: string, options: Record<string, unknown>) => void } };
    const sentryLevel = rating === "good" ? "info" : rating === "needs-improvement" ? "warning" : "error";

    w.Sentry?.captureMessage(`Web Vital: ${name}`, {
      level: sentryLevel,
      tags: {
        webVital: name,
        rating,
        navigationType,
      },
      extra: {
        value,
        formattedValue,
        id,
      },
    });
  }
}

/**
 * Format metric value for display
 */
function formatMetricValue(name: string, value: number): string {
  switch (name) {
    case "CLS":
      return value.toFixed(4);
    case "LCP":
    case "FCP":
    case "TTFB":
    case "FID":
    case "INP":
      return `${Math.round(value)}ms`;
    default:
      return value.toFixed(2);
  }
}

/**
 * Get rating thresholds for each metric
 */
export function getMetricThresholds(name: string): { good: number; needsImprovement: number } {
  switch (name) {
    case "CLS":
      return { good: 0.1, needsImprovement: 0.25 };
    case "LCP":
      return { good: 2500, needsImprovement: 4000 };
    case "FCP":
      return { good: 1800, needsImprovement: 3000 };
    case "FID":
      return { good: 100, needsImprovement: 300 };
    case "TTFB":
      return { good: 800, needsImprovement: 1800 };
    case "INP":
      return { good: 200, needsImprovement: 500 };
    default:
      return { good: 0, needsImprovement: 0 };
  }
}

/**
 * Calculate rating from value
 */
export function calculateRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const thresholds = getMetricThresholds(name);
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}

/**
 * Get optimization suggestions based on poor metrics
 */
export function getOptimizationSuggestions(metric: Metric): string[] {
  const suggestions: string[] = [];

  switch (metric.name) {
    case "LCP":
      if (metric.rating === "poor") {
        suggestions.push("Optimize images with next/image");
        suggestions.push("Use CDN for static assets");
        suggestions.push("Enable lazy loading for below-fold images");
        suggestions.push("Preload critical resources");
      }
      break;

    case "INP":
      if (metric.rating === "poor") {
        suggestions.push("Reduce JavaScript execution time");
        suggestions.push("Code split large bundles");
        suggestions.push("Defer non-critical JavaScript");
        suggestions.push("Use Web Workers for heavy computations");
      }
      break;

    case "CLS":
      if (metric.rating === "poor") {
        suggestions.push("Set explicit width/height on images");
        suggestions.push("Reserve space for dynamic content");
        suggestions.push("Avoid inserting content above existing content");
        suggestions.push("Use CSS transform for animations");
      }
      break;

    case "FCP":
      if (metric.rating === "poor") {
        suggestions.push("Eliminate render-blocking resources");
        suggestions.push("Minify CSS and JavaScript");
        suggestions.push("Remove unused CSS");
        suggestions.push("Optimize font loading");
      }
      break;

    case "TTFB":
      if (metric.rating === "poor") {
        suggestions.push("Use edge caching (Vercel Edge Network)");
        suggestions.push("Optimize server response time");
        suggestions.push("Enable compression");
        suggestions.push("Reduce server-side redirects");
      }
      break;
  }

  return suggestions;
}

/**
 * Log optimization suggestions for poor metrics
 */
export function logOptimizationSuggestions(metric: Metric) {
  if (metric.rating !== "poor" || process.env.NODE_ENV !== "development") {
    return;
  }

  const suggestions = getOptimizationSuggestions(metric);
  
  if (suggestions.length > 0) {
    console.group(`🔧 Optimization suggestions for ${metric.name}:`);
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion}`);
    });
    console.groupEnd();
  }
}
