/**
 * Icon Gradient Mappings
 * 
 * Centralized mapping of icon types to consistent gradient colors
 * across the entire site for premium, colorful icon badges.
 */

export type IconCategory =
    | "security"
    | "performance"
    | "money"
    | "alert"
    | "research"
    | "activity"
    | "execution"
    | "data"
    | "signal"
    | "risk"
    | "check"
    | "default";

export const iconGradients: Record<IconCategory, string> = {
    // Security & Protection
    security: "from-emerald-500 to-cyan-500",

    // Performance & Speed
    performance: "from-violet-500 to-fuchsia-500",

    // Financial & Money
    money: "from-emerald-500 to-teal-500",

    // Alerts & Notifications
    alert: "from-orange-500 to-rose-500",

    // Research & Documentation
    research: "from-purple-500 to-pink-500",

    // Activity & Monitoring
    activity: "from-cyan-500 to-blue-500",

    // Execution Layer
    execution: "from-orange-500 to-red-500",

    // Data Acquisition
    data: "from-blue-500 to-cyan-500",

    // Signal Engine
    signal: "from-purple-500 to-pink-500",

    // Risk Controller
    risk: "from-emerald-500 to-teal-500",

    // Check/Success
    check: "from-emerald-500 to-green-500",

    // Default fallback
    default: "from-indigo-500 to-purple-500",
};

/**
 * Get the gradient class for a given icon category
 */
export function getIconGradient(category: IconCategory): string {
    return iconGradients[category] || iconGradients.default;
}

/**
 * Icon category to shadow color mapping
 * Returns rgba color for box-shadow
 */
export function getIconShadowColor(category: IconCategory): string {
    const shadowColors: Record<IconCategory, string> = {
        security: "rgba(16, 185, 129, 0.25)",
        performance: "rgba(139, 92, 246, 0.25)",
        money: "rgba(20, 184, 166, 0.25)",
        alert: "rgba(251, 146, 60, 0.25)",
        research: "rgba(168, 85, 247, 0.25)",
        activity: "rgba(14, 165, 233, 0.25)",
        execution: "rgba(239, 68, 68, 0.25)",
        data: "rgba(59, 130, 246, 0.25)",
        signal: "rgba(168, 85, 247, 0.25)",
        risk: "rgba(20, 184, 166, 0.25)",
        check: "rgba(34, 197, 94, 0.25)",
        default: "rgba(99, 102, 241, 0.20)",
    };

    return shadowColors[category] || shadowColors.default;
}

/**
 * Recommended icon-category mapping based on common Lucide icon names
 * This helps auto-select the right gradient when you know the icon name
 */
export const iconNameToCategory: Record<string, IconCategory> = {
    // Security
    "shield": "security",
    "lock": "security",
    "key": "security",

    // Performance
    "zap": "performance",
    "bolt": "performance",
    "trending-up": "performance",

    // Money
    "dollar-sign": "money",
    "currency-dollar": "money",
    "coins": "money",
    "wallet": "money",

    // Alerts
    "bell": "alert",
    "alert-triangle": "alert",
    "alert-circle": "alert",

    // Research
    "flask": "research",
    "book": "research",
    "file-text": "research",
    "microscope": "research",

    // Activity
    "activity": "activity",
    "bar-chart": "activity",
    "line-chart": "activity",
    "pulse": "activity",

    // Execution
    "play": "execution",
    "send": "execution",
    "arrow-right": "execution",

    // Check/Success
    "check": "check",
    "check-circle": "check",
    "check-square": "check",
};

/**
 * Get icon category from icon name (lowercase)
 */
export function getCategoryFromIconName(iconName: string): IconCategory {
    const normalized = iconName.toLowerCase().replace(/icon$/i, '').trim();
    return iconNameToCategory[normalized] || "default";
}
