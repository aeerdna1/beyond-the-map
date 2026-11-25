import { MAP_SIZE } from '../data/visited';

// Shapes shown while the globe or the map (and their data) are downloading, with the same size as
// the real thing so the page does not jump. In their own file, so pages can show them without
// pulling the globe and map code into the page download.

/** Same gradient and glow as the globe, which draws on top of it. */
export const GLOBE_FRAME =
  'aspect-square w-full rounded-full bg-gradient-to-br from-cream to-amber-soft shadow-[0_0_90px_-10px_rgba(255,179,0,0.55)]';

export function GlobePlaceholder() {
  return <div className={GLOBE_FRAME} />;
}

export function MapPlaceholder() {
  return (
    <div
      className="w-full animate-pulse rounded-xl bg-plum/5"
      style={{ aspectRatio: `${MAP_SIZE.width} / ${MAP_SIZE.height}` }}
    />
  );
}
