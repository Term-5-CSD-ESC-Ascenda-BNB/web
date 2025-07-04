import { useRef, useCallback } from 'react';
import priceTagStyles from '@/components/HotelMap/PriceTag.module.css';

export function useMarkerHover() {
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const makeMarkerRef = useCallback(
    (id: string) => (marker: L.Marker | null) => {
      if (marker) {
        markerRefs.current[id] = marker;
      } else {
        delete markerRefs.current[id];
      }
    },
    []
  );

  const handleMouseEnter = useCallback((id: string) => {
    const m = markerRefs.current[id];
    if (!m) return;
    const target = m.getElement()?.querySelector(`.${priceTagStyles.priceTag}`);
    target?.classList.add(priceTagStyles.priceTagHovered);
  }, []);

  const handleMouseLeave = useCallback((id: string) => {
    const m = markerRefs.current[id];
    if (!m) return;
    const target = m.getElement()?.querySelector(`.${priceTagStyles.priceTag}`);
    target?.classList.remove(priceTagStyles.priceTagHovered);
  }, []);

  return { makeMarkerRef, handleMouseEnter, handleMouseLeave };
}
