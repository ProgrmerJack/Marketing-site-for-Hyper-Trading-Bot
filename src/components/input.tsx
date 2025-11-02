"use client";

/**
 * Enhanced Input Component
 * WCAG 2.2 AA compliant with:
 * - Proper labeling (visible + associated)
 * - Error states with ARIA
 * - Help text support
 * - Icon support
 * - Disabled state patterns
 */

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { focusClasses } from "@/lib/accessibility";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helpText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      id,
      disabled,
      required,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;
    const errorId = `${inputId}-error`;
    const helpId = `${inputId}-help`;

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {required && (
              <span className="text-red-600 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              [error && errorId, helpText && helpId].filter(Boolean).join(" ") || undefined
            }
            className={`
              ${leftIcon ? "pl-10" : "pl-4"}
              ${rightIcon || isPassword ? "pr-10" : "pr-4"}
              py-3
              w-full
              min-h-[44px]
              text-base
              border-2
              ${
                error
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              }
              ${
                disabled
                  ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60"
                  : "bg-white dark:bg-gray-900"
              }
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              rounded-lg
              ${focusClasses.input}
              transition-colors
              ${className}
            `}
            {...props}
          />

          {/* Right icon or password toggle */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors min-h-[24px] min-w-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {/* Error message */}
        {error && (
          <div
            id={errorId}
            className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Help text */}
        {helpText && !error && (
          <p
            id={helpId}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/**
 * Textarea component
 */
interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helpText,
      fullWidth = false,
      className = "",
      id,
      disabled,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textarea-${Math.random().toString(36).substring(7)}`;
    const errorId = `${inputId}-error`;
    const helpId = `${inputId}-help`;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {required && (
              <span className="text-red-600 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            [error && errorId, helpText && helpId].filter(Boolean).join(" ") || undefined
          }
          className={`
            px-4 py-3
            w-full
            text-base
            border-2
            ${
              error
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            }
            ${
              disabled
                ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60"
                : "bg-white dark:bg-gray-900"
            }
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            rounded-lg
            ${focusClasses.input}
            transition-colors
            resize-vertical
            ${className}
          `}
          {...props}
        />

        {/* Error message */}
        {error && (
          <div
            id={errorId}
            className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Help text */}
        {helpText && !error && (
          <p
            id={helpId}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
