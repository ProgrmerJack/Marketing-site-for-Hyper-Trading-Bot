/**
 * PremiumTable Component
 * 
/**
 * PremiumTable Component
 * 
 * Unified table styling with design tokens.
 * Use for: Pricing comparisons, status tables, metrics tables
 */

'use client';

import { gradients, type PageAccent } from '@/styles/design-tokens';

interface PremiumTableProps {
    children: React.ReactNode;
    accent?: PageAccent;
    variant?: 'glass' | 'flat';
    className?: string;
}

export function PremiumTable({
    children,
    accent = 'cyan',
    variant = 'glass',
    className = '',
}: PremiumTableProps) {
    const baseClasses = [
        'relative overflow-hidden rounded-3xl border shadow-2xl',
        variant === 'glass' && 'border-2',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={baseClasses} data-variant={variant} data-accent={accent}>
            {/* Gradient overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                    background: gradients.hoverGlow(accent),
                }}
            />

            <div className="relative overflow-x-auto">
                {children}
            </div>
        </div>
    );
}
