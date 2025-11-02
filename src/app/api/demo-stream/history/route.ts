import { NextRequest, NextResponse } from "next/server";
import { buildHistoricalCandles, DEMO_STREAM_INTERVAL_MS } from "@/lib/demo-candles";
import { buildEnvelope } from "@/lib/signing";

export const runtime = "nodejs";

const MAX_COUNT = 1_200;
const DEFAULT_COUNT = 360;

export async function GET(request: NextRequest) {
  const countParam = request.nextUrl.searchParams.get("count");
  const parsedCount = countParam ? Number.parseInt(countParam, 10) : DEFAULT_COUNT;
  const boundedCount = Number.isNaN(parsedCount)
    ? DEFAULT_COUNT
    : Math.max(10, Math.min(parsedCount, MAX_COUNT));

  const now = Date.now();
  const snapshots = buildHistoricalCandles(boundedCount, now);
  const candles = snapshots.map((snapshot) => {
    const envelope = buildEnvelope("price.candles", snapshot);
    return {
      ...snapshot,
      signature: envelope.signature,
    };
  });

  const metadata = {
    count: candles.length,
    intervalMs: DEMO_STREAM_INTERVAL_MS,
    generatedAt: now,
  };

  return NextResponse.json({ metadata, candles });
}
