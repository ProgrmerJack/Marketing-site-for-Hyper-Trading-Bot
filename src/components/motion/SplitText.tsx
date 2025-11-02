"use client";

import { memo, useId, useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { MotionIntensity } from "./MotionProvider";
import { useMotion } from "./MotionProvider";

type SplitTextProps = {
  children: string;
  splitBy?: "word" | "char";
  startDelay?: number;
  stagger?: number;
  className?: string;
  revealDirection?: "up" | "down" | "fade";
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const intensityMultiplier: Record<MotionIntensity, number> = {
  low: 0.55,
  standard: 1,
  high: 1.25,
};

function tokenize(text: string, splitBy: "word" | "char"): string[] {
  if (splitBy === "char") {
    return Array.from(text);
  }
  return text.split(/(\s+)/);
}

export const SplitText = memo(function SplitText({
  children,
  splitBy = "word",
  startDelay = 0,
  stagger = 0.06,
  className,
  revealDirection = "up",
  as: Component = "span",
}: SplitTextProps) {
  const { shouldReduceMotion, intensity } = useMotion();
  const id = useId();
  const tokens = useMemo(() => tokenize(children, splitBy), [children, splitBy]);

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const multiplier = intensityMultiplier[intensity];
  const effectiveStagger = stagger * multiplier;
  const translate = revealDirection === "up" ? 18 : revealDirection === "down" ? -18 : 0;

  return (
    <Component className={clsx("relative inline-block", className)}>
      <span className="sr-only" aria-live="polite" id={`${id}-sr`}>
        {children}
      </span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {tokens.map((token, index) => {
          if (!token.trim()) {
            return (
              <span key={`${id}-space-${index}`} className="whitespace-pre">
                {token}
              </span>
            );
          }

          return (
            <motion.span
              key={`${id}-${index}`}
              initial={{ opacity: 0, y: translate }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: startDelay + index * effectiveStagger,
                duration: 0.5 * multiplier,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-block will-change-transform"
            >
              {token}
            </motion.span>
          );
        })}
      </span>
    </Component>
  );
});
