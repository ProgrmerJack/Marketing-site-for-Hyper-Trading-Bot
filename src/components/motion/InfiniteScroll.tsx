"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode } from "react";

interface InfiniteScrollProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

/**
 * InfiniteScroll - Creates a continuous scrolling loop effect
 * @param speed - Scroll speed multiplier (default: 1)
 * @param direction - Scroll direction (default: "left")
 */
export function InfiniteScroll({
  children,
  speed = 1,
  direction = "left",
  className = "",
}: InfiniteScrollProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex gap-4">{children}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{
          x: direction === "left" ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20 / speed,
            ease: "linear",
          },
        }}
        style={{ willChange: "transform" }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </motion.div>
    </div>
  );
}
