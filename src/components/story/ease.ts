// Easing + interpolation helpers ported from the launch film's engine (film4_engine.part),
// so the web choreography matches the film's timing curves.

export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
/** Progress of t through [a, b], clamped to 0..1. */
export const P = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
export const L = (a: number, b: number, t: number) => a + (b - a) * t;

export const E = {
  out2: (t: number) => 1 - (1 - t) ** 2,
  out3: (t: number) => 1 - (1 - t) ** 3,
  out4: (t: number) => 1 - (1 - t) ** 4,
  in3: (t: number) => t ** 3,
  in4: (t: number) => t ** 4,
  io2: (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  io3: (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  outBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
  },
};
