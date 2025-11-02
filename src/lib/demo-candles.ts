export type CandleSnapshot = {
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
};

const DEFAULT_PRICE = 68_120;
const STREAM_INTERVAL_MS = 1_000;

export function parseSequence(input: string | null): number | undefined {
  if (!input) return undefined;
  const parsed = Number.parseInt(input, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return undefined;
  }
  return parsed;
}

export function computePrice(sequence: number, base = DEFAULT_PRICE): number {
  const wave = Math.sin(sequence / 6) * 60;
  const microDrift = Math.sin(sequence / 24) * 25;
  const noise = (seededRandom(sequence) - 0.5) * 40;
  return base + wave + microDrift + noise;
}

export function createCandleSnapshot(
  sequence: number,
  previousPrice: number,
  timestamp = Date.now(),
): CandleSnapshot {
  const price = computePrice(sequence);
  const highNoise = seededRandom(sequence + 1) * 6;
  const lowNoise = seededRandom(sequence + 2) * 6;
  const volume = 3 + seededRandom(sequence + 3) * 5;

  const high = Math.max(previousPrice, price) + highNoise;
  const low = Math.min(previousPrice, price) - lowNoise;

  return {
    price: round2(price),
    open: round2(previousPrice),
    high: round2(Math.max(high, price)),
    low: round2(Math.min(low, price)),
    volume: round2(volume),
    timestamp,
  };
}

export function buildHistoricalCandles(count: number, referenceTs = Date.now()): CandleSnapshot[] {
  const effectiveCount = Math.max(0, count);
  const snapshots: CandleSnapshot[] = [];
  let lastPrice = computePrice(0);

  for (let index = 1; index <= effectiveCount; index += 1) {
    const sequence = index;
    const timestamp = referenceTs - (effectiveCount - index) * STREAM_INTERVAL_MS;
    const candle = createCandleSnapshot(sequence, lastPrice, timestamp);
    snapshots.push(candle);
    lastPrice = candle.price;
  }

  return snapshots;
}

export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12_989.0) * 43758.5453;
  return x - Math.floor(x);
}

function round2(value: number): number {
  return Number(value.toFixed(2));
}

export const DEMO_STREAM_INTERVAL_MS = STREAM_INTERVAL_MS;
export const DEMO_DEFAULT_PRICE = DEFAULT_PRICE;
