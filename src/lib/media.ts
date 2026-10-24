import media from "./media.json";

type Entry = { w: number; h: number };
const table = media as Record<string, Entry | { frames: number; fps: number; seconds: number }>;

/** Intrinsic size of an optimized image in public/media (from scripts/build-assets.py). */
export function size(src: string): Entry {
  const e = table[src];
  if (!e || !("w" in e)) throw new Error(`Unknown media: ${src} (run scripts/build-assets.py?)`);
  return e;
}

export const m = (path: string) => `/media/${path}`;
