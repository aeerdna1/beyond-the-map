import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/about', label: 'About me' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition hover:text-sunset ${isActive ? 'text-sunset' : 'text-plum'}`;

  return (
    <header
      className={`sticky top-0 z-50 transition ${scrolled || open ? 'bg-cream/95 shadow-sm backdrop-blur' : 'bg-cream/70 backdrop-blur-sm'}`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-plum">
          <span className="bg-sunset bg-clip-text text-transparent">Beyond the Map</span>
          <span aria-hidden>✈️</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/plan-my-trip" className="btn-primary !py-2">
            Plan my trip
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-plum md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-plum/10 md:hidden">
          <div className="container-page flex flex-col gap-4 py-5">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/plan-my-trip" className="btn-primary">
              Plan my trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
