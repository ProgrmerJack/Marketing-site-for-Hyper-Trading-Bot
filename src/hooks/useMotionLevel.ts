"use client";

import { useMotion } from "@/components/motion/MotionProvider";

/**
 * Hook to determine the motion level based on user preferences
 * Returns "high", "medium", or "minimal" based on reduced motion settings
 */
export function useMotionLevel(): "high" | "medium" | "minimal" {
  const { shouldReduceMotion } = useMotion();
  
  // If user prefers reduced motion, return minimal
  // Otherwise return high for maximum visual effects
  return shouldReduceMotion ? "minimal" : "high";
}
