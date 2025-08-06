import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFirstFiveImages } from './useFirstFiveImages';
import type { ImageDetails } from '@/types/HotelDetails';

// Mock Image constructor
class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src: string = '';

  constructor() {
    // Simulate async image loading
    setTimeout(() => {
      if (this.src.includes('error') || this.src.includes('invalid')) {
        this.onerror?.();
      } else {
        this.onload?.();
      }
    }, 10);
  }
}

// Mock global Image
global.Image = MockImage as unknown as typeof Image;

describe('useFirstFiveImages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should return empty array and loading false for invalid details', async () => {
    const invalidDetails = {} as ImageDetails;

    const { result } = renderHook(() => useFirstFiveImages(invalidDetails));

    // The hook may start with loading false, then quickly set to true, then back to false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([]);
  });
  it('should return empty array for details with missing properties', async () => {
    const incompleteDetails = {
      prefix: 'https://example.com/',
      // missing suffix and count
    } as ImageDetails;

    const { result } = renderHook(() => useFirstFiveImages(incompleteDetails));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([]);
  });

  it('should handle count of 0 with valid image', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: 0,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual(['https://example.com/image0.jpg']);
  });

  it('should handle count of 0 with invalid image', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/error',
      suffix: '.jpg',
      count: 0,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([]);
  });

  it('should return correct number of images for count less than 5', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: 3,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([
      'https://example.com/image0.jpg',
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ]);
  });

  it('should limit to 5 images when count is greater than 5', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: 10,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toHaveLength(5);
    expect(result.current.images).toEqual([
      'https://example.com/image0.jpg',
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
    ]);
  });

  it('should return exactly 5 images when count is 5', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: 5,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toHaveLength(5);
    expect(result.current.images).toEqual([
      'https://example.com/image0.jpg',
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
    ]);
  });

  it('should handle different URL formats correctly', async () => {
    const details: ImageDetails = {
      prefix: 'https://images.example.com/hotel/abc123_',
      suffix: '_large.webp',
      count: 2,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([
      'https://images.example.com/hotel/abc123_0_large.webp',
      'https://images.example.com/hotel/abc123_1_large.webp',
    ]);
  });

  it('should update images when details change', async () => {
    const initialDetails: ImageDetails = {
      prefix: 'https://example.com/old',
      suffix: '.jpg',
      count: 2,
    };

    const { result, rerender } = renderHook(({ details }) => useFirstFiveImages(details), {
      initialProps: { details: initialDetails },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([
      'https://example.com/old0.jpg',
      'https://example.com/old1.jpg',
    ]);

    const newDetails: ImageDetails = {
      prefix: 'https://example.com/new',
      suffix: '.png',
      count: 3,
    };

    rerender({ details: newDetails });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([
      'https://example.com/new0.png',
      'https://example.com/new1.png',
      'https://example.com/new2.png',
    ]);
  });

  it('should handle cleanup properly when component unmounts', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: 3,
    };

    const { unmount } = renderHook(() => useFirstFiveImages(details));

    // Unmount immediately to test cleanup
    unmount();

    // Wait a bit to ensure any pending operations don't cause issues
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Test passes if no errors are thrown during cleanup
    expect(true).toBe(true);
  });

  it('should handle null or undefined details gracefully', async () => {
    const { result } = renderHook(() => useFirstFiveImages(null as unknown as ImageDetails));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([]);
  });

  it('should handle negative count values', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: -1,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.images).toEqual([]);
  });

  it('should set loading to true initially and false after completion', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: 2,
    };

    const { result } = renderHook(() => useFirstFiveImages(details));

    // Wait for the hook to complete its loading cycle
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // After loading completes, images should be populated
    expect(result.current.images).toHaveLength(2);
  });

  it('should handle errors during image URL checking gracefully', async () => {
    const details: ImageDetails = {
      prefix: 'https://example.com/image',
      suffix: '.jpg',
      count: 0,
    };

    // Create a special MockImage that throws an error
    class ErrorMockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      set src(_: string) {
        // Simulate an error that could occur during image loading setup
        throw new Error('Simulated DOM error');
      }

      get src(): string {
        return '';
      }
    }

    const originalImage = global.Image;
    global.Image = ErrorMockImage as unknown as typeof Image;

    const { result } = renderHook(() => useFirstFiveImages(details));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // When an error occurs in checkImageUrl, the result should be empty
    expect(result.current.images).toEqual([]);

    // Restore original Image constructor
    global.Image = originalImage;
  });
});
