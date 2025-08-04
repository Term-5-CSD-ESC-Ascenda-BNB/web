import { Paper, Stack, Text, Title, Divider, Group, Image, Box, Button, Grid } from '@mantine/core';
import React from 'react';

interface HotelInfoProps {
  hotelName: string;
  hotelImage: string;
  address: string;
}

const HotelInfo = ({ hotelName, hotelImage, address }: HotelInfoProps) => {
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="center">
        <Image
          src="https://d2ey9sqrvkqdfs.cloudfront.net/050G/0.jpg"
          radius="md"
          w={400}
          h={370}
          fit="cover"
        />
      </Group>
      <Divider my="sm" />
      <Stack gap={4}>
        <Text size={'xl'} fw={700}>
          ST Residences Novena
        </Text>
        <Text c="dimmed">145A Moulmein Road</Text>
      </Stack>
    </Paper>
  );
};

export default HotelInfo;
