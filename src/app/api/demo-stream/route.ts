import type { NextRequest } from "next/server";
import { buildEnvelope } from "@/lib/signing";
import { createCandleSnapshot, parseSequence, computePrice, DEMO_STREAM_INTERVAL_MS } from "@/lib/demo-candles";

export const runtime = "nodejs";

const HEARTBEAT_MS = 10_000;
const RETRY_MS = 5_000;

export async function GET(request: NextRequest) {
  const abortSignal = request.signal;
  let teardown: (() => void) | null = null;

  const resumeSequence = parseSequence(
    request.nextUrl.searchParams.get("cursor") ?? request.headers.get("last-event-id"),
  );

  let sequence = resumeSequence ?? 0;
  let lastPrice = computePrice(sequence);

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const write = (chunk: string) => controller.enqueue(encoder.encode(chunk));
      const writeEvent = (id: number, type: string, data: unknown) => {
        const envelope = buildEnvelope(type, data);
        write(`id: ${id}\n`);
        write(`event: ${type}\n`);
        write(`retry: ${RETRY_MS}\n`);
        write(`data: ${JSON.stringify(envelope)}\n\n`);
      };

      const heartbeat = setInterval(() => {
        write(`:heartbeat ${Date.now()}\n\n`);
      }, HEARTBEAT_MS);
      const emitCandle = () => {
        const nextSequence = sequence + 1;
        const candle = createCandleSnapshot(nextSequence, lastPrice);
        writeEvent(nextSequence, "price.candles", candle);
        sequence = nextSequence;
        lastPrice = candle.price;
      };

      // Inform client that stream is ready without mutating the sequence
      const readyEnvelope = buildEnvelope("ready", { status: "connected" });
      write(`event: ready\n`);
      write(`retry: ${RETRY_MS}\n`);
      write(`data: ${JSON.stringify(readyEnvelope)}\n\n`);

      emitCandle();
      const streamInterval = setInterval(emitCandle, DEMO_STREAM_INTERVAL_MS);

      teardown = () => {
        clearInterval(streamInterval);
        clearInterval(heartbeat);
        controller.close();
      };

      if (abortSignal) {
        abortSignal.addEventListener("abort", () => teardown?.(), { once: true });
      }
    },
    cancel() {
      teardown?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
