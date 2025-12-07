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
            
            {/* Limited spots badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Only 73 Early Access Spots Left
              </span>
            </motion.div>
            
            <div className="relative space-y-8 text-center">
              {/* Lead magnet offer badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="inline-flex flex-col items-center gap-3"
              >
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] shadow-lg neon-glow-cyan">
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(79,244,207)]/40 bg-[rgb(79,244,207)]/10 px-4 py-1.5 text-sm font-medium text-[rgb(79,244,207)]">
                  🎁 FREE: 2024 Crypto Trading Playbook ($97 value)
                </span>
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
                  Get the Edge Before Everyone Else
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
                >
                  Join <strong className="text-foreground">127+ traders</strong> getting exclusive early access, 
                  weekly alpha signals, and strategy breakdowns from our quant team. 
                  Plus, get our <strong className="text-[rgb(79,244,207)]">free 47-page playbook</strong> instantly.
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
                        "bg-gradient-to-r from-[rgb(79,244,207)] to-[rgb(0,179,255)] btn-gradient-text",
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
                        <CheckCircle2 className="h-5 w-5 text-current" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="h-5 w-5 text-current transition-transform group-hover:translate-x-1" />
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
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(52,211,153)] shadow-sm">
                    <CheckCircle2 className="h-3 w-3 text-white drop-shadow-sm" />
                  </span>
                  <span>Free 47-page playbook</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(52,211,153)] shadow-sm">
                    <CheckCircle2 className="h-3 w-3 text-white drop-shadow-sm" />
                  </span>
                  <span>Weekly alpha signals</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(52,211,153)] shadow-sm">
                    <CheckCircle2 className="h-3 w-3 text-white drop-shadow-sm" />
                  </span>
                  <span>Strategy breakdowns</span>
                </div>
              </motion.div>
              
              {/* Social proof avatars */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col items-center gap-3 pt-4"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-slate-600 to-slate-800 shadow-md dark:border-slate-800"
                      style={{
                        backgroundImage: `url('https://i.pravatar.cc/80?img=${i + 10}')`,
                        backgroundSize: 'cover',
                      }}
                    />
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] text-xs font-bold btn-gradient-text shadow-md dark:border-slate-800">
                    +122
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">127 traders</strong> joined this week
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
