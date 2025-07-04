import { useRef, useCallback } from 'react';
import styles from '@/components/HotelMap/PriceTag.module.css';

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
    const el = m.getElement();
    const child = el?.querySelector(`.${styles.priceTag}`);
    el?.classList.add(styles.onTop);
    child?.classList.add(styles.priceTagHovered);
  }, []);

  const handleMouseLeave = useCallback((id: string) => {
    const m = markerRefs.current[id];
    if (!m) return;
    const el = m.getElement();
    const child = el?.querySelector(`.${styles.priceTag}`);
    el?.classList.remove(styles.onTop);
    child?.classList.remove(styles.priceTagHovered);
  }, []);

  const handlePopupOpen = useCallback((id: string) => {
    const m = markerRefs.current[id];
    if (!m) return;
    const el = m.getElement();
    const child = el?.querySelector(`.${styles.priceTag}`);
    el?.classList.add(styles.onTop);
    child?.classList.add(styles.priceTagActive);
  }, []);

  const handlePopupClose = useCallback((id: string) => {
    const m = markerRefs.current[id];
    if (!m) return;
    const el = m.getElement();
    const child = el?.querySelector(`.${styles.priceTag}`);
    el?.classList.remove(styles.onTop);
    child?.classList.remove(styles.priceTagActive);
  }, []);

  return { makeMarkerRef, handleMouseEnter, handleMouseLeave, handlePopupOpen, handlePopupClose };
}
