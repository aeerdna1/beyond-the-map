import { Link } from 'react-router-dom';

export function Loading() {
  return (
    <div className="container-page flex min-h-[50vh] items-center justify-center">
      <span className="animate-bounce text-4xl" aria-label="Loading">✈️</span>
    </div>
  );
}

export function NotFoundBlock({ what = 'page' }: { what?: string }) {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-4xl font-bold">Looks like we got lost</h1>
      <p className="mt-2 text-plum/70">We couldn't find this {what}.</p>
      <Link to="/destinations" className="btn-primary mt-8">See all destinations</Link>
    </div>
  );
}
