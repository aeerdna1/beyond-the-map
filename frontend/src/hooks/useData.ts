import { useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { useLang, useT } from '../i18n';

// The language is part of every query key, so switching language fetches (and caches) the
// other version and switching back is instant. placeholderData keeps the page on screen
// while the new language loads, instead of flashing the loading spinner.

export function useDestinations() {
  const { lang } = useLang();
  return useQuery({
    queryKey: ['destinations', lang],
    queryFn: () => api.listDestinations(lang),
    placeholderData: keepPreviousData,
  });
}

export function useDestination(slug: string) {
  const { lang } = useLang();
  return useQuery({
    queryKey: ['destination', slug, lang],
    queryFn: () => api.getDestination(slug, lang),
    // Only keep the previous data for a language switch, never while moving to another destination.
    placeholderData: (prev, prevQuery) => (prevQuery?.queryKey[1] === slug ? prev : undefined),
  });
}

export function usePlace(slug: string, placeSlug: string) {
  const { lang } = useLang();
  return useQuery({
    queryKey: ['place', slug, placeSlug, lang],
    queryFn: () => api.getPlace(slug, placeSlug, lang),
    placeholderData: (prev, prevQuery) =>
      prevQuery?.queryKey[1] === slug && prevQuery?.queryKey[2] === placeSlug ? prev : undefined,
  });
}

/** Basic per-page SEO title. */
export function useTitle(title?: string) {
  const { meta } = useT();
  useEffect(() => {
    document.title = title ? `${title} | ${meta.siteName}` : meta.defaultTitle;
  }, [title, meta]);
}
