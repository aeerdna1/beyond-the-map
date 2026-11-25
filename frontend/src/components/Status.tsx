import { Link } from 'react-router-dom';
import { useT, type Dict } from '../i18n';

export function Loading() {
  const t = useT();
  return (
    <div className="container-page flex min-h-[50vh] items-center justify-center">
      <span className="animate-bounce text-4xl" aria-label={t.status.loading}>✈️</span>
    </div>
  );
}

export function NotFoundBlock({ what = 'page' }: { what?: keyof Dict['status']['notFound'] }) {
  const t = useT();
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-4xl font-bold">{t.status.lostTitle}</h1>
      <p className="mt-2 text-plum/70">{t.status.notFound[what]}</p>
      <Link to="/destinations" className="btn-primary mt-8">{t.status.seeAll}</Link>
    </div>
  );
}
