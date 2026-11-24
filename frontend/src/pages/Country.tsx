import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { Loading, NotFoundBlock } from '../components/Status';
import { useDestination, useTitle } from '../hooks/useData';

export default function Country() {
  const { slug = '' } = useParams();
  const { data: d, isLoading, isError } = useDestination(slug);
  useTitle(d?.name);

  if (isLoading) return <Loading />;
  if (isError || !d) return <NotFoundBlock what="destination" />;

  return (
    <>
      <PageHero image={d.heroImageUrl} title={<>{d.flag} {d.name}</>} subtitle={d.tagline}>
        <Link to="/destinations" className="mb-4 inline-block text-sm text-white/80 hover:text-white">← All destinations</Link>
      </PageHero>

      <section className="container-page grid gap-8 py-14 md:grid-cols-[2fr_1fr]">
        <p className="text-lg leading-relaxed text-plum/80">{d.description}</p>
        <div className="card h-fit bg-amber-soft p-6 shadow-none">
          <p className="text-sm font-semibold uppercase tracking-wider text-plum/70">☀️ Best time to visit</p>
          <p className="mt-2 font-medium text-plum">{d.bestTimeToVisit}</p>
        </div>
      </section>

      <section className="container-page pb-20">
        <h2 className="text-3xl font-bold">Places I love in {d.name}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.places.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
            >
              <Link to={`/destinations/${d.slug}/${p.slug}`} className="card group block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.heroImageUrl.replace('w=1600', 'w=800')} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/75 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{p.name}</h3>
                  {!p.activities.length && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber px-3 py-1 text-xs font-semibold text-plum">Coming soon</span>
                  )}
                </div>
                <div className="p-5">
                  {p.description && <p className="text-plum/75">{p.description}</p>}
                  <p className="mt-2 font-medium text-sunset">Top 5 things to do →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to={`/plan-my-trip?destination=${d.slug}`} className="btn-primary text-lg">Plan a trip to {d.name} ✈</Link>
        </div>
      </section>
    </>
  );
}
