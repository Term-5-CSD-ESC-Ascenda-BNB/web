import { useState, useEffect } from 'react';
import mockData from '@/.mock_data/hotels.json';
import type { Hotel } from '@/types/Hotel';

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchData = async () => {
      setIsLoading(true);

      // Add a random price to each hotel
      // TODO: Replace with actual price from API
      const updatedHotels = mockData.slice(0, 18).map((hotel) => ({
        ...hotel,
        price: Math.floor(Math.random() * 200) + 50, // Random price between $50 and $250
      }));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setHotels(updatedHotels.slice(0, 18));
      setIsLoading(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  const getHotelImages = (hotel: Hotel): string[] => {
    const images: string[] = [];
    if (hotel.image_details && hotel.hires_image_index) {
      const { prefix, suffix } = hotel.image_details;
      const indices = hotel.hires_image_index
        .split(',')
        .map((i) => i.trim())
        .slice(0, 5);

      for (const idx of indices) {
        images.push(`${prefix}${idx}${suffix}`);
      }
    }
    return images;
  };

  return {
    hotels,
    isLoading,
    getHotelImages,
  };
}
