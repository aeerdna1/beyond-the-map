import { feature } from 'topojson-client';
import type { Feature, FeatureCollection } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';

// Country outlines for the home page globe and the About page map (Natural Earth 1:110m,
// public domain, via the world-atlas package). The file is about 38 KB gzipped and is only
// downloaded the first time one of the two is shown; both share the same download.

type WorldTopology = Topology<{
  countries: GeometryCollection<{ name: string }>;
  land: GeometryCollection;
}>;

export interface World {
  /** One feature per country; `id` is the ISO 3166-1 numeric code as a string ("380" = Italy). */
  countries: Feature[];
  /** All land as one shape (no inner borders), for the globe. */
  land: FeatureCollection;
}

let pending: Promise<World> | null = null;

/** Loads and converts the map data once; later calls get the same result. */
export function loadWorld(): Promise<World> {
  if (!pending) {
    pending = import('world-atlas/countries-110m.json').then((m) => {
      const topo = m.default as unknown as WorldTopology;
      return {
        countries: feature(topo, topo.objects.countries).features,
        land: feature(topo, topo.objects.land),
      };
    });
    // A failed download (offline) is not cached, so the next visit to the page can retry.
    pending.catch(() => {
      pending = null;
    });
  }
  return pending;
}
