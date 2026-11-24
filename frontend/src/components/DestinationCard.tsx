import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { DestinationSummary } from '../types';

export default function DestinationCard({ d, index = 0 }: { d: DestinationSummary; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
    >
      <Link to={`/destinations/${d.slug}`} className="card group block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={d.heroImageUrl.replace('w=1600', 'w=800')}
            alt={d.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-plum">
            {d.region}
          </span>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl font-bold">
              {d.flag} {d.name}
            </h3>
            <p className="text-sm text-white/85">{d.placeCount} places to discover</p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-plum/75">{d.tagline}</p>
          <p className="mt-3 font-medium text-sunset transition group-hover:translate-x-1">Explore →</p>
        </div>
      </Link>
    </motion.div>
  );
}
