"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import {
  createChart,
  type CandlestickData,
  type HistogramData,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  type SeriesMarker,
  type Time,
  type AreaSeriesPartialOptions,
} from "lightweight-charts";
import { useDemoStore, type CandlePoint } from "@/stores/demo-store";

type CandleSeries = ISeriesApi<"Candlestick">;
type LineSeries = ISeriesApi<"Line">;
type AreaSeries = ISeriesApi<"Area">;
type HistogramSeries = ISeriesApi<"Histogram">;

const PRICE_HEIGHT = 320;
const INDICATOR_HEIGHT = 180;
const MAX_SERIES_POINTS = 600;

export function DemoChart() {
  const priceContainerRef = useRef<HTMLDivElement>(null);
  const indicatorContainerRef = useRef<HTMLDivElement>(null);

  const priceChartRef = useRef<IChartApi | null>(null);
  const indicatorChartRef = useRef<IChartApi | null>(null);

  const candleSeriesRef = useRef<CandleSeries | null>(null);
  const smaSeriesRef = useRef<LineSeries | null>(null);
  const emaSeriesRef = useRef<LineSeries | null>(null);
  const rsiSeriesRef = useRef<LineSeries | null>(null);
  const positionBandRef = useRef<AreaSeries | null>(null);
  const smaCacheRef = useRef<LineData<Time>[]>([]);
  const emaCacheRef = useRef<LineData<Time>[]>([]);
  const rsiCacheRef = useRef<LineData<Time>[]>([]);
  const positionBandCacheRef = useRef<LineData<Time>[]>([]);

  const macdHistogramRef = useRef<HistogramSeries | null>(null);
  const macdSignalRef = useRef<LineSeries | null>(null);
  const macdLineRef = useRef<LineSeries | null>(null);
  const obvSeriesRef = useRef<LineSeries | null>(null);
  const macdHistogramCacheRef = useRef<HistogramData<Time>[]>([]);
  const macdSignalCacheRef = useRef<LineData<Time>[]>([]);
  const macdLineCacheRef = useRef<LineData<Time>[]>([]);
  const obvCacheRef = useRef<LineData<Time>[]>([]);

  const lastAppliedRef = useRef<number | null>(null);

  const candles = useDemoStore((state) => state.candles);

  const transformedData = useMemo<CandlestickData[]>(() => {
    return candles.map((candle) => ({
      time: (candle.timestamp / 1000) as Time,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.price,
    }));
  }, [candles]);

  const smaData = useMemo<LineData<Time>[]>(() => computeSMA(candles, 20), [candles]);
  const emaData = useMemo<LineData<Time>[]>(() => computeEMA(candles, 50), [candles]);
  const rsiData = useMemo<LineData<Time>[]>(() => computeRSI(candles, 14), [candles]);
  const { macdHistogram, macdSignal, macdLine } = useMemo(
    () => computeMACD(candles),
    [candles],
  );
  const obvData = useMemo<LineData<Time>[]>(() => computeOBV(candles), [candles]);
  const positionBand = useMemo<LineData<Time>[]>(() => computePositionBand(candles), [candles]);
  const positionBandBase = useMemo(() => {
    if (candles.length === 0) return undefined;
    const anchor = candles[candles.length - 1];
    return Number((anchor.price * 0.985).toFixed(2));
  }, [candles]);
  const markers = useMemo<SeriesMarker<Time>[]>(() => buildMarkers(candles), [candles]);

  useEffect(() => {
    if (!priceContainerRef.current || priceChartRef.current) {
      return;
    }

    const chart = createChart(priceContainerRef.current, {
      width: priceContainerRef.current.clientWidth,
      height: PRICE_HEIGHT,
      layout: {
        background: { color: "transparent" },
        textColor: "#E8ECFF",
      },
      grid: {
        vertLines: { color: "rgba(100, 118, 255, 0.12)" },
        horzLines: { color: "rgba(100, 118, 255, 0.12)" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.2, bottom: 0.25 },
      },
      timeScale: {
        borderVisible: false,
      },
    });

    const priceSeries = chart.addCandlestickSeries({
      upColor: "#53f6d7",
      downColor: "#ff4d4f",
      borderDownColor: "#ff4d4f",
      borderUpColor: "#53f6d7",
      wickDownColor: "#ff4d4f",
      wickUpColor: "#53f6d7",
    });

    const smaSeries = chart.addLineSeries({
      color: "#9CA6FF",
      lineWidth: 2,
      priceLineVisible: false,
    });

    const emaSeries = chart.addLineSeries({
      color: "#2DD6B9",
      lineWidth: 2,
      priceLineVisible: false,
    });

    const rsiSeries = chart.addLineSeries({
      color: "#FFC86A",
      lineWidth: 2,
      priceLineVisible: false,
      priceScaleId: "rsi",
    });

    chart.priceScale("rsi").applyOptions({
      scaleMargins: { top: 0.85, bottom: 0.02 },
      mode: 0,
    });

    const bandSeries = chart.addAreaSeries({
      topColor: "rgba(93, 100, 255, 0.18)",
      bottomColor: "rgba(93, 100, 255, 0.04)",
      lineColor: "rgba(93, 100, 255, 0.4)",
      lineWidth: 1,
    });

    priceChartRef.current = chart;
    candleSeriesRef.current = priceSeries;
    smaSeriesRef.current = smaSeries;
    emaSeriesRef.current = emaSeries;
    rsiSeriesRef.current = rsiSeries;
    positionBandRef.current = bandSeries;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });
    resizeObserver.observe(priceContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      priceChartRef.current = null;
      candleSeriesRef.current = null;
      smaSeriesRef.current = null;
      emaSeriesRef.current = null;
      rsiSeriesRef.current = null;
      positionBandRef.current = null;
      lastAppliedRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!indicatorContainerRef.current || indicatorChartRef.current) {
      return;
    }

    const chart = createChart(indicatorContainerRef.current, {
      width: indicatorContainerRef.current.clientWidth,
      height: INDICATOR_HEIGHT,
      layout: {
        background: { color: "transparent" },
        textColor: "#CBD2FF",
      },
      grid: {
        vertLines: { color: "rgba(100, 118, 255, 0.12)" },
        horzLines: { color: "rgba(100, 118, 255, 0.12)" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.2, bottom: 0.2 },
      },
      timeScale: {
        borderVisible: false,
      },
    });

    const histogram = chart.addHistogramSeries({
      priceScaleId: "macd",
      base: 0,
      color: "#2DD6B9",
    });
    chart.priceScale("macd").applyOptions({
      scaleMargins: { top: 0.3, bottom: 0.3 },
    });

    const macdSignalSeries = chart.addLineSeries({
      color: "#FFC86A",
      lineWidth: 2,
      priceScaleId: "macd",
      priceLineVisible: false,
    });
    const macdLineSeries = chart.addLineSeries({
      color: "#5D64FF",
      lineWidth: 2,
      priceScaleId: "macd",
      priceLineVisible: false,
    });

    const obvSeries = chart.addLineSeries({
      color: "#9CA6FF",
      lineWidth: 2,
      priceScaleId: "obv",
      priceLineVisible: false,
    });
    chart.priceScale("obv").applyOptions({
      scaleMargins: { top: 0.1, bottom: 0.05 },
      mode: 0,
    });

    indicatorChartRef.current = chart;
    macdHistogramRef.current = histogram;
    macdSignalRef.current = macdSignalSeries;
    macdLineRef.current = macdLineSeries;
    obvSeriesRef.current = obvSeries;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });
    resizeObserver.observe(indicatorContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      indicatorChartRef.current = null;
      macdHistogramRef.current = null;
      macdSignalRef.current = null;
      macdLineRef.current = null;
      obvSeriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!candleSeriesRef.current || transformedData.length === 0) {
      return;
    }

    const latestPoint = transformedData[transformedData.length - 1];
    if (lastAppliedRef.current === null) {
      candleSeriesRef.current.setData(transformedData);
    } else {
      candleSeriesRef.current.update(latestPoint);
    }
    lastAppliedRef.current = Number(latestPoint.time);

    priceChartRef.current?.timeScale().fitContent();
    candleSeriesRef.current.setMarkers(markers);
  }, [transformedData, markers]);

  useEffect(() => {
    syncLineLikeSeries(smaSeriesRef.current, smaCacheRef, smaData);
  }, [smaData]);

  useEffect(() => {
    syncLineLikeSeries(emaSeriesRef.current, emaCacheRef, emaData);
  }, [emaData]);

  useEffect(() => {
    syncLineLikeSeries(rsiSeriesRef.current, rsiCacheRef, rsiData);
  }, [rsiData]);

  useEffect(() => {
    if (positionBandRef.current && positionBandBase !== undefined) {
      const newOptions = {
        baseValue: { type: "price" as const, price: positionBandBase },
      } as unknown as AreaSeriesPartialOptions;
      positionBandRef.current.applyOptions(newOptions);
    }
    syncLineLikeSeries(positionBandRef.current, positionBandCacheRef, positionBand);
  }, [positionBand, positionBandBase]);

  useEffect(() => {
    syncHistogramSeries(macdHistogramRef.current, macdHistogramCacheRef, macdHistogram);
    syncLineLikeSeries(macdSignalRef.current, macdSignalCacheRef, macdSignal);
    syncLineLikeSeries(macdLineRef.current, macdLineCacheRef, macdLine);
  }, [macdHistogram, macdLine, macdSignal]);

  useEffect(() => {
    syncLineLikeSeries(obvSeriesRef.current, obvCacheRef, obvData);
  }, [obvData]);

  return (
    <div className="space-y-4">
      <div ref={priceContainerRef} className="h-[320px] w-full" role="presentation" />
      <div ref={indicatorContainerRef} className="h-[180px] w-full" role="presentation" />
      <small className="block text-xs text-black/40 dark:text-white/40">
        Lightweight Charts&trade; by TradingView is used under the Apache 2.0 license.
      </small>
    </div>
  );
}

function computeSMA(candles: CandlePoint[], period: number): LineData<Time>[] {
  if (candles.length < period) return [];
  const result: LineData<Time>[] = [];
  for (let i = period - 1; i < candles.length; i += 1) {
    const slice = candles.slice(i - period + 1, i + 1);
    const avg = slice.reduce((sum, candle) => sum + candle.price, 0) / slice.length;
    result.push({
      time: (candles[i].timestamp / 1000) as Time,
      value: Number(avg.toFixed(2)),
    });
  }
  return result;
}

function computeEMA(candles: CandlePoint[], period: number): LineData<Time>[] {
  if (candles.length < period) return [];
  const k = 2 / (period + 1);
  const emaValues: LineData<Time>[] = [];
  let ema = candles.slice(0, period).reduce((sum, candle) => sum + candle.price, 0) / period;
  emaValues.push({
    time: (candles[period - 1].timestamp / 1000) as Time,
    value: Number(ema.toFixed(2)),
  });

  for (let i = period; i < candles.length; i += 1) {
    ema = candles[i].price * k + ema * (1 - k);
    emaValues.push({
      time: (candles[i].timestamp / 1000) as Time,
      value: Number(ema.toFixed(2)),
    });
  }
  return emaValues;
}

function computeRSI(candles: CandlePoint[], period: number): LineData<Time>[] {
  if (candles.length <= period) return [];

  let gains = 0;
  let losses = 0;
  for (let i = 1; i <= period; i += 1) {
    const change = candles[i].price - candles[i - 1].price;
    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }
  let avgGain = gains / period;
  let avgLoss = losses / period;

  const rsi: LineData<Time>[] = [];

  for (let i = period + 1; i < candles.length; i += 1) {
    const change = candles[i].price - candles[i - 1].price;
    if (change >= 0) {
      avgGain = (avgGain * (period - 1) + change) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) + Math.abs(change)) / period;
    }
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const value = 100 - 100 / (1 + rs);
    rsi.push({
      time: (candles[i].timestamp / 1000) as Time,
      value: Number(value.toFixed(2)),
    });
  }
  return rsi;
}

function computeMACD(candles: CandlePoint[]) {
  if (candles.length < 26) {
    return { macdHistogram: [] as HistogramData<Time>[], macdSignal: [] as LineData<Time>[], macdLine: [] as LineData<Time>[] };
  }

  const ema12 = computeEMAValueSeries(candles, 12);
  const ema26 = computeEMAValueSeries(candles, 26);

  const macdLine: LineData<Time>[] = [];
  for (let i = 0; i < candles.length; i += 1) {
    if (ema12[i] === undefined || ema26[i] === undefined) continue;
    macdLine.push({
      time: (candles[i].timestamp / 1000) as Time,
      value: Number((ema12[i]! - ema26[i]!).toFixed(2)),
    });
  }

  const macdValues = macdLine.map((point) => point.value);
  const signalValues = computeEMAFromValues(macdValues, 9);

  const macdSignal: LineData<Time>[] = macdLine
    .slice(macdLine.length - signalValues.length)
    .map((point, index) => ({
      time: point.time,
      value: Number(signalValues[index]!.toFixed(2)),
    }));

  const macdHistogram: HistogramData<Time>[] = macdSignal.map((signalPoint, index) => {
    const macdPoint = macdLine[macdLine.length - macdSignal.length + index];
    return {
      time: signalPoint.time,
      value: Number((macdPoint.value - signalPoint.value).toFixed(2)),
      color: macdPoint.value >= signalPoint.value ? "#2DD6B9" : "#FF6B81",
    };
  });

  return { macdHistogram, macdSignal, macdLine };
}

function computeOBV(candles: CandlePoint[]): LineData<Time>[] {
  if (candles.length === 0) return [];
  const values: LineData<Time>[] = [];
  let obv = 0;
  for (let i = 1; i < candles.length; i += 1) {
    const direction = Math.sign(candles[i].price - candles[i - 1].price);
    obv += direction * candles[i].volume;
    values.push({
      time: (candles[i].timestamp / 1000) as Time,
      value: Number(obv.toFixed(2)),
    });
  }
  return values;
}

function computePositionBand(candles: CandlePoint[]): LineData<Time>[] {
  if (candles.length === 0) return [];
  const recent = candles.slice(-60);
  const anchor = recent[recent.length - 1];
  const bandUpper = anchor.price * 1.01;
  return recent.map((candle) => ({
    time: (candle.timestamp / 1000) as Time,
    value: Number(bandUpper.toFixed(2)),
  }));
}

function buildMarkers(candles: CandlePoint[]): SeriesMarker<Time>[] {
  if (candles.length === 0) return [];
  return candles
    .filter((_, index) => index % 20 === 0)
    .map((candle, index) => {
      const isEntry = index % 2 === 0;
      return {
        time: (candle.timestamp / 1000) as Time,
        position: isEntry ? "belowBar" : "aboveBar",
        color: isEntry ? "#2DD6B9" : "#FF6B81",
        shape: isEntry ? "arrowUp" : "arrowDown",
        text: isEntry ? "Demo entry" : "Demo exit",
        tooltip: `${isEntry ? "Entry" : "Exit"} @ ${candle.price.toFixed(2)}`,
      };
    });
}

function computeEMAValueSeries(candles: CandlePoint[], period: number) {
  if (candles.length < period) return [];
  const k = 2 / (period + 1);
  const values: Array<number | undefined> = new Array(candles.length);
  let ema =
    candles.slice(0, period).reduce((sum, candle) => sum + candle.price, 0) / period;
  values[period - 1] = ema;
  for (let i = period; i < candles.length; i += 1) {
    ema = candles[i].price * k + ema * (1 - k);
    values[i] = ema;
  }
  return values;
}

function computeEMAFromValues(values: number[], period: number) {
  if (values.length < period) return [];
  const k = 2 / (period + 1);
  let ema = values.slice(0, period).reduce((sum, value) => sum + value, 0) / period;
  const output = [ema];
  for (let i = period; i < values.length; i += 1) {
    ema = values[i] * k + ema * (1 - k);
    output.push(ema);
  }
  return output;
}

function syncLineLikeSeries(
  series: LineSeries | AreaSeries | null,
  cacheRef: MutableRefObject<LineData<Time>[]>,
  data: LineData<Time>[],
) {
  if (!series) return;

  if (data.length === 0) {
    series.setData([]);
    cacheRef.current = [];
    return;
  }

  const cachedLength = cacheRef.current.length;
  const incomingLength = data.length;

  if (cachedLength === 0 || incomingLength > cachedLength + 1 || incomingLength < cachedLength) {
    series.setData(data);
    cacheRef.current = [...data];
    return;
  }

  const latestPoint = data[incomingLength - 1];
  const lastCached = cacheRef.current[cachedLength - 1];

  if (lastCached && lastCached.time === latestPoint.time) {
    cacheRef.current[cachedLength - 1] = latestPoint;
  } else {
    cacheRef.current = [...cacheRef.current.slice(-MAX_SERIES_POINTS + 1), latestPoint];
  }

  series.update(latestPoint);
}

function syncHistogramSeries(
  series: HistogramSeries | null,
  cacheRef: MutableRefObject<HistogramData<Time>[]>,
  data: HistogramData<Time>[],
) {
  if (!series) return;

  if (data.length === 0) {
    series.setData([]);
    cacheRef.current = [];
    return;
  }

  const cachedLength = cacheRef.current.length;
  const incomingLength = data.length;

  if (cachedLength === 0 || incomingLength > cachedLength + 1 || incomingLength < cachedLength) {
    series.setData(data);
    cacheRef.current = [...data];
    return;
  }

  const latestPoint = data[incomingLength - 1];
  const lastCached = cacheRef.current[cachedLength - 1];

  if (lastCached && lastCached.time === latestPoint.time) {
    cacheRef.current[cachedLength - 1] = latestPoint;
  } else {
    cacheRef.current = [...cacheRef.current.slice(-MAX_SERIES_POINTS + 1), latestPoint];
  }

  series.update(latestPoint);
}
