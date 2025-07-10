import { AspectRatio, Image, SimpleGrid, useMantineTheme } from '@mantine/core';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const theme = useMantineTheme();
  const [main, ...thumbs] = images;

  return (
    <div style={{ borderRadius: theme.radius.lg, overflow: 'hidden', width: '100%' }}>
      <SimpleGrid cols={2} spacing={'xs'} w={'auto'}>
        {/* Main image on the left */}
        <AspectRatio ratio={1}>
          <Image src={main} />
        </AspectRatio>

        {/* 2x2 Grid on the right */}
        <AspectRatio ratio={1}>
          <SimpleGrid cols={2} spacing={'xs'}>
            {thumbs.map((src, index) => (
              <Image key={index} src={src} h={'100%'} />
            ))}
          </SimpleGrid>
        </AspectRatio>
      </SimpleGrid>
    </div>
  );
}
