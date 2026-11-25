import { useTitle } from '../hooks/useData';
import { CONTACT } from '../data';

// NOTE: have this policy reviewed by someone qualified before launch (GDPR, EU personal data).
// Update LAST_UPDATED by hand every time the text below changes.
const LAST_UPDATED = '25 November 2026';

export default function Privacy() {
  useTitle('Privacy policy');
  const mail = (
    <a className="text-sunset underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
  );
  return (
    <article className="container-page max-w-3xl py-14 leading-relaxed text-plum/85">
      <h1 className="text-5xl font-bold text-plum">Privacy policy</h1>
      <p className="mt-2 text-sm text-plum/60">Last updated: {LAST_UPDATED}</p>

      <h2 className="mt-10 text-2xl font-bold text-plum">Who I am</h2>
      <p className="mt-2">
        This website, Beyond the Map, is run by {CONTACT.ownerName}, a private individual based in {CONTACT.country}. I am
        the data controller for the personal data you send through this site.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-plum">How to contact me</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li>Email: {mail}</li>
        <li>
          Phone / WhatsApp:{' '}
          <a className="text-sunset underline" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
        </li>
      </ul>
      <p className="mt-2">For any privacy question or request, email is the fastest way to reach me.</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">What I collect</h2>
      <p className="mt-2">
        When you submit the "Plan my trip" form I collect your name, email, phone number (optional), the destinations you
        are interested in, travel dates, number of travellers, budget range, travel style and your message.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-plum">Why</h2>
      <p className="mt-2">
        Only to answer your request and plan your trip (legal basis: your consent, Art. 6(1)(a) GDPR). I never sell your
        data or use it for unrelated marketing. Filling in the form is voluntary, but without your contact details I
        cannot reply to you.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-plum">How long</h2>
      <p className="mt-2">Trip requests are kept for up to 24 months after our last contact, then deleted.</p>

      <h2 className="mt-8 text-2xl font-bold text-plum">Your rights</h2>
      <p className="mt-2">
        You can ask to see, correct or delete your data, or withdraw your consent at any time, by writing to {mail}.
        Withdrawing consent does not affect anything done before you withdrew it. You can also complain to your national
        data protection authority (in Romania: ANSPDCP, www.dataprotection.ro).
      </p>

      <h2 className="mt-8 text-2xl font-bold text-plum">Processors</h2>
      <p className="mt-2">
        Hosting provider, email delivery provider and image CDN - each bound by a data processing agreement.
      </p>
    </article>
  );
}
