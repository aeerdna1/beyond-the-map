import { motion } from 'framer-motion';
import type { Activity } from '../types';

export default function Top5List({ items }: { items: Activity[] }) {
  return (
    <ol className="space-y-6">
      {[...items].sort((a, b) => a.rank - b.rank).map((a, i) => (
        <motion.li
          key={a.rank}
          className="card grid sm:grid-cols-[220px_1fr]"
          initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <div className="relative aspect-[16/10] sm:aspect-auto">
            <img src={a.imageUrl} alt={a.title} loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-sunset font-serif text-lg font-bold text-white shadow">
              {a.rank}
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold">{a.title}</h3>
            <p className="mt-2 text-plum/75">{a.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
