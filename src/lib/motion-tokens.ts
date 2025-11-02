/**
 * Motion Design Tokens
 * Respects prefers-reduced-motion for accessibility
 * Apple-inspired easing curves and durations
 */

import { Variants, Transition } from "framer-motion";

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Apple-inspired easing curves
 */
export const easings = {
  // Standard ease for most UI interactions
  standard: [0.4, 0.0, 0.2, 1] as const,
  
  // Deceleration curve for entering elements
  decelerate: [0.0, 0.0, 0.2, 1] as const,
  
  // Acceleration curve for exiting elements
  accelerate: [0.4, 0.0, 1, 1] as const,
  
  // Sharp curve for quick transitions
  sharp: [0.4, 0.0, 0.6, 1] as const,
  
  // Apple's signature ease (similar to ease-in-out but smoother)
  apple: [0.25, 0.1, 0.25, 1] as const,
  
  // Bounce effect
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  
  // Elastic effect
  elastic: [0.175, 0.885, 0.32, 1.275] as const,
} as const;

/**
 * Duration tokens (in seconds)
 */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  moderate: 0.4,
  slow: 0.5,
  slower: 0.6,
  slowest: 0.8,
} as const;

/**
 * Get transition with reduced motion support
 */
export const getTransition = (
  duration: keyof typeof durations = "normal",
  easing: keyof typeof easings = "apple"
): Transition => {
  const reducedMotion = prefersReducedMotion();
  
  return {
    duration: reducedMotion ? 0.01 : durations[duration],
    ease: easings[easing],
  };
};

/**
 * Common animation variants
 */
export const variants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } as Variants,

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  } as Variants,

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } as Variants,

  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  } as Variants,

  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  } as Variants,

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  } as Variants,

  // Hover effects
  hoverLift: {
    rest: { y: 0 },
    hover: { y: -8 },
  } as Variants,

  hoverScale: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  } as Variants,

  hoverGlow: {
    rest: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
    hover: { boxShadow: "0 0 20px 0 rgba(59, 130, 246, 0.3)" },
  } as Variants,

  // Press effects
  tap: {
    rest: { scale: 1 },
    tap: { scale: 0.95 },
  } as Variants,

  // Stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  } as Variants,
} as const;

/**
 * Spring configurations
 */
export const springs = {
  // Gentle spring for smooth animations
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  },

  // Bouncy spring for playful interactions
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },

  // Stiff spring for quick, snappy animations
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  },

  // Smooth spring for modal/drawer transitions
  smooth: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
  },
} as const;

/**
 * Scroll-triggered animation helpers
 */
export const scrollVariants = {
  // Fade in when scrolled into view
  fadeInView: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: getTransition("moderate", "decelerate"),
    },
  } as Variants,

  // Scale in when scrolled into view
  scaleInView: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: getTransition("moderate", "decelerate"),
    },
  } as Variants,
};

/**
 * Viewport options for scroll animations
 */
export const viewportOptions = {
  once: true, // Animate only once
  margin: "-100px", // Start animation 100px before entering viewport
  amount: 0.3, // Trigger when 30% of element is visible
} as const;

/**
 * Reduced motion variants (instant transitions)
 */
export const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.01 },
} as const;

/**
 * Get variants with reduced motion support
 */
export const getVariants = (variantKey: keyof typeof variants): Variants => {
  if (prefersReducedMotion()) {
    return reducedMotionVariants;
  }
  return variants[variantKey];
};

/**
 * Page transition variants
 */
export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: getTransition("normal", "apple"),
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: getTransition("moderate", "apple"),
  },

  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: getTransition("moderate", "apple"),
  },
} as const;
