import { createHash } from "node:crypto";
import path from "node:path";
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";
import { buildOrganizationSchema, buildWebsiteSchema } from "./src/lib/metadata";

const isDev = process.env.NODE_ENV !== "production";

const structuredDataHashes = [
  JSON.stringify(buildOrganizationSchema()),
  JSON.stringify(buildWebsiteSchema()),
].map((payload) => createHash("sha256").update(payload).digest("base64"));

const baseScriptSrc = ["'self'", "'unsafe-eval'"];
const scriptSrc = isDev
  ? [...baseScriptSrc, "'unsafe-inline'", "blob:"]
  : [...baseScriptSrc, ...structuredDataHashes.map((hash) => `'sha256-${hash}'`)];

const connectSrc = [
  "'self'",
  "https://*.hypertrader.local",
  "https://vitals.vercel-insights.com",
  ...(isDev ? ["ws:", "wss:"] : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  crossOrigin: "anonymous",
  typedRoutes: true,
  compress: true,
  outputFileTracingRoot: path.resolve(__dirname, "../.."),
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "zustand", "d3", "@hyper/ui"],
  },
  transpilePackages: ["@hyper/ui"],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              [
                "default-src 'self'",
                `script-src ${scriptSrc.join(" ")}`,
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: blob:",
                "font-src 'self' data:",
                `connect-src ${connectSrc.join(" ")}`,
                "frame-ancestors 'none'",
                "base-uri 'self'",
                "form-action 'self'",
              ].join("; "),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = config.resolve.alias ?? {};
    config.resolve.alias["gsap/SplitText"] = path.resolve(__dirname, "src/shims/gsap/SplitText");
    config.resolve.alias["gsap/ScrambleTextPlugin"] = path.resolve(
      __dirname,
      "src/shims/gsap/ScrambleTextPlugin",
    );
    config.resolve.alias["gsap/InertiaPlugin"] = path.resolve(
      __dirname,
      "src/shims/gsap/InertiaPlugin",
    );
    return config;
  },
};

export default withContentlayer(nextConfig);
