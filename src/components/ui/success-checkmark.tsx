"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";

interface SuccessCheckmarkProps {
  size?: number;
  className?: string;
}

export function SuccessCheckmark({ size = 64, className = "" }: SuccessCheckmarkProps) {
  const shouldReduce = useReducedMotion();

  const checkmarkVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      scale: 0.8 
    },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      scale: 1,
      transition: {
        pathLength: { duration: shouldReduce ? 0.01 : 0.5, ease: "easeOut" },
        opacity: { duration: shouldReduce ? 0.01 : 0.3 },
        scale: { 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          duration: shouldReduce ? 0.01 : 0.6
        }
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: shouldReduce ? 0.01 : 0.5
      }
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          stroke="rgb(34 197 94)"
          strokeWidth="3"
          fill="rgb(34 197 94 / 0.1)"
          variants={circleVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M20 32l8 8 16-16"
          stroke="rgb(34 197 94)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={checkmarkVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </div>
  );
}
