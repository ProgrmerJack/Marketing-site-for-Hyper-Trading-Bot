/**
 * useSSE Hook
 * TypeScript-safe hook for consuming Server-Sent Events
 * 
 * Features:
 * - Automatic reconnection with exponential backoff
 * - Connection state management
 * - Event-specific callbacks
 * - Cleanup on unmount
 * - TypeScript type safety
 */

import { useEffect, useRef, useState, useCallback } from "react";

export type SSEConnectionState = "connecting" | "connected" | "disconnected" | "error";

export interface SSEOptions<T = unknown> {
  url: string;
  onMessage?: (data: T, event: MessageEvent) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  eventName?: string; // Specific event name to listen for (e.g., "price", "heartbeat")
}

export interface SSEState<T = unknown> {
  data: T | null;
  connectionState: SSEConnectionState;
  error: Error | null;
  reconnectAttempts: number;
}

export function useSSE<T = unknown>(options: SSEOptions<T>) {
  const {
    url,
    onMessage,
    onError,
    onOpen,
    onClose,
    reconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 10,
    eventName,
  } = options;

  const [state, setState] = useState<SSEState<T>>({
    data: null,
    connectionState: "disconnected",
    error: null,
    reconnectAttempts: 0,
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const connect = useCallback(() => {
    if (!isMountedRef.current || eventSourceRef.current) return;

    setState((prev) => ({ ...prev, connectionState: "connecting", error: null }));

    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      // Handle connection open
      eventSource.onopen = () => {
        if (!isMountedRef.current) return;
        setState((prev) => ({
          ...prev,
          connectionState: "connected",
          error: null,
          reconnectAttempts: 0,
        }));
        onOpen?.();
      };

      // Handle messages (default event)
      eventSource.onmessage = (event) => {
        if (!isMountedRef.current) return;
        try {
          const parsedData = JSON.parse(event.data) as T;
          setState((prev) => ({ ...prev, data: parsedData }));
          onMessage?.(parsedData, event);
        } catch (error) {
          console.error("Failed to parse SSE message:", error);
        }
      };

      // Handle specific event names if provided
      if (eventName) {
        eventSource.addEventListener(eventName, (event) => {
          if (!isMountedRef.current) return;
          try {
            const parsedData = JSON.parse((event as MessageEvent).data) as T;
            setState((prev) => ({ ...prev, data: parsedData }));
            onMessage?.(parsedData, event as MessageEvent);
          } catch (error) {
            console.error(`Failed to parse SSE event "${eventName}":`, error);
          }
        });
      }

      // Handle errors
      eventSource.onerror = (error) => {
        if (!isMountedRef.current) return;

        console.error("SSE connection error:", error);
        const errorObj = new Error("SSE connection failed");

        setState((prev) => ({
          ...prev,
          connectionState: "error",
          error: errorObj,
        }));

        onError?.(error);

        // Close the connection
        eventSource.close();
        eventSourceRef.current = null;

        // Attempt reconnection
        if (
          reconnect &&
          state.reconnectAttempts < maxReconnectAttempts &&
          isMountedRef.current
        ) {
          const delay = reconnectInterval * Math.pow(2, state.reconnectAttempts); // Exponential backoff
          reconnectTimeoutRef.current = setTimeout(() => {
            setState((prev) => ({
              ...prev,
              reconnectAttempts: prev.reconnectAttempts + 1,
            }));
            connect();
          }, delay);
        } else {
          setState((prev) => ({ ...prev, connectionState: "disconnected" }));
          onClose?.();
        }
      };
    } catch (error) {
      console.error("Failed to create EventSource:", error);
      setState((prev) => ({
        ...prev,
        connectionState: "error",
        error: error as Error,
      }));
    }
  }, [url, onMessage, onError, onOpen, onClose, reconnect, reconnectInterval, maxReconnectAttempts, eventName, state.reconnectAttempts]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setState((prev) => ({ ...prev, connectionState: "disconnected" }));
    onClose?.();
  }, [onClose]);

  // Connect on mount
  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    ...state,
    disconnect,
    reconnect: connect,
  };
}
