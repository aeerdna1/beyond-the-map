import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { useInView, useReducedMotion } from 'framer-motion';
import { loadWorld, type World } from '../lib/world';
import type { DestinationSummary } from '../types';
import { GLOBE_FRAME } from './GeoPlaceholders';

// 3D globe for the home page: the land is drawn on a canvas (orthographic projection), and each
// destination is a link placed on top. The globe turns slowly on its own, can be dragged, and
// turns to a destination when it is focused from the list next to it. Keyboard and screen
// reader users use that list (the same links), so the pins are left out of the Tab order.
// Loaded on demand (React.lazy).

/** Automatic rotation speed in degrees per second. */
const SPIN = 8;
/** Start tilt: the northern hemisphere leans a little toward the viewer. */
const START_TILT = -18;
const MAX_TILT = 60;
/** After the visitor stops interacting, wait this long before turning again. */
const RESUME_MS = 2500;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
/** Wraps an angle to [-180, 180). */
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180;

interface Props {
  /** Destinations with coordinates; each gets a pin. */
  destinations: DestinationSummary[];
  /** Destination to turn to and label, or null to keep spinning. */
  focus: string | null;
  /** Accessible description of the globe. */
  label: string;
}

export default function Globe({ destinations, focus, label }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [world, setWorld] = useState<World | null>(null);
  const [hoverPin, setHoverPin] = useState<string | null>(null);
  const reduce = useReducedMotion();
  // The animation only runs while the globe is on screen.
  const inView = useInView(wrapRef);

  // Rotation and interaction state for the animation loop. Kept in refs, so turning the globe
  // never re-renders React; the loop writes to the canvas and the pin styles directly.
  const st = useRef({
    lambda: -15, // centre longitude is -lambda (15 E: Europe and Africa face the visitor first)
    phi: START_TILT,
    target: null as null | [number, number],
    drag: null as null | { id: number; x: number; y: number; lambda: number; phi: number },
    hover: false,
    resumeAt: 0,
    size: 0,
    dpr: 1,
    drawn: '',
  });
  const destRef = useRef(destinations);
  destRef.current = destinations;
  const focusRef = useRef(focus);
  focusRef.current = focus;

  useEffect(() => {
    let live = true;
    // If the data cannot be loaded the globe stays an empty sphere; the list next to it still works.
    loadWorld().then((w) => live && setWorld(w)).catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  // Turn to the focused destination; when focus is cleared, start spinning again after a pause.
  useEffect(() => {
    const d = focus ? destinations.find((x) => x.slug === focus) : undefined;
    if (d) st.current.target = [-d.lng, clamp(-d.lat, -MAX_TILT, MAX_TILT)];
    else st.current.resumeAt = performance.now() + RESUME_MS;
  }, [focus, destinations]);

  // New pins (for example after a language switch) are placed on the next frame.
  useEffect(() => {
    st.current.drawn = '';
  }, [destinations]);

  // Match the canvas resolution to its on-screen size (sharp on high-density screens).
  useEffect(() => {
    const el = wrapRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const fit = () => {
      const size = el.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      Object.assign(st.current, { size, dpr, drawn: '' });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!world || !inView || !ctx) return;
    const projection = geoOrthographic().clipAngle(90).precision(0.6);
    const path = geoPath(projection, ctx);
    const sphere = { type: 'Sphere' } as const;
    const graticule = geoGraticule10();
    let raf = 0;
    let last = performance.now();

    const draw = () => {
      const s = st.current;
      const r = s.size / 2;
      projection.scale(r - 1).translate([r, r]).rotate([s.lambda, s.phi]);
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      ctx.clearRect(0, 0, s.size, s.size);

      // Sea: warm cream to amber, lit from the top left.
      const sea = ctx.createRadialGradient(r * 0.7, r * 0.6, r * 0.1, r, r, r);
      sea.addColorStop(0, '#FFF8F0');
      sea.addColorStop(1, '#FFE3A3');
      ctx.beginPath();
      path(sphere);
      ctx.fillStyle = sea;
      ctx.fill();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(46, 26, 47, 0.08)';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.beginPath();
      path(world.land);
      ctx.fillStyle = '#FF7F50';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 94, 58, 0.9)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Shadow toward the edge, so the flat drawing reads as a ball.
      const shade = ctx.createRadialGradient(r * 0.7, r * 0.6, r * 0.2, r, r, r);
      shade.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      shade.addColorStop(0.7, 'rgba(46, 26, 47, 0)');
      shade.addColorStop(1, 'rgba(46, 26, 47, 0.3)');
      ctx.beginPath();
      path(sphere);
      ctx.fillStyle = shade;
      ctx.fill();

      // Pins: only those on the side facing the visitor are visible and clickable.
      const centre: [number, number] = [-s.lambda, -s.phi];
      for (const d of destRef.current) {
        const el = pinRefs.current.get(d.slug);
        if (!el) continue;
        const p = projection([d.lng, d.lat]);
        const front = geoDistance([d.lng, d.lat], centre) < Math.PI / 2 - 0.1;
        if (p && front) {
          el.style.transform = `translate(${p[0]}px, ${p[1]}px)`;
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
        } else {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }
      }
    };

    const frame = (now: number) => {
      const s = st.current;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (s.target && !s.drag) {
        // Ease toward the focused destination along the shorter way round.
        const dl = wrap(s.target[0] - s.lambda);
        const dp = s.target[1] - s.phi;
        const f = Math.min(1, dt * 5);
        s.lambda += dl * f;
        s.phi += dp * f;
        if (Math.abs(dl) < 0.05 && Math.abs(dp) < 0.05) s.target = null;
      } else if (!reduce && !s.drag && !s.hover && !focusRef.current && now >= s.resumeAt) {
        s.lambda += SPIN * dt;
      }
      s.lambda = wrap(s.lambda);
      // Only redraw when something changed (a still globe costs nothing).
      const key = `${s.lambda.toFixed(2)} ${s.phi.toFixed(2)} ${s.size} ${s.dpr}`;
      if (s.size > 0 && key !== s.drawn) {
        s.drawn = key;
        draw();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [world, inView, reduce]);

  // Dragging turns the globe. Pins are links, so a press on a pin is left to the link.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('a')) return;
    const s = st.current;
    s.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lambda: s.lambda, phi: s.phi };
    s.target = null;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (!s.drag || s.drag.id !== e.pointerId) return;
    const k = 180 / Math.max(s.size, 1); // dragging across the whole globe turns it half way round
    s.lambda = s.drag.lambda + (e.clientX - s.drag.x) * k;
    s.phi = clamp(s.drag.phi - (e.clientY - s.drag.y) * k, -MAX_TILT, MAX_TILT);
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (s.drag?.id !== e.pointerId) return;
    s.drag = null;
    s.resumeAt = performance.now() + RESUME_MS;
  };

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={label}
      // touch-pan-y: a vertical swipe still scrolls the page on phones; a sideways one turns the globe.
      className={`relative cursor-grab touch-pan-y select-none active:cursor-grabbing ${GLOBE_FRAME}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      // Hovering pauses the rotation, so a pin does not slide away from the mouse.
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') st.current.hover = true;
      }}
      onPointerLeave={() => {
        st.current.hover = false;
        st.current.resumeAt = performance.now() + RESUME_MS;
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full rounded-full" aria-hidden="true" />
      {world &&
        destinations.map((d) => {
          const shown = focus === d.slug || hoverPin === d.slug;
          return (
            <Link
              key={d.slug}
              to={`/destinations/${d.slug}`}
              ref={(el) => {
                if (el) pinRefs.current.set(d.slug, el);
                else pinRefs.current.delete(d.slug);
              }}
              tabIndex={-1}
              aria-hidden="true"
              className="absolute left-0 top-0 opacity-0 transition-opacity duration-300"
              onMouseEnter={() => setHoverPin(d.slug)}
              onMouseLeave={() => setHoverPin(null)}
              draggable={false}
            >
              <span className="relative -ml-3.5 -mt-3.5 block h-7 w-7">
                {shown && <span className="absolute inset-1 animate-ping rounded-full bg-sunset/60" />}
                <span
                  className={`absolute inset-2 rounded-full border-2 border-white shadow transition-colors ${shown ? 'bg-sunset' : 'bg-plum'}`}
                />
              </span>
              {shown && (
                <span className="absolute left-0 top-4 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-medium text-plum shadow-soft">
                  <span aria-hidden="true">{d.flag}</span> {d.name}
                </span>
              )}
            </Link>
          );
        })}
    </div>
  );
}
