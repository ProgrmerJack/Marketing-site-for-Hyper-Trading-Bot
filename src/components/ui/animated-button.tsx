"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function AnimatedButton({ 
  children, 
  variant = "primary",
  className = "",
  onClick,
  disabled,
  type = "button",
}: AnimatedButtonProps) {
  const shouldReduce = useReducedMotion();

  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
    secondary: "bg-white/10 border border-white/20 text-white",
    ghost: "text-white hover:bg-white/10",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
      whileHover={shouldReduce ? {} : { scale: 1.05 }}
      whileTap={shouldReduce ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}
