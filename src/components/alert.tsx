"use client";

/**
 * Alert Component
 * Accessible alert/notification with variants
 * WCAG 2.2 AA compliant with proper ARIA roles
 */

import { ReactNode, ComponentType } from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTransition } from "@/lib/motion-tokens";

export type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    titleColor: "text-green-900 dark:text-green-100",
    textColor: "text-green-800 dark:text-green-200",
    role: "status" as const,
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-900 dark:text-red-100",
    textColor: "text-red-800 dark:text-red-200",
    role: "alert" as const,
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    iconColor: "text-orange-600 dark:text-orange-400",
    titleColor: "text-orange-900 dark:text-orange-100",
    textColor: "text-orange-800 dark:text-orange-200",
    role: "alert" as const,
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-900 dark:text-blue-100",
    textColor: "text-blue-800 dark:text-blue-200",
    role: "status" as const,
  },
};

export function Alert({
  variant,
  title,
  children,
  dismissible = false,
  onDismiss,
  icon: IconProp,
  className = "",
}: AlertProps) {
  const config = variantConfig[variant];
  const Icon = (IconProp || config.icon) as ComponentType<{ className?: string }>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={getTransition("normal", "decelerate")}
      role={config.role}
      aria-live={config.role === "alert" ? "assertive" : "polite"}
      aria-atomic="true"
      className={`
        ${config.bgColor}
        ${config.borderColor}
        border-l-4 rounded-lg p-4
        ${dismissible ? "pr-12" : ""}
        relative
        ${className}
      `}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <Icon
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`font-semibold text-sm mb-1 ${config.titleColor}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm leading-relaxed ${config.textColor}`}>
            {children}
          </div>
        </div>

        {/* Dismiss button */}
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`
              absolute top-3 right-3
              ${config.iconColor}
              hover:opacity-70
              transition-opacity
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-offset-2
              focus-visible:ring-current
              rounded-sm
              min-h-[24px] min-w-[24px]
            `}
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Alert with custom action buttons
 */
interface AlertWithActionsProps extends Omit<AlertProps, "dismissible" | "onDismiss"> {
  actions?: ReactNode;
}

export function AlertWithActions({
  variant,
  title,
  children,
  actions,
  icon: IconProp,
  className = "",
}: AlertWithActionsProps) {
  const config = variantConfig[variant];
  const Icon = (IconProp || config.icon) as ComponentType<{ className?: string }>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={getTransition("normal", "decelerate")}
      role={config.role}
      aria-live={config.role === "alert" ? "assertive" : "polite"}
      aria-atomic="true"
      className={`
        ${config.bgColor}
        ${config.borderColor}
        border-l-4 rounded-lg p-4
        ${className}
      `}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <Icon
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`font-semibold text-sm mb-1 ${config.titleColor}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm leading-relaxed ${config.textColor} mb-3`}>
            {children}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="flex flex-wrap gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Banner alert (full-width, typically at page top)
 */
interface BannerAlertProps extends Omit<AlertProps, "className"> {
  show: boolean;
}

export function BannerAlert({
  show,
  variant,
  title,
  children,
  dismissible,
  onDismiss,
  icon: IconProp,
}: BannerAlertProps) {
  const config = variantConfig[variant];
  const Icon = (IconProp || config.icon) as ComponentType<{ className?: string }>;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={getTransition("moderate", "apple")}
          role={config.role}
          aria-live={config.role === "alert" ? "assertive" : "polite"}
          aria-atomic="true"
          className={`${config.bgColor} ${config.borderColor} border-b-2 overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`}
                aria-hidden="true"
              />
              
              <div className="flex-1 min-w-0">
                {title && (
                  <span className={`font-semibold text-sm ${config.titleColor} mr-2`}>
                    {title}
                  </span>
                )}
                <span className={`text-sm ${config.textColor}`}>
                  {children}
                </span>
              </div>

              {dismissible && onDismiss && (
                <button
                  onClick={onDismiss}
                  className={`
                    ${config.iconColor}
                    hover:opacity-70
                    transition-opacity
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-current
                    rounded-sm
                    min-h-[24px] min-w-[24px]
                  `}
                  aria-label="Dismiss banner"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
