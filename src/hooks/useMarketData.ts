/**
 * useMarketData Hook
 * Specialized hook for consuming real-time market data via SSE
 * 
 * Features:
 * - Type-safe market data
 * - Multiple event type handling (price, volume, heartbeat)
 * - Connection status tracking
 * - Automatic reconnection
 * - Symbol filtering
 */

import { useState, useCallback, useEffect } from "react";
import { useSSE } from "./useSSE";

export interface MarketDataPoint {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  bid: number;
  ask: number;
  timestamp: number;
}

export interface MarketDataState {
  latestData: MarketDataPoint | null;
  dataHistory: MarketDataPoint[];
  isConnected: boolean;
  error: Error | null;
  lastHeartbeat: number | null;
}

export interface UseMarketDataOptions {
  symbols?: string[]; // Filter by specific symbols
  maxHistory?: number; // Maximum number of historical data points to keep
  endpoint?: string; // Custom SSE endpoint
}

export function useMarketData(options: UseMarketDataOptions = {}) {
  const {
    symbols,
    maxHistory = 100,
    endpoint = "/api/stream/market-data",
  } = options;

  const [marketState, setMarketState] = useState<MarketDataState>({
    latestData: null,
    dataHistory: [],
    isConnected: false,
    error: null,
    lastHeartbeat: null,
  });

  const [eventCounts, setEventCounts] = useState({
    price: 0,
    heartbeat: 0,
    connected: 0,
    error: 0,
  });

  // Handle price updates
  const handlePriceUpdate = useCallback(
    (data: MarketDataPoint) => {
      // Filter by symbols if specified
      if (symbols && !symbols.includes(data.symbol)) {
        return;
      }

      setMarketState((prev) => {
        const newHistory = [...prev.dataHistory, data].slice(-maxHistory);
        return {
          ...prev,
          latestData: data,
          dataHistory: newHistory,
        };
      });

      setEventCounts((prev) => ({ ...prev, price: prev.price + 1 }));
    },
    [symbols, maxHistory]
  );

  // Handle heartbeat
  const handleHeartbeat = useCallback((data: { timestamp: number }) => {
    setMarketState((prev) => ({
      ...prev,
      lastHeartbeat: data.timestamp,
    }));
    setEventCounts((prev) => ({ ...prev, heartbeat: prev.heartbeat + 1 }));
  }, []);

  // Handle connection
  const handleConnected = useCallback(() => {
    setMarketState((prev) => ({ ...prev, isConnected: true, error: null }));
    setEventCounts((prev) => ({ ...prev, connected: prev.connected + 1 }));
  }, []);

  // Handle error
  const handleError = useCallback(() => {
    const errorObj = new Error("Market data stream error");
    setMarketState((prev) => ({
      ...prev,
      isConnected: false,
      error: errorObj,
    }));
    setEventCounts((prev) => ({ ...prev, error: prev.error + 1 }));
  }, []);

  // Create SSE connection
  const { connectionState, reconnectAttempts, disconnect, reconnect } = useSSE({
    url: endpoint,
    reconnect: true,
    reconnectInterval: 3000,
    maxReconnectAttempts: 10,
    onOpen: handleConnected,
    onError: handleError,
  });

  // Listen to specific event types using EventSource API directly
  useEffect(() => {
    const eventSource = new EventSource(endpoint);

    // Listen for price events
    eventSource.addEventListener("price", (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data) as MarketDataPoint;
        handlePriceUpdate(data);
      } catch (error) {
        console.error("Failed to parse price event:", error);
      }
    });

    // Listen for heartbeat events
    eventSource.addEventListener("heartbeat", (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data) as { timestamp: number };
        handleHeartbeat(data);
      } catch (error) {
        console.error("Failed to parse heartbeat event:", error);
      }
    });

    // Listen for connected events
    eventSource.addEventListener("connected", () => {
      handleConnected();
    });

    // Listen for error events
    eventSource.addEventListener("error", (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);
        console.error("Server error:", data);
      } catch (error) {
        console.error("Failed to parse error event:", error);
      }
    });

    eventSource.onerror = handleError;

    return () => {
      eventSource.close();
    };
  }, [endpoint, handlePriceUpdate, handleHeartbeat, handleConnected, handleError]);

  // Calculate statistics
  const stats = {
    totalDataPoints: marketState.dataHistory.length,
    averagePrice:
      marketState.dataHistory.length > 0
        ? marketState.dataHistory.reduce((sum, d) => sum + d.price, 0) /
          marketState.dataHistory.length
        : 0,
    priceRange:
      marketState.dataHistory.length > 0
        ? {
            min: Math.min(...marketState.dataHistory.map((d) => d.price)),
            max: Math.max(...marketState.dataHistory.map((d) => d.price)),
          }
        : { min: 0, max: 0 },
  };

  return {
    // Data
    latestData: marketState.latestData,
    dataHistory: marketState.dataHistory,
    stats,

    // Connection state
    isConnected: marketState.isConnected,
    connectionState,
    reconnectAttempts,
    error: marketState.error,
    lastHeartbeat: marketState.lastHeartbeat,

    // Event counts (useful for debugging)
    eventCounts,

    // Controls
    disconnect,
    reconnect,

    // Helpers
    clearHistory: useCallback(() => {
      setMarketState((prev) => ({
        ...prev,
        dataHistory: [],
      }));
    }, []),

    getSymbolData: useCallback(
      (symbol: string) => {
        return marketState.dataHistory.filter((d) => d.symbol === symbol);
      },
      [marketState.dataHistory]
    ),
  };
}
