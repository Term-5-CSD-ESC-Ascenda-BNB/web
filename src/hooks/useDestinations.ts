import { useState, useEffect } from 'react';
import mockDataRaw from '@/.mock_data/destinations.json';
import type { Destination } from '@/types/Destination';

const mockData = mockDataRaw as Destination[];

export function useDestination() {
  const [terms, setTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const termList = mockData.map((d) => d.term);
      setTerms(termList);
      setIsLoading(false);
    };

    void fetchData();
  }, []);

  return {
    terms,
    isLoading,
  };
}
