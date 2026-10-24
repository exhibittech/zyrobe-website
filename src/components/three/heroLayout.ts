// Art-directed positions for the hero garments.
// Scatter: x/y are fractions of the visible width/height at z = 0 (kept on screen at any depth),
// z is depth, r is roll in degrees, s is size. Grid: column/row in the sorted wardrobe.

export type Piece = {
  src: string;
  x: number;
  y: number;
  z: number;
  r: number;
  s: number;
  col: number;
  row: number;
};

const g = (id: string) => `/media/garments/${id}.webp`;

// Desktop: 16 pieces ringed around the headline; sorted into tops over bottoms, 8 x 2.
export const DESKTOP: Piece[] = [
  // top band
  { src: g("c06"), x: -0.42, y: 0.31, z: 0.8, r: -12, s: 1.05, col: 1, row: 0 },
  { src: g("c00"), x: -0.25, y: 0.35, z: -2.2, r: 8, s: 0.9, col: 0, row: 0 },
  { src: g("c09"), x: -0.08, y: 0.33, z: -3.6, r: -5, s: 0.8, col: 2, row: 0 },
  { src: g("c11"), x: 0.09, y: 0.35, z: -2.8, r: 6, s: 0.82, col: 6, row: 0 },
  { src: g("c01"), x: 0.25, y: 0.34, z: -1.4, r: 10, s: 0.95, col: 3, row: 0 },
  { src: g("c13"), x: 0.42, y: 0.3, z: 1.0, r: -9, s: 1.05, col: 4, row: 0 },
  // sides
  { src: g("c15"), x: -0.45, y: 0.05, z: -1.2, r: 6, s: 1.0, col: 1, row: 1 },
  { src: g("c19"), x: -0.42, y: -0.18, z: -3.4, r: -14, s: 0.8, col: 5, row: 1 },
  { src: g("c16"), x: 0.45, y: 0.06, z: -1.6, r: 7, s: 0.95, col: 3, row: 1 },
  { src: g("c20"), x: 0.43, y: -0.16, z: -3.4, r: 12, s: 0.8, col: 4, row: 1 },
  // bottom band
  { src: g("c22"), x: -0.36, y: -0.36, z: 1.2, r: -6, s: 1.1, col: 7, row: 1 },
  { src: g("c12"), x: -0.19, y: -0.42, z: -2.6, r: 13, s: 0.85, col: 7, row: 0 },
  { src: g("c14"), x: -0.05, y: -0.37, z: -4.4, r: -6, s: 0.72, col: 0, row: 1 },
  { src: g("c17"), x: 0.13, y: -0.42, z: -2.2, r: -8, s: 0.9, col: 2, row: 1 },
  { src: g("c04"), x: 0.3, y: -0.35, z: 0.9, r: 11, s: 1.1, col: 5, row: 0 },
  { src: g("c21"), x: 0.46, y: -0.43, z: -2.8, r: -12, s: 0.85, col: 6, row: 1 },
];

// Mobile: 9 pieces in the bands above and below the headline; sorted 3 x 3.
export const MOBILE: Piece[] = [
  // above the headline
  { src: g("c06"), x: -0.34, y: 0.31, z: 0.6, r: -12, s: 1.0, col: 1, row: 0 },
  { src: g("c00"), x: -0.1, y: 0.35, z: -3.0, r: 8, s: 0.72, col: 0, row: 0 },
  { src: g("c09"), x: 0.12, y: 0.32, z: -1.8, r: 6, s: 0.85, col: 2, row: 0 },
  { src: g("c13"), x: 0.36, y: 0.3, z: 0.9, r: 10, s: 1.0, col: 0, row: 1 },
  // below the buttons
  { src: g("c15"), x: -0.36, y: -0.37, z: 0.8, r: 9, s: 1.05, col: 0, row: 2 },
  { src: g("c12"), x: -0.12, y: -0.42, z: -3.2, r: 7, s: 0.72, col: 2, row: 1 },
  { src: g("c22"), x: 0.06, y: -0.38, z: -1.6, r: -5, s: 0.9, col: 2, row: 2 },
  { src: g("c04"), x: 0.21, y: -0.43, z: -3.4, r: -9, s: 0.7, col: 1, row: 1 },
  { src: g("c16"), x: 0.38, y: -0.36, z: 0.4, r: -10, s: 1.0, col: 1, row: 2 },
];

export const GRID = {
  desktop: { cols: 8, rows: 2, width: 0.82, maxHeight: 0.5, lift: 0.03 },
  mobile: { cols: 3, rows: 3, width: 0.84, maxHeight: 0.52, lift: 0.035 },
};

/** Garment size at s = 1, as a fraction of the visible height. */
export const BASE_HEIGHT = { desktop: 0.2, mobile: 0.135 };
