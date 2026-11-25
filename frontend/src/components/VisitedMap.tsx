import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import { loadWorld, type World } from '../lib/world';
import { MAP_SIZE, VISITED_COUNTRIES, flag, type MapView, type VisitedCountry } from '../data/visited';
import { MapPlaceholder } from './GeoPlaceholders';

// Interactive world map for the About page: visited countries are coloured, hovering (or
// tapping) one shows its name, and the view can zoom to a single continent. Loaded on demand
// (React.lazy) together with the map data, so the About page itself stays small.

/** ISO numeric code of Antarctica, left out so the map is not mostly ice. */
const ANTARCTICA = '010';
/** Countries smaller than this (square SVG units) also get a dot, so they can be seen and hovered. */
const SMALL_AREA = 40;
/** Minimum width of a zoomed view in SVG units, so a continent with few countries is not over-zoomed. */
const MIN_VIEW_WIDTH = 260;
const RATIO = MAP_SIZE.width / MAP_SIZE.height;

interface Props {
  view: MapView;
  /** Alpha-2 code of the highlighted country, or null. */
  active: string | null;
  onActive: (code: string | null) => void;
  /** Country name in the current language. */
  nameOf: (c: VisitedCountry) => string;
  /** Accessible description of the whole map. */
  label: string;
}

export default function VisitedMap({ view, active, onActive, nameOf, label }: Props) {
  const [world, setWorld] = useState<World | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let live = true;
    // If the data cannot be loaded the placeholder simply stays; the country list still works.
    loadWorld().then((w) => live && setWorld(w)).catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  // Country outlines are projected once; the paths do not change when the view zooms.
  const map = useMemo(() => {
    if (!world) return null;
    const features = world.countries.filter((f) => String(f.id) !== ANTARCTICA);
    const collection: FeatureCollection = { type: 'FeatureCollection', features };
    const projection = geoNaturalEarth1().fitSize([MAP_SIZE.width, MAP_SIZE.height], collection);
    const path = geoPath(projection);
    const visitedById = new Map(VISITED_COUNTRIES.map((c) => [c.id, c]));
    const shapes = features.map((f) => {
      const country = visitedById.get(String(f.id));
      return { id: String(f.id), d: path(f) ?? '', country, small: !!country && path.area(f) < SMALL_AREA };
    });
    const drawn = new Map(shapes.map((s) => [s.id, s]));
    const points = new Map(VISITED_COUNTRIES.map((c) => [c.code, projection(c.at) ?? [0, 0]]));
    // Countries too small for the map data (Monaco, Malta, ...) or to hover comfortably get a dot.
    const dots = VISITED_COUNTRIES.filter((c) => !drawn.has(c.id) || drawn.get(c.id)?.small);
    return { shapes, points, dots };
  }, [world]);

  // The visible part of the map: everything, or a box around the visited countries of one continent.
  const box = useMemo(() => {
    const full = { x: 0, y: 0, w: MAP_SIZE.width, h: MAP_SIZE.height };
    if (!map || view === 'world') return full;
    const pts = VISITED_COUNTRIES.filter((c) => c.continent === view).map((c) => map.points.get(c.code) ?? [0, 0]);
    if (!pts.length) return full;
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const pad = 45;
    const x0 = Math.min(...xs) - pad;
    const x1 = Math.max(...xs) + pad;
    const y0 = Math.min(...ys) - pad;
    const y1 = Math.max(...ys) + pad;
    // Keep the map's proportions, so the zoomed view fills the same frame.
    let w = Math.max(x1 - x0, (y1 - y0) * RATIO, MIN_VIEW_WIDTH);
    w = Math.min(w, full.w);
    const h = w / RATIO;
    const x = Math.min(Math.max((x0 + x1) / 2 - w / 2, 0), full.w - w);
    const y = Math.min(Math.max((y0 + y1) / 2 - h / 2, 0), full.h - h);
    return { x, y, w, h };
  }, [map, view]);

  if (!map) return <MapPlaceholder />;

  // Dots and text keep the same on-screen size when the view zooms in.
  const k = box.w / MAP_SIZE.width;
  const activeCountry = active ? VISITED_COUNTRIES.find((c) => c.code === active) : undefined;
  const tip = activeCountry ? map.points.get(activeCountry.code) : undefined;
  const select = (code: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onActive(code);
  };

  return (
    <div className="relative w-full" style={{ aspectRatio: `${MAP_SIZE.width} / ${MAP_SIZE.height}` }}>
      <motion.svg
        viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
        initial={false}
        animate={{ viewBox: `${box.x} ${box.y} ${box.w} ${box.h}` }}
        transition={{ duration: reduce ? 0 : 0.8, ease: 'easeInOut' }}
        className="block h-full w-full"
        role="img"
        aria-label={label}
        // Tapping the sea or an unvisited country clears the selection (useful on touch screens).
        onClick={() => onActive(null)}
      >
        {map.shapes.map((s) =>
          s.country ? (
            <path
              key={s.id}
              d={s.d}
              className={`cursor-pointer stroke-white transition-colors duration-200 ${active === s.country.code ? 'fill-sunset' : 'fill-coral'}`}
              strokeWidth={0.75}
              vectorEffect="non-scaling-stroke"
              onMouseEnter={() => onActive(s.country!.code)}
              onMouseLeave={() => onActive(null)}
              onClick={select(s.country.code)}
            />
          ) : (
            <path key={s.id} d={s.d} className="fill-plum/10 stroke-white" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
          ),
        )}
        {map.dots.map((c) => {
          const [x, y] = map.points.get(c.code) ?? [0, 0];
          return (
            <g
              key={c.code}
              className="cursor-pointer"
              onMouseEnter={() => onActive(c.code)}
              onMouseLeave={() => onActive(null)}
              onClick={select(c.code)}
            >
              {/* Larger invisible circle: an easier target for the mouse and for fingers. */}
              <circle cx={x} cy={y} r={11 * k} fill="transparent" />
              <circle
                cx={x}
                cy={y}
                r={(active === c.code ? 5.5 : 4) * k}
                className={`stroke-white transition-colors duration-200 ${active === c.code ? 'fill-sunset' : 'fill-coral'}`}
                strokeWidth={1.25}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </motion.svg>

      {activeCountry && tip && (
        <motion.div
          key={activeCountry.code}
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-plum px-3 py-1.5 text-sm font-medium text-white shadow-soft"
          style={{ left: `${((tip[0] - box.x) / box.w) * 100}%`, top: `${((tip[1] - box.y) / box.h) * 100}%`, marginTop: -10 }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <span aria-hidden="true">{flag(activeCountry.code)}</span> {nameOf(activeCountry)}
        </motion.div>
      )}
    </div>
  );
}
