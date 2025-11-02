/**
 * Optimized Image Component
 * Wrapper around next/image with performance optimizations
 * - Automatic format selection (WebP, AVIF)
 * - Lazy loading by default
 * - Blur placeholder
 * - Responsive sizing
 */

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  /** Enable blur placeholder while loading */
  showBlurPlaceholder?: boolean;
  /** Custom aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Fade-in animation on load */
  fadeIn?: boolean;
  /** Custom loading skeleton */
  skeleton?: React.ReactNode;
}

export function OptimizedImage({
  src,
  alt,
  className,
  showBlurPlaceholder = true,
  aspectRatio,
  fadeIn = true,
  skeleton,
  priority = false,
  loading = "lazy",
  quality = 85,
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate sizes if not provided
  const defaultSizes = sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Error state
  if (hasError) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center bg-[color:var(--color-surface-100)] text-[color:var(--color-surface-400)]",
          className
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="sr-only">Failed to load image: {alt}</span>
      </div>
    );
  }

  return (
    <div
      className={clsx("relative overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0">
          {skeleton || (
            <div className="h-full w-full animate-pulse bg-[color:var(--color-surface-100)]" />
          )}
        </div>
      )}

      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        className={clsx(
          fadeIn && "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        placeholder={showBlurPlaceholder ? "blur" : "empty"}
        priority={priority}
        loading={priority ? undefined : loading}
        quality={quality}
        sizes={defaultSizes}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

/**
 * Optimized Background Image Component
 * For hero sections and backgrounds with parallax support
 */
interface OptimizedBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  parallax?: boolean;
  children?: React.ReactNode;
}

export function OptimizedBackgroundImage({
  src,
  alt,
  className,
  overlay = true,
  overlayOpacity = 0.5,
  parallax = false,
  children,
}: OptimizedBackgroundImageProps) {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      {/* Background image */}
      <div className={clsx("absolute inset-0", parallax && "scale-110")}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/80"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

/**
 * Avatar Image Component
 * Optimized for profile pictures with fallback
 */
interface AvatarImageProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

export function AvatarImage({
  src,
  alt,
  size = "md",
  fallback,
  className,
}: AvatarImageProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const sizePixels = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  if (!src) {
    // Fallback to initials
    const initials = fallback || alt.charAt(0).toUpperCase();
    return (
      <div
        className={clsx(
          "flex items-center justify-center rounded-full bg-[color:var(--color-accent-primary)]/20 text-[color:var(--color-accent-primary)] font-semibold",
          sizeClasses[size],
          className
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={clsx("relative overflow-hidden rounded-full", sizeClasses[size], className)}>
      <Image
        src={src}
        alt={alt}
        width={sizePixels[size]}
        height={sizePixels[size]}
        className="object-cover"
        quality={90}
      />
    </div>
  );
}
