"use client";

import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";

function withNoSSR<TProps = Record<string, unknown>>(
  loader: () => Promise<{ default: ComponentType<TProps> }>,
  fallback: ReactNode = null,
) {
  return dynamic(loader, {
    ssr: false,
    loading: () => fallback,
  }) as unknown as ComponentType<TProps>;
}

type BounceCardsProps = {
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  enableHover?: boolean;
  className?: string;
};

export const Hyperspeed = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Hyperspeed,
}));

export const Aurora = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Aurora,
}));

export const Beams = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Beams,
}));

export const Dither = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Dither,
}));

export const Threads = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Threads,
}));

export const DotGrid = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).DotGrid,
}));

export const LiquidChrome = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).LiquidChrome,
}));

export const Balatro = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Balatro,
}));

export const Ribbons = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Ribbons,
}));

export const SplashCursor = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).SplashCursor,
}));

// Use custom StarBorder to fix inner-content class dark background issue
// Original reactbits StarBorder has hard-coded: .inner-content { background: #000; }
export const StarBorder = withNoSSR(async () => ({
  default: (await import("@/components/reactbits/stubs/StarBorder")).default,
}));

export const ClickSpark = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).ClickSpark,
}));

export const SplitText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).SplitText,
}));

export const BounceCards = withNoSSR<BounceCardsProps>(async () => {
  try {
    const mod = await import("@appletosolutions/reactbits");
    const candidate = (mod as Record<string, unknown>).BounceCards;
    if (typeof candidate === "function") {
      return { default: candidate as ComponentType<BounceCardsProps> };
    }
  } catch (error) {
    console.warn("ReactBits BounceCards unavailable, falling back to local stub.", error);
  }
  return {
    default: (await import("@/components/reactbits/stubs/BounceCards")).default,
  };
});

export const CircularGallery = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).CircularGallery,
}));

export const ScrollReveal = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).ScrollReveal,
}));

// Use custom SpotlightCard to fix inner-content class dark background issue
// Original reactbits SpotlightCard has hard-coded: .inner-content { background: #000; }
export const SpotlightCard = withNoSSR(async () => ({
  default: (await import("@/components/reactbits/stubs/SpotlightCard")).default,
}));

export const GlareHover = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).GlareHover,
}));

export const Magnet = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Magnet,
}));

export const AnimatedList = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).AnimatedList,
}));

export const Bounce = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Bounce,
}));

export const FlowingMenu = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).FlowingMenu,
}));

export const Lightning = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Lightning,
}));

export const GridDistortion = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).GridDistortion,
}));

export const Ballpit = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Ballpit,
}));

export const Orb = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Orb,
}));

export const Squares = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Squares,
}));

export const Silk = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Silk,
}));

export const Iridescence = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Iridescence,
}));

export const GridMotion = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).GridMotion,
}));

export const Waves = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Waves,
}));

export const ShapeBlur = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).ShapeBlur,
}));

export const GooeyNav = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).GooeyNav,
}));

export const Dock = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Dock,
}));

export const InfiniteMenu = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).InfiniteMenu,
}));

export const Stack = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Stack,
}));

export const TiltedCard = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).TiltedCard,
}));

export const Folder = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Folder,
}));

export const Carousel = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Carousel,
}));

export const RollingGallery = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).RollingGallery,
}));

export const ElasticSlider = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).ElasticSlider,
}));

export const InfiniteScroll = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).InfiniteScroll,
}));

export const MetaBalls = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).MetaBalls,
}));

export const BlobCursor = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).BlobCursor,
}));

export const Noise = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Noise,
}));

export const PixelTrail = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).PixelTrail,
}));

export const ImageTrail = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).ImageTrail,
}));

export const Crosshair = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).Crosshair,
}));

export const BlurText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).BlurText,
}));

export const CircularText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).CircularText,
}));

export const ScrambleText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).ScrambleText,
}));

export const GlitchText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).GlitchText,
}));

export const LetterGlitch = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).LetterGlitch,
}));

export const DecryptedText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).DecryptedText,
}));

export const ShinyText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).ShinyText,
}));

export const FuzzyText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).FuzzyText,
}));

export const GradientText = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).GradientText,
}));

export const CountUp = withNoSSR(async () => ({
  default: (await import("@appletosolutions/reactbits")).CountUp,
}));
