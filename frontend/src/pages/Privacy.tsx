import { useTitle } from '../hooks/useData';
import { CONTACT } from '../data/site';
import { useT } from '../i18n';

// NOTE: have this policy reviewed by someone qualified before launch (GDPR, EU personal data).
// The policy text and its "last updated" date live in src/i18n/en.ts (privacy.*); update the
// date there by hand every time the text changes.
export default function Privacy() {
  const { privacy: p } = useT();
  useTitle(p.title);
  return (
    <article className="container-page max-w-3xl py-14 leading-relaxed text-plum/85">
      <h1 className="text-5xl font-bold text-plum">{p.title}</h1>
      <p className="mt-2 text-sm text-plum/60">{p.lastUpdated}</p>

      <h2 className="mt-10 text-2xl font-bold text-plum">{p.whoTitle}</h2>
      <p className="mt-2">{p.who(CONTACT.ownerName)}</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">{p.contactTitle}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li>
          {p.email}: <a className="text-sunset underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </li>
        <li>
          {p.phone}:{' '}
          <a className="text-sunset underline" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
        </li>
      </ul>
      <p className="mt-2">{p.contactNote}</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">{p.collectTitle}</h2>
      <p className="mt-2">{p.collect}</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">{p.whyTitle}</h2>
      <p className="mt-2">{p.why}</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">{p.howLongTitle}</h2>
      <p className="mt-2">{p.howLong}</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">{p.rightsTitle}</h2>
      <p className="mt-2">{p.rights}</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">{p.processorsTitle}</h2>
      <p className="mt-2">{p.processors}</p>
    </article>
  );
}
