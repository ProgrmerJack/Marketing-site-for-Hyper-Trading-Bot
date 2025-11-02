import { useEffect, useRef } from "react";
import { useDemoStore, type DemoEnvelope, type CandlePoint } from "@/stores/demo-store";

const HEARTBEAT_TIMEOUT_MS = 12_000;
const BASE_RETRY_DELAY_MS = 5_000;
const MAX_RETRY_DELAY_MS = 30_000;

export function useDemoStream() {
  const setStatus = useDemoStore((state) => state.setStatus);
  const pushCandle = useDemoStore((state) => state.pushCandle);
  const hydrateCandles = useDemoStore((state) => state.hydrateCandles);
  const setLatency = useDemoStore((state) => state.setLatency);
  const setLastEventId = useDemoStore((state) => state.setLastEventId);
  const status = useDemoStore((state) => state.status);
  const lastEventId = useDemoStore((state) => state.lastEventId);

  const eventSourceRef = useRef<EventSource | null>(null);
  const heartbeatTimeout = useRef<number | null>(null);
  const reconnectTimeout = useRef<number | null>(null);
  const retryDelayRef = useRef(BASE_RETRY_DELAY_MS);
  const historyLoadedRef = useRef(false);

  useEffect(() => {
    connect();
    return () => {
      teardown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (historyLoadedRef.current) {
      return;
    }
    historyLoadedRef.current = true;
    let cancelled = false;

    async function loadHistory() {
      try {
        const response = await fetch("/api/demo-stream/history?count=480", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`History request failed with ${response.status}`);
        }
        const payload: { candles: CandlePoint[] } = await response.json();
        if (!cancelled) {
          hydrateCandles(payload.candles);
        }
      } catch (error) {
        console.error("Failed to hydrate demo history", error);
      }
    }

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, [hydrateCandles]);

  function connect(delay = 0) {
    if (delay > 0) {
      reconnectTimeout.current = window.setTimeout(() => {
        reconnectTimeout.current = null;
        initEventSource();
      }, delay);
      return;
    }
    initEventSource();
  }

  function initEventSource() {
    cleanupEventSource();
    const url = new URL("/api/demo-stream", window.location.origin);
    const cursor = useDemoStore.getState().lastEventId;
    if (cursor) {
      url.searchParams.set("cursor", cursor);
    }
    const source = new EventSource(url.toString());
    eventSourceRef.current = source;

    source.onopen = () => {
      retryDelayRef.current = BASE_RETRY_DELAY_MS;
      setStatus("connected");
      scheduleHeartbeat();
    };

    source.onerror = () => {
      setStatus("error");
      scheduleReconnect();
    };

    source.addEventListener("price.candles", (raw) => {
      const event = raw as MessageEvent<string>;
      const parsed: DemoEnvelope<CandlePoint> = JSON.parse(event.data);
      pushCandle(parsed);
      const eventId = event.lastEventId || String(parsed.ts);
      setLastEventId(eventId);

      const latency = Date.now() - parsed.ts;
      if (latency >= 0) {
        setLatency(latency);
      }
      scheduleHeartbeat();
    });

    source.addEventListener("ready", () => {
      setStatus("connected");
      scheduleHeartbeat();
    });
  }

  function scheduleReconnect() {
    cleanupEventSource();
    if (reconnectTimeout.current) {
      return;
    }
    setStatus("paused");
    const delay = retryDelayRef.current;
    reconnectTimeout.current = window.setTimeout(() => {
      reconnectTimeout.current = null;
      connect();
    }, delay);
    retryDelayRef.current = Math.min(delay * 2, MAX_RETRY_DELAY_MS);
  }

  function scheduleHeartbeat() {
    if (heartbeatTimeout.current) {
      clearTimeout(heartbeatTimeout.current);
    }
    heartbeatTimeout.current = window.setTimeout(() => {
      scheduleReconnect();
    }, HEARTBEAT_TIMEOUT_MS);
  }

  function cleanupEventSource() {
    if (heartbeatTimeout.current) {
      clearTimeout(heartbeatTimeout.current);
      heartbeatTimeout.current = null;
    }
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
  }

  function teardown() {
    cleanupEventSource();
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  }

  return { status, lastEventId };
}
