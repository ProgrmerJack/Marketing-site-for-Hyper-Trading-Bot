"use client";

/**
 * Loading Skeleton Components
 * Accessible loading states with proper ARIA attributes
 */

import { motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion-tokens";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  animate?: boolean;
}

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

/**
 * Base skeleton component
 */
export function Skeleton({
  className = "",
  width,
  height = "1rem",
  rounded = "md",
  animate = true,
}: SkeletonProps) {
  const reducedMotion = prefersReducedMotion();
  const shouldAnimate = animate && !reducedMotion;

  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  if (shouldAnimate) {
    return (
      <motion.div
        className={`bg-gray-200 dark:bg-gray-700 ${roundedClasses[rounded]} ${className}`}
        style={style}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        role="status"
        aria-label="Loading"
      />
    );
  }

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 ${roundedClasses[rounded]} ${className}`}
      style={style}
      role="status"
      aria-label="Loading"
    />
  );
}

/**
 * Text line skeleton
 */
export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? "80%" : "100%"}
          rounded="sm"
        />
      ))}
    </div>
  );
}

/**
 * Card skeleton
 */
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}
      role="status"
      aria-label="Loading card"
    >
      <Skeleton height={200} rounded="lg" className="mb-4" />
      <Skeleton height={24} width="60%" className="mb-3" />
      <SkeletonText lines={2} />
    </div>
  );
}

/**
 * Avatar skeleton
 */
export function SkeletonAvatar({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Skeleton
      width={size}
      height={size}
      rounded="full"
      className={className}
      aria-label="Loading avatar"
    />
  );
}

/**
 * Button skeleton
 */
export function SkeletonButton({
  width = 100,
  className = "",
}: {
  width?: number | string;
  className?: string;
}) {
  return (
    <Skeleton
      width={width}
      height={44}
      rounded="lg"
      className={className}
      aria-label="Loading button"
    />
  );
}

/**
 * Table skeleton
 */
export function SkeletonTable({
  rows = 5,
  columns = 4,
  className = "",
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading table">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} height={20} className="flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              height={16}
              className="flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Chart skeleton
 */
export function SkeletonChart({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}
      role="status"
      aria-label="Loading chart"
    >
      {/* Chart title */}
      <Skeleton height={24} width="40%" className="mb-6" />
      
      {/* Chart area with bars */}
      <div className="flex items-end gap-2 h-48">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            height={Math.random() * 150 + 50}
            className="flex-1"
            rounded="sm"
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex gap-6 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton width={12} height={12} rounded="sm" />
            <Skeleton width={60} height={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Page skeleton
 */
export function SkeletonPage({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-8 ${className}`} role="status" aria-label="Loading page">
      {/* Hero */}
      <div className="space-y-4">
        <Skeleton height={48} width="60%" />
        <SkeletonText lines={2} />
        <div className="flex gap-4">
          <SkeletonButton width={120} />
          <SkeletonButton width={120} />
        </div>
      </div>
      
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

/**
 * Form skeleton
 */
export function SkeletonForm({
  fields = 4,
  className = "",
}: {
  fields?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-6 ${className}`} role="status" aria-label="Loading form">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton height={16} width={100} />
          <Skeleton height={44} rounded="lg" />
        </div>
      ))}
      <SkeletonButton width="100%" />
    </div>
  );
}
