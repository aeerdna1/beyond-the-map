import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDestinations, useTitle } from '../hooks/useData';
import { img } from '../data/img';
import { useT, type Dict } from '../i18n';

/**
 * Builds a flag emoji from an ISO 3166-1 alpha-2 country code (e.g. 'IT').
 * Each letter maps to a Unicode regional indicator symbol; a pair of them renders as a flag.
 * Keeping only ASCII codes in the source avoids the emoji getting mangled by editors/encodings.
 */
const flag = (code: string) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));

type Country = [code: string, name: string];

// Countries visited, grouped by continent. Cyprus is listed under Europe and Turkey under Asia.
// `continent` is a key into t.about.continents, so the heading is translated.
const VISITED: { continent: keyof Dict['about']['continents']; countries: Country[] }[] = [
  {
    continent: 'europe',
    countries: [
      ['IT', 'Italy'], ['GB', 'United Kingdom'], ['ES', 'Spain'], ['FR', 'France'], ['DE', 'Germany'],
      ['NL', 'Netherlands'], ['BE', 'Belgium'], ['CH', 'Switzerland'], ['MC', 'Monaco'], ['MT', 'Malta'],
      ['GR', 'Greece'], ['CY', 'Cyprus'], ['BG', 'Bulgaria'], ['RS', 'Serbia'], ['BA', 'Bosnia and Herzegovina'],
      ['HU', 'Hungary'], ['SK', 'Slovakia'], ['SE', 'Sweden'], ['NO', 'Norway'], ['FI', 'Finland'],
    ],
  },
  {
    continent: 'asia',
    countries: [
      ['TH', 'Thailand'], ['MY', 'Malaysia'], ['SG', 'Singapore'], ['ID', 'Indonesia'], ['TR', 'Turkey'],
      ['IL', 'Israel'], ['QA', 'Qatar'], ['BH', 'Bahrain'], ['OM', 'Oman'],
    ],
  },
  {
    continent: 'africa',
    countries: [['MA', 'Morocco'], ['EG', 'Egypt']],
  },
  {
    continent: 'northAmerica',
    countries: [['US', 'USA'], ['DO', 'Dominican Republic'], ['BS', 'Bahamas']],
  },
];

export default function About() {
  const t = useT();
  const a = t.about;
  useTitle(a.kicker);
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
        <div className="mt-8 space-y-8">
          {VISITED.map((group) => (
            <div key={group.continent}>
              <h3 className="text-xl font-bold">
                {a.continents[group.continent]} <span className="font-sans text-base font-normal text-plum/60">({group.countries.length})</span>
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.countries.map(([code, name], i) => (
                  <motion.span
                    key={code}
                    className="chip border border-plum/10 bg-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <span aria-hidden="true">{flag(code)}</span> {name}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
