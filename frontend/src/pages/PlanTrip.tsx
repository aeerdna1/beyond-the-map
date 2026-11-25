import { useSearchParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { useTitle } from '../hooks/useData';
import { CONTACT } from '../data';
import { useT } from '../i18n';

export default function PlanTrip() {
  const { planTrip: pt } = useT();
  useTitle(pt.kicker);
  const [params] = useSearchParams();
  const preselect = params.get('destination') ?? undefined;

  const direct = [
    { icon: '💬', label: 'WhatsApp', value: pt.chat, href: CONTACT.whatsapp, external: true },
    { icon: '📞', label: pt.phone, value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { icon: '✉️', label: pt.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: '📸', label: 'Instagram', value: CONTACT.instagramHandle, href: CONTACT.instagram, external: true },
  ];

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <p className="font-medium uppercase tracking-widest text-coral">{pt.kicker}</p>
        <h1 className="mt-2 text-5xl font-bold">{pt.title}</h1>
        <p className="mt-3 text-lg text-plum/75">{pt.intro}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ContactForm preselect={preselect} />

        <aside className="space-y-4">
          <p className="font-serif text-2xl font-bold">{pt.talkDirect}</p>
          {direct.map((c) => (
            <a
              key={c.href}
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
