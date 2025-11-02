"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * AnimatedAccordion - Smooth accordion with expand/collapse
 * @param title - Accordion header text
 * @param children - Content to show when expanded
 * @param defaultOpen - Whether to start expanded
 */
export function AnimatedAccordion({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const shouldReduce = useReducedMotion();

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left hover:text-blue-400 transition-colors"
      >
        <span className="font-semibold text-lg">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            duration: shouldReduce ? 0.01 : 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduce ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduce ? { height: "auto" } : { height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: shouldReduce ? 0.01 : 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              },
              opacity: {
                duration: shouldReduce ? 0.01 : 0.2,
                ease: "easeInOut",
              },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-4 text-gray-400">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionGroupProps {
  items: Array<{
    id: string;
    title: string;
    content: ReactNode;
  }>;
  allowMultiple?: boolean;
  className?: string;
}

/**
 * AccordionGroup - Multiple accordions with single/multiple open control
 */
export function AccordionGroup({
  items,
  allowMultiple = false,
  className = "",
}: AccordionGroupProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(id);
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.id} className="border-b border-white/10">
          <button
            onClick={() => toggleItem(item.id)}
            className="flex w-full items-center justify-between py-4 text-left hover:text-blue-400 transition-colors"
          >
            <span className="font-semibold text-lg">{item.title}</span>
            <motion.div
              animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openItems.has(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 0.2, ease: "easeInOut" },
                }}
                style={{ overflow: "hidden" }}
              >
                <div className="pb-4 text-gray-400">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
