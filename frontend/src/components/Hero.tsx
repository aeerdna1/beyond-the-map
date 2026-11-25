import { useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Typewriter from './Typewriter';
import { img } from '../data/img';
import { useT } from '../i18n';

// Dashed flight path (viewBox 0 0 1000 300); the plane follows the same curve via offsetPath.
const PATH = 'M 20 260 C 250 40, 450 320, 650 140 S 900 40, 980 60';

/**
 * Interactive hero: sunset gradient sky, typewriter destinations, and a
 * "Start the journey" button that flies a plane along a dashed path and then
 * scrolls to the featured destinations.
 */
export default function Hero() {
  const t = useT();
  const [flying, setFlying] = useState(false);
  const reduce = useReducedMotion();

  const start = () => {
    const go = () => document.getElementById('featured')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    if (reduce || flying) return go();
    setFlying(true);
    setTimeout(() => {
      go();
      setFlying(false);
    }, 1600);
  };

  return (
    <section className="relative isolate overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-amber-soft via-cream to-cream" />
      <div className="animate-float absolute -top-24 right-[-6rem] -z-10 h-80 w-80 rounded-full bg-sunset opacity-60 blur-3xl sm:right-10" />
      <div className="absolute bottom-0 left-[-8rem] -z-10 h-72 w-72 rounded-full bg-amber opacity-40 blur-3xl" />

      {/* Flight path (decorative) */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 hidden h-[300px] w-full md:block"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={PATH} fill="none" stroke="#FF7F50" strokeWidth="2.5" strokeDasharray="8 10" opacity="0.45" />
      </svg>
      {flying && (
        <div
          className="plane-fly pointer-events-none absolute left-0 top-24 z-10 hidden text-4xl md:block"
          style={{ offsetPath: `path('${PATH}')` } as CSSProperties}
          aria-hidden
        >
          ✈️
        </div>
      )}

      <div className="container-page grid min-h-[88vh] items-center gap-12 py-16 lg:grid-cols-[1.15fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-4 inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-plum shadow-sm">
            {t.hero.badge}
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] text-plum sm:text-6xl lg:text-7xl">
            {t.hero.titleStart}<em className="text-sunset">{t.hero.titleEm}</em>
          </h1>
          <p className="mt-6 text-xl text-plum/80 sm:text-2xl">
            {t.hero.question} <br className="sm:hidden" />
            <Typewriter words={t.hero.words} />
          </p>
          <p className="mt-3 text-lg text-plum/70">{t.hero.together}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <motion.button
              onClick={start}
              className="btn-primary text-lg"
              whileTap={{ scale: 0.95 }}
              animate={flying ? { scale: [1, 1.08, 1] } : {}}
            >
              {t.hero.start} <span aria-hidden>✈</span>
            </motion.button>
            <Link to="/plan-my-trip" className="btn-ghost text-lg">{t.hero.plan}</Link>
          </div>
        </motion.div>

        {/* Polaroid photo stack */}
        <div className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px]">
          {[
            { k: 'kyoto' as const, cls: 'left-0 top-6 -rotate-6', cap: t.hero.captions.kyoto },
            { k: 'iceland2' as const, cls: 'right-0 top-0 rotate-6', cap: t.hero.captions.iceland },
            { k: 'morocco3' as const, cls: 'left-10 bottom-0 rotate-2 sm:left-16', cap: t.hero.captions.chefchaouen },
          ].map((p, idx) => (
            <motion.figure
              key={p.k}
              className={`absolute w-48 rounded-lg bg-white p-2.5 pb-8 shadow-soft sm:w-60 ${p.cls}`}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.15, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
            >
              <img src={img(p.k, 600)} alt={p.cap} className="aspect-square w-full rounded object-cover" />
              <figcaption className="absolute bottom-2 left-0 right-0 text-center font-serif text-plum">{p.cap}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
