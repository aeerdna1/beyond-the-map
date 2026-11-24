import { useTitle } from '../hooks/useData';
import { CONTACT } from '../data';

// NOTE: template only - have it reviewed before launch (GDPR, EU personal data).
export default function Privacy() {
  useTitle('Privacy policy');
  return (
    <article className="container-page max-w-3xl py-14 leading-relaxed text-plum/85">
      <h1 className="text-5xl font-bold text-plum">Privacy policy</h1>
      <p className="mt-2 text-sm text-plum/60">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

      <h2 className="mt-10 text-2xl font-bold text-plum">What I collect</h2>
      <p className="mt-2">
        When you submit the "Plan my trip" form I collect your name, email, phone number (optional), the destinations you
        are interested in, travel dates, number of travellers, budget range, travel style and your message.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-plum">Why</h2>
      <p className="mt-2">
        Only to answer your request and plan your trip (legal basis: your consent, Art. 6(1)(a) GDPR). I never sell your
        data or use it for unrelated marketing.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-plum">How long</h2>
      <p className="mt-2">Trip requests are kept for up to 24 months after our last contact, then deleted.</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">Your rights</h2>
      <p className="mt-2">
        You can ask to see, correct or delete your data, or withdraw consent at any time, by writing to{' '}
        <a className="text-sunset underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. You can also complain to
        your national data protection authority (in Romania: ANSPDCP).
      </p>

      <h2 className="mt-8 text-2xl font-bold text-plum">Processors</h2>
      <p className="mt-2">
        Hosting provider, email delivery provider and image CDN - each bound by a data processing agreement.
      </p>
    </article>
  );
}
