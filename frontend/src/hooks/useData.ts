import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export const useDestinations = () =>
  useQuery({ queryKey: ['destinations'], queryFn: api.listDestinations });

export const useDestination = (slug: string) =>
  useQuery({ queryKey: ['destination', slug], queryFn: () => api.getDestination(slug) });

export const usePlace = (slug: string, placeSlug: string) =>
  useQuery({ queryKey: ['place', slug, placeSlug], queryFn: () => api.getPlace(slug, placeSlug) });

/** Basic per-page SEO title. */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Beyond the Map` : 'Beyond the Map - Craft a life that feels like you';
  }, [title]);
}
