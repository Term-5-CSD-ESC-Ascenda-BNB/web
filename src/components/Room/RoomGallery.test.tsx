import { render, screen } from '@/tests/utils';
import { RoomGallery } from './RoomGallery';
import { expect, describe, it, vi } from 'vitest';

vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core');
  return {
    ...actual,
    Image: ({ src, alt }: { src: string; alt: string }) => (
      <img src={src} alt={alt} data-testid="image" />
    ),
  };
});

describe('RoomGallery', () => {
  const images = ['main.jpg', 'thumb1.jpg', 'thumb2.jpg'];

  it('renders the main image', () => {
    render(<RoomGallery images={images} />);

    const mainImage = screen.getByAltText('Main room image');
    expect(mainImage).toHaveAttribute('src', 'main.jpg');
  });

  it('renders both thumbnails', () => {
    render(<RoomGallery images={images} />);

    const thumb1 = screen.getByAltText('Thumb 1');
    const thumb2 = screen.getByAltText('Thumb 2');

    expect(thumb1).toHaveAttribute('src', 'thumb1.jpg');
    expect(thumb2).toHaveAttribute('src', 'thumb2.jpg');
  });
});
