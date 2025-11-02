import { create } from "zustand";

export type DemoEnvelope<T> = {
  event: string;
  data: T;
  ts: number;
  source: string;
  signature: string;
};

export type CandlePoint = {
  timestamp: number;
  open: number;
  price: number;
  high: number;
  low: number;
  volume: number;
  signature: string;
};

type StreamStatus = "connected" | "disconnected" | "paused" | "error";

type DemoState = {
  status: StreamStatus;
  latencyMs: number;
  lastEventId?: string;
  lastSignature?: string;
  candles: CandlePoint[];
  setStatus: (status: StreamStatus) => void;
  pushCandle: (packet: DemoEnvelope<CandlePoint>) => void;
  hydrateCandles: (candles: CandlePoint[]) => void;
  setLatency: (latency: number) => void;
  setLastEventId: (id: string) => void;
};

const MAX_POINTS = 600;

export const useDemoStore = create<DemoState>((set) => ({
  status: "disconnected",
  latencyMs: 0,
  candles: [],
  setStatus: (status) => set({ status }),
  pushCandle: (packet) =>
    set((state) => {
      const nextEntry: CandlePoint = {
        ...packet.data,
        signature: packet.signature,
      };
      const merged = mergeCandles(state.candles, [nextEntry]);
      return {
        candles: merged.slice(-MAX_POINTS),
        lastSignature: packet.signature,
      };
    }),
  hydrateCandles: (candles) =>
    set((state) => {
      if (candles.length === 0) {
        return {};
      }
      const normalized = candles.map((candle) => ({
        ...candle,
        signature: candle.signature ?? "",
      }));
      const merged = mergeCandles(normalized, state.candles);
      return {
        candles: merged.slice(-MAX_POINTS),
      };
    }),
  setLatency: (latencyMs) => set({ latencyMs }),
  setLastEventId: (lastEventId) => set({ lastEventId }),
}));

function mergeCandles(
  first: CandlePoint[],
  second: CandlePoint[],
): CandlePoint[] {
  const byTimestamp = new Map<number, CandlePoint>();

  for (const candle of [...first, ...second]) {
    byTimestamp.set(candle.timestamp, candle);
  }

  return Array.from(byTimestamp.values()).sort((a, b) => a.timestamp - b.timestamp);
}
