"use client";

import { useMemo } from "react";
import { useDemoStore } from "@/stores/demo-store";

export function DemoTelemetry() {
  const status = useDemoStore((state) => state.status);
  const latency = useDemoStore((state) => state.latencyMs);
  const lastSignature = useDemoStore((state) => state.lastSignature);
  const candles = useDemoStore((state) => state.candles);

  const statusLabel = useMemo(() => {
    if (status === "connected") return "Live";
    if (status === "paused") return "Paused";
    if (status === "error") return "Reconnecting";
    return "Offline";
  }, [status]);

  const statusTone = status === "connected" ? "bg-[color:var(--color-accent-secondary)]" : "bg-[color:var(--color-warning)]";

  return (
    <section
      aria-live="polite"
      className="flex flex-col gap-5 rounded-3xl border border-[color:var(--color-line-muted)]/50 bg-white/80 p-6 text-sm text-black/70 dark:bg-slate-900/90 dark:text-white/70"
    >
      <header className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
          Stream health
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className={`h-2.5 w-2.5 rounded-full ${statusTone}`} />
          {statusLabel}
        </span>
      </header>

      <dl className="grid gap-3 text-xs">
        <div className="flex items-center justify-between rounded-2xl border border-[color:var(--color-line-muted)]/50 px-4 py-3">
          <dt className="uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
            Latency p95
          </dt>
          <dd className="font-semibold text-[color:var(--color-surface-900)] dark:text-white">
            {latency ? `${latency.toFixed(0)} ms` : "Calculating"}
          </dd>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-[color:var(--color-line-muted)]/50 px-4 py-3">
          <dt className="uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
            Signature
          </dt>
          <dd className="font-mono text-[0.7rem] text-[color:var(--color-surface-900)] dark:text-white">
            {lastSignature?.slice(0, 12) ?? "--"}...
          </dd>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-[color:var(--color-line-muted)]/50 px-4 py-3">
          <dt className="uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
            Samples
          </dt>
          <dd className="font-semibold text-[color:var(--color-surface-900)] dark:text-white">
            {candles.length}
          </dd>
        </div>
      </dl>

      <footer className="text-xs text-black/50 dark:text-white/50">
        Every packet is signed (SHA-256 HMAC). If a signature fails validation, the stream
        pauses and prompts a reload.
      </footer>
    </section>
  );
}


