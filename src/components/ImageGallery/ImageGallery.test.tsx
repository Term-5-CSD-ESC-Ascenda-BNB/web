import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';

// Partially mock Mantine to isolate ImageGallery
vi.mock('@mantine/core', async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
  const actual = await importOriginal();
  return {
    ...actual,
    AspectRatio: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div data-testid="aspect-ratio" {...props}>
        {children}
      </div>
    ),
    SimpleGrid: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div data-testid="simple-grid" {...props}>
        {children}
      </div>
    ),
    Image: ({ src, ...props }: React.ComponentProps<'img'>) => (
      <img data-testid="image" src={src} {...props} />
    ),
    useMantineTheme: () => ({
      radius: { lg: '10px' },
    }),
  };
});

import { ImageGallery } from './ImageGallery';

describe('ImageGallery (presentational)', () => {
  const images = ['main.jpg', 'thumb1.jpg', 'thumb2.jpg', 'thumb3.jpg', 'thumb4.jpg'];

  it('renders all images, main first then thumbs', () => {
    render(<ImageGallery images={images} />);
    const imgs = screen.getAllByTestId('image');
    expect(imgs).toHaveLength(images.length);
    expect(imgs[0]).toHaveAttribute('src', 'main.jpg');
    expect(imgs[1]).toHaveAttribute('src', 'thumb1.jpg');
  });
});
