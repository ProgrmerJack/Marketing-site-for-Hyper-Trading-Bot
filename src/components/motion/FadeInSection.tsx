"use client";

import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useRef } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * FadeInSection - Fades in content when scrolled into view
 * @param direction - Direction content enters from
 * @param delay - Delay before animation starts (seconds)
 * @param duration - Animation duration (seconds)
 * @param once - Whether animation should only play once
 */
export function FadeInSection({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  const initial = shouldReduce
    ? { opacity: 1 }
    : { opacity: 0, ...directions[direction] };

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: shouldReduce ? 0.01 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
