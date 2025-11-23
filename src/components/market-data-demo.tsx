/**
 * MarketDataDemo Component
 * Real-time market data visualization using SSE
 * 
 * Features:
 * - Live price updates
 * - Connection status indicator
 * - Data history table
 * - Statistics display
 * - Manual reconnect control
 */

"use client";

import { useMarketData } from "@/hooks/useMarketData";
import { ArrowUp, ArrowDown, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/button";
import { Alert } from "@/components/alert";
import { Skeleton, SkeletonTable } from "@/components/skeleton";

export default function MarketDataDemo() {
  const {
    latestData,
    dataHistory,
    stats,
    isConnected,
    connectionState,
    reconnectAttempts,
    error,
    lastHeartbeat,
    eventCounts,
    disconnect,
    reconnect,
    clearHistory,
  } = useMarketData({
    maxHistory: 50,
  });

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: "always",
    }).format(value / 100);
  };

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US");
  };

  // Connection status badge
  const ConnectionStatus = () => {
    const statusConfig = {
      connected: { icon: Wifi, color: "text-green-600", bg: "bg-green-50", label: "Connected" },
      connecting: { icon: RefreshCw, color: "text-blue-600", bg: "bg-blue-50", label: "Connecting..." },
      disconnected: { icon: WifiOff, color: "text-gray-600", bg: "bg-gray-50", label: "Disconnected" },
      error: { icon: WifiOff, color: "text-red-600", bg: "bg-red-50", label: "Error" },
    };

    const config = statusConfig[connectionState];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg}`}>
        <Icon className={`w-4 h-4 ${config.color} ${connectionState === 'connecting' ? 'animate-spin' : ''}`} />
        <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
        {reconnectAttempts > 0 && (
          <span className="text-xs text-gray-500">
            (Attempt {reconnectAttempts})
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Real-Time Market Data</h1>
        <p className="text-gray-600">Live streaming via Server-Sent Events (SSE)</p>
      </div>

      {/* Connection Status */}
      <div className="flex items-center justify-between mb-6">
        <ConnectionStatus />
        <div className="flex gap-2">
          {isConnected ? (
            <Button onClick={disconnect} variant="outline" size="sm">
              Disconnect
            </Button>
          ) : (
            <Button onClick={reconnect} variant="primary" size="sm">
              <RefreshCw className="w-4 h-4" />
              Reconnect
            </Button>
          )}
          <Button onClick={clearHistory} variant="outline" size="sm">
            Clear History
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="error" className="mb-6">
          <strong>Connection Error:</strong> {error.message}
        </Alert>
      )}

      {/* Latest Data Card */}
      {latestData ? (
        <div className="bg-card dark:bg-slate-900 rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold">{latestData.symbol}</h2>
              <p className="text-sm text-gray-500">{formatTime(latestData.timestamp)}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{formatCurrency(latestData.price)}</div>
              <div
                className={`flex items-center justify-end gap-1 text-lg font-semibold ${
                  latestData.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {latestData.change >= 0 ? (
                  <ArrowUp className="w-5 h-5" />
                ) : (
                  <ArrowDown className="w-5 h-5" />
                )}
                {formatCurrency(Math.abs(latestData.change))} ({formatPercent(Math.abs(latestData.changePercent))})
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Bid</p>
              <p className="text-lg font-semibold">{formatCurrency(latestData.bid)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ask</p>
              <p className="text-lg font-semibold">{formatCurrency(latestData.ask)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Volume</p>
              <p className="text-lg font-semibold">
                {latestData.volume.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className="h-48 rounded-lg mb-6" />
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Data Points</p>
          <p className="text-2xl font-bold">{stats.totalDataPoints}</p>
        </div>
        <div className="bg-card dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Avg Price</p>
          <p className="text-2xl font-bold">
            {stats.averagePrice > 0 ? formatCurrency(stats.averagePrice) : "-"}
          </p>
        </div>
        <div className="bg-card dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Price Range</p>
          <p className="text-lg font-bold">
            {stats.priceRange.min > 0 
              ? `${formatCurrency(stats.priceRange.min)} - ${formatCurrency(stats.priceRange.max)}`
              : "-"
            }
          </p>
        </div>
        <div className="bg-[rgb(var(--card))] rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Price Events</p>
          <p className="text-2xl font-bold">{eventCounts.price}</p>
          <p className="text-xs text-gray-400 mt-1">
            Heartbeats: {eventCounts.heartbeat} | Errors: {eventCounts.error}
          </p>
        </div>
      </div>

      {/* Data History Table */}
      <div className="bg-card dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Recent Updates</h3>
        </div>
        
        {dataHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card dark:bg-slate-900 divide-y divide-gray-200">
                {dataHistory
                  .slice()
                  .reverse()
                  .slice(0, 20)
                  .map((data, index) => (
                    <tr key={`${data.timestamp}-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTime(data.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {data.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold">
                        {formatCurrency(data.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <span
                          className={
                            data.change >= 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          {formatCurrency(data.change)} ({formatPercent(data.changePercent)})
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                        {data.volume.toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <SkeletonTable rows={5} columns={5} />
        )}
      </div>

      {/* Debug Info */}
      {lastHeartbeat && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          Last heartbeat: {formatTime(lastHeartbeat)}
        </div>
      )}
    </div>
  );
}
