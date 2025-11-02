"use client";

import { useState, useTransition, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const disabled = state === "submitting" || state === "success" || isPending;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.consent) {
      setState("error");
      setMessage("You must agree to receive follow-up communications.");
      return;
    }

    startTransition(async () => {
      setState("submitting");
      setMessage(null);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, consent: "true" }),
        });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.message ?? "Submission failed");
        }
        setState("success");
        setMessage(payload.message);
        form.reset();
      } catch (error) {
        setState("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to submit right now. Please email compliance@hypertrader.io.",
        );
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-[color:var(--color-line-muted)]/50 bg-white/80 p-8 shadow-surface dark:bg-black/60"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Work email" name="email" type="email" autoComplete="email" required />
        <Field label="Company" name="company" autoComplete="organization" required />
        <Field label="Jurisdiction" name="jurisdiction" placeholder="e.g. US, UK, EU" required />
        <Field label="Role / mandate" name="role" placeholder="Ops, Compliance, Portfolio..." />
      </div>
      <Field
        label="What would you like to evaluate?"
        name="message"
        as="textarea"
        rows={4}
        placeholder="Tell us about your mandate, assets, and risk/compliance requirements."
      />
      <Consent />
      <button
        type="submit"
        className={clsx(
          "inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--color-accent-primary)] px-7 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent-secondary)]",
          disabled && "cursor-not-allowed opacity-70",
        )}
        disabled={disabled}
      >
        {state === "submitting" ? "Submitting..." : "Request gated access"}
      </button>
      {message ? (
        <p
          className={clsx(
            "text-sm",
            state === "success" ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]",
          )}
        >
          {message}
        </p>
      ) : null}
      <p className="text-xs text-black/50 dark:text-white/50">
        We honour Global Privacy Control and Do Not Sell/Share requests. Each email includes our
        postal address and one-click unsubscribe in line with the CAN-SPAM Act.
      </p>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  as?: "input" | "textarea";
} & ComponentPropsWithoutRef<"input"> &
  ComponentPropsWithoutRef<"textarea">;

function Field({
  label,
  name,
  as = "input",
  className,
  ...props
}: FieldProps) {
  const InputComponent = as;
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-surface-900)] dark:text-white/80">
      {label}
      <InputComponent
        name={name}
        className={clsx(
          "rounded-2xl border border-[color:var(--color-line-muted)] bg-white/90 px-4 py-3 text-sm text-black placeholder:text-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent-primary)] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40",
          className,
        )}
        {...props}
      />
    </label>
  );
}

function Consent() {
  return (
    <label className="flex items-start gap-3 text-sm text-black/70 dark:text-white/70">
      <input
        type="checkbox"
        name="consent"
        value="true"
        className="mt-1 h-5 w-5 rounded border border-[color:var(--color-line-muted)] text-[color:var(--color-accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent-primary)]"
        required
      />
      <span>
        I consent to receiving compliance-focused updates and understand I can opt out anytime.
        Hyper Trading Automation honours one-click unsubscribe requests within 10 business days.
      </span>
    </label>
  );
}

