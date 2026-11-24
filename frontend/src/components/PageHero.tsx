import type { ReactNode } from 'react';

/** Full-width photo header used on country and place pages. */
export default function PageHero({ image, title, subtitle, children }: {
  image: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[55vh] items-end overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/30 to-sunset/10" />
      <div className="container-page relative pb-12 pt-32 text-white">
        {children}
        <h1 className="text-4xl font-bold sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </div>
    </section>
  );
}
