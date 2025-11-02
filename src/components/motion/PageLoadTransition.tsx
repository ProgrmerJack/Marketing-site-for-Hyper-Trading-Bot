"use client";

import { motion, useAnimation } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useEffect } from "react";

interface PageLoadTransitionProps {
  children: ReactNode;
  sequence?: "fade" | "slideUp" | "scale" | "stagger";
  delay?: number;
}

/**
 * PageLoadTransition - Orchestrated page load animation
 * @param sequence - Animation style for page entrance
 * @param delay - Initial delay before animation starts
 */
export function PageLoadTransition({
  children,
  sequence = "fade",
  delay = 0,
}: PageLoadTransitionProps) {
  const shouldReduce = useReducedMotion();
  const controls = useAnimation();

  useEffect(() => {
    const runSequence = async () => {
      if (shouldReduce) {
        controls.set({ opacity: 1, y: 0, scale: 1 });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, delay * 1000));

      switch (sequence) {
        case "fade":
          await controls.start({
            opacity: 1,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
          });
          break;

        case "slideUp":
          await controls.start({
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            },
          });
          break;

        case "scale":
          await controls.start({
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20,
            },
          });
          break;

        case "stagger":
          await controls.start({
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              staggerChildren: 0.1,
            },
          });
          break;
      }
    };

    runSequence();
  }, [controls, sequence, delay, shouldReduce]);

  const initialStates = {
    fade: { opacity: 0 },
    slideUp: { opacity: 0, y: 40 },
    scale: { opacity: 0, scale: 0.9 },
    stagger: { opacity: 0, y: 40 },
  };

  return (
    <motion.div initial={initialStates[sequence]} animate={controls}>
      {children}
    </motion.div>
  );
}

/**
 * LoadingOverlay - Full-screen loading animation with logo
 */
export function LoadingOverlay({
  isLoading,
  logo,
}: {
  isLoading: boolean;
  logo?: ReactNode;
}) {
  const shouldReduce = useReducedMotion();

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
    >
      <div className="text-center">
        {logo ? (
          <motion.div
            animate={shouldReduce ? {} : {
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={shouldReduce ? {} : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {logo}
          </motion.div>
        ) : (
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={shouldReduce ? {} : { rotate: 360 }}
            transition={shouldReduce ? {} : {
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </motion.div>
  );
}
