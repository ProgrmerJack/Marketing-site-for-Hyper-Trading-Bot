"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Ripple = {
  x: number;
  y: number;
  id: number;
};

type RippleButtonProps = {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: () => void;
};

export function RippleButton({
  children,
  className = "",
  rippleColor = "rgba(59, 130, 246, 0.5)",
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const addRipple = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
  };

  return (
    <button
      ref={ref}
      onClick={addRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 200,
              height: 200,
              marginLeft: -100,
              marginTop: -100,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
