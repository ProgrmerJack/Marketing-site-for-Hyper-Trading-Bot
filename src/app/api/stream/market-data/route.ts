/**
 * Market Data Stream Endpoint
 * Server-Sent Events (SSE) implementation for real-time market data
 * 
 * Features:
 * - Edge runtime for global low-latency distribution
 * - Heartbeat mechanism to keep connections alive
 * - TypeScript-safe event handling
 * - Automatic connection cleanup
 * - CORS support for cross-origin requests
 */

import { NextRequest } from "next/server";

export const runtime = "edge";

// SSE event types
type MarketDataEvent = {
  type: "price" | "volume" | "heartbeat" | "connected" | "error";
  data: unknown;
  timestamp: number;
};

// Mock market data generator (replace with actual data source in production)
function generateMockMarketData() {
  const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  
  return {
    symbol,
    price: 100 + Math.random() * 400,
    change: (Math.random() - 0.5) * 10,
    changePercent: (Math.random() - 0.5) * 5,
    volume: Math.floor(Math.random() * 10000000),
    bid: 100 + Math.random() * 400,
    ask: 100 + Math.random() * 400,
    timestamp: Date.now(),
  };
}

// Format SSE message
function formatSSEMessage(event: MarketDataEvent): string {
  return `event: ${event.type}\ndata: ${JSON.stringify(event.data)}\nid: ${event.timestamp}\n\n`;
}

export async function GET(request: NextRequest) {
  // Check for SSE support
  const accept = request.headers.get("accept");
  if (!accept?.includes("text/event-stream")) {
    return new Response(
      JSON.stringify({ error: "This endpoint requires SSE support (Accept: text/event-stream)" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Create readable stream for SSE
  const encoder = new TextEncoder();
  let intervalId: NodeJS.Timeout | number | null = null;
  let heartbeatId: NodeJS.Timeout | number | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      const connectedEvent: MarketDataEvent = {
        type: "connected",
        data: { message: "Connected to market data stream", timestamp: Date.now() },
        timestamp: Date.now(),
      };
      controller.enqueue(encoder.encode(formatSSEMessage(connectedEvent)));

      // Send market data updates every 1 second
      intervalId = setInterval(() => {
        try {
          const marketData = generateMockMarketData();
          const priceEvent: MarketDataEvent = {
            type: "price",
            data: marketData,
            timestamp: Date.now(),
          };
          controller.enqueue(encoder.encode(formatSSEMessage(priceEvent)));
        } catch (error) {
          console.error("Error generating market data:", error);
          const errorEvent: MarketDataEvent = {
            type: "error",
            data: { error: "Failed to generate market data" },
            timestamp: Date.now(),
          };
          controller.enqueue(encoder.encode(formatSSEMessage(errorEvent)));
        }
      }, 1000);

      // Send heartbeat every 30 seconds to keep connection alive
      heartbeatId = setInterval(() => {
        try {
          const heartbeatEvent: MarketDataEvent = {
            type: "heartbeat",
            data: { timestamp: Date.now() },
            timestamp: Date.now(),
          };
          controller.enqueue(encoder.encode(formatSSEMessage(heartbeatEvent)));
        } catch (error) {
          console.error("Error sending heartbeat:", error);
        }
      }, 30000);
    },

    cancel() {
      // Clean up intervals when connection is closed
      if (intervalId) {
        clearInterval(intervalId as number);
        intervalId = null;
      }
      if (heartbeatId) {
        clearInterval(heartbeatId as number);
        heartbeatId = null;
      }
      console.log("SSE connection closed by client");
    },
  });

  // Return SSE response with appropriate headers
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no", // Disable nginx buffering
      // CORS headers for cross-origin requests
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Handle CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
