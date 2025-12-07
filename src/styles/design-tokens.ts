/**
 * Centralized Design System Tokens
 * 
 * RULES:
 * - Glass effects ONLY for: Feature cards, pricing tiers, demo tables, callouts
 * - Flat textured for: Regular content blocks, info sections
 * - Glass budget: Max 35-40% of visible blocks on a page
 * - One accent gradient family per page
 * - No inline gradients outside this file
 * - Motion respects --motion-duration-scale CSS variable
 */

// ========================================
// PALETTE TOKENS
// ========================================

export const palette = {
    // Base colors (reference CSS variables)
    bgBase: 'rgb(var(--background))',
    bgElevated: 'rgb(var(--card))',
    textPrimary: 'rgb(var(--foreground))',
    textMuted: 'rgb(var(--muted-foreground))',

    // Accent tiers
    accentPrimary: 'rgb(var(--neon-cyan))',      // #22d3ee
    accentSecondary: 'rgb(var(--neon-emerald))', // #10b981
    accentTertiary: 'rgb(var(--neon-purple))',   // #a855f7
    accentQuaternary: 'rgb(var(--neon-orange))', // #fb923c
    accentBlue: 'rgb(var(--neon-blue))',         // #6366f1
} as const;

// ========================================
// PER-PAGE ACCENT ASSIGNMENT
// ========================================

export const pageAccents = {
    home: 'cyan',
    'how-it-works': 'purple',
    safety: 'emerald',
    'risk-disclosure': 'emerald',
    pricing: 'cyan',
    'live-demo': 'blue',
    research: 'purple',
    status: 'cyan',
    blog: 'orange',
    contact: 'emerald',
    about: 'blue',
    privacy: 'blue',
    terms: 'blue',
    consent: 'blue',
} as const;

export type PageAccent = typeof pageAccents[keyof typeof pageAccents];

// Accent color values for dynamic usage
export const accentColors: Record<PageAccent, { rgb: string; rgba: (alpha: number) => string }> = {
    cyan: {
        rgb: '34 211 238',
        rgba: (a) => `rgba(34, 211, 238, ${a})`,
    },
    emerald: {
        rgb: '16 185 129',
        rgba: (a) => `rgba(16, 185, 129, ${a})`,
    },
    purple: {
        rgb: '168 85 247',
        rgba: (a) => `rgba(168, 85, 247, ${a})`,
    },
    orange: {
        rgb: '251 146 60',
        rgba: (a) => `rgba(251, 146, 60, ${a})`,
    },
    blue: {
        rgb: '99 102 241',
        rgba: (a) => `rgba(99, 102, 241, ${a})`,
    },
};

// ========================================
// GRADIENT TOKENS
// ========================================

export const gradients = {
    // Hero gradients (light mode)
    hero: {
        light: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, ${rgba(0.1)} 50%, rgba(255,255,255,0.9) 100%)`;
        },
        dark: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(15,23,42,0.98) 0%, ${rgba(0.15)} 50%, rgba(5,8,15,0.95) 100%)`;
        },
    },

    // Card gradients - GLASS PRIMARY (full glass effect)
    cardGlassPrimary: {
        light: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, ${rgba(0.08)} 50%, rgba(255,255,255,0.75) 100%)`;
        },
        dark: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(10,12,18,0.55) 0%, ${rgba(0.12)} 50%, rgba(5,8,15,0.45) 100%)`;
        },
    },

    // Card gradients - GLASS SECONDARY (70% intensity)
    cardGlassSecondary: {
        light: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(255,255,255,0.7) 0%, ${rgba(0.05)} 50%, rgba(255,255,255,0.6) 100%)`;
        },
        dark: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(10,12,18,0.38) 0%, ${rgba(0.08)} 50%, rgba(5,8,15,0.3) 100%)`;
        },
    },

    // Card gradients - FLAT TEXTURED (no blur, gradient + subtle texture)
    cardFlat: {
        light: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(248,250,252,0.95) 0%, ${rgba(0.03)} 50%, rgba(241,245,249,0.9) 100%)`;
        },
        dark: (accent: PageAccent = 'cyan') => {
            const { rgba } = accentColors[accent];
            return `linear-gradient(135deg, rgba(15,23,42,0.85) 0%, ${rgba(0.05)} 50%, rgba(30,41,59,0.8) 100%)`;
        },
    },

    // Border gradients
    border: (accent: PageAccent = 'cyan') => {
        const { rgba } = accentColors[accent];
        return `linear-gradient(135deg, ${rgba(0.3)}, ${rgba(0.1)})`;
    },

    // Hover glow
    hoverGlow: (accent: PageAccent = 'cyan') => {
        const { rgba } = accentColors[accent];
        return `radial-gradient(circle at center, ${rgba(0.15)}, transparent 70%)`;
    },
} as const;

// ========================================
// GLASS TOKENS
// ========================================

export const glass = {
    // Background colors
    bg: {
        light: 'rgba(255, 255, 255, 0.08)',
        dark: 'rgba(10, 12, 18, 0.55)',
    },

    // Blur amounts
    blur: {
        sm: '8px',
        md: '12px',
        lg: '16px',
    },

    // Border colors
    border: {
        light: 'rgba(255, 255, 255, 0.2)',
        dark: 'rgba(255, 255, 255, 0.08)',
    },

    // Card shadows
    shadow: {
        light: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        dark: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
    },
} as const;

// ========================================
// MOTION TOKENS
// ========================================

export const motion = {
    // Durations (will be multiplied by --motion-duration-scale)
    duration: {
        fast: 180,    // ms
        medium: 260,  // ms
        slow: 420,    // ms
    },

    // Easing functions
    easing: {
        premium: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        snappy: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },

    // Hover transforms
    hover: {
        lift: 'translateY(-4px)',
        liftLarge: 'translateY(-8px)',
    },

    // Ring glow on hover (uses accent color)
    ring: (accent: PageAccent = 'cyan') => {
        const { rgba } = accentColors[accent];
        return `0 0 0 1px ${rgba(0.2)}`;
    },
} as const;

// ========================================
// ICON COLOR MAPPING
// ========================================

export const iconColorMap: Record<string, PageAccent> = {
    // Financial icons
    DollarSign: 'cyan',
    TrendingUp: 'emerald',
    TrendingDown: 'orange',
    Calculator: 'blue',

    // Security icons
    Shield: 'purple',
    ShieldCheck: 'emerald',
    Lock: 'purple',

    // Activity icons
    Activity: 'cyan',
    Zap: 'orange',
    Sparkles: 'purple',

    // Status icons
    Check: 'emerald',
    CheckCircle: 'emerald',
    AlertTriangle: 'orange',
    XCircle: 'orange',

    // Navigation icons
    ArrowRight: 'cyan',
    ChevronRight: 'cyan',
    ExternalLink: 'blue',
} as const;

// Helper to get icon color from icon name
export function getIconColor(iconName: string): PageAccent {
    return iconColorMap[iconName] || 'blue';
}

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// In a component:
import { gradients, pageAccents, accentColors, glass, motion } from '@/styles/design-tokens';

// Get page-specific accent
const pageAccent = pageAccents['how-it-works']; // 'purple'

// Use in className
<div 
  className="backdrop-blur-lg"
  style={{
    background: gradients.cardGlassPrimary.dark(pageAccent),
    borderColor: accentColors[pageAccent].rgba(0.2),
  }}
/>

// Motion with tokens
<motion.div
  whileHover={{ 
    y: motion.hover.lift,
    boxShadow: motion.ring(pageAccent),
  }}
  transition={{ 
    duration: motion.duration.medium / 1000,
    ease: motion.easing.premium,
  }}
/>
*/
