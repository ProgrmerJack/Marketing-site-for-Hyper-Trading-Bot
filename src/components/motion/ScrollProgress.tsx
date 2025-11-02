"use client";

import { motion, useScroll } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useEffect, useState } from "react";

interface ScrollProgressProps {
  position?: "top" | "bottom";
  height?: number;
  className?: string;
  color?: string;
}

/**
 * ScrollProgress - Shows reading progress bar
 * @param position - Position of the progress bar
 * @param height - Height of the progress bar in pixels
 * @param color - Color of the progress bar
 */
export function ScrollProgress({
  position = "top",
  height = 3,
  className = "",
  color = "var(--color-accent-primary)",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const shouldReduce = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsScrolled(latest > 0.01);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  if (shouldReduce) {
    return null;
  }

  return (
    <motion.div
      className={`fixed ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 z-50 origin-left ${className}`}
      style={{
        height: `${height}px`,
        backgroundColor: color,
        scaleX: scrollYProgress,
        opacity: isScrolled ? 1 : 0,
      }}
      initial={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
}
