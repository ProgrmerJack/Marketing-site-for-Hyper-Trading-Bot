"use client";

import React, { Component, type ReactNode } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in child component tree
 * Implements WCAG 2.2 AA compliance with proper error messaging
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Send to Sentry or other error tracking service
    if (typeof window !== "undefined") {
      const w = window as unknown as { Sentry?: { captureException: (error: Error, options: Record<string, unknown>) => void } };
      w.Sentry?.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }

    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-[color:var(--color-surface-50)] px-4">
          <div className="w-full max-w-md space-y-6 rounded-2xl border border-[color:var(--color-line-muted)] bg-white p-8 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-8 w-8" aria-hidden="true" />
              <h1 className="text-2xl font-bold">Something went wrong</h1>
            </div>

            <div className="space-y-3">
              <p className="text-[color:var(--color-surface-700)]">
                We&rsquo;re sorry, but something unexpected happened. Our team has been notified
                and we&rsquo;re working to fix the issue.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="rounded-lg bg-red-50 p-4 text-sm">
                  <summary className="cursor-pointer font-semibold text-red-900">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-2 overflow-auto text-xs text-red-800">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={this.handleReset}
                className="flex items-center gap-2"
                aria-label="Try again"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try again
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Go home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Async Error Boundary
 * Specialized boundary for handling async operations and Suspense errors
 */
export class AsyncErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("AsyncErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);

    if (typeof window !== "undefined") {
      const w = window as unknown as { Sentry?: { captureException: (error: Error, options: Record<string, unknown>) => void } };
      w.Sentry?.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
        tags: {
          errorBoundary: "async",
        },
      });
    }

    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="space-y-4 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-orange-600" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-[color:var(--color-surface-900)]">
              Failed to load content
            </h2>
            <p className="text-[color:var(--color-surface-600)]">
              There was an error loading this content. Please try again.
            </p>
            <Button onClick={this.handleRetry} className="flex items-center gap-2 mx-auto">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Chart Error Boundary
 * Specialized boundary for chart components with graceful degradation
 */
export function ChartErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-[color:var(--color-line-muted)] bg-[color:var(--color-surface-50)]">
          <div className="space-y-3 text-center px-4">
            <AlertCircle className="mx-auto h-10 w-10 text-yellow-600" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-[color:var(--color-surface-900)]">
                Chart unavailable
              </h3>
              <p className="text-sm text-[color:var(--color-surface-600)]">
                Unable to render chart at this time
              </p>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
