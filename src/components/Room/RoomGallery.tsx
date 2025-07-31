import { Box, Image } from '@mantine/core';

interface RoomGalleryProps {
  images: string[];
}

export function RoomGallery({ images }: RoomGalleryProps) {
  const main = images[0];
  const thumb1 = images[1];
  const thumb2 = images[2];

  return (
    <Box
      style={{
        display: 'grid',
        gap: 8,
        gridTemplateColumns: '1fr',
        width: '100%', // removed maxWidth
      }}
    >
      <Image
        src={main}
        alt="Main room image"
        radius="md"
        height={220}
        fit="cover"
        style={{ width: '100%' }}
      />

      <Box style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
        <Image src={thumb1} alt="Thumb 1" radius="md" height={100} fit="cover" />
        <Image src={thumb2} alt="Thumb 2" radius="md" height={100} fit="cover" />
      </Box>
    </Box>
  );
}
