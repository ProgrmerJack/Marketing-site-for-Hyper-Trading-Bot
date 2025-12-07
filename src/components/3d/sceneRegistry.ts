import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export type SceneType = "home" | "howItWorks" | "pricing" | "liveDemo" | "blog" | "contact";

export interface SceneConfig {
    /** R3F Scene Component */
    Component: ComponentType<any>;
    /** Path to static fallback image */
    fallback: string;
    /** Alt text for accessibility */
    alt: string;
    /** Expected interaction type */
    scrollType: "none" | "continuous" | "triggered";
}

/**
 * Centralized registry for all R3F 3D scenes.
 * 
 * Scenes are dynamically imported to enable code-splitting.
 * Each scene is wrapped in LazyMount + ReducedMotionSwitch at usage.
 */
export const scenes: Record<SceneType, SceneConfig> = {
    home: {
        Component: dynamic(() => import("./scenes/TradingCore"), { ssr: false }),
        fallback: "", // No static fallback - scene renders dynamically
        alt: "Autonomous Trading Core",
        scrollType: "none",
    },
    howItWorks: {
        Component: dynamic(() => import("./scenes/PipelineFlow"), { ssr: false }),
        fallback: "", // No static fallback - scene renders dynamically
        alt: "Data Pipeline Visualization",
        scrollType: "continuous",
    },
    pricing: {
        Component: dynamic(() => import("./scenes/PlanStack"), { ssr: false }),
        fallback: "", // No static fallback - scene renders dynamically
        alt: "Pricing Tier Visualization",
        scrollType: "triggered",
    },
    liveDemo: {
        Component: dynamic(() => import("./scenes/TradingCockpit"), { ssr: false }),
        fallback: "", // No static fallback - scene renders dynamically
        alt: "Trading Cockpit Visualization",
        scrollType: "triggered",
    },
    blog: {
        Component: dynamic(() => import("./scenes/PostCarousel"), { ssr: false }),
        fallback: "", // No static fallback - scene renders dynamically
        alt: "Blog Post Carousel",
        scrollType: "none",
    },
    contact: {
        Component: dynamic(() => import("./scenes/SignalGlobe"), { ssr: false }),
        fallback: "", // No static fallback - scene renders dynamically
        alt: "Global Signal Network",
        scrollType: "none",
    },
} as const;
