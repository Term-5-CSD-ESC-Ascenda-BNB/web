import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { ReviewScoreSmall } from '@/components/ReviewScoreSmall/ReviewScoreSmall';
import { ReviewScoreSub } from '@/components/ReviewScoreSub/ReviewScoreSub';
import { SaveButton } from '@/components/SaveButton/SaveButton';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { Group, Stack, Text, Box, Flex } from '@mantine/core';
import { AmenitiesList } from '@/components/AmenitiesList/AmenitiesList';
import { SurroundingsList } from '@/components/SurroundingsList/SurroundingsList';
import { RoomCard } from '@/components/Room/RoomCard';

interface HotelDetailsProps {
  name: string;
  starRating: number;
  address: string;
  reviewScore: number;
}

// Dummy data
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
      title: 'Paid Breakfast',
      breakfast: 'Breakfast for SGD $53.94 (optional)',
      refundable: false,
      reschedulable: false,
      prepay: true,
      price: 219,
      totalPrice: 1239,
    },
    {
      title: 'Free Breakfast Option',
      breakfast: 'Free Breakfast for 2',
      refundable: true,
      reschedulable: true,
      prepay: true,
      price: 249,
      totalPrice: 1339,
    },
  ],
};

const guestReviews = [
  {
    username: 'Username',
    rating: 10,
    room: 'Premier King Room With Garden View',
    stayDate: 'January 2025',
    travelerType: 'Solo Traveller',
    comment:
      'Excellent service excellent location excellent amenities excellent design. What a beautiful hotel. We arrived early and our room wasn’t ready but they were able to arrange a room for us to rest in. The service was wonderful — we couldn’t ask for more!',
  },
  {
    username: 'Username',
    rating: 9.8,
    room: 'Family Suite',
    stayDate: 'January 2025',
    travelerType: 'Family',
    comment:
      'Wonderful family stay. Clean, beautiful, and very comfortable. Easy access to dining and shopping. Loved the service and amenities!',
  },
];

export function HotelDetails({ name, starRating, address, reviewScore }: HotelDetailsProps) {
  return (
    <>
      <Group justify="space-between" align="stretch">
        <Stack gap="xs">
          <Text fz="h2">{name}</Text>
          <RatingStars rating={starRating} size={24} />
          <LocationDisplay address={address} fontSize="md" />

          <Group gap="xs">
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

      <Text fz="h2">Rooms</Text>

      <RoomCard
        name={dummyRoom.name}
        images={dummyRoom.images}
        features={dummyRoom.features}
        options={dummyRoom.options}
      />

      <Box mt="xl">
        <Text fz="h2" mb="sm">
          Guest Reviews
        </Text>

        <Group align="center" wrap="nowrap" gap="xl" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Stack align="center" gap={4}>
            <ReviewScoreLarge score={9.0} />
            <Text fz="sm">572 Verified Reviews</Text>
          </Stack>

          <Group justify="space-between" gap="xl" style={{ flexGrow: 1 }}>
            {[
              { label: 'Cleanliness', score: 9.1 },
              { label: 'Amenities', score: 8.9 },
              { label: 'Service', score: 9.7 },
              { label: 'Location', score: 8.7 },
              { label: 'Value', score: 9.3 },
              { label: 'Accuracy', score: 9.8 },
            ].map(({ label, score }) => (
              <Stack key={label} align="center" gap={4}>
                <ReviewScoreSub score={score} />
                <Text fz="xs" style={{ color: '#000' }}>
                  {label}
                </Text>
              </Stack>
            ))}
          </Group>
        </Group>

        <Box mt="xl">
          <Group align="stretch" gap="md" grow style={{ display: 'flex' }}>
            {guestReviews.map((review, index) => (
              <Box
                key={index}
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                {/* Header: User info and score */}
                <Group justify="space-between" align="flex-start" mb="xs">
                  <Group align="center">
                    <Box
                      style={{
                        backgroundColor: '#e9ecef',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                      }}
                    />
                    <Box>
                      <Text fw={600}>{review.username}</Text>
                      <Text fz="sm" c="dimmed">
                        {review.room}
                      </Text>
                      <Text fz="xs" c="dimmed">
                        {review.stayDate} • {review.travelerType}
                      </Text>
                    </Box>
                  </Group>
                  <ReviewScoreSmall score={review.rating} />
                </Group>

                {/* Body: Comment */}
                <Text fz="sm" lh={1.5}>
                  {review.comment}
                </Text>
              </Box>
            ))}
          </Group>
        </Box>
      </Box>
    </>
  );
}
