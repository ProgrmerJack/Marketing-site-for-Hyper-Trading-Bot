"use client";

import React from "react";

interface ColorIconProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient?: string; // tailwind gradient classes e.g., "from-indigo-500 to-pink-500"
  wrapperClass?: string; // extra wrapper classes
  iconClass?: string; // extra icon classes
  shadowColor?: string; // e.g., 'rgba(99,102,241,0.18)'
  size?: string; // wrapper size classes, default h-14 w-14
}

export const ColorIcon: React.FC<ColorIconProps> = ({ Icon, gradient = "from-indigo-500 to-pink-500", wrapperClass = "", iconClass = "", shadowColor, size = "h-14 w-14" }) => {
  const style: React.CSSProperties | undefined = shadowColor
    ? ({ boxShadow: `0 18px 40px ${shadowColor}` } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={`flex ${size} items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${wrapperClass}`}
      style={style}
    >
      <Icon className={`h-7 w-7 text-white drop-shadow-md ${iconClass}`} />
    </div>
  );
};

export default ColorIcon;
