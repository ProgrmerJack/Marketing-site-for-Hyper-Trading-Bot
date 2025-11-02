/**
 * Advanced Charts Demo Component
 * Showcases TradingView-style charts with technical indicators
 */

"use client";

import { useState, useEffect } from "react";
import { TradingChart } from "@/components/charts/trading-chart";
import { generateMockCandleData, generatePatternData, addRealtimeCandle } from "@/lib/mock-candle-data";
import { CandleData } from "@/components/charts/candlestick-chart";
import { Button } from "@/components/button";
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Alert } from "@/components/alert";
import { ChartErrorBoundary } from "@/components/error-boundary";

export function AdvancedChartsDemo() {
  const [data, setData] = useState<CandleData[]>(() => generateMockCandleData({ count: 100 }));
  const [isLive, setIsLive] = useState(false);
  const [pattern, setPattern] = useState<"bull" | "bear" | "consolidation" | null>(null);

  // Real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prev) => addRealtimeCandle(prev));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const loadPattern = (newPattern: "bull" | "bear" | "consolidation") => {
    setIsLive(false);
    setPattern(newPattern);
    setData(generatePatternData(newPattern));
  };

  const reset = () => {
    setIsLive(false);
    setPattern(null);
    setData(generateMockCandleData({ count: 100 }));
  };

  const currentPrice = data[data.length - 1]?.close || 0;
  const previousPrice = data[data.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Advanced Trading Charts</h2>
        <p className="text-gray-600">
          TradingView-style candlestick charts with real-time updates and technical indicators
        </p>
      </div>

      {/* Info Alert */}
      <Alert variant="info">
        <strong>Demo Mode:</strong> This chart displays simulated market data. Enable &ldquo;Live Updates&rdquo; to see
        real-time price movements, or load a specific pattern to test technical indicators.
      </Alert>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          {/* Live Toggle */}
          <Button
            onClick={() => setIsLive(!isLive)}
            variant={isLive ? "danger" : "primary"}
            size="md"
          >
            {isLive ? (
              <>
                <Pause className="w-4 h-4" />
                Stop Live Updates
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Live Updates
              </>
            )}
          </Button>

          {/* Pattern Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => loadPattern("bull")}
              variant={pattern === "bull" ? "primary" : "outline"}
              size="md"
            >
              <TrendingUp className="w-4 h-4" />
              Bull Market
            </Button>
            <Button
              onClick={() => loadPattern("bear")}
              variant={pattern === "bear" ? "primary" : "outline"}
              size="md"
            >
              <TrendingDown className="w-4 h-4" />
              Bear Market
            </Button>
            <Button
              onClick={() => loadPattern("consolidation")}
              variant={pattern === "consolidation" ? "primary" : "outline"}
              size="md"
            >
              <Minus className="w-4 h-4" />
              Consolidation
            </Button>
          </div>

          {/* Reset */}
          <Button onClick={reset} variant="outline" size="md">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          {/* Status Badge */}
          {isLive && (
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Price Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Current Price</p>
          <p className="text-3xl font-bold">${currentPrice.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">24h Change</p>
          <p
            className={`text-3xl font-bold ${
              priceChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {priceChange >= 0 ? "+" : ""}${priceChange.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">24h Change %</p>
          <p
            className={`text-3xl font-bold ${
              priceChangePercent >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {priceChangePercent >= 0 ? "+" : ""}
            {priceChangePercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Chart with Error Boundary */}
      <ChartErrorBoundary>
        <TradingChart data={data} />
      </ChartErrorBoundary>

      {/* Features List */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Chart Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Technical Indicators</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ SMA (Simple Moving Average)</li>
              <li>✓ EMA (Exponential Moving Average)</li>
              <li>✓ RSI (Relative Strength Index)</li>
              <li>✓ MACD (Moving Average Convergence Divergence)</li>
              <li>✓ Bollinger Bands</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Interactions</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ Interactive tooltips with crosshairs</li>
              <li>✓ Zoom and pan controls</li>
              <li>✓ Volume bars</li>
              <li>✓ Mobile touch gestures</li>
              <li>✓ Real-time updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
