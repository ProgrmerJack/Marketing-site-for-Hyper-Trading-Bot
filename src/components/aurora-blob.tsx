"use client";

import { motion } from "framer-motion";

/**
 * AuroraBlob - decorative, subtle animated aurora blob used in PageHeaderAnimated
 * Extracted to reduce PageHeaderAnimated size and allow reuse.
 */
export function AuroraBlob() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -left-10 top-6 -z-0 h-44 w-64 rounded-full blur-3xl opacity-40 dark:opacity-30"
      animate={{ x: [0, 18, 0], y: [0, -6, 0], opacity: [0.35, 0.6, 0.35], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      <div className="h-full w-full bg-gradient-to-tr from-blue-300/30 via-purple-300/20 to-pink-300/10 dark:from-blue-500/20 dark:via-purple-300/15" />
    </motion.div>
  );
}

export default AuroraBlob;
