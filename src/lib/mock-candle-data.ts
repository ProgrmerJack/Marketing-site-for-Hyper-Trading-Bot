/**
 * Mock Candlestick Data Generator
 * Generates realistic OHLCV data for testing
 */

import { CandleData } from "@/components/charts/candlestick-chart";

export interface GenerateDataOptions {
  count?: number;
  startPrice?: number;
  volatility?: number;
  trend?: "up" | "down" | "sideways";
  intervalMinutes?: number;
}

/**
 * Generate realistic candlestick data
 */
export function generateMockCandleData(options: GenerateDataOptions = {}): CandleData[] {
  const {
    count = 100,
    startPrice = 150,
    volatility = 0.02,
    trend = "sideways",
    intervalMinutes = 5,
  } = options;

  const data: CandleData[] = [];
  let currentPrice = startPrice;
  const now = Date.now();

  // Trend adjustments
  const trendFactors = {
    up: 0.0005,
    down: -0.0005,
    sideways: 0,
  };
  const trendFactor = trendFactors[trend];

  for (let i = 0; i < count; i++) {
    const timestamp = now - (count - i) * intervalMinutes * 60 * 1000;

    // Random walk with trend
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice + trendFactor * currentPrice;
    currentPrice += change;

    // Generate OHLC for this candle
    const open = currentPrice;
    const priceRange = volatility * currentPrice;
    
    const high = open + Math.random() * priceRange;
    const low = open - Math.random() * priceRange;
    const close = low + Math.random() * (high - low);

    // Generate volume (higher volume on bigger price moves)
    const priceMove = Math.abs(close - open) / open;
    const baseVolume = 1000000;
    const volume = Math.floor(baseVolume * (1 + priceMove * 5 + Math.random()));

    data.push({
      timestamp,
      open,
      high: Math.max(open, close, high),
      low: Math.min(open, close, low),
      close,
      volume,
    });

    currentPrice = close;
  }

  return data;
}

/**
 * Generate data with a specific pattern (for testing indicators)
 */
export function generatePatternData(pattern: "bull" | "bear" | "consolidation"): CandleData[] {
  const baseOptions: GenerateDataOptions = {
    count: 100,
    startPrice: 100,
    volatility: 0.015,
    intervalMinutes: 5,
  };

  switch (pattern) {
    case "bull":
      return generateMockCandleData({ ...baseOptions, trend: "up", volatility: 0.02 });
    
    case "bear":
      return generateMockCandleData({ ...baseOptions, trend: "down", volatility: 0.02 });
    
    case "consolidation":
      return generateMockCandleData({ ...baseOptions, trend: "sideways", volatility: 0.008 });
    
    default:
      return generateMockCandleData(baseOptions);
  }
}

/**
 * Add real-time candle to existing data
 */
export function addRealtimeCandle(existingData: CandleData[]): CandleData[] {
  if (existingData.length === 0) {
    return generateMockCandleData({ count: 1 });
  }

  const lastCandle = existingData[existingData.length - 1];
  const volatility = 0.02;
  
  const change = (Math.random() - 0.5) * 2 * volatility * lastCandle.close;
  const open = lastCandle.close;
  const close = open + change;
  const priceRange = volatility * open;
  
  const high = Math.max(open, close) + Math.random() * priceRange * 0.5;
  const low = Math.min(open, close) - Math.random() * priceRange * 0.5;
  
  const priceMove = Math.abs(close - open) / open;
  const baseVolume = 1000000;
  const volume = Math.floor(baseVolume * (1 + priceMove * 5 + Math.random()));

  const newCandle: CandleData = {
    timestamp: Date.now(),
    open,
    high,
    low,
    close,
    volume,
  };

  return [...existingData.slice(1), newCandle];
}
