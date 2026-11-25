import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import { Loading } from '../components/Status';
import { useDestinations, useTitle } from '../hooks/useData';
import { FEATURED } from '../data';
import { img } from '../data/img';
import { useT } from '../i18n';

// One icon per step; the step titles and texts come from t.home.steps (same order).
const STEP_ICONS = ['💬', '🗺️', '✈️'];

export default function Home() {
  const t = useT();
  const h = t.home;
  useTitle();
  const { data, isLoading } = useDestinations();
  const featured = (data ?? []).filter((d) => FEATURED.includes(d.slug))
    .sort((a, b) => FEATURED.indexOf(a.slug) - FEATURED.indexOf(b.slug));

  return (
    <>
      <Hero />

      {/* About teaser */}
      <section className="container-page grid items-center gap-10 py-20 md:grid-cols-2">
        <motion.img
          src={img('road', 1000)}
          alt={h.roadAlt}
          className="aspect-[4/3] w-full rounded-card object-cover shadow-soft"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        />
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="font-medium uppercase tracking-widest text-coral">{h.aboutKicker}</p>
          <h2 className="mt-2 text-4xl font-bold">{h.aboutTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-plum/80">{h.aboutText}</p>
          <Link to="/about" className="btn-ghost mt-7">{h.readStory}</Link>
        </motion.div>
      </section>

      {/* Featured destinations */}
      <section id="featured" className="scroll-mt-20 bg-white/60 py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-medium uppercase tracking-widest text-coral">{h.featuredKicker}</p>
              <h2 className="mt-2 text-4xl font-bold">{h.featuredTitle}</h2>
            </div>
            <Link to="/destinations" className="font-medium text-sunset hover:underline">{h.seeAll}</Link>
          </div>
          {isLoading ? <Loading /> : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((d, i) => <DestinationCard key={d.slug} d={d} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-20">
        <div className="text-center">
          <p className="font-medium uppercase tracking-widest text-coral">{h.howKicker}</p>
          <h2 className="mt-2 text-4xl font-bold">{h.howTitle}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {h.steps.map((s, i) => (
            <motion.div
              key={i}
              className="card p-8 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-soft text-3xl">{STEP_ICONS[i]}</div>
              <p className="mt-2 text-sm font-semibold text-coral">{h.step(i + 1)}</p>
              <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-plum/75">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-card bg-sunset px-8 py-16 text-center text-white shadow-soft">
          <h2 className="text-4xl font-bold sm:text-5xl">{h.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{h.ctaText}</p>
          <Link to="/plan-my-trip" className="mt-8 inline-flex rounded-full bg-plum px-8 py-3.5 text-lg font-medium text-white transition hover:-translate-y-0.5">
            {h.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
