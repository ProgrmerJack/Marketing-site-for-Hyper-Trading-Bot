/**
 * Advanced animation utilities for Apple-caliber marketing site
 * Includes parallax, 3D transforms, micro-interactions, and sophisticated transitions
 */

import type { Variants, Transition } from "framer-motion";

// ============================================================================
// CORE ANIMATION PRESETS
// ============================================================================

export const appleBezier = [0.25, 0.1, 0.25, 1] as const;
export const appleSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: appleBezier } },
  exit: { opacity: 0, y: -24 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: appleBezier } },
  exit: { opacity: 0, y: 24 },
};

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: appleBezier } },
  exit: { opacity: 0, scale: 0.95 },
};

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: appleBezier } },
  exit: { opacity: 0, x: 40 },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: appleBezier } },
  exit: { opacity: 0, x: -40 },
};

// ============================================================================
// 3D TRANSFORM ANIMATIONS
// ============================================================================

export const flipIn: Variants = {
  initial: { opacity: 0, rotateX: -90, transformPerspective: 1000 },
  animate: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: appleBezier },
  },
  exit: { opacity: 0, rotateX: 90 },
};

export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -180, scale: 0.5 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.8, ease: appleBezier },
  },
  exit: { opacity: 0, rotate: 180, scale: 0.5 },
};

export const perspectiveLeft: Variants = {
  initial: { opacity: 0, rotateY: -45, transformPerspective: 1200 },
  animate: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: appleBezier },
  },
  exit: { opacity: 0, rotateY: 45 },
};

export const perspectiveRight: Variants = {
  initial: { opacity: 0, rotateY: 45, transformPerspective: 1200 },
  animate: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: appleBezier },
  },
  exit: { opacity: 0, rotateY: -45 },
};

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFastContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlowContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: appleBezier } },
};

export const staggerItemScale: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: appleBezier } },
};

// ============================================================================
// HOVER & INTERACTION ANIMATIONS
// ============================================================================

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.3, ease: appleBezier },
  },
  tap: { scale: 0.98 },
};

export const hoverGlow = {
  rest: { boxShadow: "0 0 0 rgba(59, 130, 246, 0)" },
  hover: {
    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
    transition: { duration: 0.3, ease: appleBezier },
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: appleBezier } },
  tap: { scale: 0.95 },
};

export const hoverRotate = {
  rest: { rotate: 0 },
  hover: { rotate: 5, transition: { duration: 0.3, ease: appleBezier } },
};

export const hoverTilt = {
  rest: { rotateX: 0, rotateY: 0 },
  hover: {
    rotateX: -5,
    rotateY: 5,
    transformPerspective: 1000,
    transition: { duration: 0.4, ease: appleBezier },
  },
};

// ============================================================================
// PARALLAX & SCROLL ANIMATIONS
// ============================================================================

export const parallaxSlow = {
  initial: { y: 0 },
  animate: { y: -30 },
  transition: { duration: 2, ease: "linear" },
};

export const parallaxMedium = {
  initial: { y: 0 },
  animate: { y: -60 },
  transition: { duration: 2, ease: "linear" },
};

export const parallaxFast = {
  initial: { y: 0 },
  animate: { y: -100 },
  transition: { duration: 2, ease: "linear" },
};

// Function to create custom parallax based on scroll
export const createParallax = (speed: number) => ({
  initial: { y: 0 },
  animate: { y: speed * -50 },
  transition: { type: "spring", stiffness: 100, damping: 30 },
});

// ============================================================================
// CARD ANIMATIONS
// ============================================================================

export const cardEntrance: Variants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: appleBezier },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: appleBezier },
  },
};

export const card3DEffect = {
  rest: { rotateX: 0, rotateY: 0, z: 0 },
  hover: {
    rotateX: -5,
    rotateY: 5,
    z: 50,
    transformPerspective: 1000,
    transition: { duration: 0.4, ease: appleBezier },
  },
};

// ============================================================================
// REVEAL ANIMATIONS (for scroll-triggered content)
// ============================================================================

export const revealLeft: Variants = {
  initial: { opacity: 0, x: -100 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: appleBezier },
  },
  viewport: { once: true, amount: 0.3 },
};

export const revealRight: Variants = {
  initial: { opacity: 0, x: 100 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: appleBezier },
  },
  viewport: { once: true, amount: 0.3 },
};

export const revealUp: Variants = {
  initial: { opacity: 0, y: 60 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: appleBezier },
  },
  viewport: { once: true, amount: 0.3 },
};

export const revealScale: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: appleBezier },
  },
  viewport: { once: true, amount: 0.3 },
};

// ============================================================================
// MICRO-INTERACTIONS
// ============================================================================

export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(59, 130, 246, 0.4)",
      "0 0 0 10px rgba(59, 130, 246, 0)",
      "0 0 0 0 rgba(59, 130, 246, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const float = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const bounce = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const rotate360 = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: appleBezier },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: appleBezier },
  },
};

export const pageSlide: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: appleBezier },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3, ease: appleBezier },
  },
};

export const pageScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: appleBezier },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.3, ease: appleBezier },
  },
};

// ============================================================================
// TYPOGRAPHY ANIMATIONS
// ============================================================================

export const textReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: appleBezier,
    },
  }),
};

export const textGradientShift = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a stagger delay for indexed items
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

/**
 * Creates a viewport config for scroll-triggered animations
 */
export const createViewportConfig = (once: boolean = true, amount: number = 0.3) => ({
  once,
  amount,
});

/**
 * Creates a custom transition with specified duration and easing
 */
export const createTransition = (
  duration: number = 0.5,
  ease: typeof appleBezier | "linear" | "easeIn" | "easeOut" | "easeInOut" = appleBezier
): Transition => ({
  duration,
  ease,
});

/**
 * Merges multiple animation variants
 */
export const mergeVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, variant) => ({ ...acc, ...variant }), {});
};
