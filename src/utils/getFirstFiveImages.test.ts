import { describe, it, expect } from 'vitest';
import { getFirstFiveImages } from './getFirstFiveImages';
import type { ImageDetails } from '@/types/HotelDetails';

describe('getFirstFiveImages', () => {
  it('should return an array of 5 image URLs when count is greater than 5', () => {
    const imageDetails: ImageDetails = {
      prefix: 'https://example.com/image_',
      suffix: '.jpg',
      count: 10,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(5);
    expect(result).toEqual([
      'https://example.com/image_0.jpg',
      'https://example.com/image_1.jpg',
      'https://example.com/image_2.jpg',
      'https://example.com/image_3.jpg',
      'https://example.com/image_4.jpg',
    ]);
  });

  it('should return an array with the exact count when count is less than 5', () => {
    const imageDetails: ImageDetails = {
      prefix: 'https://example.com/image_',
      suffix: '.png',
      count: 3,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      'https://example.com/image_0.png',
      'https://example.com/image_1.png',
      'https://example.com/image_2.png',
    ]);
  });

  it('should return an array with exactly 5 URLs when count equals 5', () => {
    const imageDetails: ImageDetails = {
      prefix: '/assets/hotel_',
      suffix: '.webp',
      count: 5,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(5);
    expect(result).toEqual([
      '/assets/hotel_0.webp',
      '/assets/hotel_1.webp',
      '/assets/hotel_2.webp',
      '/assets/hotel_3.webp',
      '/assets/hotel_4.webp',
    ]);
  });

  it('should return empty array when count is 0', () => {
    const imageDetails: ImageDetails = {
      prefix: 'https://example.com/image_',
      suffix: '.jpg',
      count: 0,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return empty array when imageDetails is null', () => {
    const result = getFirstFiveImages(null as unknown as ImageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return empty array when imageDetails is undefined', () => {
    const result = getFirstFiveImages(undefined as unknown as ImageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return empty array when prefix is missing', () => {
    const imageDetails: Partial<ImageDetails> = {
      suffix: '.jpg',
      count: 3,
    };

    const result = getFirstFiveImages(imageDetails as ImageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return empty array when suffix is missing', () => {
    const imageDetails: Partial<ImageDetails> = {
      prefix: 'https://example.com/image_',
      count: 3,
    };

    const result = getFirstFiveImages(imageDetails as ImageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return empty array when prefix is empty string', () => {
    const imageDetails: ImageDetails = {
      prefix: '',
      suffix: '.jpg',
      count: 3,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return empty array when suffix is empty string', () => {
    const imageDetails: ImageDetails = {
      prefix: 'https://example.com/image_',
      suffix: '',
      count: 3,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should handle negative count by returning empty array', () => {
    const imageDetails: ImageDetails = {
      prefix: 'https://example.com/image_',
      suffix: '.jpg',
      count: -1,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should work with different URL formats and file extensions', () => {
    const imageDetails: ImageDetails = {
      prefix: 'https://cdn.hotel.com/rooms/deluxe_',
      suffix: '.jpeg',
      count: 2,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      'https://cdn.hotel.com/rooms/deluxe_0.jpeg',
      'https://cdn.hotel.com/rooms/deluxe_1.jpeg',
    ]);
  });

  it('should work with special characters in prefix and suffix', () => {
    const imageDetails: ImageDetails = {
      prefix: 'https://example.com/hotel-room_',
      suffix: '_high-res.jpg',
      count: 3,
    };

    const result = getFirstFiveImages(imageDetails);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      'https://example.com/hotel-room_0_high-res.jpg',
      'https://example.com/hotel-room_1_high-res.jpg',
      'https://example.com/hotel-room_2_high-res.jpg',
    ]);
  });
});
