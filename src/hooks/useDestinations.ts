import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Destination } from '@/types/Destination';
import { getIconByType } from '@/utils';

const fetchDestinations = async (): Promise<Destination[]> => {
  const response = await axios.get<Destination[]>('/destinations.json');
  return response.data;
};

export function useDestinations() {
  const {
    data: destinations = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const memoizedData = useMemo(() => {
    const terms = destinations.map((destination) => destination.term);
    const iconComponents = destinations.map((destination) => getIconByType(destination.type));
    return { terms, iconComponents };
  }, [destinations]);

  return {
    terms: memoizedData.terms,
    iconComponents: memoizedData.iconComponents,
    isLoading,
    error,
    refetch,
    destinations,
  };
}
