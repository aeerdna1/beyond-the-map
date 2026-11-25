import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { useT } from '../i18n';

export const useDestinations = () =>
  useQuery({ queryKey: ['destinations'], queryFn: api.listDestinations });

export const useDestination = (slug: string) =>
  useQuery({ queryKey: ['destination', slug], queryFn: () => api.getDestination(slug) });

export const usePlace = (slug: string, placeSlug: string) =>
  useQuery({ queryKey: ['place', slug, placeSlug], queryFn: () => api.getPlace(slug, placeSlug) });

/** Basic per-page SEO title. */
export function useTitle(title?: string) {
  const { meta } = useT();
  useEffect(() => {
    document.title = title ? `${title} | ${meta.siteName}` : meta.defaultTitle;
  }, [title, meta]);
}
