"use client";

/**
 * Toast Notification System
 * Accessible notifications with ARIA live regions
 * Multiple variants and positions
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { getTransition } from "@/lib/motion-tokens";

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastPosition = "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950/50",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    textColor: "text-green-900 dark:text-green-100",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50 dark:bg-red-950/50",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-900 dark:text-red-100",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-orange-50 dark:bg-orange-950/50",
    borderColor: "border-orange-200 dark:border-orange-800",
    iconColor: "text-orange-600 dark:text-orange-400",
    textColor: "text-orange-900 dark:text-orange-100",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    textColor: "text-blue-900 dark:text-blue-100",
  },
};

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-4 left-4",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={getTransition("normal", "apple")}
      className={`
        ${config.bgColor}
        ${config.borderColor}
        border-2 rounded-xl shadow-lg p-4 pr-12
        max-w-md w-full
        pointer-events-auto
      `}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${config.textColor}`}>
            {toast.title}
          </p>
          {toast.description && (
            <p className={`text-sm mt-1 ${config.textColor} opacity-90`}>
              {toast.description}
            </p>
          )}
        </div>
      </div>
      
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
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(7);
      const newToast: Toast = { ...toast, id };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        // Limit number of toasts
        return updated.slice(0, maxToasts);
      });

      // Auto-dismiss after duration
      const duration = toast.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
    },
    [maxToasts, dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      
      {/* Toast container */}
      <div
        className={`fixed ${positionClasses[position]} z-50 pointer-events-none`}
        aria-live="polite"
        aria-relevant="additions removals"
      >
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => (
              <ToastItem
                key={toast.id}
                toast={toast}
                onDismiss={() => dismissToast(toast.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Convenience hooks for common toast variants
 */
export function useToastHelpers() {
  const { showToast } = useToast();

  return {
    success: (title: string, description?: string) =>
      showToast({ title, description, variant: "success" }),
    
    error: (title: string, description?: string) =>
      showToast({ title, description, variant: "error" }),
    
    warning: (title: string, description?: string) =>
      showToast({ title, description, variant: "warning" }),
    
    info: (title: string, description?: string) =>
      showToast({ title, description, variant: "info" }),
  };
}
