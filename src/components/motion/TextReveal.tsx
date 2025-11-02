"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useState, useEffect } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

/**
 * TextReveal - Reveals text character by character with animation
 * @param text - Text to reveal
 * @param delay - Initial delay before animation starts
 * @param staggerDelay - Delay between each character
 */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
}: TextRevealProps) {
  const shouldReduce = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  if (shouldReduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      <AnimatePresence>
        {isVisible &&
          text.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * staggerDelay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
      </AnimatePresence>
    </span>
  );
}
