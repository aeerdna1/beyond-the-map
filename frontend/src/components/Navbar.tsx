import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LANGS, LANG_NAMES, useLang, useT } from '../i18n';

/** EN / RO segmented switch. The active language is marked with aria-pressed. */
function LangSwitch({ className = '' }: { className?: string }) {
  const t = useT();
  const { lang, setLang, pending } = useLang();
  return (
    // aria-busy while a language file downloads; the chosen button pulses until it is shown.
    <div role="group" aria-label={t.nav.language} aria-busy={pending !== null} className={`inline-flex rounded-full border border-plum/15 bg-white/70 p-0.5 text-sm ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          title={LANG_NAMES[l]}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 font-semibold transition ${lang === l ? 'bg-sunset text-white' : 'text-plum hover:text-sunset'} ${pending === l ? 'animate-pulse' : ''}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const t = useT();
  const LINKS = [
    { to: '/', label: t.nav.home },
    { to: '/destinations', label: t.nav.destinations },
    { to: '/about', label: t.nav.about },
  ];
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
          <span className="bg-sunset bg-clip-text text-transparent">{t.meta.siteName}</span>
          <span aria-hidden>✈️</span>
        </Link>

        {/* Desktop links start at lg: the Romanian labels are too wide for md next to the logo. */}
        <div className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
          <LangSwitch />
          <Link to="/plan-my-trip" className="btn-primary whitespace-nowrap !py-2">
            {t.nav.planTrip}
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-plum lg:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-plum/10 lg:hidden">
          <div className="container-page flex flex-col gap-4 py-5">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
            <LangSwitch className="self-start" />
            <Link to="/plan-my-trip" className="btn-primary">
              {t.nav.planTrip}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
