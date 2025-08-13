import { Paper, Stack, Text, Divider, Group, Image, Box } from '@mantine/core';

interface HotelInfoProps {
  hotelName: string;
  hotelImage: string;
  address: string;
}

const HotelInfo = ({ hotelName, hotelImage, address }: HotelInfoProps) => {
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="center">
        <Box style={{ aspectRatio: '4 / 3', width: '100%' }}>
          <Image src={hotelImage} radius="md" w="100%" h="100%" fit="cover" />
        </Box>
      </Group>
      <Divider my="sm" />
      <Stack gap={4}>
        <Text size={'xl'} fw={700}>
          {hotelName}
        </Text>
        <Text c="dimmed">{address}</Text>
      </Stack>
    </Paper>
  );
};

export default HotelInfo;
