import type { Metadata, Viewport } from "next";

export const siteMetadata = {
  name: "Hyper Trading Automation",
  title: "Trustworthy automation for disciplined crypto trading",
  description:
    "Hyper Trading Automation delivers controlled, transparent crypto execution with enterprise guardrails. Demo only -- no promises, no hype.",
  url: "https://hypertrader.example.com",
  locale: "en_US",
  twitter: "@hypertrader",
  creator: "Abduxoliq Ashuraliyev",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: "%s · Hyper Trading Automation",
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.name,
  creator: siteMetadata.creator,
  keywords: [
    "algorithmic trading",
    "crypto risk controls",
    "automated execution",
    "trading demo",
    "systematic strategies",
  ],
  openGraph: {
    type: "website",
    url: siteMetadata.url,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: siteMetadata.twitter,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteMetadata.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteMetadata.name,
    url: siteMetadata.url,
    description: siteMetadata.description,
    logo: `${siteMetadata.url}/og-image.png`,
    sameAs: [
      "https://www.linkedin.com/company/hypertrader",
      "https://x.com/hypertrader",
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.name,
    url: siteMetadata.url,
    description: siteMetadata.description,
    publisher: {
      "@type": "Organization",
      name: siteMetadata.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteMetadata.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}



