import { Box, Text } from '@mantine/core';
import { RoomCard } from '@/components/Room/RoomCard';
import roomData from '@/.mock_data/price.json';
import { parseRoomFeatures } from '@/utils/parseRoomFeatures';

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
  roomAdditionalInfo?: {
    breakfastInfo?: string;
  };
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
        {Object.entries(groupedRooms).map(([roomName, variations]) => {
          const firstRoom = variations[0];
          const images = firstRoom.images.map((img) => img.url);
          const features = parseRoomFeatures(firstRoom.long_description, firstRoom.amenities);

          const options: RoomOption[] = variations.map((room) => {
            const label = room.roomAdditionalInfo?.breakfastInfo?.toLowerCase();
            const hasBreakfast = label?.includes('breakfast') && !label?.includes('room_only');

            return {
              title: room.description,
              refundable: room.free_cancellation,
              refundableUntil: room.free_cancellation ? 'Sep 26' : undefined,
              reschedulable: true,
              breakfast: hasBreakfast ? 'Included' : 'Not included',
              prepay: true,
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
            />
          );
        })}
      </Box>
    </Box>
  );
}
