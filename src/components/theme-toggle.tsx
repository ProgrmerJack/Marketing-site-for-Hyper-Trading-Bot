"use client";

import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-[color:var(--color-line-muted)] bg-transparent" />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="group relative h-9 w-9 rounded-lg border border-[color:var(--color-line-muted)] bg-transparent transition-all duration-200 hover:border-[color:var(--color-accent-primary)] hover:bg-[color:var(--color-surface-100)]"
      aria-label="Toggle theme"
      data-testid="theme-toggle"
      title={`Current theme: ${theme} (${resolvedTheme})`}
    >
      {/* Sun icon for light mode */}
      {resolvedTheme === "light" && (
        <svg
          className="absolute inset-0 m-auto h-5 w-5 text-[color:var(--color-surface-700)] transition-transform group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
      
      {/* Moon icon for dark mode */}
      {resolvedTheme === "dark" && (
        <svg
          className="absolute inset-0 m-auto h-5 w-5 text-[color:var(--color-surface-700)] transition-transform group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}

      {/* Theme indicator badge */}
      {theme === "system" && (
        <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-[color:var(--color-accent-primary)] text-[8px] font-semibold text-white">
          A
        </span>
      )}
    </button>
  );
}
