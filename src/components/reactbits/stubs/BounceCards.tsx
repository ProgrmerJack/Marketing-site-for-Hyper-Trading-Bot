"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type BounceCardsProps = {
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  enableHover?: boolean;
  className?: string;
};

/**
 * Lightweight fallback for the proprietary ReactBits BounceCards component.
 * It renders layered gradient panels with subtle motion so the surrounding
 * layout keeps its intended visual rhythm even when the upstream effect is
 * unavailable on Windows builds.
 */
export default function BounceCardsFallback({
  images = [],
  containerWidth = 240,
  containerHeight = 240,
  animationDelay = 0,
  animationStagger = 0.12,
  enableHover = false,
  className,
}: BounceCardsProps) {
  const cards = (images.length ? images : DEFAULT_GRADIENTS).slice(0, 4);

  return (
    <div
      className={clsx("relative isolate", className)}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {cards.map((background, index) => (
        <motion.div
          key={background ?? index}
          className="absolute inset-0 rounded-[1.75rem] shadow-[0_25px_60px_-45px_rgba(15,23,42,0.45)]"
          style={{
            background,
            transformOrigin: "center",
          }}
          initial={{ y: 18 + index * 4, scale: 0.92 - index * 0.03, opacity: 0.35 + index * 0.12 }}
          animate={{
            y: [18 + index * 4, 10 + index * 3, 18 + index * 4],
            rotate: [-2 + index, 1 - index * 0.5, -2 + index],
            opacity: [0.35 + index * 0.12, 0.5 + index * 0.1, 0.35 + index * 0.12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: animationDelay + index * animationStagger,
            ease: "easeInOut",
          }}
          whileHover={enableHover ? { scale: 1.02, y: 6 } : undefined}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-white/20" />
    </div>
  );
}

const DEFAULT_GRADIENTS = [
  "linear-gradient(135deg, rgba(56,189,248,0.95), rgba(59,130,246,0.75))",
  "linear-gradient(135deg, rgba(109,40,217,0.9), rgba(59,130,246,0.65))",
  "linear-gradient(135deg, rgba(14,165,233,0.85), rgba(6,182,212,0.7))",
  "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(139,92,246,0.65))",
];
