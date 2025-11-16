"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useRef } from "react";

interface StickyScrollProps {
  children: ReactNode;
  start?: number;
  end?: number;
  className?: string;
}

/**
 * StickyScroll - Creates a sticky scroll effect with scale animation
 * @param start - Start progress (0-1) for the animation
 * @param end - End progress (0-1) for the animation
 */
export function StickyScroll({
  children,
  start = 0,
  end = 1,
  className = "",
}: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [start, end], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

  if (shouldReduce) {
    return (
      <div ref={ref} className={`sticky top-0 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`sticky top-0 ${className}`}>
      <motion.div
        style={{
          scale,
          opacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
