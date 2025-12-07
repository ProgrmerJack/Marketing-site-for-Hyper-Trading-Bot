import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "motion-zone",
    "motion-zone-.*",
    // Icon gradient backgrounds - explicit list
    "bg-gradient-to-br", "bg-gradient-to-bl", "bg-gradient-to-tr", "bg-gradient-to-tl",
    "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b",
    // FROM colors - 500
    "from-violet-500", "from-fuchsia-500", "from-purple-500", "from-pink-500",
    "from-indigo-500", "from-blue-500", "from-cyan-500", "from-sky-500",
    "from-emerald-500", "from-green-500", "from-teal-500",
    "from-amber-500", "from-orange-500", "from-yellow-500",
    "from-red-500", "from-rose-500", "from-slate-500",
    // FROM colors - 600
    "from-violet-600", "from-fuchsia-600", "from-purple-600", "from-pink-600",
    "from-indigo-600", "from-blue-600", "from-cyan-600", "from-sky-600",
    "from-emerald-600", "from-green-600", "from-teal-600",
    "from-amber-600", "from-orange-600", "from-yellow-600",
    "from-red-600", "from-rose-600", "from-slate-600",
    // TO colors - 500
    "to-violet-500", "to-fuchsia-500", "to-purple-500", "to-pink-500",
    "to-indigo-500", "to-blue-500", "to-cyan-500", "to-sky-500",
    "to-emerald-500", "to-green-500", "to-teal-500",
    "to-amber-500", "to-orange-500", "to-yellow-500",
    "to-red-500", "to-rose-500", "to-slate-500",
    // TO colors - 600
    "to-violet-600", "to-fuchsia-600", "to-purple-600", "to-pink-600",
    "to-indigo-600", "to-blue-600", "to-cyan-600", "to-sky-600",
    "to-emerald-600", "to-green-600", "to-teal-600",
    "to-amber-600", "to-orange-600", "to-yellow-600",
    "to-red-600", "to-rose-600", "to-slate-600",
    // TO colors - 700
    "to-violet-700", "to-fuchsia-700", "to-purple-700", "to-pink-700",
    "to-indigo-700", "to-blue-700", "to-cyan-700", "to-sky-700",
    "to-emerald-700", "to-green-700", "to-teal-700",
    "to-amber-700", "to-orange-700", "to-yellow-700",
    "to-red-700", "to-rose-700", "to-slate-700",
    // VIA colors - 600
    "via-violet-600", "via-fuchsia-600", "via-purple-600", "via-pink-600",
    "via-indigo-600", "via-blue-600", "via-cyan-600", "via-sky-600",
    "via-emerald-600", "via-green-600", "via-teal-600",
    "via-amber-600", "via-orange-600", "via-yellow-600",
    "via-red-600", "via-rose-600", "via-slate-600",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans-variable)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: [
          "var(--font-mono-variable)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        display: [
          "var(--font-display-variable)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          foreground: "rgb(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          foreground: "rgb(var(--warning-foreground) / <alpha-value>)",
        },
        // Slate color scale for detailed theming
        slate: colors.slate,
        gray: colors.gray,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,

        // Extended color scales
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
        // Neon accent colors for futuristic luxury theme
        neon: {
          cyan: "34 211 238", // #22D3EE - electric cyan (matches primary dark)
          blue: "99 102 241", // #6366F1 - indigo blue (matches accent dark)
          purple: "168 85 247", // #A855F7 - vivid purple
          pink: "236 72 153", // #EC4899 - hot pink
          emerald: "16 185 129", // #10B981 - emerald (matches success)
          lime: "163 230 53", // #A3E635 - electric lime
          orange: "251 146 60", // #FB923C - vibrant orange
          sky: "14 165 233", // #0EA5E9 - sky blue
        },
        // Legacy support - maintain backward compatibility
        "surface-50": "rgb(var(--color-surface-50) / <alpha-value>)",
        "surface-100": "rgb(var(--color-surface-100) / <alpha-value>)",
        "surface-200": "rgb(var(--color-surface-200) / <alpha-value>)",
        "surface-300": "rgb(var(--color-surface-300) / <alpha-value>)",
        "surface-400": "rgb(var(--color-surface-400) / <alpha-value>)",
        "surface-500": "rgb(var(--color-surface-500) / <alpha-value>)",
        "surface-600": "rgb(var(--color-surface-600) / <alpha-value>)",
        "surface-700": "rgb(var(--color-surface-700) / <alpha-value>)",
        "surface-800": "rgb(var(--color-surface-800) / <alpha-value>)",
        "surface-900": "rgb(var(--color-surface-900) / <alpha-value>)",
        "surface-inverse": "rgb(var(--color-surface-inverse) / <alpha-value>)",
        "accent-primary": "rgb(var(--color-accent-primary) / <alpha-value>)",
        "accent-secondary": "rgb(var(--color-accent-secondary) / <alpha-value>)",
        "line-muted": "rgb(var(--color-line-muted) / <alpha-value>)",
      },
      spacing: {
        0: "0px",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        30: "7.5rem",
        36: "9rem",
        48: "12rem",
        60: "15rem",
        96: "24rem",
      },
      borderRadius: {
        xs: "0.375rem",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "2rem",
        "3xl": "2.25rem",
        full: "9999px",
      },
      boxShadow: {
        "soft-md":
          "0 20px 45px -20px rgba(15, 23, 42, 0.35), 0 10px 25px -20px rgba(15, 23, 42, 0.35)",
        "glow-accent": "0 0 0 1px var(--color-accent-primary)",
      },
      transitionTimingFunction: {
        "ease-standard": "cubic-bezier(0.32, 0.72, 0, 1)",
        "ease-emphasized": "cubic-bezier(0.24, 0.94, 0.2, 1)",
      },
      transitionDuration: {
        "motion-snappy": "120ms",
        "motion-standard": "220ms",
        "motion-emphasized": "320ms",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
