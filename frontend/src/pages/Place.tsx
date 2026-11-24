import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import Top5List from '../components/Top5List';
import Gallery from '../components/Gallery';
import { Loading, NotFoundBlock } from '../components/Status';
import { useDestination, usePlace, useTitle } from '../hooks/useData';

export default function PlacePage() {
  const { slug = '', placeSlug = '' } = useParams();
  const { data: p, isLoading, isError } = usePlace(slug, placeSlug);
  const { data: d } = useDestination(slug);
  useTitle(p ? `${p.name}${d ? `, ${d.name}` : ''}` : undefined);

  if (isLoading) return <Loading />;
  if (isError || !p) return <NotFoundBlock what="place" />;

  const others = d?.places.filter((x) => x.slug !== p.slug) ?? [];

  return (
    <>
      <PageHero image={p.heroImageUrl} title={p.name} subtitle={p.description || undefined}>
        <Link to={`/destinations/${slug}`} className="mb-4 inline-block text-sm text-white/80 hover:text-white">
          ← {d ? `${d.flag} ${d.name}` : 'Back'}
        </Link>
      </PageHero>

      <div className="container-page py-14">
        {p.funFact && (
          <motion.aside
            className="relative -mt-24 mb-14 rounded-card bg-amber p-7 text-plum shadow-soft sm:p-9"
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-serif text-2xl font-bold">💡 Did you know?</p>
            <p className="mt-2 text-lg">{p.funFact}</p>
          </motion.aside>
        )}

        {p.activities.length ? (
          <>
            <h2 className="mb-8 text-4xl font-bold">Top 5 things to do</h2>
            <Top5List items={p.activities} />
          </>
        ) : (
          <div className="card p-10 text-center">
            <p className="text-5xl">📝</p>
            <h2 className="mt-3 text-3xl font-bold">My top 5 for {p.name} is coming soon</h2>
            <p className="mt-2 text-plum/70">I'm still writing this one up - but I'd love to plan it with you right now.</p>
          </div>
        )}

        {p.gallery.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-3xl font-bold">Gallery</h2>
            <Gallery images={p.gallery} />
          </section>
        )}

        <section className="mt-16 rounded-card bg-plum p-10 text-center text-white">
          <h2 className="text-3xl font-bold">Dreaming of {p.name}?</h2>
          <p className="mt-2 text-white/80">I'll build a trip around it - with all the hidden gems.</p>
          <Link to={`/plan-my-trip?destination=${slug}`} className="btn-primary mt-6">Plan a trip here ✈</Link>
        </section>

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold">More in {d?.name}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {others.map((o) => (
                <Link key={o.slug} to={`/destinations/${slug}/${o.slug}`} className="chip border border-plum/15 bg-white hover:border-coral hover:text-sunset">
                  {o.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
