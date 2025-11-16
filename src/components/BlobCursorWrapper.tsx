"use client";

import { BlobCursor } from "@/components/BlobCursor";
import { useMotion } from "@/components/motion/MotionProvider";

export function BlobCursorWrapper() {
  const { cursorEnabled } = useMotion();

  if (!cursorEnabled) return null;

  return <BlobCursor size={48} color="rgba(59, 130, 246, 0.45)" blur={36} />;
}
