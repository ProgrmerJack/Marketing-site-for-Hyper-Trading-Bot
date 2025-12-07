"use client";

import Link from "next/link";
import { ArrowRight, Code, Github, Key, Zap, RefreshCw, Shield, Terminal, Webhook, Clock, Copy, Check } from "lucide-react";
import { Container } from "@hyper/ui";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { useState } from "react";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md bg-slate-700 p-1.5 text-slate-400 transition-colors hover:bg-slate-600 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function DocsAPIPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/v1/status",
      description: "Check API status and get server time",
      auth: false,
    },
    {
      method: "GET",
      path: "/v1/strategies",
      description: "List all available trading strategies",
      auth: true,
    },
    {
      method: "POST",
      path: "/v1/strategies/{id}/deploy",
      description: "Deploy a strategy with custom parameters",
      auth: true,
    },
    {
      method: "GET",
      path: "/v1/bots",
      description: "List all active trading bots",
      auth: true,
    },
    {
      method: "POST",
      path: "/v1/bots/{id}/start",
      description: "Start a trading bot",
      auth: true,
    },
    {
      method: "POST",
      path: "/v1/bots/{id}/stop",
      description: "Stop a trading bot",
      auth: true,
    },
    {
      method: "GET",
      path: "/v1/performance",
      description: "Get performance metrics and statistics",
      auth: true,
    },
    {
      method: "GET",
      path: "/v1/trades",
      description: "List trade history with filtering",
      auth: true,
    },
  ];

  const features = [
    {
      icon: Key,
      title: "API Key Authentication",
      description: "Secure API keys with customizable permissions and IP whitelisting.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Zap,
      title: "Low Latency",
      description: "Average response time under 50ms for real-time trading operations.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: RefreshCw,
      title: "Rate Limiting",
      description: "Generous rate limits with 1000 requests/minute for Pro users.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Webhook,
      title: "Webhooks",
      description: "Real-time notifications for trades, signals, and system events.",
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-5xl space-y-16"
        >
          {/* Header */}
          <div className="space-y-4">
            <Link href="/docs" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              ← Back to Docs
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  API Reference
                </h1>
                <p className="text-slate-600 dark:text-slate-400">RESTful API v1.0</p>
              </div>
            </div>
            <p className="text-xl text-slate-700 dark:text-slate-300">
              Build powerful trading automations with Hyper Trading's comprehensive REST API.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PremiumCard variant="glass-secondary" className="h-full p-5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} shadow-md mb-3`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Start */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Start</h2>
            <PremiumCard variant="glass-secondary" className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Check API Status</h3>
              </div>
              <CodeBlock code={`curl -X GET https://api.hypertrader.com/v1/status`} />
              
              <div className="flex items-center gap-3 pt-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Authenticate with API Key</h3>
              </div>
              <CodeBlock code={`curl -X GET https://api.hypertrader.com/v1/strategies \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`} />

              <div className="flex items-center gap-3 pt-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">3</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Deploy a Strategy</h3>
              </div>
              <CodeBlock code={`curl -X POST https://api.hypertrader.com/v1/strategies/momentum-alpha/deploy \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pair": "BTC/USDT",
    "exchange": "binance",
    "risk_level": "medium",
    "position_size": 0.1
  }'`} />
            </PremiumCard>
          </div>

          {/* Authentication */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Authentication</h2>
            <PremiumCard variant="glass-secondary" className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">API Key Security</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    All authenticated requests require a valid API key in the Authorization header. 
                    API keys can be created in your dashboard with granular permissions:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      <strong>Read-only:</strong> View strategies, bots, and performance data
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <strong>Trade:</strong> Start/stop bots and deploy strategies
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
                      <strong>Admin:</strong> Full API access including webhooks and settings
                    </li>
                  </ul>
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Endpoints */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API Endpoints</h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Method</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Endpoint</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Description</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((endpoint, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                    >
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${
                          endpoint.method === "GET" 
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                        }`}>
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">{endpoint.path}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{endpoint.description}</td>
                      <td className="px-4 py-3">
                        {endpoint.auth ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                            <Key className="h-3 w-3 text-white" />
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Rate Limits</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { plan: "Free", limit: "100 requests/min", burst: "10/sec" },
                { plan: "Pro", limit: "1,000 requests/min", burst: "50/sec" },
                { plan: "Enterprise", limit: "10,000 requests/min", burst: "500/sec" },
              ].map((tier) => (
                <PremiumCard key={tier.plan} variant="glass-secondary" className="p-5 text-center">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{tier.plan}</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{tier.limit}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Burst: {tier.burst}</p>
                </PremiumCard>
              ))}
            </div>
          </div>

          {/* SDKs */}
          <PremiumCard variant="glass-primary" className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg shadow-slate-900/25">
                <Github className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Official SDKs</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  Use our official SDKs for faster integration. Available for Python, JavaScript/TypeScript, and Go.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    Python SDK
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                    JavaScript SDK
                  </span>
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300">
                    Go SDK
                  </span>
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* Coming Soon */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/20">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              📝 <strong>Full API Documentation Coming Soon:</strong> Complete endpoint documentation with request/response schemas, error codes, and interactive API explorer. 
              <Link href="/contact" className="ml-1 font-semibold underline hover:no-underline">
                Contact us
              </Link>{" "}
              to request early API access.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
