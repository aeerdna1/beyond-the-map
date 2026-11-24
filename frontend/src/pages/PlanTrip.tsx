import { useSearchParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { useTitle } from '../hooks/useData';
import { CONTACT } from '../data';

export default function PlanTrip() {
  useTitle('Plan my trip');
  const [params] = useSearchParams();
  const preselect = params.get('destination') ?? undefined;

  const direct = [
    { icon: '💬', label: 'WhatsApp', value: 'Chat with me', href: CONTACT.whatsapp, external: true },
    { icon: '📞', label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { icon: '✉️', label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: '📸', label: 'Instagram', value: CONTACT.instagramHandle, href: CONTACT.instagram, external: true },
  ];

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <p className="font-medium uppercase tracking-widest text-coral">Plan my trip</p>
        <h1 className="mt-2 text-5xl font-bold">Let's craft your journey</h1>
        <p className="mt-3 text-lg text-plum/75">
          Tell me a little about the trip you're dreaming of. I'll reply within 24 hours with ideas and next steps -
          no commitment needed.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ContactForm preselect={preselect} />

        <aside className="space-y-4">
          <p className="font-serif text-2xl font-bold">Prefer to talk directly?</p>
          {direct.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noreferrer' : undefined}
              className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-soft text-2xl">{c.icon}</span>
              <span>
                <span className="block text-sm text-plum/60">{c.label}</span>
                <span className="font-medium">{c.value}</span>
              </span>
            </a>
          ))}
        </aside>
      </div>
    </div>
  );
}
