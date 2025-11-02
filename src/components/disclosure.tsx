"use client";

/**
 * FTC-Compliant Disclosure Component
 * "Clear and Conspicuous" placement near benefit claims
 * 
 * FTC Guidelines:
 * - Close proximity to claim
 * - Similar prominence (size, color contrast)
 * - Unavoidable (not hidden in footnotes)
 * - Not contradicted by other content
 */

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, ShieldAlert } from "lucide-react";

interface DisclosureProps {
  type: "risk" | "performance" | "general";
  inline?: boolean;
  className?: string;
}

const disclosures = {
  risk: {
    icon: ShieldAlert,
    title: "Risk Disclosure",
    content: [
      "Trading involves substantial risk of loss and is not suitable for all investors.",
      "Past performance is not indicative of future results.",
      "Automated trading systems carry additional risks including system failures and programming errors.",
      "You should carefully consider whether trading is appropriate for you in light of your experience, objectives, financial resources, and circumstances.",
    ],
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
  performance: {
    icon: TrendingDown,
    title: "Performance Disclaimer",
    content: [
      "Results shown are simulated or hypothetical. Actual results may vary significantly.",
      "No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.",
      "Fees, slippage, and market conditions will affect actual trading results.",
    ],
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  general: {
    icon: AlertCircle,
    title: "Important Notice",
    content: [
      "This is not financial advice. You should consult with a qualified financial advisor.",
      "Information provided is for educational purposes only.",
    ],
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
};

export function Disclosure({ type, inline = false, className = "" }: DisclosureProps) {
  const config = disclosures[type];
  const Icon = config.icon;

  if (inline) {
    // Inline disclosure - appears immediately after claim
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`inline-flex items-start gap-2 text-sm ${config.color} mt-2 ${className}`}
      >
        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span className="leading-relaxed">{config.content[0]}</span>
      </motion.div>
    );
  }

  // Block disclosure - more detailed, appears near claims
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 ${className}`}
      role="note"
      aria-label={config.title}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className={`font-semibold text-base mb-3 ${config.color}`}>
            {config.title}
          </h4>
          <ul className="space-y-2">
            {config.content.map((item, idx) => (
              <li key={idx} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * SEC Marketing Rule Disclosure
 * Required for investment adviser marketing
 */
export function SECDisclosure({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-xs text-gray-600 dark:text-gray-400 leading-relaxed ${className}`}
    >
      <p className="font-medium mb-2">SEC Marketing Rule Disclosure:</p>
      <p className="mb-2">
        Hyper Trading Automation is an automated trading system. Performance results are hypothetical 
        and have inherent limitations. No representation is made that any account will achieve results 
        similar to those shown. Past performance is not indicative of future results.
      </p>
      <p className="mb-2">
        Simulated results do not represent actual trading and may not reflect material economic and 
        market factors such as liquidity constraints, that may have affected actual decision-making. 
        These results are achieved through retroactive application of a model designed with benefit of hindsight.
      </p>
      <p>
        Trading involves risk. You should carefully consider your financial situation and risk tolerance 
        before using automated trading systems. See our full{" "}
        <a href="/legal/risk-disclosure" className="underline hover:text-blue-600">
          Risk Disclosure Statement
        </a>.
      </p>
    </motion.div>
  );
}

/**
 * CFTC Hypothetical Performance Disclosure
 * Required for commodity trading advisors
 */
export function CFTCDisclosure({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 ${className}`}
    >
      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium mb-2">
        CFTC RULE 4.41 – HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN LIMITATIONS.
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. 
        ALSO, SINCE THE TRADES HAVE NOT BEEN EXECUTED, THE RESULTS MAY HAVE UNDER-OR-OVER COMPENSATED 
        FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY. SIMULATED TRADING 
        PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. 
        NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFIT OR LOSSES 
        SIMILAR TO THOSE SHOWN.
      </p>
    </motion.div>
  );
}
