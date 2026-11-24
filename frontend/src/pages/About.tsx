import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useData';
import { DESTINATIONS } from '../data';
import { img } from '../data/img';

// TODO: replace with the real list of 35+ visited countries.
const VISITED = [
  ...DESTINATIONS.map((d) => `${d.flag} ${d.name}`),
  '🇫🇷 France', '🇪🇸 Spain', '🇵🇹 Portugal', '🇬🇷 Greece', '🇭🇷 Croatia', '🇦🇹 Austria', '🇨🇭 Switzerland',
  '🇩🇪 Germany', '🇳🇱 Netherlands', '🇬🇧 United Kingdom', '🇻🇳 Vietnam', '🇰🇭 Cambodia', '🇹🇷 Turkey',
  '🇦🇪 UAE', '🇲🇻 Maldives', '🇺🇸 USA', '🇲🇽 Mexico', '🇭🇺 Hungary', '🇨🇿 Czechia', '🇷🇴 Romania',
  '🇧🇬 Bulgaria', '🇩🇰 Denmark', '🇸🇪 Sweden', '🇫🇮 Finland', '🇯🇴 Jordan',
];

const STATS = [
  { n: '35+', l: 'countries' },
  { n: '11', l: 'destinations on this site' },
  { n: '40+', l: 'places with my top 5' },
  { n: '∞', l: 'sunsets watched' },
];

export default function About() {
  useTitle('About me');
  return (
    <>
      <section className="container-page grid items-center gap-12 py-16 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-medium uppercase tracking-widest text-coral">About me</p>
          <h1 className="mt-2 text-5xl font-bold leading-tight">35+ countries later, <em className="text-sunset">this is my story</em></h1>
          <p className="mt-6 text-lg leading-relaxed text-plum/80">
            After traveling to more than 35 countries, I've collected the places, moments and hidden gems that changed the
            way I see the world. This is my experience, and I want to share it with you, so your next journey feels like it
            was made just for you.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-plum/80">
            {/* TODO: personal story - first trip, favourite moment, why you started planning trips for others. */}
            It started with one backpack and a cheap flight. It turned into a life of sunrise hikes, night markets, glacier
            walks and conversations with strangers who became friends. Now I want to help you craft a trip that feels like you.
          </p>
          <Link to="/plan-my-trip" className="btn-primary mt-8">Let's plan yours</Link>
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
            <div key={s.l}>
              <p className="bg-sunset bg-clip-text font-serif text-5xl font-bold text-transparent">{s.n}</p>
              <p className="mt-1 text-white/75">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-3xl font-bold">Where I've been</h2>
        <p className="mt-2 text-plum/70">An interactive map is coming - for now, here is my passport in emoji form.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {VISITED.map((c, i) => (
            <motion.span
              key={c}
              className="chip border border-plum/10 bg-white"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </section>
    </>
  );
}
