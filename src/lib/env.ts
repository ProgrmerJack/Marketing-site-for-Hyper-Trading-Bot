import { z } from "zod";

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(10),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(10), // server-only secret
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url()
    .default("https://hypertrader.example.com"),
  // Optional secret used for demo SSE signature verification
  DEMO_STREAM_SECRET: z.string().optional(),
});

export const env = EnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key-for-build-process-at-least-10-chars",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy-key-for-build-process-at-least-10-chars",
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  DEMO_STREAM_SECRET: process.env.DEMO_STREAM_SECRET,
});


