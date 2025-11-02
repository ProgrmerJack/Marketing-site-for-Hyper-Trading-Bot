/**
 * Apple-inspired animation utilities
 * Smooth, purposeful animations with attention to detail
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: "easeInOut" },
};

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.3, ease: "easeOut" } },
  transition: { duration: 0.3, ease: "easeOut" },
};

// Scroll-based parallax effect
export const parallaxScroll = (speed = 0.5) => ({
  initial: { y: 0 },
  animate: { y: speed * -50 },
  transition: { type: "spring", stiffness: 100, damping: 30 },
});

// Apple-style spring animation
export const springAnimation = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
};

// Smooth cubic bezier (Apple's signature easing)
export const appleBezier = [0.25, 0.1, 0.25, 1] as const;
