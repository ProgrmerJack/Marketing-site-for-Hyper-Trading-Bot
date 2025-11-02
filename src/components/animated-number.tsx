import { CountUp } from "@/components/motion/CountUp";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1.2,
  className,
  prefix,
  suffix,
}: AnimatedNumberProps) {
  return (
    <CountUp
      value={value}
      decimals={decimals}
      duration={duration}
      className={className}
      prefix={prefix}
      suffix={suffix}
    />
  );
}
