"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

/**
 * AnimatedCounter - Animates number changes with smooth transitions
 * @param value - Target number to count to
 * @param duration - Animation duration in seconds (default: 2)
 * @param suffix - Text to append (e.g., "%", "+", "K")
 * @param prefix - Text to prepend (e.g., "$", "#")
 * @param decimals - Number of decimal places (default: 0)
 */
export function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const shouldReduce = useReducedMotion();
  const motionValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: (shouldReduce ? 0.01 : duration) * 1000,
  });

  const display = useTransform(motionValue, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  if (shouldReduce) {
    return (
      <span className={className}>
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
    );
  }

  return <motion.span className={className}>{display}</motion.span>;
}

interface CounterGridProps {
  stats: Array<{
    id: string;
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
  }>;
  className?: string;
}

/**
 * CounterGrid - Grid of animated counters for stats/metrics
 */
export function CounterGrid({ stats, className = "" }: CounterGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.id} className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              duration={2}
            />
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
