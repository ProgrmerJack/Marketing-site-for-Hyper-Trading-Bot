"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { Container } from "@hyper/ui";
import clsx from "clsx";

export function EmailCaptureSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you! You're on the list.");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,244,207)]/5 via-transparent to-[rgb(0,179,255)]/5 dark:from-[rgb(79,244,207)]/10 dark:to-[rgb(0,179,255)]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,244,207,0.1),transparent_70%)]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-[rgb(79,244,207)]/30 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 p-8 shadow-2xl backdrop-blur-sm dark:border-[rgb(79,244,207)]/50 dark:from-slate-900/80 dark:via-slate-900/70 dark:to-[rgb(10,10,15)] md:p-12 lg:p-16">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-[rgb(79,244,207)] opacity-20 blur-3xl" />
            
            <div className="relative space-y-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] shadow-lg neon-glow-cyan"
              >
                <Mail className="h-10 w-10 text-white" />
              </motion.div>

              {/* Heading */}
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
                >
                  Stay in the loop
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
                >
                  Get early access updates, performance insights, and product announcements. 
                  No spam, just the signal.
                </motion.p>
              </div>

              {/* Email Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onSubmit={handleSubmit}
                className="mx-auto max-w-md space-y-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === "loading" || status === "success"}
                    className={clsx(
                      "flex-1 rounded-full border-2 px-6 py-4 text-base outline-none transition-all",
                      "border-slate-300 bg-[rgb(var(--card))] text-slate-900 placeholder-slate-500",
                      "focus:border-[rgb(79,244,207)] focus:ring-4 focus:ring-[rgb(79,244,207)]/20",
                      "dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-400",
                      "dark:focus:border-[rgb(79,244,207)] dark:focus:ring-[rgb(79,244,207)]/30",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={clsx(
                      "group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-base font-semibold shadow-lg transition-all duration-200",
                      "bg-gradient-to-r from-[rgb(79,244,207)] to-[rgb(0,179,255)] text-slate-900",
                      "hover:shadow-xl hover:shadow-[rgb(79,244,207)]/40 hover:-translate-y-0.5",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(79,244,207)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    )}
                  >
                    {status === "loading" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 rounded-full border-2 border-slate-900/20 border-t-slate-900"
                        />
                        <span>Subscribing...</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Status Message */}
                {message && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={clsx(
                      "text-sm",
                      status === "success" ? "text-[rgb(52,211,153)]" : "text-red-500"
                    )}
                  >
                    {message}
                  </motion.p>
                )}

                {/* Privacy Note */}
                <p className="text-xs text-muted-foreground">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </motion.form>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(79,244,207)]" />
                  <span>Early access benefits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(79,244,207)]" />
                  <span>Performance updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(79,244,207)]" />
                  <span>Product announcements</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
