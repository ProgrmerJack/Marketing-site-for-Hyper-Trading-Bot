"use client";

/**
 * Enhanced Button Component
 * WCAG 2.2 AA compliant with:
 * - 2px focus ring with 4.5:1 contrast
 * - Minimum 24x24px target size (44x44px recommended)
 * - Disabled state patterns
 * - Loading states
 * - Icon support
 */

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { focusClasses, minTargetSize } from "@/lib/accessibility";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  enableMotion?: boolean;
}

const variantClasses = {
  primary: `
    bg-blue-600 hover:bg-blue-700
    text-white
    shadow-md hover:shadow-lg
    disabled:bg-blue-400 disabled:cursor-not-allowed
    dark:bg-blue-500 dark:hover:bg-blue-600
  `,
  secondary: `
    bg-gray-200 hover:bg-gray-300
    text-gray-900
    disabled:bg-gray-100 disabled:cursor-not-allowed
    dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100
  `,
  outline: `
    border-2 border-gray-300 hover:border-gray-400
    bg-transparent hover:bg-gray-50
    text-gray-900
    disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
    dark:border-gray-600 dark:hover:border-gray-500
    dark:hover:bg-gray-800 dark:text-gray-100
  `,
  ghost: `
    bg-transparent hover:bg-gray-100
    text-gray-700
    disabled:text-gray-400 disabled:cursor-not-allowed
    dark:hover:bg-gray-800 dark:text-gray-300
  `,
  danger: `
    bg-red-600 hover:bg-red-700
    text-white
    shadow-md hover:shadow-lg
    disabled:bg-red-400 disabled:cursor-not-allowed
    dark:bg-red-500 dark:hover:bg-red-600
  `,
};

const sizeClasses = {
  sm: "text-sm px-4 py-2 min-h-[32px]",
  md: `text-base ${minTargetSize.button}`, // 24x24px minimum
  lg: `text-lg ${minTargetSize.buttonComfortable}`, // 44x44px comfortable
};

const focusVariantClasses = {
  primary: focusClasses.primary,
  secondary: focusClasses.secondary,
  outline: focusClasses.secondary,
  ghost: focusClasses.standard,
  danger: focusClasses.danger,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${focusVariantClasses[variant]}
          ${fullWidth ? "w-full" : ""}
          inline-flex items-center justify-center gap-2
          font-semibold rounded-lg
          transition-all duration-200
          ${!isDisabled ? "hover:scale-[1.02] active:scale-[0.98]" : ""}
          ${className}
        `}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2
            className="w-4 h-4 animate-spin"
            aria-hidden="true"
          />
        )}
        
        {!loading && leftIcon && (
          <span className="inline-flex" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        <span>{children}</span>
        
        {!loading && rightIcon && (
          <span className="inline-flex" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/**
 * Icon-only button with proper accessible label
 */
interface IconButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  icon: ReactNode;
  label: string; // Required for accessibility
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = "md", className = "", ...props }, ref) => {
    const iconSizeClass = size === "sm" ? "p-2" : size === "lg" ? "p-4" : "p-3";
    
    return (
      <Button
        ref={ref}
        size={size}
        className={`${iconSizeClass} ${minTargetSize.icon} ${className}`}
        aria-label={label}
        title={label}
        {...props}
      >
        <span className="inline-flex" aria-hidden="true">
          {icon}
        </span>
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

/**
 * Button group component
 */
export function ButtonGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex rounded-lg shadow-sm ${className}`}
      role="group"
    >
      {children}
    </div>
  );
}
