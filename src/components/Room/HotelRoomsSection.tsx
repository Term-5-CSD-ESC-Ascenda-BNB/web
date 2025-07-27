import { Box, Text } from '@mantine/core';
import { RoomCard } from '@/components/Room/RoomCard';
import roomData from '@/.mock_data/price.json';

interface RoomRaw {
  key: string;
  description: string;
  roomDescription: string;
  roomNormalizedDescription: string;
  type: string;
  free_cancellation: boolean;
  long_description: string;
  amenities: string[];
  images: { url: string }[];
  price: number;
}

interface RoomOption {
  title: string;
  refundable: boolean;
  refundableUntil?: string;
  reschedulable: boolean;
  breakfast: string;
  prepay: boolean;
  price: number;
  totalPrice: number;
  promo?: string;
  availability?: string;
}

// Helper: group rooms by normalized description
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

export function HotelRoomsSection() {
  const rooms: RoomRaw[] = roomData.rooms || [];
  const groupedRooms = groupByRoomType(rooms);

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
        {Object.entries(groupedRooms).map(([roomName, variations], idx) => {
          const firstRoom = variations[0];
          const images = firstRoom.images.map((img) => img.url);

          const options: RoomOption[] = variations.map((room, optionIdx) => ({
            title: room.description,
            refundable: room.free_cancellation,
            refundableUntil: room.free_cancellation ? 'Sep 26' : undefined,
            reschedulable: true,
            breakfast: room.amenities.includes('Breakfast') ? 'Included' : 'Not included',
            prepay: true,
            price: room.price,
            totalPrice: room.price,
            promo: optionIdx % 2 === 0 ? 'Bundle & Save $100' : undefined,
            availability: optionIdx % 3 === 0 ? 'Only 2 rooms left at this price' : undefined,
          }));

          return (
            <RoomCard
              key={roomName}
              name={roomName}
              images={images}
              features={firstRoom.amenities}
              options={options}
            />
          );
        })}
      </Box>
    </Box>
  );
}
