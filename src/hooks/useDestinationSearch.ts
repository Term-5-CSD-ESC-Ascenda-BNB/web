import React, { useMemo, useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import Fuse from 'fuse.js';
import type { IconProps } from '@tabler/icons-react';
import { useDestinations } from './useDestinations';

interface DestinationOption {
  uid: string;
  term: string;
  displayLabel: string;
  icon: React.FC<IconProps>;
}

const FUSE_CONFIG = {
  keys: ['term'],
  threshold: 0.4, // Slightly more strict for better performance
  includeScore: false, // Disable scoring for better performance
  minMatchCharLength: 2,
  ignoreLocation: true,
  findAllMatches: false,
  shouldSort: true,
  distance: 100, // Limit search distance
};

const SEARCH_CONFIG = {
  debounceMs: 250, // Debounce time in milliseconds
  maxResults: 10, // Reduced from 15 for better performance
  minSearchLength: 2,
} as const;

interface FuseResult {
  item: DestinationOption;
  refIndex: number;
}

export function useDestinationSearch(searchValue: string) {
  const { destinations, displayLabels, iconComponents, error } = useDestinations();
  const [debouncedValue] = useDebouncedValue(searchValue, SEARCH_CONFIG.debounceMs);

  const fuse = useMemo(() => {
    if (!destinations.length) return null;

    const options: DestinationOption[] = destinations.map((dest, index) => ({
      uid: dest.uid,
      term: dest.term,
      displayLabel: displayLabels[index],
      icon: iconComponents[index],
    }));

    return new Fuse(options, FUSE_CONFIG);
  }, [destinations, displayLabels, iconComponents]);

  const [fuseResults, setFuseResults] = useState<FuseResult[]>([]);

  useEffect(() => {
    if (!debouncedValue.trim() || debouncedValue.trim().length < SEARCH_CONFIG.minSearchLength) {
      setFuseResults([]);
      return;
    }

    if (!fuse) {
      setFuseResults([]);
      return;
    }

    // setTimeout to yield control back to main thread
    // Prevents blocking the UI thread during search
    const timeoutId = setTimeout(() => {
      const results = fuse.search(debouncedValue);
      setFuseResults(results.slice(0, SEARCH_CONFIG.maxResults));
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fuse, debouncedValue]);

  const searchResults = useMemo(() => {
    return fuseResults.map((result) => result.item.displayLabel);
  }, [fuseResults]);

  const searchResultsWithIcons = useMemo(() => {
    return fuseResults.map((result) => ({
      uid: result.item.uid,
      term: result.item.term,
      label: result.item.displayLabel,
      icon: result.item.icon,
    }));
  }, [fuseResults]);

  return {
    searchResults,
    searchResultsWithIcons,
    error,
    isLoading: !destinations.length && !error,
  };
}
