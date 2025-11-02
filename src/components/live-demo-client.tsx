"use client";

import { useEffect } from "react";
import { useDemoStream } from "@/hooks/use-demo-stream";

export function DemoStreamClient() {
  const { status } = useDemoStream();

  useEffect(() => {
    const root = document.body;
    if (status === "connected") {
      root.dataset.demoStatus = "connected";
    } else if (status === "paused") {
      root.dataset.demoStatus = "paused";
    } else {
      root.dataset.demoStatus = "error";
    }
  }, [status]);

  return null;
}
