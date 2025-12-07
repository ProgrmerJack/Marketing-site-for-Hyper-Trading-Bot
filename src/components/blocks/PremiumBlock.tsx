/**
 * PremiumBlock Component
 * 
 * Replaces all basic border/bg blocks (like border-slate-200/50 bg-slate-50/50)
 * with flat-textured variant enforcing design tokens.
 * 
/**
 * PremiumBlock Component
 * 
 * Replaces all basic border/bg blocks (like border-slate-200/50 bg-slate-50/50)
 * with flat-textured variant enforcing design tokens.
 * 
 * Use for: Content blocks, info sections, regular containers
 * NOT for: Hero features (use PremiumCard glass-* instead)
 */

'use client';

import { gradients, type PageAccent } from '@/styles/design-tokens';

interface PremiumBlockProps {
    accent?: PageAccent;
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
}

export function PremiumBlock({
    accent = 'cyan',
    children,
    className = '',
    padding = 'md',
}: PremiumBlockProps) {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const baseClasses = [
        'relative overflow-hidden rounded-2xl border transition-all duration-200',
        paddingClasses[padding],
        className,
    ].filter(Boolean).join(' ');

    return (
        <div
            className={baseClasses}
            data-accent={accent}
        >
            {/* Subtle noise texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                }}
            />
            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
