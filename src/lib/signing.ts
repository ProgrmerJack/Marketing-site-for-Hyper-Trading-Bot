import { createHmac, randomBytes } from "crypto";
import { env } from "./env";

function getDemoSecret(): string {
  // Prefer validated env var; do not fallback to a hardcoded secret for security reasons.
  if (env.DEMO_STREAM_SECRET) return env.DEMO_STREAM_SECRET;
  // In production we require the secret to be explicitly set.
  if (process.env.NODE_ENV === "production") {
    throw new Error("DEMO_STREAM_SECRET must be set in production");
  }
  // For development/test environments, generate a safe ephemeral secret at runtime.
  return randomBytes(32).toString("hex");
}

export function signPayload(payload: string) {
  const secret = getDemoSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function buildEnvelope<T>(event: string, data: T) {
  const payload = {
    event,
    data,
    ts: Date.now(),
    source: "sandbox",
  };
  const body = JSON.stringify(payload);
  const signature = signPayload(body);
  return { ...payload, signature };
}
