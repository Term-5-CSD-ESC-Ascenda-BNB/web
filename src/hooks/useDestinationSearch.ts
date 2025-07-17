import { useMemo } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getIconByType } from '@/utils';
import type { TablerIcon } from '@tabler/icons-react';

const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api-production-46df.up.railway.app';

const SEARCH_CONFIG = {
  debounceTime: 250, // Debounce time in milliseconds
  minSearchLength: 2,
} as const;
interface ApiResponse {
  location: {
    type: string;
    coordinates: [number, number];
  };
  state?: string;
  term: string;
  type: string;
  uid: string;
}

export interface DestinationSearchResult {
  term: string;
  uid: string;
  icon: TablerIcon;
}

const fetchDestinations = async (searchValue: string): Promise<ApiResponse[]> => {
  if (!searchValue.trim() || searchValue.trim().length < SEARCH_CONFIG.minSearchLength) {
    return [];
  }

  const response = await axios.get<ApiResponse[]>(`${API_BASE_URL}/destinations`, {
    params: { search: searchValue },
  });
  return response.data;
};

export function useDestinationSearch(searchValue: string) {
  const [debouncedValue] = useDebouncedValue(searchValue, SEARCH_CONFIG.debounceTime);

  const {
    data: destinations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['destinations', debouncedValue],
    queryFn: () => fetchDestinations(debouncedValue),
    enabled: debouncedValue.trim().length >= SEARCH_CONFIG.minSearchLength,
    staleTime: 30 * 1000, // Data is fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const searchResults = useMemo<DestinationSearchResult[]>(() => {
    return destinations.map((destination) => {
      return {
        uid: destination.uid,
        term: destination.term,
        icon: getIconByType(destination.type),
      };
    });
  }, [destinations]);

  return {
    searchResults,
    error,
    isLoading,
  };
}
