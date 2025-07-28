import type { ImageDetails } from '@/types/Hotel';

/**
 * Extracts the first five image URLs from a hotel object.
 * @param imageDetails - The image details object containing prefix, suffix, and count.
 * @return An array of up to five image URLs.
 */
export function getFirstFiveImages(imageDetails: ImageDetails): string[] {
  if (!imageDetails || !imageDetails.prefix || !imageDetails.suffix) {
    return [];
  }

  const images: string[] = [];
  const count = Math.min(imageDetails.count, 5);

  for (let i = 0; i < count; i++) {
    images.push(`${imageDetails.prefix}${i}${imageDetails.suffix}`);
  }

  return images;
}
