"use client";

import { Reorder } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useState } from "react";

interface DragToReorderProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

/**
 * DragToReorder - Drag-and-drop reorderable list
 * @param items - Array of items to render
 * @param onReorder - Callback when order changes
 * @param renderItem - Function to render each item
 */
export function DragToReorder<T extends { id: string | number }>({
  items,
  onReorder,
  renderItem,
  className = "",
}: DragToReorderProps<T>) {
  const shouldReduce = useReducedMotion();
  const [draggingId, setDraggingId] = useState<string | number | null>(null);

  if (shouldReduce) {
    return (
      <div className={className}>
        {items.map((item, index) => (
          <div key={item.id}>{renderItem(item, index)}</div>
        ))}
      </div>
    );
  }

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className={className}
    >
      {items.map((item, index) => (
        <Reorder.Item
          key={item.id}
          value={item}
          onDragStart={() => setDraggingId(item.id)}
          onDragEnd={() => setDraggingId(null)}
          style={{
            cursor: draggingId === item.id ? "grabbing" : "grab",
          }}
          whileDrag={{
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {renderItem(item, index)}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
