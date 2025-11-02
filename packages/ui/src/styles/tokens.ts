export const spacingUnit = 8;

export const spacing = {
  0: 0,
  1: spacingUnit,
  2: spacingUnit * 2,
  3: spacingUnit * 3,
  4: spacingUnit * 4,
  5: spacingUnit * 5,
  6: spacingUnit * 6,
  7: spacingUnit * 7,
  8: spacingUnit * 8,
} satisfies Record<number, number>;

export const motion = {
  snappy: "var(--motion-snappy, 120ms)",
  standard: "var(--motion-standard, 220ms)",
  emphasized: "var(--motion-emphasized, 320ms)",
} as const;

export const easing = {
  standard: "var(--ease-standard, cubic-bezier(0.32, 0.72, 0, 1))",
  emphasized: "var(--ease-emphasized, cubic-bezier(0.24, 0.94, 0.2, 1))",
} as const;

export const radii = {
  xs: "var(--radius-xs, 8px)",
  sm: "var(--radius-sm, 12px)",
  md: "var(--radius, 16px)",
  lg: "var(--radius-lg, 20px)",
  xl: "var(--radius-xl, 24px)",
  full: "9999px",
} as const;

export const colors = {
  surface: {
    base: "var(--color-surface-50)",
    inverse: "var(--color-surface-inverse)",
  },
  accent: {
    primary: "var(--color-accent-primary)",
    secondary: "var(--color-accent-secondary)",
  },
  status: {
    danger: "var(--color-danger)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
  },
  line: {
    muted: "var(--color-line-muted)",
  },
} as const;
