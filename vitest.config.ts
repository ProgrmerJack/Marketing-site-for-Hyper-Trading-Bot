import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: [
      "src/**/*.{test,spec}.{ts,tsx,js}",
      "packages/**/src/**/*.{test,spec}.{ts,tsx,js}",
    ],
    exclude: ["tests/**", "node_modules/**"],
    coverage: {
      reporter: ["text", "json-summary", "html"],
    },
  },
});
