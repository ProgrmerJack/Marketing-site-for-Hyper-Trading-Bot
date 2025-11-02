"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useRef } from "react";

interface ScrollReveal3DProps {
  children: ReactNode;
  rotateXStart?: number;
  rotateXEnd?: number;
  scaleStart?: number;
  scaleEnd?: number;
  className?: string;
}

/**
 * ScrollReveal3D - Reveals content with 3D transforms as user scrolls
 * @param rotateXStart - Starting rotation in degrees
 * @param rotateXEnd - Ending rotation in degrees
 * @param scaleStart - Starting scale
 * @param scaleEnd - Ending scale
 */
export function ScrollReveal3D({
  children,
  rotateXStart = 45,
  rotateXEnd = 0,
  scaleStart = 0.8,
  scaleEnd = 1,
  className = "",
}: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [rotateXStart, rotateXEnd]),
    { stiffness: 100, damping: 30 }
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [scaleStart, scaleEnd]),
    { stiffness: 100, damping: 30 }
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  if (shouldReduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ perspective: "1000px" }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
