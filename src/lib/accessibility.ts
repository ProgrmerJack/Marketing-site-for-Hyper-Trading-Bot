/**
 * WCAG 2.2 AA Focus Styles
 * 
 * Requirements:
 * - 2.4.11 Focus Appearance (Level AA): Minimum 2px solid outline
 * - 2.4.7 Focus Visible (Level AA): 4.5:1 contrast ratio
 * - 2.5.8 Target Size (Level AA): Minimum 24x24px for interactive elements
 */

/**
 * CSS classes for WCAG-compliant focus states
 * Add to Tailwind config or use as inline styles
 */
export const focusClasses = {
  // Standard focus ring (2px, high contrast)
  standard: `
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-blue-600
    dark:focus-visible:ring-blue-400
  `,

  // Primary button focus
  primary: `
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-white
    focus-visible:ring-offset-blue-600
  `,

  // Secondary button focus
  secondary: `
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-blue-600
    dark:focus-visible:ring-blue-400
  `,

  // Input field focus
  input: `
    focus:outline-none
    focus:ring-2
    focus:ring-blue-600
    focus:border-blue-600
    dark:focus:ring-blue-400
    dark:focus:border-blue-400
  `,

  // Card/link focus
  card: `
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-blue-600
    focus-visible:ring-offset-white
    dark:focus-visible:ring-blue-400
    dark:focus-visible:ring-offset-gray-900
  `,

  // Danger/destructive action focus
  danger: `
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-red-600
    dark:focus-visible:ring-red-400
  `,
} as const;

/**
 * Inline styles for programmatic focus
 */
export const focusStyles = {
  standard: {
    outline: "none",
    boxShadow: "0 0 0 2px #2563eb, 0 0 0 4px rgba(37, 99, 235, 0.2)",
  },

  primary: {
    outline: "none",
    boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #2563eb",
  },

  input: {
    outline: "none",
    borderColor: "#2563eb",
    boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
  },
} as const;

/**
 * CSS-in-JS focus styles for styled components
 */
export const getFocusStyle = (variant: keyof typeof focusStyles = "standard") => {
  return `
    &:focus-visible {
      ${Object.entries(focusStyles[variant])
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          return `${cssKey}: ${value};`;
        })
        .join("\n      ")}
    }
  `;
};

/**
 * Minimum target size helpers (WCAG 2.5.8)
 */
export const minTargetSize = {
  // Minimum 24x24px for Level AA
  button: "min-h-[24px] min-w-[24px] px-3 py-2",
  icon: "min-h-[24px] min-w-[24px] p-1",
  link: "min-h-[24px] inline-flex items-center",
  
  // Comfortable sizes (recommended)
  buttonComfortable: "min-h-[44px] min-w-[44px] px-6 py-3",
  iconComfortable: "min-h-[44px] min-w-[44px] p-3",
} as const;

/**
 * Skip link component styles (WCAG 2.4.1)
 */
export const skipLinkStyles = `
  position: absolute;
  left: -9999px;
  z-index: 999;
  padding: 1em;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  
  &:focus {
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }
`;

/**
 * Screen reader only styles
 */
export const srOnly = "sr-only";
export const srOnlyFocusable = "sr-only focus:not-sr-only";

/**
 * High contrast mode support
 */
export const highContrastBorder = `
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
  }
`;

/**
 * Color contrast checker
 * Returns true if contrast ratio is >= 4.5:1 (WCAG AA)
 */
export function checkContrastRatio(
  foreground: string,
  background: string
): boolean {
  // This is a simplified check
  // In production, use a proper contrast ratio library
  const fgLuminance = getRelativeLuminance(foreground);
  const bgLuminance = getRelativeLuminance(background);
  
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);
  
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return ratio >= 4.5;
}

/**
 * Calculate relative luminance (simplified)
 */
function getRelativeLuminance(color: string): number {
  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Apply gamma correction
  const adjust = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  
  const rAdjusted = adjust(r);
  const gAdjusted = adjust(g);
  const bAdjusted = adjust(b);
  
  // Calculate luminance
  return 0.2126 * rAdjusted + 0.7152 * gAdjusted + 0.0722 * bAdjusted;
}

/**
 * Keyboard navigation helpers
 */
export const keyboardNav = {
  // Trap focus within a container (for modals)
  trapFocus: (containerRef: HTMLElement) => {
    const focusableElements = containerRef.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };
    
    containerRef.addEventListener("keydown", handleTabKey);
    return () => containerRef.removeEventListener("keydown", handleTabKey);
  },
  
  // Handle escape key
  onEscape: (callback: () => void) => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  },
};

/**
 * ARIA live region announcer
 */
export class LiveRegionAnnouncer {
  private liveRegion: HTMLDivElement | null = null;
  
  constructor() {
    if (typeof document !== "undefined") {
      this.liveRegion = document.createElement("div");
      this.liveRegion.setAttribute("aria-live", "polite");
      this.liveRegion.setAttribute("aria-atomic", "true");
      this.liveRegion.className = "sr-only";
      document.body.appendChild(this.liveRegion);
    }
  }
  
  announce(message: string, priority: "polite" | "assertive" = "polite") {
    if (!this.liveRegion) return;
    
    this.liveRegion.setAttribute("aria-live", priority);
    this.liveRegion.textContent = message;
    
    // Clear after 1 second
    setTimeout(() => {
      if (this.liveRegion) this.liveRegion.textContent = "";
    }, 1000);
  }
  
  destroy() {
    if (this.liveRegion) {
      document.body.removeChild(this.liveRegion);
      this.liveRegion = null;
    }
  }
}
