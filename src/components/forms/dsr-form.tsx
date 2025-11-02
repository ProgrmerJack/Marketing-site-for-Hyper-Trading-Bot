"use client";

import { useState, useTransition } from "react";

export function DsrForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const disabled = isPending;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      setStatus("idle");
      setMessage(null);
      try {
        const response = await fetch("/api/privacy/opt-out", { method: "POST" });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.message ?? "Request failed");
        }
        setStatus("success");
        setMessage(payload.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "We could not record your request. Email privacy@hypertrader.io.",
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-[color:var(--color-line-muted)]/50 bg-white/80 p-6 dark:bg-black/60">
      <div>
        <h2 className="text-base font-semibold text-[color:var(--color-surface-900)] dark:text-white">
          Do Not Sell/Share request
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Submit to register your opt-out. We honour Global Privacy Control automatically and confirm requests within required timelines.
        </p>
      </div>
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--color-accent-primary)] px-6 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent-secondary)]"
        disabled={disabled}
      >
        {disabled ? "Processing..." : "Record request"}
      </button>
      {message ? (
        <p
          className={`text-sm ${
            status === "success"
              ? "text-[color:var(--color-success)]"
              : "text-[color:var(--color-danger)]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

