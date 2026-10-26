// Art-directed hero garments: where each piece floats around the headline.
//
// Scatter: x/y are fractions of the visible width/height at z = 0 (kept on screen at any depth),
// z is depth, r is roll in degrees, s is size.

export type Float = { x: number; y: number; z: number; r: number; s: number };

export const garment = (id: string) => `/media/garments/${id}.webp`;

// Desktop: 16 pieces ringed around the headline.
export const DESKTOP_SCATTER: Record<string, Float> = {
  // top band
  c06: { x: -0.42, y: 0.31, z: 0.8, r: -12, s: 1.05 },
  c00: { x: -0.25, y: 0.35, z: -2.2, r: 8, s: 0.9 },
  c09: { x: -0.08, y: 0.33, z: -3.6, r: -5, s: 0.8 },
  c11: { x: 0.09, y: 0.35, z: -2.8, r: 6, s: 0.82 },
  c01: { x: 0.25, y: 0.34, z: -1.4, r: 10, s: 0.95 },
  c13: { x: 0.42, y: 0.3, z: 1.0, r: -9, s: 1.05 },
  // sides
  c15: { x: -0.45, y: 0.05, z: -1.2, r: 6, s: 1.0 },
  c19: { x: -0.42, y: -0.18, z: -3.4, r: -14, s: 0.8 },
  c16: { x: 0.45, y: 0.06, z: -1.6, r: 7, s: 0.95 },
  c20: { x: 0.43, y: -0.16, z: -3.4, r: 12, s: 0.8 },
  // bottom band
  c22: { x: -0.36, y: -0.36, z: 1.2, r: -6, s: 1.1 },
  c12: { x: -0.19, y: -0.42, z: -2.6, r: 13, s: 0.85 },
  c14: { x: -0.05, y: -0.37, z: -4.4, r: -6, s: 0.72 },
  c17: { x: 0.13, y: -0.42, z: -2.2, r: -8, s: 0.9 },
  c04: { x: 0.3, y: -0.35, z: 0.9, r: 11, s: 1.1 },
  c21: { x: 0.46, y: -0.43, z: -2.8, r: -12, s: 0.85 },
};

// Mobile: nine pieces in the bands above and below the headline.
export const MOBILE_SCATTER: Record<string, Float> = {
  c06: { x: -0.34, y: 0.31, z: 0.6, r: -12, s: 1.0 },
  c00: { x: -0.1, y: 0.35, z: -3.0, r: 8, s: 0.72 },
  c09: { x: 0.12, y: 0.32, z: -1.8, r: 6, s: 0.85 },
  c13: { x: 0.36, y: 0.3, z: 0.9, r: 10, s: 1.0 },
  c15: { x: -0.36, y: -0.37, z: 0.8, r: 9, s: 1.05 },
  c12: { x: -0.12, y: -0.42, z: -3.2, r: 7, s: 0.72 },
  c22: { x: 0.06, y: -0.38, z: -1.6, r: -5, s: 0.9 },
  c04: { x: 0.21, y: -0.43, z: -3.4, r: -9, s: 0.7 },
  c16: { x: 0.38, y: -0.36, z: 0.4, r: -10, s: 1.0 },
};

/** Garment size at s = 1 while floating, as a fraction of the visible height. */
export const BASE_HEIGHT = { desktop: 0.2, mobile: 0.135 };
