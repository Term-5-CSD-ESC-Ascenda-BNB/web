import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Destination } from '@/types/Destination';

const fetchDestinations = async (): Promise<Destination[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // TODO: Replace with actual API endpoint
  const response = await axios.get<Destination[]>('/mock_data/destinations.json');
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

  const terms = destinations.map((destination) => destination.term);

  return {
    terms,
    isLoading,
    error,
    refetch,
    destinations, // Also expose full destination objects
  };
}
