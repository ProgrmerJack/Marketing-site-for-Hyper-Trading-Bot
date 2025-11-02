import { createHmac } from "crypto";

const DEFAULT_SECRET = "hyper-demo-secret";

export function signPayload(payload: string) {
  const secret = process.env.DEMO_STREAM_SECRET ?? DEFAULT_SECRET;
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
