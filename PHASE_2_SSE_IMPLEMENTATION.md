# Phase 2: Real-Time SSE Implementation

## Overview

Phase 2 implements a production-ready Server-Sent Events (SSE) infrastructure for real-time market data streaming with TypeScript-safe event handling, automatic reconnection, and comprehensive connection management.

## Architecture

### Server-Side (Edge Runtime)

**File**: `src/app/api/stream/market-data/route.ts`

- **Edge Runtime**: Deployed globally for low-latency distribution
- **Event Types**: `price`, `volume`, `heartbeat`, `connected`, `error`
- **Heartbeat Mechanism**: 30-second interval to keep connections alive
- **CORS Support**: Cross-origin requests enabled
- **Automatic Cleanup**: Proper interval cleanup on connection close

#### SSE Response Format

```typescript
event: price
data: {"symbol":"AAPL","price":150.25,"change":2.50,...}
id: 1697472000000

event: heartbeat
data: {"timestamp":1697472030000}
id: 1697472030000
```

### Client-Side Hooks

#### 1. `useSSE` Hook (Generic SSE Consumer)

**File**: `src/hooks/useSSE.ts`

**Features**:
- ✅ TypeScript type safety with generics
- ✅ Automatic reconnection with exponential backoff
- ✅ Connection state management (`connecting`, `connected`, `disconnected`, `error`)
- ✅ Event-specific callbacks
- ✅ Cleanup on unmount
- ✅ Configurable reconnection attempts

**Usage**:
```typescript
const { data, connectionState, error, disconnect, reconnect } = useSSE<MyDataType>({
  url: "/api/stream/market-data",
  onMessage: (data) => console.log(data),
  onError: (error) => console.error(error),
  reconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 10,
  eventName: "price", // Optional: listen to specific events
});
```

#### 2. `useMarketData` Hook (Specialized Market Data Hook)

**File**: `src/hooks/useMarketData.ts`

**Features**:
- ✅ Market data type definitions
- ✅ Multiple event type handling (price, heartbeat, connected, error)
- ✅ Data history management with configurable max size
- ✅ Symbol filtering
- ✅ Real-time statistics calculation
- ✅ Event count tracking (debugging)

**Usage**:
```typescript
const {
  latestData,
  dataHistory,
  stats,
  isConnected,
  error,
  disconnect,
  reconnect,
  clearHistory,
  getSymbolData,
} = useMarketData({
  symbols: ["AAPL", "GOOGL"],
  maxHistory: 100,
  endpoint: "/api/stream/market-data",
});
```

### Demo Component

**File**: `src/components/market-data-demo.tsx`

**Features**:
- ✅ Real-time price updates with visual indicators
- ✅ Connection status badge (Wifi icons, connection state)
- ✅ Latest data card with bid/ask/volume
- ✅ Statistics dashboard (data points, average price, price range)
- ✅ Data history table (last 20 updates)
- ✅ Manual controls (disconnect, reconnect, clear history)
- ✅ Error handling with Alert component
- ✅ Loading states with Skeleton components
- ✅ Accessibility: ARIA labels, semantic HTML

## Key Features

### 1. Automatic Reconnection

The `useSSE` hook implements exponential backoff for reconnection attempts:

```typescript
// Initial delay: 3 seconds
// After 1st failure: 6 seconds
// After 2nd failure: 12 seconds
// After 3rd failure: 24 seconds
// ...up to maxReconnectAttempts (default: 10)
```

### 2. Connection State Management

Four distinct states tracked throughout the lifecycle:

| State | Description | UI Indicator |
|-------|-------------|--------------|
| `connecting` | Initial connection or reconnecting | Blue spinner |
| `connected` | Active SSE connection | Green Wifi icon |
| `disconnected` | Clean disconnect | Gray Wifi off icon |
| `error` | Connection error occurred | Red Wifi off icon |

### 3. Heartbeat Mechanism

**Server**: Sends heartbeat every 30 seconds to prevent connection timeout

**Client**: Tracks last heartbeat timestamp for monitoring

### 4. TypeScript Safety

All event data is strongly typed:

```typescript
interface MarketDataPoint {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  bid: number;
  ask: number;
  timestamp: number;
}
```

### 5. Edge Runtime Benefits

- **Global Distribution**: Deployed to Vercel Edge Network
- **Low Latency**: < 50ms to nearest edge location
- **Scalability**: Handles 1000s of concurrent connections
- **Cost Efficiency**: Pay per request, not per server

## Testing

### Manual Testing

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Navigate to Live Demo**:
   ```
   http://localhost:3000/live-demo
   ```

3. **Test Scenarios**:
   - ✅ Initial connection (should show "Connected" badge)
   - ✅ Price updates (should see live data every 1 second)
   - ✅ Heartbeat tracking (check debug info at bottom)
   - ✅ Manual disconnect (click "Disconnect" button)
   - ✅ Manual reconnect (click "Reconnect" button)
   - ✅ Clear history (click "Clear History" button)
   - ✅ Error handling (stop dev server, should attempt reconnection)

### SSE Endpoint Testing

**Using curl**:
```bash
curl -N -H "Accept: text/event-stream" http://localhost:3000/api/stream/market-data
```

**Expected Output**:
```
event: connected
data: {"message":"Connected to market data stream","timestamp":1697472000000}
id: 1697472000000

event: price
data: {"symbol":"AAPL","price":152.30,"change":1.20,...}
id: 1697472001000

event: price
data: {"symbol":"GOOGL","price":139.50,"change":-0.80,...}
id: 1697472002000
```

## Production Considerations

### 1. Data Source Integration

Replace mock data generator with actual market data API:

```typescript
// Example: Alpaca API integration
async function fetchRealMarketData(symbol: string) {
  const response = await fetch(
    `https://data.alpaca.markets/v2/stocks/${symbol}/quotes/latest`,
    {
      headers: {
        'APCA-API-KEY-ID': process.env.ALPACA_API_KEY!,
        'APCA-API-SECRET-KEY': process.env.ALPACA_SECRET_KEY!,
      },
    }
  );
  return response.json();
}
```

### 2. Authentication

Add API key or JWT token validation:

```typescript
export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }
  // ... rest of implementation
}
```

### 3. Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});
```

### 4. Monitoring

Add metrics for observability:

```typescript
// Track active connections
let activeConnections = 0;

// Track events sent
let eventsSent = 0;

// Log to monitoring service
console.log({
  metric: 'sse_connection',
  activeConnections,
  eventsSent,
  timestamp: Date.now(),
});
```

### 5. Error Recovery

Implement graceful degradation:

```typescript
// Fallback to polling if SSE not supported
if (!window.EventSource) {
  // Use polling mechanism
  setInterval(() => {
    fetch('/api/market-data').then(/* ... */);
  }, 5000);
}
```

## Performance Metrics

### Expected Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Connection Time | < 100ms | Time to receive "connected" event |
| Event Latency | < 50ms | Time from server send to client receive |
| Reconnection Time | < 5s | Time to re-establish after disconnect |
| Memory Usage | < 10MB | Client-side memory for 100 data points |
| Concurrent Users | 10,000+ | Edge runtime scalability |

## Troubleshooting

### Issue: Connection keeps dropping

**Causes**:
1. Proxy/firewall blocking SSE
2. Nginx buffering enabled
3. Cloudflare buffering

**Solutions**:
- Add `X-Accel-Buffering: no` header ✅ (already implemented)
- Configure Cloudflare to disable buffering for `/api/stream/*`
- Use WebSocket as fallback

### Issue: Events arriving out of order

**Causes**:
1. Multiple network paths
2. Edge runtime caching issues

**Solutions**:
- Use event IDs for ordering (timestamps) ✅ (already implemented)
- Implement client-side event buffer
- Add sequence numbers

### Issue: High memory usage

**Causes**:
1. Storing too much history
2. Memory leaks in event listeners

**Solutions**:
- Limit history size with `maxHistory` option ✅ (already implemented)
- Properly cleanup event listeners ✅ (already implemented)
- Use virtual scrolling for large tables

## Next Steps

### Phase 3: Advanced Visualizations
- Integrate D3.js for custom charts
- Add TradingView-style candlestick charts
- Implement technical indicators (RSI, MACD, etc.)
- Add zoom/pan controls
- Mobile-optimized touch gestures

## Resources

- [Server-Sent Events Specification](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [EventSource MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
- [Vercel Edge Runtime](https://vercel.com/docs/functions/edge-functions)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## Checklist

- [x] SSE endpoint with Edge runtime
- [x] TypeScript-safe event handling
- [x] Automatic reconnection with exponential backoff
- [x] Connection state management
- [x] Heartbeat mechanism
- [x] CORS support
- [x] Generic `useSSE` hook
- [x] Specialized `useMarketData` hook
- [x] Demo component with live visualization
- [x] Error handling and recovery
- [x] Build verification
- [ ] Integration with real market data API (production)
- [ ] Authentication and rate limiting (production)
- [ ] Monitoring and observability (production)

## License

MIT License - See LICENSE file for details
