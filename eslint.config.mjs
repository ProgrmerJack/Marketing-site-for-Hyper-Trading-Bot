import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".contentlayer/**",
      "playwright-report/**",
      "playwright.config.js",
      "vitest.config.js",
      "vitest.setup.js",
      "contentlayer.config.js",
      "tsconfig.tsbuildinfo",
      "scripts/*.js",
      "tests/*.js",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "playwright-report/**",
      "playwright.config.js",
      "vitest.config.js",
      "vitest.setup.js",
      "contentlayer.config.js",
      "tsconfig.tsbuildinfo",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: await (async () => {
      const jsxA11y = (await import("eslint-plugin-jsx-a11y")).default;
      return { "jsx-a11y": jsxA11y };
    })(),
    rules: {
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-static-element-interactions": "off",
    },
  },
];

export default eslintConfig;
