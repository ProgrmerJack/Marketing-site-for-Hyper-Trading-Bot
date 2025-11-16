import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url()
    .default("https://hypertrader.example.com"),
  // Optional secret used for demo SSE signature verification
  DEMO_STREAM_SECRET: z.string().optional(),
});

declare global {
  var __validatedEnv: z.infer<typeof serverSchema> | undefined;
}

function validateEnv() {
  if (typeof globalThis.__validatedEnv !== "undefined") {
    return globalThis.__validatedEnv;
  }

  const parsed = serverSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  if (!parsed.success) {
    console.error("❌ Invalid environment variables", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  globalThis.__validatedEnv = parsed.data;
  return parsed.data;
}

export const env = validateEnv();
