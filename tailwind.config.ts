import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans-variable)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono-variable)", ...defaultTheme.fontFamily.mono],
        display: ["var(--font-display-variable)", ...defaultTheme.fontFamily.sans],
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
        slate: {
          50: "248 250 252",
          100: "241 245 249",
          200: "226 232 240",
          300: "203 213 225",
          400: "148 163 184",
          500: "100 116 139",
          600: "71 85 105",
          700: "51 65 85",
          800: "30 41 59",
          900: "15 23 42",
          950: "3 7 18",
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
  plugins: [],
} satisfies Config;
