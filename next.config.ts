import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";
import { buildOrganizationSchema, buildWebsiteSchema } from "./src/lib/metadata";

const require = createRequire(import.meta.url);

const isDev = process.env.NODE_ENV !== "production";

const structuredDataHashes = [
  JSON.stringify(buildOrganizationSchema()),
  JSON.stringify(buildWebsiteSchema()),
].map((payload) => createHash("sha256").update(payload).digest("base64"));

const baseScriptSrc = ["'self'", "'unsafe-eval'"];
// By default we keep CSP strict in prod and allow 'unsafe-inline' in dev.
// The ALLOW_UNSAFE_INLINE_SCRIPTS env var allows tests / CI runs to opt-in to
// a looser CSP (temporarily and intentionally) for deterministic E2E testing
// while we continue implementing a proper nonce approach or externalization
// of inline scripts.
const allowUnsafeInline = isDev || process.env.ALLOW_UNSAFE_INLINE_SCRIPTS === 'true';
const scriptSrc = allowUnsafeInline
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
  turbopack: {},
  experimental: {
    optimizePackageImports: ["lucide-react", "zustand", "d3", "@hyper/ui"],
  },
  transpilePackages: ["@hyper/ui", "framer-motion"],
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
    const framerMotionDir = path.dirname(require.resolve("framer-motion/package.json"));
    const hlsDir = path.dirname(require.resolve("hls.js/package.json"));
    config.resolve.alias["framer-motion"] = framerMotionDir;
    config.resolve.alias["hls.js"] = hlsDir;
    return config;
  },
};

export default withContentlayer(nextConfig);
