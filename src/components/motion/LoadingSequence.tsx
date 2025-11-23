"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useEffect, useState } from "react";

interface LoadingStep {
  id: string;
  label: string;
  duration: number;
}

interface LoadingSequenceProps {
  steps: LoadingStep[];
  onComplete?: () => void;
  className?: string;
}

/**
 * LoadingSequence - Multi-step loading animation with progress
 * @param steps - Array of loading steps with labels and durations
 * @param onComplete - Callback when all steps complete
 */
export function LoadingSequence({
  steps,
  onComplete,
  className = "",
}: LoadingSequenceProps) {
  const shouldReduce = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      onComplete?.();
      return;
    }

    const step = steps[currentStep];
    const duration = shouldReduce ? 10 : step.duration;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const stepProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(stepProgress);

      if (stepProgress >= 100) {
        clearInterval(interval);
        setCurrentStep((prev) => prev + 1);
        setProgress(0);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [currentStep, steps, shouldReduce, onComplete]);

  const totalProgress = ((currentStep + progress / 100) / steps.length) * 100;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Bar */}
      <div className="relative h-2 bg-[rgb(var(--card))/0.06] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: shouldReduce ? 0.01 : 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <motion.div
              key={step.id}
              className="flex items-center gap-3"
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: shouldReduce ? 0.01 : 0.3 }}
            >
              {/* Status Icon */}
              <div className="relative">
                {isComplete ? (
                  <motion.div
                    className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={shouldReduce ? { scale: 1 } : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                ) : isActive ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-blue-500 rounded-full"
                    animate={shouldReduce ? {} : { rotate: 360 }}
                    transition={shouldReduce ? {} : { duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-transparent border-t-blue-500" />
                  </motion.div>
                ) : (
                  <div className="w-6 h-6 border-2 border-white/20 rounded-full" />
                )}
              </div>

              {/* Label */}
              <span className={`text-sm ${
                isComplete ? "text-green-400" : isActive ? "text-blue-400 font-semibold" : "text-gray-500"
              }`}>
                {step.label}
              </span>

              {/* Active Progress */}
              {isActive && (
                <span className="ml-auto text-xs text-gray-400">
                  {Math.round(progress)}%
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
