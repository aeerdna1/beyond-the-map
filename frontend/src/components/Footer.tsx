import { Link } from 'react-router-dom';
import { CONTACT } from '../data';

export default function Footer() {
  return (
    <footer className="bg-plum text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-bold text-white">Beyond the Map ✈️</p>
          <p className="mt-3 max-w-xs text-sm">
            Craft a life that feels like you. Custom trips inspired by 35+ countries of real experience.
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-amber" to="/destinations">Destinations</Link></li>
            <li><Link className="hover:text-amber" to="/about">About me</Link></li>
            <li><Link className="hover:text-amber" to="/plan-my-trip">Plan my trip</Link></li>
            <li><Link className="hover:text-amber" to="/privacy">Privacy policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Say hello</p>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-amber" href={`mailto:${CONTACT.email}`}>✉️ {CONTACT.email}</a></li>
            <li><a className="hover:text-amber" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>📞 {CONTACT.phone}</a></li>
            <li><a className="hover:text-amber" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">💬 WhatsApp</a></li>
            <li><a className="hover:text-amber" href={CONTACT.instagram} target="_blank" rel="noreferrer">📸 {CONTACT.instagramHandle}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Beyond the Map · Placeholder photos from Unsplash
      </div>
    </footer>
  );
}
