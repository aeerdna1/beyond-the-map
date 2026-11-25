import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDestinations, useTitle } from '../hooks/useData';
import { img } from '../data/img';
import { useLang, useT, type Dict } from '../i18n';
import { CONTINENT_ORDER, VISITED_COUNTRIES, countryNamer, flag, type MapView } from '../data/visited';
import OptionalBoundary from '../components/OptionalBoundary';
import { MapPlaceholder } from '../components/GeoPlaceholders';

// The map and its data are a separate download, fetched when this page opens. The country list
// below it does not depend on it, so the page is complete even if the map fails to load.
const VisitedMap = lazy(() => import('../components/VisitedMap'));

// Continents that have at least one visited country, in display order.
const GROUPS = CONTINENT_ORDER.map((continent) => ({
  continent,
  countries: VISITED_COUNTRIES.filter((c) => c.continent === continent),
})).filter((g) => g.countries.length > 0);

export default function About() {
  const t = useT();
  const { lang } = useLang();
  const a = t.about;
  useTitle(a.kicker);
  const nameOf = countryNamer(lang);
  // Shared by the map and the list: pointing at a country in either highlights it in both.
  const [view, setView] = useState<MapView>('world');
  const [active, setActive] = useState<string | null>(null);
  // Counted from the destination list (same cached query as the other pages), so the numbers
  // stay correct when destinations are added. Every place has its top 5.
  const { data } = useDestinations();
  // Stat values; the labels come from t.about.stats. "..." until the list has loaded.
  const STATS: { n: string; k: keyof Dict['about']['stats'] }[] = [
    { n: '35+', k: 'countries' },
    { n: data ? String(data.length) : '...', k: 'destinations' },
    { n: data ? String(data.reduce((sum, d) => sum + d.placeCount, 0)) : '...', k: 'places' },
    { n: '∞', k: 'sunsets' },
  ];
  const views: { key: MapView; label: string }[] = [
    { key: 'world', label: a.mapWorld },
    ...GROUPS.map((g) => ({ key: g.continent, label: a.continents[g.continent] })),
  ];
  return (
    <>
      <section className="container-page grid items-center gap-12 py-16 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-medium uppercase tracking-widest text-coral">{a.kicker}</p>
          <h1 className="mt-2 text-5xl font-bold leading-tight">{a.titleStart}<em className="text-sunset">{a.titleEm}</em></h1>
          {/* Same intro paragraph as the home page teaser. */}
          <p className="mt-6 text-lg leading-relaxed text-plum/80">{t.home.aboutText}</p>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            {/* TODO: personal story - first trip, favourite moment, why you started planning trips for others. */}
            {a.story}
          </p>
          <Link to="/plan-my-trip" className="btn-primary mt-8">{a.cta}</Link>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {(['planning', 'aurora', 'bali', 'egypt1'] as const).map((k, i) => (
            <motion.img
              key={k}
              src={img(k, 600)}
              alt=""
              className={`aspect-[3/4] w-full rounded-card object-cover shadow-soft ${i % 2 ? 'mt-10' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i }}
            />
          ))}
        </div>
      </section>

      <section className="bg-plum py-14 text-white">
        <div className="container-page grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.k}>
              <p className="bg-sunset bg-clip-text font-serif text-5xl font-bold text-transparent">{s.n}</p>
              <p className="mt-1 text-white/75">{a.stats[s.k]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-3xl font-bold">{a.beenTitle}</h2>
        <p className="mt-2 text-plum/70">{a.beenIntro}</p>

        {/* Zoom buttons: the whole world or one continent. */}
        <div className="mt-6 flex flex-wrap gap-2">
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setView(v.key)}
              aria-pressed={view === v.key}
              className={`chip border ${view === v.key ? 'border-sunset bg-sunset text-white' : 'border-plum/10 bg-white hover:border-coral'}`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="card mt-4 p-3 sm:p-5">
          <OptionalBoundary fallback={<MapPlaceholder />}>
            <Suspense fallback={<MapPlaceholder />}>
              <VisitedMap
                view={view}
                active={active}
                onActive={setActive}
                nameOf={nameOf}
                label={a.mapLabel(VISITED_COUNTRIES.length)}
              />
            </Suspense>
          </OptionalBoundary>
        </div>

        <div className="mt-10 space-y-8">
          {GROUPS.map((group) => (
            <div key={group.continent}>
              <h3 className="text-xl font-bold">
                {a.continents[group.continent]} <span className="font-sans text-base font-normal text-plum/60">({group.countries.length})</span>
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.countries.map((c, i) => (
                  <motion.button
                    key={c.code}
                    type="button"
                    // Pointing at a country (or focusing it with Tab) highlights it on the map;
                    // a click also zooms the map to its continent.
                    onMouseEnter={() => setActive(c.code)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(c.code)}
                    onBlur={() => setActive(null)}
                    onClick={() => {
                      setView(c.continent);
                      setActive(c.code);
                    }}
                    className={`chip border transition-colors ${active === c.code ? 'border-sunset bg-amber-soft' : 'border-plum/10 bg-white'}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <span aria-hidden="true">{flag(c.code)}</span> {nameOf(c)}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
