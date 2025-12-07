export function accentToShadowColor(accent: string | undefined) {
  switch (accent) {
    case "cyan":
      return "rgba(34,211,238,0.14)";
    case "blue":
      return "rgba(59,130,246,0.14)";
    case "emerald":
      return "rgba(16,185,129,0.14)";
    case "orange":
      return "rgba(249,115,22,0.14)";
    case "purple":
      return "rgba(139,92,246,0.14)";
    case "rose":
      return "rgba(236,72,153,0.14)";
    case "amber":
      return "rgba(245,158,11,0.14)";
    default:
      return "rgba(0,0,0,0.08)";
  }
}
