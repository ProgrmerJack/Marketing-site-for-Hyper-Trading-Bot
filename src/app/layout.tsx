import type { Metadata, Viewport } from "next";
import Script from 'next/script';
import clsx from "clsx";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ComplianceBanner } from "@/components/compliance-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipToContent } from "@/components/skip-link";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion/MotionProvider";
// Blob cursor removed per request: no cursor-following gradient; keep PageTransition disabled for now
import { ErrorBoundary } from "@/components/error-boundary";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { UnifiedBackground } from "@/components/backgrounds/UnifiedBackground";
import "./globals.css";
import "@/styles/motion.css";
// CookieBanner removed a while ago; using ConsentManager instead
import { ConsentManager } from "@/components/consent-manager";
import {
  baseMetadata,
  buildOrganizationSchema,
  buildWebsiteSchema,
  viewport as defaultViewport,
} from "@/lib/metadata";

// Removed force-dynamic to fix hydration errors

const geistSans = Geist({
  variable: "--font-sans-variable",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-variable",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display-variable",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Externalized head and theme init scripts to avoid CSP blocking for inline scripts */}
        <Script src="/js/head-ensure.js" strategy="beforeInteractive" />
        <Script src="/js/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          playfair.variable,
          "font-sans antialiased relative",
        )}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <MotionProvider>
              {/* Unified background for entire site */}
              <UnifiedBackground />
              {/* PageTransition removed to disable cinematic overlays */}
                <SkipToContent />
                <ComplianceBanner />
                <SiteHeader />
                <main id="main-content" className="min-h-[60vh] scroll-mt-20">
                  {children}
                </main>
                <SiteFooter />
                {/* CookieBanner removed in favor of ConsentManager to centralize consent UI */}
                <ConsentManager />
            </MotionProvider>
          </ThemeProvider>
          <PerformanceMonitor />
        </ErrorBoundary>
        <script
          type="application/ld+json"
          data-schema="organization"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          data-schema="website"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebsiteSchema()),
          }}
        />
      </body>
    </html>
  );
}
