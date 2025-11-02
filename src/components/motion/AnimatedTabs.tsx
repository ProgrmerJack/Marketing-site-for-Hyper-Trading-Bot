"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useState, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

/**
 * AnimatedTabs - Smooth tab transitions with animated indicator
 * @param tabs - Array of tab objects with id, label, and content
 * @param defaultTab - Initially active tab ID
 * @param onChange - Callback when tab changes
 */
export function AnimatedTabs({
  tabs,
  defaultTab,
  onChange,
  className = "",
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const shouldReduce = useReducedMotion();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="relative border-b border-white/10">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-4 py-3 font-semibold transition-colors ${
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Animated Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
          initial={false}
          animate={{
            x: activeIndex * (100 / tabs.length) + "%",
            width: 100 / tabs.length + "%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: shouldReduce ? 0.01 : 0.3,
          }}
        />
      </div>

      {/* Tab Content */}
      <div className="relative mt-6">
        <motion.div
          key={activeTab}
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{
            duration: shouldReduce ? 0.01 : 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {activeTabContent}
        </motion.div>
      </div>
    </div>
  );
}
