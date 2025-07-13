import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { SaveButton } from '@/components/SaveButton/SaveButton';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { Group, Stack, Text } from '@mantine/core';
import { AmenitiesList } from '@/components/AmenitiesList/AmenitiesList';
import { SurroundingsList } from '@/components/SurroundingsList/SurroundingsList';
import { Box, Flex } from '@mantine/core';
import { RoomCard } from '@/components/Room/RoomCard';

interface HotelDetailsProps {
  name: string;
  starRating: number;
  address: string;
  reviewScore: number;
}

// dummy for now
const dummyAmenities = [
  'Parking',
  'Gym',
  'Wi-Fi',
  'Restaurant',
  'Swimming Pool',
  'Playground',
  '24-Hour Front Desk',
  'Airport Shuttle',
  'Business Center',
  'Accessible Rooms',
];

const dummySurroundings = [
  { type: 'Metro', name: 'City Hall', distance: '610 m' },
  { type: 'Airport', name: 'Singapore Changi Airport', distance: '18.9 km' },
  { type: 'Shopping', name: 'Marina Bay Sands', distance: '3.2 km' },
  { type: 'Attraction', name: 'Merlion Park', distance: '1.1 km' },
  { type: 'Dining', name: 'Lau Pa Sat', distance: '820 m' },
];

// HotelDetails.tsx

const dummyRoom = {
  name: 'Premier King Room With Garden View',
  images: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
  ],
  features: [
    'Bathtub',
    'Balcony',
    'Mini Bar',
    'Coffee Machine',
    'Smart TV',
    'Sleeps 2',
    '1 King Bed',
    'Garden View',
    'Non-Smoking',
    '45m² | Floor: 5–16',
    'Free Wi-Fi',
    'Air Conditioning',
  ],
  options: [
    {
      breakfast: 'Breakfast for SGD $53.94 (optional)',
      refundable: false,
      reschedulable: false,
      prepay: true,
      price: 219,
      totalPrice: 1239,
    },
    {
      breakfast: 'Free Breakfast for 2',
      refundable: true,
      reschedulable: true,
      prepay: true,
      price: 249,
      totalPrice: 1339,
    },
  ],
};

export function HotelDetails({ name, starRating, address, reviewScore }: HotelDetailsProps) {
  return (
    <>
      <Group justify="space-between" align="stretch">
        <Stack gap={'xs'}>
          <Text fz={'h2'}>{name}</Text>
          <RatingStars rating={starRating} size={24} />
          <LocationDisplay address={address} fontSize={'md'} />

          <Group gap={'xs'}>
            <ShareButton width={120} />
            <SaveButton width={120} />
          </Group>
        </Stack>

        <ReviewScoreLarge score={reviewScore} />
      </Group>
      <Flex justify="space-between" wrap="wrap" mt="xl" gap="xl">
        <Box style={{ flex: 1, minWidth: 300 }}>
          <AmenitiesList amenities={dummyAmenities} />
        </Box>
        <Box style={{ flex: 1, minWidth: 300 }}>
          <SurroundingsList surroundings={dummySurroundings} />
        </Box>
      </Flex>

      <RoomCard
        name={dummyRoom.name}
        images={dummyRoom.images}
        features={dummyRoom.features}
        options={dummyRoom.options}
      />
    </>
  );
}
