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
        maxWidth: 360,
        width: '100%',
      }}
    >
      <Image src={main} alt="Main room image" radius="md" height={180} fit="cover" />

      <Box style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
        <Image src={thumb1} alt="Thumb 1" radius="md" height={90} fit="cover" />
        <Image src={thumb2} alt="Thumb 2" radius="md" height={90} fit="cover" />
      </Box>
    </Box>
  );
}
