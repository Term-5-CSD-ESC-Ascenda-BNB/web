import { useState } from 'react';
import { Flex } from '@mantine/core';
import { useSurroundings } from '@/hooks/useSurroundings';
import type { Hotel } from '@/types/Hotel';

import { HotelHeader } from '../HotelHeader/HotelHeader';
import { HotelAmenities } from '../HotelAmenities/HotelAmenities';
import { HotelSurroundings } from '../HotelSurroundings/HotelSurroundings';
import { HotelRooms } from '../HotelRooms/HotelRooms';
import { HotelReviews } from '../HotelReviews/HotelReviews';

interface HotelDetailsProps {
  hotel: Hotel;
}

export function HotelDetails({ hotel }: HotelDetailsProps) {
  const { name, address, rating, trustyou, amenities_ratings, amenities, latitude, longitude } =
    hotel;

  const { surroundings } = useSurroundings({ lat: latitude, lng: longitude });

  const formattedSurroundings = surroundings.map((s) => ({
    type: s.type ?? 'POI',
    name: s.name || 'Unnamed',
    distance: `${s.dist} m`,
    latitude: s.point.lat,
    longitude: s.point.lon,
  }));

  return (
    <>
      <HotelHeader
        name={name}
        address={address}
        rating={rating}
        trustyouScore={trustyou?.score?.overall ?? undefined}
      />

      <Flex justify="space-between" wrap="wrap" mt="xl" gap="xl">
        <HotelAmenities amenities={amenities} />
        <HotelSurroundings hotel={hotel} surroundings={formattedSurroundings} />
      </Flex>

      <HotelRooms />

      <HotelReviews trustyou={trustyou} ratings={amenities_ratings} />
    </>
  );
}
