import { Box, Text } from '@mantine/core';
import { RoomCard } from '@/components/Room/RoomCard';
import roomData from '@/.mock_data/price.json';

export function HotelRoomsSection() {
  const rooms = roomData.rooms || [];

  return (
    <Box mt="xl">
      <Text fz="h2" mb="sm">
        Rooms
      </Text>

      {rooms.map((room, idx) => {
        const images = room.images.map((img) => img.url);
        return (
          <RoomCard
            key={room.key || idx}
            name={room.roomNormalizedDescription}
            images={images}
            features={room.amenities}
            options={[
              {
                title: room.description,
                refundable: room.free_cancellation,
                reschedulable: true,
                breakfast: room.amenities.includes('Breakfast') ? 'Included' : 'Not included',
                prepay: true,
                price: room.price,
                totalPrice: room.price,
              },
            ]}
          />
        );
      })}
    </Box>
  );
}
