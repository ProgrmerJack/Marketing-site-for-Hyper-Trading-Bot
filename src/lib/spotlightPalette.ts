/* Spotlight palette helper - return rgba color string used for subtle spotlight/gradient tints.
 * This is an intentionally small utility to centralize color mapping used by RippleButton and other components.
 */
export default function getSpotlightColor(name: string, alpha = 1) {
  const map: Record<string, [number, number, number]> = {
    blue: [59, 130, 246],
    cyan: [6, 182, 212],
    emerald: [16, 185, 129],
    orange: [251, 146, 60],
    purple: [168, 85, 247],
    pink: [236, 72, 153],
  };

  const rgb = map[name] ?? map.blue;
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Number(alpha)})`;
}
