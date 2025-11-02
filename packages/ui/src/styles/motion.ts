export const motionTokens = {
  duration: {
    snappy: 0.12,
    standard: 0.22,
    emphasized: 0.32,
  },
  ease: {
    standard: [0.32, 0.72, 0, 1] as [number, number, number, number],
    emphasized: [0.24, 0.94, 0.2, 1] as [number, number, number, number],
  },
};

export type MotionTokenName = keyof typeof motionTokens.duration;
