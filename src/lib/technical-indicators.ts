/**
 * Technical Indicators Library
 * Calculations for common trading indicators
 * 
 * Indicators:
 * - SMA (Simple Moving Average)
 * - EMA (Exponential Moving Average)
 * - RSI (Relative Strength Index)
 * - MACD (Moving Average Convergence Divergence)
 * - Bollinger Bands
 */

import { CandleData } from "@/components/charts/candlestick-chart";

/**
 * Simple Moving Average (SMA)
 * Average price over a specific period
 */
export function calculateSMA(data: number[], period: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val, 0);
    return sum / period;
  });
}

/**
 * Exponential Moving Average (EMA)
 * Weighted average giving more importance to recent prices
 */
export function calculateEMA(data: number[], period: number): (number | null)[] {
  const multiplier = 2 / (period + 1);
  const ema: (number | null)[] = [];

  // Initialize with SMA for first value
  let sum = 0;
  for (let i = 0; i < period; i++) {
    if (i < data.length) {
      sum += data[i];
    }
    ema.push(null);
  }
  
  if (period <= data.length) {
    ema[period - 1] = sum / period;
  }

  // Calculate EMA for remaining values
  for (let i = period; i < data.length; i++) {
    const prevEMA = ema[i - 1];
    if (prevEMA !== null) {
      ema[i] = (data[i] - prevEMA) * multiplier + prevEMA;
    }
  }

  return ema;
}

/**
 * Relative Strength Index (RSI)
 * Momentum oscillator measuring speed and magnitude of price changes
 * Values: 0-100 (>70 overbought, <30 oversold)
 */
export function calculateRSI(data: number[], period: number = 14): (number | null)[] {
  const rsi: (number | null)[] = [];
  
  if (data.length < period + 1) {
    return data.map(() => null);
  }

  // Calculate price changes
  const changes: number[] = [];
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i] - data[i - 1]);
  }

  // First RSI calculation
  let avgGain = 0;
  let avgLoss = 0;
  
  for (let i = 0; i < period; i++) {
    if (changes[i] > 0) {
      avgGain += changes[i];
    } else {
      avgLoss += Math.abs(changes[i]);
    }
  }
  
  avgGain /= period;
  avgLoss /= period;

  // Initial null values
  for (let i = 0; i <= period; i++) {
    rsi.push(null);
  }

  // First RSI value
  const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  rsi[period] = 100 - (100 / (1 + rs));

  // Subsequent RSI values using smoothed averages
  for (let i = period; i < changes.length; i++) {
    const change = changes[i];
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    const currentRs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi.push(100 - (100 / (1 + currentRs)));
  }

  return rsi;
}

/**
 * MACD (Moving Average Convergence Divergence)
 * Trend-following momentum indicator
 * Returns: { macd, signal, histogram }
 */
export function calculateMACD(
  data: number[],
  fastPeriod: number = 12,
  slowPeriod: number = 26,
  signalPeriod: number = 9
): {
  macd: (number | null)[];
  signal: (number | null)[];
  histogram: (number | null)[];
} {
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);

  // MACD Line = Fast EMA - Slow EMA
  const macd = fastEMA.map((fast, i) => {
    const slow = slowEMA[i];
    if (fast === null || slow === null) return null;
    return fast - slow;
  });

  // Signal Line = EMA of MACD
  const macdValues = macd.filter((v): v is number => v !== null);
  const signalEMA = calculateEMA(macdValues, signalPeriod);
  
  // Align signal line with MACD
  const signal: (number | null)[] = [];
  let signalIndex = 0;
  for (let i = 0; i < macd.length; i++) {
    if (macd[i] === null) {
      signal.push(null);
    } else {
      signal.push(signalEMA[signalIndex] || null);
      signalIndex++;
    }
  }

  // Histogram = MACD - Signal
  const histogram = macd.map((m, i) => {
    const s = signal[i];
    if (m === null || s === null) return null;
    return m - s;
  });

  return { macd, signal, histogram };
}

/**
 * Bollinger Bands
 * Volatility bands placed above and below moving average
 * Returns: { middle, upper, lower }
 */
export function calculateBollingerBands(
  data: number[],
  period: number = 20,
  stdDev: number = 2
): {
  middle: (number | null)[];
  upper: (number | null)[];
  lower: (number | null)[];
} {
  const middle = calculateSMA(data, period);
  const upper: (number | null)[] = [];
  const lower: (number | null)[] = [];

  middle.forEach((sma, i) => {
    if (sma === null || i < period - 1) {
      upper.push(null);
      lower.push(null);
      return;
    }

    // Calculate standard deviation for this period
    const slice = data.slice(i - period + 1, i + 1);
    const variance = slice.reduce((acc, val) => acc + Math.pow(val - sma, 2), 0) / period;
    const sd = Math.sqrt(variance);

    upper.push(sma + stdDev * sd);
    lower.push(sma - stdDev * sd);
  });

  return { middle, upper, lower };
}

/**
 * Average True Range (ATR)
 * Measure of volatility
 */
export function calculateATR(
  data: CandleData[],
  period: number = 14
): (number | null)[] {
  const tr: number[] = [];

  // Calculate True Range for each candle
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      tr.push(data[i].high - data[i].low);
    } else {
      const high = data[i].high;
      const low = data[i].low;
      const prevClose = data[i - 1].close;

      const tr1 = high - low;
      const tr2 = Math.abs(high - prevClose);
      const tr3 = Math.abs(low - prevClose);

      tr.push(Math.max(tr1, tr2, tr3));
    }
  }

  // Calculate ATR using EMA of True Range
  return calculateEMA(tr, period);
}

/**
 * On-Balance Volume (OBV)
 * Momentum indicator using volume flow
 */
export function calculateOBV(data: CandleData[]): number[] {
  const obv: number[] = [data[0]?.volume || 0];

  for (let i = 1; i < data.length; i++) {
    const prevClose = data[i - 1].close;
    const currentClose = data[i].close;
    const currentVolume = data[i].volume;

    if (currentClose > prevClose) {
      obv.push(obv[i - 1] + currentVolume);
    } else if (currentClose < prevClose) {
      obv.push(obv[i - 1] - currentVolume);
    } else {
      obv.push(obv[i - 1]);
    }
  }

  return obv;
}

/**
 * Stochastic Oscillator
 * Momentum indicator comparing closing price to price range
 * Returns: { k, d } (k = %K line, d = %D line)
 */
export function calculateStochastic(
  data: CandleData[],
  kPeriod: number = 14,
  dPeriod: number = 3
): {
  k: (number | null)[];
  d: (number | null)[];
} {
  const k: (number | null)[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < kPeriod - 1) {
      k.push(null);
      continue;
    }

    const slice = data.slice(i - kPeriod + 1, i + 1);
    const high = Math.max(...slice.map((d) => d.high));
    const low = Math.min(...slice.map((d) => d.low));
    const close = data[i].close;

    if (high === low) {
      k.push(50); // Avoid division by zero
    } else {
      k.push(((close - low) / (high - low)) * 100);
    }
  }

  // %D is SMA of %K
  const kValues = k.filter((v): v is number => v !== null);
  const dSMA = calculateSMA(kValues, dPeriod);
  
  const d: (number | null)[] = [];
  let dIndex = 0;
  for (let i = 0; i < k.length; i++) {
    if (k[i] === null) {
      d.push(null);
    } else {
      d.push(dSMA[dIndex] || null);
      dIndex++;
    }
  }

  return { k, d };
}

/**
 * Volume Weighted Average Price (VWAP)
 * Average price weighted by volume
 */
export function calculateVWAP(data: CandleData[]): number[] {
  let cumulativeTPV = 0; // Typical Price * Volume
  let cumulativeVolume = 0;
  const vwap: number[] = [];

  for (const candle of data) {
    const typicalPrice = (candle.high + candle.low + candle.close) / 3;
    cumulativeTPV += typicalPrice * candle.volume;
    cumulativeVolume += candle.volume;

    vwap.push(cumulativeTPV / cumulativeVolume);
  }

  return vwap;
}
