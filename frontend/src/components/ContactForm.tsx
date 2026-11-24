import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/client';
import { CONTACT, DESTINATIONS } from '../data';

const schema = z
  .object({
    name: z.string().trim().min(2, 'Please tell me your name'),
    email: z.string().trim().email('That email does not look right'),
    phone: z.string().trim().max(30).optional(),
    destinations: z.array(z.string()).min(1, 'Pick at least one destination (or "Not sure yet")'),
    travelFrom: z.string().optional(),
    travelTo: z.string().optional(),
    travelers: z.number({ invalid_type_error: 'How many people?' }).int().min(1).max(50),
    budget: z.string().min(1, 'Choose a budget range'),
    travelStyle: z.string().min(1, 'Choose a travel style'),
    message: z.string().max(2000).optional(),
    consent: z.boolean().refine((v) => v, 'Please accept so I can contact you'),
    website: z.string().max(0).optional(), // honeypot
  })
  .refine((v) => !v.travelFrom || !v.travelTo || v.travelTo >= v.travelFrom, {
    path: ['travelTo'],
    message: 'Return date must be after departure',
  });

type FormValues = z.infer<typeof schema>;

const BUDGETS = ['< 1,500 EUR / person', '1,500 - 3,000 EUR / person', '3,000 - 5,000 EUR / person', '5,000+ EUR / person'];
const STYLES = [
  { v: 'relax', label: '🏝️ Relax' },
  { v: 'adventure', label: '🧗 Adventure' },
  { v: 'culture', label: '🏯 Culture' },
  { v: 'mix', label: '✨ A bit of everything' },
];

export default function ContactForm({ preselect }: { preselect?: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register, handleSubmit, watch, formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      destinations: preselect ? [preselect] : [],
      travelers: 2,
      budget: '',
      travelStyle: '',
      consent: false,
    },
  });

  const chosen = watch('destinations') ?? [];
  const style = watch('travelStyle');

  const onSubmit = async (data: FormValues) => {
    setError(null);
    if (data.website) return; // bot
    try {
      // Empty inputs become undefined so the API receives null instead of "".
      await api.submitInquiry({
        ...data,
        phone: data.phone || undefined,
        travelFrom: data.travelFrom || undefined,
        travelTo: data.travelTo || undefined,
        message: data.message || undefined,
      });
      setSent(true);
    } catch {
      setError('Sorry, the form could not be sent right now. Please message me on WhatsApp or by email instead.');
    }
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
        <p className="text-6xl">✈️</p>
        <h3 className="mt-4 text-3xl font-bold">Thank you!</h3>
        <p className="mt-2 text-plum/75">I'll get back to you within 24h. A confirmation is on its way to your inbox.</p>
      </motion.div>
    );
  }

  const err = (k: keyof FormValues) =>
    errors[k] ? <p className="mt-1 text-sm text-sunset">{String(errors[k]?.message)}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6 p-6 sm:p-10" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Your name *</label>
          <input id="name" className="input" placeholder="Ana Popescu" {...register('name')} />
          {err('name')}
        </div>
        <div>
          <label className="label" htmlFor="email">Email *</label>
          <input id="email" type="email" className="input" placeholder="ana@email.com" {...register('email')} />
          {err('email')}
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" type="tel" className="input" placeholder="+40 ..." {...register('phone')} />
        </div>
        <div>
          <label className="label" htmlFor="travelers">Travellers *</label>
          <input id="travelers" type="number" min={1} max={50} className="input" {...register('travelers', { valueAsNumber: true })} />
          {err('travelers')}
        </div>
      </div>

      <fieldset>
        <legend className="label">Where would you like to go? *</legend>
        <div className="flex flex-wrap gap-2">
          {[...DESTINATIONS.map((d) => ({ v: d.slug, label: `${d.flag} ${d.name}` })), { v: 'not-sure', label: '🤔 Not sure yet' }].map((o) => {
            const on = chosen.includes(o.v);
            return (
              <label key={o.v} className={`chip cursor-pointer border ${on ? 'border-sunset bg-sunset text-white' : 'border-plum/15 bg-white text-plum hover:border-coral'}`}>
                <input type="checkbox" value={o.v} className="sr-only" {...register('destinations')} />
                {o.label}
              </label>
            );
          })}
        </div>
        {err('destinations')}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="travelFrom">From</label>
          <input id="travelFrom" type="date" className="input" {...register('travelFrom')} />
        </div>
        <div>
          <label className="label" htmlFor="travelTo">To</label>
          <input id="travelTo" type="date" className="input" {...register('travelTo')} />
          {err('travelTo')}
        </div>
        <div>
          <label className="label" htmlFor="budget">Budget *</label>
          <select id="budget" className="input" {...register('budget')}>
            <option value="">Choose a range</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
          {err('budget')}
        </div>
        <fieldset>
          <legend className="label">Travel style *</legend>
          <div className="grid grid-cols-2 gap-2">
            {STYLES.map((s) => (
              <label key={s.v} className={`chip cursor-pointer border text-center ${style === s.v ? 'border-sunset bg-sunset text-white' : 'border-plum/15 bg-white hover:border-coral'}`}>
                <input type="radio" value={s.v} className="sr-only" {...register('travelStyle')} />
                {s.label}
              </label>
            ))}
          </div>
          {err('travelStyle')}
        </fieldset>
      </div>

      <div>
        <label className="label" htmlFor="message">Tell me about your dream trip</label>
        <textarea id="message" rows={4} className="input" placeholder="Honeymoon? First big trip? Foodie adventure?" {...register('message')} />
      </div>

      {/* Honeypot - hidden from humans */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register('website')} />

      <div>
        <label className="flex items-start gap-3 text-sm text-plum/80">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-sunset" {...register('consent')} />
          <span>
            I agree that my data is used to contact me about my trip. See the <Link to="/privacy" className="text-sunset underline">Privacy Policy</Link>. *
          </span>
        </label>
        {err('consent')}
      </div>

      {error && (
        <p className="rounded-xl bg-amber-soft p-4 text-sm text-plum">
          {error} <a className="font-medium underline" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a> ·{' '}
          <a className="font-medium underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg disabled:opacity-60 sm:w-auto">
        {isSubmitting ? 'Sending…' : 'Send my trip request ✈'}
      </button>
    </form>
  );
}
