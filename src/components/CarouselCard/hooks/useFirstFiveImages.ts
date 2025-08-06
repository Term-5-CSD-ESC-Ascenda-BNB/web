import { useState, useEffect } from 'react';
import type { ImageDetails } from '@/types/HotelDetails';

interface UseFirstFiveImagesResult {
  images: string[];
  loading: boolean;
}

export function useFirstFiveImages(details: ImageDetails): UseFirstFiveImagesResult {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isActive = true;

    async function load() {
      setLoading(true);
      if (!details || !details.prefix || !details.suffix || typeof details.count !== 'number') {
        if (isActive) {
          setImages([]);
          setLoading(false);
        }
        return;
      }

      const count = Math.min(details.count, 5);
      let result: string[] = [];

      if (count === 0) {
        const testUrl = `${details.prefix}0${details.suffix}`;
        try {
          const { ok } = await checkImageUrl(testUrl);
          if (ok) result = [testUrl];
        } catch {
          // ignore errors, result stays []
        }
      } else {
        result = Array.from({ length: count }, (_, i) => `${details.prefix}${i}${details.suffix}`);
      }

      if (isActive) {
        setImages(result);
        setLoading(false);
      }
    }

    void load();

    // Cleanup
    return () => {
      isActive = false;
    };
  }, [details]);

  return { images, loading };
}

function checkImageUrl(url: string): Promise<{ ok: boolean }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ ok: true });
    img.onerror = () => resolve({ ok: false });

    // cache-busting is often helpful to avoid a previously cached error
    /* v8 ignore */
    img.src = `${url}${url.includes('?') ? '&' : '?'}_cb=${Date.now()}`;
  });
}
