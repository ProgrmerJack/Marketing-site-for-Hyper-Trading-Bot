"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * ParallaxSection - Creates a parallax scrolling effect
 * @param speed - Multiplier for parallax speed (0.5 = half speed, 2 = double speed)
 */
export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = "" 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * speed, -100 * speed]
  );

  if (shouldReduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
