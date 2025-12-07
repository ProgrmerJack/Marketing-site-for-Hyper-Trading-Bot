/**
 * PremiumCard Component
 * 
 * Unified card system enforcing design tokens.
 * 
 * VARIANTS:
 * - glass-primary: Hero cards, pricing tiers (full glass effect)
 * - glass-secondary: Secondary highlights (70% glass intensity)
 * - flat-textured: Content blocks (gradient + subtle texture, NO blur)
 * 
 * GLASS BUDGET RULE: Max 35-40% of visible blocks can be glass
/**
 * PremiumCard Component
 * 
 * Unified card system enforcing design tokens.
 * 
 * VARIANTS:
 * - glass-primary: Hero cards, pricing tiers (full glass effect)
 * - glass-secondary: Secondary highlights (70% glass intensity)
 * - flat-textured: Content blocks (gradient + subtle texture, NO blur)
 * 
 * GLASS BUDGET RULE: Max 35-40% of visible blocks can be glass
 */

'use client';

import { motion } from 'framer-motion';
import { gradients, glass, motion as motionTokens, type PageAccent } from '@/styles/design-tokens';

interface PremiumCardProps {
    variant: 'glass-primary' | 'glass-secondary' | 'flat-textured';
    accent?: PageAccent;
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    animate?: boolean;
    style?: React.CSSProperties;
    shadowColor?: string;
}

export function PremiumCard({
    variant,
    accent = 'cyan',
    children,
    className = '',
    hover = true,
    animate = true,
    style,
    shadowColor,
}: PremiumCardProps) {
    // Use CSS classes for variant styling (set via inline styles)
    const baseClasses = [
        'relative overflow-hidden rounded-3xl transition-all duration-300',
        variant === 'glass-primary' ? 'border-2' : 'border',
        className,
    ].filter(Boolean).join(' ');

    // Hover animations
    const hoverAnimation = hover
        ? {
            y: -4,
            boxShadow: shadowColor
                ? `0 18px 46px 0 ${shadowColor}`
                : variant.includes('glass')
                    ? '0 12px 48px 0 rgba(0, 0, 0, 0.15)'
                    : '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        }
        : {};

    if (animate) {
        return (
            <motion.div
                className={baseClasses}
                data-variant={variant}
                data-accent={accent}
                whileHover={hoverAnimation}
                transition={{
                    duration: motionTokens.duration.medium / 1000,
                    ease: [0.2, 0.8, 0.2, 1],
                }}
                style={{ ...(style || {}), ...(shadowColor ? { boxShadow: `0 18px 40px ${shadowColor}` } : {}) }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className={baseClasses} data-variant={variant} data-accent={accent}>
            {children}
        </div>
    );
}
