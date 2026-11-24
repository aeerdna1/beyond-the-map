import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { Loading } from '../components/Status';
import { useDestinations, useTitle } from '../hooks/useData';
import type { Region, Vibe } from '../types';

const REGIONS: Region[] = ['Asia', 'Europe', 'Africa', 'Islands'];
const VIBES: Vibe[] = ['Beach', 'Nature', 'Culture'];

export default function Destinations() {
  useTitle('Destinations');
  const { data, isLoading } = useDestinations();
  const [params, setParams] = useSearchParams();
  const region = params.get('region') as Region | null;
  const vibe = params.get('vibe') as Vibe | null;

  const toggle = (key: 'region' | 'vibe', value: string) => {
    const next = new URLSearchParams(params);
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const list = useMemo(
    () => (data ?? []).filter((d) => (!region || d.region === region) && (!vibe || d.vibes.includes(vibe))),
    [data, region, vibe],
  );

  const chip = (on: boolean) =>
    `chip border ${on ? 'border-sunset bg-sunset text-white' : 'border-plum/15 bg-white text-plum hover:border-coral'}`;

  return (
    <div className="container-page py-14">
      <p className="font-medium uppercase tracking-widest text-coral">Explore</p>
      <h1 className="mt-2 text-5xl font-bold">Destinations</h1>
      <p className="mt-3 max-w-2xl text-lg text-plum/75">
        Countries, islands and regions I have explored - each with the places I'd send my best friend to.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button className={chip(!region && !vibe)} onClick={() => setParams({}, { replace: true })}>All</button>
        <span className="mx-1 hidden h-6 w-px bg-plum/15 sm:block" />
        {REGIONS.map((r) => <button key={r} className={chip(region === r)} onClick={() => toggle('region', r)}>{r}</button>)}
        <span className="mx-1 hidden h-6 w-px bg-plum/15 sm:block" />
        {VIBES.map((v) => <button key={v} className={chip(vibe === v)} onClick={() => toggle('vibe', v)}>{v}</button>)}
      </div>

      {isLoading ? <Loading /> : list.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => <DestinationCard key={d.slug} d={d} index={i} />)}
        </div>
      ) : (
        <p className="mt-16 text-center text-plum/60">No destinations match these filters yet - try another combination.</p>
      )}
    </div>
  );
}
