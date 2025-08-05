import { Box, Text, Center, Loader } from '@mantine/core';
import { RoomCard } from '@/components/Room/RoomCard';
import { useRooms } from '@/features/HotelPage/useRooms';
import { useHotel } from '@/features/HotelPage/useHotel';
import { useSearch } from '@tanstack/react-router';
import { parseRoomFeatures } from '@/utils/parseRoomFeatures';
import type { RoomRaw } from '@/schemas/roomResult';

interface RoomOption {
  title: string;
  refundable: boolean;
  breakfast: string;
  price: number;
  totalPrice: number;
}

function groupByRoomType(rooms: RoomRaw[]): Record<string, RoomRaw[]> {
  return rooms.reduce(
    (acc, room) => {
      const key = room.roomNormalizedDescription;
      if (!acc[key]) acc[key] = [];
      acc[key].push(room);
      return acc;
    },
    {} as Record<string, RoomRaw[]>
  );
}

function getNumberOfNights(checkin: string, checkout: string): number {
  const inDate = new Date(checkin);
  const outDate = new Date(checkout);
  return Math.round((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
}

export function HotelRoomsSection() {
  const { data: hotel, isLoading: hotelLoading } = useHotel();
  const { data: roomData, isLoading, error } = useRooms();
  const { date, guests } = useSearch({ from: '/hotels/$hotelId' });
  const [checkin, checkout] = date;

  if (isLoading || hotelLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (error || !roomData || !hotel) {
    return (
      <Center py="xl">
        <Text c="red">Failed to load rooms. Please try again later.</Text>
      </Center>
    );
  }

  const rooms: RoomRaw[] = roomData.rooms || [];

  if (rooms.length === 0) {
    return (
      <Center py="xl">
        <Text>No rooms available for the selected dates.</Text>
      </Center>
    );
  }

  const groupedRooms = groupByRoomType(rooms);

  const safeCheckin = checkin ?? '';
  const safeCheckout = checkout ?? '';
  const nights = getNumberOfNights(safeCheckin, safeCheckout);

  return (
    <Box mt="xl">
      <Text fz="h2" mb="sm">
        Rooms
      </Text>

      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {Object.entries(groupedRooms).map(([roomName, variations]) => {
          const firstRoom = variations[0];
          const images = firstRoom.images.length
            ? firstRoom.images.map((img) => img.url)
            : ['/fallback-room.jpg'];

          const features = parseRoomFeatures(firstRoom.long_description, firstRoom.amenities);

          const options: RoomOption[] = variations.map((room) => {
            const label = room.roomAdditionalInfo?.breakfastInfo?.toLowerCase();
            const hasBreakfast = label?.includes('breakfast') && !label?.includes('room_only');

            return {
              title: room.description,
              refundable: room.free_cancellation,
              breakfast: hasBreakfast ? 'Included' : 'Not included',
              price: room.price,
              totalPrice: room.price,
            };
          });

          return (
            <RoomCard
              key={roomName}
              name={roomName}
              images={images}
              features={firstRoom.amenities}
              options={options}
              size={features.size}
              occupancy={features.occupancy}
              bedType={features.bedType}
              wifi={
                firstRoom.amenities.some((a) => a.toLowerCase().includes('wifi'))
                  ? 'Free WiFi'
                  : 'No WiFi'
              }
              view={features.view}
              tv={features.tv}
              bath={features.bath}
              // Booking
              hotelId={hotel.id}
              destinationId={'RsBU'}
              hotelName={hotel.name}
              hotelAddress={hotel.address}
              hotelImage={images[0]}
              starRating={hotel.rating}
              trustYouScore={hotel.trustyou?.score?.overall || 0}
              checkin={safeCheckin}
              checkout={safeCheckout}
              guests={guests}
              nights={nights}
              currency={'SGD'}
            />
          );
        })}
      </Box>
    </Box>
  );
}
