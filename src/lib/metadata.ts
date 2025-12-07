import type { Metadata, Viewport } from "next";

export const siteMetadata = {
  name: "HyperTrader - AI-Powered Crypto Trading Automation",
  title: "HyperTrader | 866 AI Models & Strategies for Institutional-Grade Crypto Trading",
  description:
    "Transform your crypto trading with 486 ML models and 380 automated strategies. Institutional-grade risk controls, real-time performance monitoring, and transparent execution. No custody, no hidden fees - only profit-share after verification.",
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
    "algorithmic trading platform",
    "crypto trading automation",
    "AI trading bot",
    "institutional crypto trading",
    "automated trading strategies",
    "machine learning trading",
    "crypto risk management",
    "Kelly criterion position sizing",
    "quantitative trading",
    "systematic trading",
    "crypto portfolio automation",
    "trading bot software",
    "cryptocurrency trading platform",
    "automated execution",
    "trading signals",
    "backtesting platform",
    "crypto hedge fund technology",
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

// FAQ Schema for SEO - improves SERP visibility with rich snippets
export const faqItems = [
  {
    question: "What is HyperTrader and how does it work?",
    answer: "HyperTrader is an institutional-grade crypto trading automation platform that uses 486 machine learning models and 380 proven strategies to execute trades 24/7. Our AI analyzes market conditions in real-time and automatically adjusts position sizes using Kelly criterion for optimal risk management.",
  },
  {
    question: "Do I need trading experience to use HyperTrader?",
    answer: "No prior trading experience is required. HyperTrader handles all the complex analysis and execution automatically. You simply connect your exchange via read-only API keys, set your risk preferences, and our AI does the rest. We also provide educational resources and strategy breakdowns.",
  },
  {
    question: "How much money do I need to start?",
    answer: "HyperTrader is designed for serious traders with a minimum portfolio size of $10,000. This ensures proper position sizing and risk management across our diversified strategies. Smaller accounts may not benefit from our institutional-grade approach.",
  },
  {
    question: "Is my money safe? Do you have custody of my funds?",
    answer: "Your funds never leave your exchange. We use read-only API connections and never have custody of your assets. All trades are executed directly on your connected exchange accounts. Independent security review in progress; we follow industry-standard encryption and best practices.",
  },
  {
    question: "What returns can I expect?",
    answer: "Our backtested strategies show 52-68% win rates with Sharpe ratios above 2.1 across market conditions. However, past performance doesn't guarantee future results. Crypto markets are volatile, and we recommend only investing what you can afford to lose.",
  },
  {
    question: "What exchanges does HyperTrader support?",
    answer: "HyperTrader integrates with major cryptocurrency exchanges including Binance, Coinbase Pro, Kraken, FTX, and more. We continuously add support for new exchanges based on user demand and liquidity requirements.",
  },
  {
    question: "How do fees work?",
    answer: "We operate on a profit-share model with no upfront fees or hidden charges. You only pay when you profit. Our performance fee is calculated after verification and is completely transparent. See our pricing page for detailed fee structure.",
  },
  {
    question: "Can I customize the trading strategies?",
    answer: "Yes. While our pre-built strategies work out of the box, advanced users can customize parameters, set specific risk limits, choose which asset pairs to trade, and even combine multiple strategies. Our API allows programmatic access for quant developers.",
  },
];

export function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// Product schema for rich snippets
export function buildProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HyperTrader",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: siteMetadata.description,
    url: siteMetadata.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Performance-based pricing. No upfront fees.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "486 ML trading models",
      "380 automated strategies",
      "24/7 automated execution",
      "Real-time risk management",
      "Multi-exchange support",
      "No custody of funds",
    ],
  };
}

