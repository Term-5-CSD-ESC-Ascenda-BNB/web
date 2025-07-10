import React from 'react';
import { AspectRatio, Flex, Group, Image, SimpleGrid, useMantineTheme } from '@mantine/core';

interface ImageGalleryProps {
  images: string[];
  galleryHeight?: string | number;
}

export function ImageGallery({ images, galleryHeight = 550 }: ImageGalleryProps) {
  const theme = useMantineTheme();
  const [main, ...thumbs] = images;

  return (
    <Flex justify={'center'}>
      <div style={{ borderRadius: theme.radius.md, overflow: 'hidden' }}>
        <Group h={galleryHeight} gap={'xs'} w={'auto'}>
          {/* Main image on the left */}
          <AspectRatio ratio={1}>
            <Image src={main} h={galleryHeight} />
          </AspectRatio>

          {/* 2x2 Grid on the right */}
          <AspectRatio ratio={1}>
            <SimpleGrid cols={2} spacing={'xs'} h={galleryHeight}>
              {thumbs.map((src, index) => (
                <Image key={index} src={src} h={'100%'} />
              ))}
            </SimpleGrid>
          </AspectRatio>
        </Group>
      </div>
    </Flex>
  );
}
