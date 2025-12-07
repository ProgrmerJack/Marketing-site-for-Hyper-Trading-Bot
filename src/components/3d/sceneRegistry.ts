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
        fallback: "/3d/home-fallback.png",
        alt: "Autonomous Trading Core",
        scrollType: "none",
    },
    howItWorks: {
        Component: dynamic(() => import("./scenes/PipelineFlow"), { ssr: false }),
        fallback: "/3d/pipeline-fallback.png",
        alt: "Data Pipeline Visualization",
        scrollType: "continuous",
    },
    pricing: {
        Component: dynamic(() => import("./scenes/PlanStack"), { ssr: false }),
        fallback: "/3d/pricing-fallback.png",
        alt: "Pricing Tier Visualization",
        scrollType: "triggered",
    },
    liveDemo: {
        Component: dynamic(() => import("./scenes/TradingCockpit"), { ssr: false }),
        fallback: "/3d/live-demo-fallback.png",
        alt: "Trading Cockpit Visualization",
        scrollType: "triggered",
    },
    blog: {
        Component: dynamic(() => import("./scenes/PostCarousel"), { ssr: false }),
        fallback: "/3d/blog-fallback.png",
        alt: "Blog Post Carousel",
        scrollType: "none",
    },
    contact: {
        Component: dynamic(() => import("./scenes/SignalGlobe"), { ssr: false }),
        fallback: "/3d/contact-fallback.png",
        alt: "Global Signal Network",
        scrollType: "none",
    },
} as const;
