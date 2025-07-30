import { Box, Group, Text, Button } from '@mantine/core';
import { getAmenityIcon } from '@/utils/getAmenityIcon';

interface AmenitiesListProps {
  amenities: string[];
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <Box>
      <Text fz="xl" fw={600} mb="sm">
        Amenities
      </Text>
      <Group gap="xs" wrap="wrap" align="start">
        {amenities.map((item, i) => (
          <Group key={i} gap={8} align="center" style={{ width: '48%' }}>
            {getAmenityIcon(item)}
            <Text>{item}</Text>
          </Group>
        ))}
      </Group>
      <Button
        variant="outline"
        radius="xl"
        size="sm"
        mt="md"
        styles={{
          root: {
            borderColor: '#C4C4C4',
            color: '#000',
            fontWeight: 500,
            padding: '6px 16px',
            backgroundColor: '#fff',
          },
        }}
      >
        View all 30 amenities
      </Button>
    </Box>
  );
}
