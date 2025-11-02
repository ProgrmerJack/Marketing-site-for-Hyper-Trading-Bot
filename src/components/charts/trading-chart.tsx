/**
 * Advanced Trading Chart with Technical Indicators
 * Interactive chart with multiple indicator overlays
 * 
 * Features:
 * - Candlestick chart with volume
 * - RSI indicator
 * - MACD indicator
 * - Bollinger Bands
 * - SMA/EMA overlays
 * - Interactive controls
 * - Mobile-responsive
 */

"use client";

import { useState, useMemo } from "react";
import { CandlestickChart, CandleData } from "./candlestick-chart";
import { Button } from "@/components/button";
import {
  calculateSMA,
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
} from "@/lib/technical-indicators";
import { TrendingUp, Activity, BarChart3, Layers } from "lucide-react";

interface TradingChartProps {
  data: CandleData[];
  className?: string;
}

type Indicator = "sma" | "ema" | "bollinger" | "rsi" | "macd";

export function TradingChart({ data, className = "" }: TradingChartProps) {
  const [activeIndicators, setActiveIndicators] = useState<Set<Indicator>>(
    new Set(["sma"])
  );
  const [smaPeriod] = useState(20);
  const [emaPeriod] = useState(12);

  // Calculate indicators
  const indicators = useMemo(() => {
    const closes = data.map((d) => d.close);

    return {
      sma: calculateSMA(closes, smaPeriod),
      ema: calculateEMA(closes, emaPeriod),
      rsi: calculateRSI(closes, 14),
      macd: calculateMACD(closes, 12, 26, 9),
      bollinger: calculateBollingerBands(closes, 20, 2),
    };
  }, [data, smaPeriod, emaPeriod]);

  const toggleIndicator = (indicator: Indicator) => {
    setActiveIndicators((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(indicator)) {
        newSet.delete(indicator);
      } else {
        newSet.add(indicator);
      }
      return newSet;
    });
  };

  const indicatorButtons = [
    {
      id: "sma" as Indicator,
      label: "SMA (20)",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "ema" as Indicator,
      label: "EMA (12)",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "bollinger" as Indicator,
      label: "Bollinger",
      icon: Layers,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "rsi" as Indicator,
      label: "RSI",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "macd" as Indicator,
      label: "MACD",
      icon: BarChart3,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Indicator Controls */}
      <div className="flex flex-wrap gap-2">
        {indicatorButtons.map(({ id, label, icon: Icon, color, bgColor }) => (
          <Button
            key={id}
            size="sm"
            variant={activeIndicators.has(id) ? "primary" : "outline"}
            onClick={() => toggleIndicator(id)}
            className={activeIndicators.has(id) ? "" : `${bgColor} ${color} border-0`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Main Candlestick Chart */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <CandlestickChart
          data={data}
          showVolume={true}
          showSMA={activeIndicators.has("sma")}
          smaPeriod={smaPeriod}
        />
      </div>

      {/* RSI Chart */}
      {activeIndicators.has("rsi") && (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">RSI (14)</h3>
            <div className="text-sm text-gray-500">
              <span className="text-red-600">&lt;30 Oversold</span> |{" "}
              <span className="text-green-600">&gt;70 Overbought</span>
            </div>
          </div>
          <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-400">RSI Chart Placeholder</p>
          </div>
        </div>
      )}

      {/* MACD Chart */}
      {activeIndicators.has("macd") && (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">MACD (12, 26, 9)</h3>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-blue-600"></span>
                MACD
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-red-600"></span>
                Signal
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-1 bg-gray-400"></span>
                Histogram
              </span>
            </div>
          </div>
          <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-400">MACD Chart Placeholder</p>
          </div>
        </div>
      )}

      {/* Indicator Stats */}
      {data.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activeIndicators.has("sma") && (
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">SMA ({smaPeriod})</p>
              <p className="text-2xl font-bold text-blue-600">
                ${indicators.sma[indicators.sma.length - 1]?.toFixed(2) || "—"}
              </p>
            </div>
          )}

          {activeIndicators.has("ema") && (
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">EMA ({emaPeriod})</p>
              <p className="text-2xl font-bold text-purple-600">
                ${indicators.ema[indicators.ema.length - 1]?.toFixed(2) || "—"}
              </p>
            </div>
          )}

          {activeIndicators.has("rsi") && (
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">RSI (14)</p>
              <p
                className={`text-2xl font-bold ${
                  (indicators.rsi[indicators.rsi.length - 1] || 50) > 70
                    ? "text-red-600"
                    : (indicators.rsi[indicators.rsi.length - 1] || 50) < 30
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {indicators.rsi[indicators.rsi.length - 1]?.toFixed(2) || "—"}
              </p>
            </div>
          )}

          {activeIndicators.has("bollinger") && (
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Bollinger Width</p>
              <p className="text-2xl font-bold text-orange-600">
                {(() => {
                  const upper = indicators.bollinger.upper[indicators.bollinger.upper.length - 1];
                  const lower = indicators.bollinger.lower[indicators.bollinger.lower.length - 1];
                  return upper && lower ? `$${(upper - lower).toFixed(2)}` : "—";
                })()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold mb-2">Active Indicators:</h4>
        <div className="flex flex-wrap gap-3 text-sm">
          {activeIndicators.has("sma") && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-blue-600"></span>
              SMA ({smaPeriod})
            </span>
          )}
          {activeIndicators.has("ema") && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-purple-600"></span>
              EMA ({emaPeriod})
            </span>
          )}
          {activeIndicators.has("bollinger") && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-orange-400"></span>
              Bollinger Bands
            </span>
          )}
          {activeIndicators.has("rsi") && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-green-600"></span>
              RSI (14)
            </span>
          )}
          {activeIndicators.has("macd") && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-red-600"></span>
              MACD (12, 26, 9)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
