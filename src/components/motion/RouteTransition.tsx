"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode } from "react";

interface RouteTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp";
}

/**
 * RouteTransition - Animated page transitions for route changes
 * @param variant - Animation style for the transition
 */
export function RouteTransition({ 
  children, 
  variant = "fade" 
}: RouteTransitionProps) {
  const shouldReduce = useReducedMotion();

  const variants = {
    fade: {
      initial: { opacity: shouldReduce ? 1 : 0 },
      animate: { opacity: 1 },
      exit: { opacity: shouldReduce ? 1 : 0 },
    },
    slide: {
      initial: { opacity: shouldReduce ? 1 : 0, x: shouldReduce ? 0 : 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: shouldReduce ? 1 : 0, x: shouldReduce ? 0 : -100 },
    },
    scale: {
      initial: { opacity: shouldReduce ? 1 : 0, scale: shouldReduce ? 1 : 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: shouldReduce ? 1 : 0, scale: shouldReduce ? 1 : 1.05 },
    },
    slideUp: {
      initial: { opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : -40 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={{
        duration: shouldReduce ? 0.01 : 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
