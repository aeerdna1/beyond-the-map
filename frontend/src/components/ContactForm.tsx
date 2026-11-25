import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/client';
import { CONTACT, DESTINATIONS } from '../data';
import { translationFor } from '../data/translations';
import { useLang, useT, type Dict } from '../i18n';

// Validation messages come from the active dictionary, so the schema is built per language.
const makeSchema = (e: Dict['form']['errors']) =>
  z
    .object({
      name: z.string().trim().min(2, e.name),
      email: z.string().trim().email(e.email),
      phone: z.string().trim().max(30).optional(),
      destinations: z.array(z.string()).min(1, e.destinations),
      travelFrom: z.string().optional(),
      travelTo: z.string().optional(),
      travelers: z.number({ invalid_type_error: e.travelers }).int(e.travelers).min(1, e.travelers).max(50, e.travelers),
      budget: z.string().min(1, e.budget),
      travelStyle: z.string().min(1, e.style),
      message: z.string().max(2000).optional(),
      consent: z.boolean().refine((v) => v, e.consent),
      website: z.string().max(0).optional(), // honeypot
    })
    .refine((v) => !v.travelFrom || !v.travelTo || v.travelTo >= v.travelFrom, {
      path: ['travelTo'],
      message: e.dates,
    });

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

// Values sent to the API (and shown in the notification email) stay language-independent.
// Labels come from t.form.budgets, which must keep the same order.
const BUDGET_VALUES = ['< 1,500 EUR / person', '1,500 - 3,000 EUR / person', '3,000 - 5,000 EUR / person', '5,000+ EUR / person'];
const STYLE_VALUES = ['relax', 'adventure', 'culture', 'mix'] as const;

export default function ContactForm({ preselect }: { preselect?: string }) {
  const t = useT();
  const { lang } = useLang();
  const f = t.form;
  const schema = useMemo(() => makeSchema(f.errors), [f.errors]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register, handleSubmit, watch, trigger, formState: { errors, isSubmitting },
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

  // Error messages already on screen are stored strings, so after a language switch
  // re-validate just the fields that currently show one; they come back in the new language.
  // On first render there are no errors, so this does nothing.
  useEffect(() => {
    const shown = Object.keys(errors) as (keyof FormValues)[];
    if (shown.length) void trigger(shown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

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
        // The confirmation email is sent in the language the visitor is using.
        lang,
      });
      setSent(true);
    } catch {
      setError(f.sendError);
    }
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
        <p className="text-6xl">✈️</p>
        <h3 className="mt-4 text-3xl font-bold">{f.thanksTitle}</h3>
        <p className="mt-2 text-plum/75">{f.thanksText}</p>
      </motion.div>
    );
  }

  const err = (k: keyof FormValues) =>
    errors[k] ? <p className="mt-1 text-sm text-sunset">{String(errors[k]?.message)}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6 p-6 sm:p-10" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">{f.name}</label>
          <input id="name" className="input" placeholder={f.namePlaceholder} {...register('name')} />
          {err('name')}
        </div>
        <div>
          <label className="label" htmlFor="email">{f.email}</label>
          <input id="email" type="email" className="input" placeholder={f.emailPlaceholder} {...register('email')} />
          {err('email')}
        </div>
        <div>
          <label className="label" htmlFor="phone">{f.phone}</label>
          <input id="phone" type="tel" className="input" placeholder="+40 ..." {...register('phone')} />
        </div>
        <div>
          <label className="label" htmlFor="travelers">{f.travelers}</label>
          <input id="travelers" type="number" min={1} max={50} className="input" {...register('travelers', { valueAsNumber: true })} />
          {err('travelers')}
        </div>
      </div>

      <fieldset>
        <legend className="label">{f.where}</legend>
        <div className="flex flex-wrap gap-2">
          {[
            ...DESTINATIONS.map((d) => ({ v: d.slug, label: `${d.flag} ${translationFor(lang, d.slug)?.name || d.name}` })),
            { v: 'not-sure', label: f.notSure },
          ].map((o) => {
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
          <label className="label" htmlFor="travelFrom">{f.from}</label>
          <input id="travelFrom" type="date" className="input" {...register('travelFrom')} />
        </div>
        <div>
          <label className="label" htmlFor="travelTo">{f.to}</label>
          <input id="travelTo" type="date" className="input" {...register('travelTo')} />
          {err('travelTo')}
        </div>
        <div>
          <label className="label" htmlFor="budget">{f.budget}</label>
          <select id="budget" className="input" {...register('budget')}>
            <option value="">{f.chooseRange}</option>
            {BUDGET_VALUES.map((v, i) => <option key={v} value={v}>{f.budgets[i] ?? v}</option>)}
          </select>
          {err('budget')}
        </div>
        <fieldset>
          <legend className="label">{f.style}</legend>
          <div className="grid grid-cols-2 gap-2">
            {STYLE_VALUES.map((v) => (
              <label key={v} className={`chip cursor-pointer border text-center ${style === v ? 'border-sunset bg-sunset text-white' : 'border-plum/15 bg-white hover:border-coral'}`}>
                <input type="radio" value={v} className="sr-only" {...register('travelStyle')} />
                {f.styles[v]}
              </label>
            ))}
          </div>
          {err('travelStyle')}
        </fieldset>
      </div>

      <div>
        <label className="label" htmlFor="message">{f.message}</label>
        <textarea id="message" rows={4} className="input" placeholder={f.messagePlaceholder} {...register('message')} />
      </div>

      {/* Honeypot - hidden from humans */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register('website')} />

      <div>
        <label className="flex items-start gap-3 text-sm text-plum/80">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-sunset" {...register('consent')} />
          <span>
            {f.consentBefore}<Link to="/privacy" className="text-sunset underline">{f.consentLink}</Link>{f.consentAfter}
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
        {isSubmitting ? f.sending : f.submit}
      </button>
    </form>
  );
}
