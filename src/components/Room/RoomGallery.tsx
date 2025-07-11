import { Image, SimpleGrid } from '@mantine/core';

interface RoomGalleryProps {
  images: string[];
}

export function RoomGallery({ images }: RoomGalleryProps) {
  return (
    <SimpleGrid cols={2} spacing="xs" mt="xs">
      {images.slice(0, 4).map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`Room image ${idx + 1}`}
          radius="md"
          width="100%"
          height={100}
          fit="cover"
        />
      ))}
    </SimpleGrid>
  );
}
