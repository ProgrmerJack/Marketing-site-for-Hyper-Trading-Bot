"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MotionMode = "system" | "enabled" | "reduced";
export type MotionIntensity = "low" | "standard" | "high";

type MotionPreferences = {
  /**
   * Governs whether we follow the OS preference, explicitly enable, or explicitly reduce motion.
   */
  mode: MotionMode;
  /**
   * Relative strength applied to compositor-friendly motion (scale, translate, opacity).
   */
  intensity: MotionIntensity;
  /**
   * Whether background animation layers (WebGL/canvas) are allowed.
   */
  backgrounds: boolean;
  /**
   * Whether pointer/cursor effects and other fine-pointer affordances are allowed.
   */
  cursor: boolean;
};

export type MotionContextValue = {
  /**
   * Final resolved flag indicating if motion should play. This already respects OS and user overrides.
   */
  enabled: boolean;
  /**
   * Intensity to use for motion tokens after reductions are applied.
   */
  intensity: MotionIntensity;
  /**
   * Whether animated backgrounds should render given current policy.
   */
  backgroundsEnabled: boolean;
  /**
   * Whether cursor and pointer-driven effects should render given current policy/device.
   */
  cursorEnabled: boolean;
  /**
   * True if we should respect reduced motion (e.g. freeze loops, disable transforms).
   */
  shouldReduceMotion: boolean;
  /**
   * True when the OS is signalling `prefers-reduced-motion: reduce`.
   */
  systemPrefersReduced: boolean;
  /**
   * Raw preferences as stored in localStorage for UI surfaces (toggles/playground).
   */
  preferences: MotionPreferences;
  /**
   * True once client hydration + local preference read has completed. Use to avoid SSR mismatch.
   */
  hydrated: boolean;
  /**
   * Merge helper to update any preference key. Automatically persisted & re-resolved.
   */
  setMotionPrefs: (update: Partial<MotionPreferences>) => void;
};

const DEFAULT_PREFERENCES: MotionPreferences = {
  mode: "enabled",
  intensity: "high",
  backgrounds: true,
  cursor: true,
};

const STORAGE_KEY = "hyper-motion-preferences.v1";

const MotionContext = createContext<MotionContextValue | null>(null);

function readStoredPreferences(): MotionPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<MotionPreferences>;

    return {
      mode: parsed.mode ?? DEFAULT_PREFERENCES.mode,
      intensity: parsed.intensity ?? DEFAULT_PREFERENCES.intensity,
      backgrounds: typeof parsed.backgrounds === "boolean" ? parsed.backgrounds : true,
      cursor: typeof parsed.cursor === "boolean" ? parsed.cursor : true,
    };
  } catch (error) {
    console.warn("[MotionProvider] Failed to parse saved motion preferences:", error);
    return null;
  }
}

function getSystemPrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [systemPrefersReduced, setSystemPrefersReduced] = useState(getSystemPrefersReduced);
  const [preferences, setPreferences] = useState<MotionPreferences>(DEFAULT_PREFERENCES);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = readStoredPreferences();
    if (stored) {
      setPreferences(stored);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    setSystemPrefersReduced(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setMotionPrefs = useCallback(
    (update: Partial<MotionPreferences>) => {
      setPreferences((prev) => {
        const next = { ...prev, ...update };

        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }

        return next;
      });
    },
    [],
  );

  const {
    enabled,
    shouldReduceMotion,
    intensity,
    cursorEnabled,
    backgroundsEnabled,
  } = useMemo(() => {
    const prefersReduced =
      preferences.mode === "reduced" ||
      (preferences.mode === "system" && systemPrefersReduced);

    const resolvedEnabled = !prefersReduced && preferences.mode !== "reduced";
    const resolvedIntensity: MotionIntensity = prefersReduced
      ? "low"
      : preferences.intensity;

    const hasFinePointer =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(pointer:fine)").matches
        : false;

    const resolvedCursor =
      resolvedEnabled && preferences.cursor && hasFinePointer;

    const resolvedBackgrounds = resolvedEnabled && preferences.backgrounds && isHydrated;

    return {
      enabled: resolvedEnabled,
      shouldReduceMotion: prefersReduced,
      intensity: resolvedIntensity,
      cursorEnabled: resolvedCursor && isHydrated,
      backgroundsEnabled: resolvedBackgrounds,
    };
  }, [preferences, systemPrefersReduced, isHydrated]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.dataset.motion = enabled ? "enabled" : "disabled";
    root.dataset.motionIntensity = intensity;
    root.dataset.cursorEffects = cursorEnabled ? "true" : "false";
    root.dataset.backgroundEffects = backgroundsEnabled ? "true" : "false";
    root.dataset.systemReducedMotion = systemPrefersReduced ? "true" : "false";
    root.dataset.reducedMotion = shouldReduceMotion ? "true" : "false";

    root.classList.toggle("motion-disabled", shouldReduceMotion);

    root.style.setProperty(
      "--motion-duration-scale",
      shouldReduceMotion
        ? "0.01"
        : intensity === "high"
          ? "1.25"
          : intensity === "standard"
            ? "1"
            : "0.7",
    );
  }, [enabled, shouldReduceMotion, intensity, cursorEnabled, backgroundsEnabled, systemPrefersReduced]);

  const value = useMemo<MotionContextValue>(
    () => ({
      enabled,
      intensity,
      backgroundsEnabled,
      cursorEnabled,
      shouldReduceMotion,
      systemPrefersReduced,
      preferences,
      hydrated: isHydrated,
      setMotionPrefs,
    }),
    [
      enabled,
      intensity,
      backgroundsEnabled,
      cursorEnabled,
      shouldReduceMotion,
      systemPrefersReduced,
      preferences,
      isHydrated,
      setMotionPrefs,
    ],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion(): MotionContextValue {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}

export function useReducedMotion(): boolean {
  return useMotion().shouldReduceMotion;
}

/**
 * Hook for components that need both the raw preferences (for UI) and mutation helper.
 */
export function useMotionPref(): [MotionPreferences, MotionContextValue["setMotionPrefs"]] {
  const { preferences, setMotionPrefs } = useMotion();
  return [preferences, setMotionPrefs];
}
