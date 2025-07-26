import { useState, useEffect } from 'react';
import mockData from '@/.mock_data/hotels.json';
import type { Hotel } from '@/types/Hotel';

export function useMockHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const updatedHotels = mockData.slice(0, 18).map((hotel) => {
        // Generate images array from hotel image details
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

        return {
          ...hotel,
          price: Math.floor(Math.random() * 200) + 50, // Random price between $50 and $250
          score: Math.floor(Math.random() * 10) + 1, // Random score between 1 and 10
          images, // Add the first 5 images to each hotel
        };
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setHotels(updatedHotels.slice(0, 18));
      setIsLoading(false);
    };

    void fetchData();
  }, []);

  return {
    hotels,
    isLoading,
  };
}
