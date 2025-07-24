import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Surrounding {
  name: string;
  point: { lat: number; lon: number };
  dist: number;
  type: string;
}

interface Props {
  lat: number;
  lng: number;
}

interface OverpassElement {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    amenity?: string;
    shop?: string;
    tourism?: string;
    public_transport?: string;
  };
}

interface OverpassResponse {
  elements: OverpassElement[];
}

export function useSurroundings({ lat, lng }: Props) {
  const [surroundings, setSurroundings] = useState<Surrounding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSurroundings = async () => {
      if (!lat || !lng) return;

      setLoading(true);
      try {
        const query = `
          [out:json];
          (
            node(around:1000,${lat},${lng})[amenity];
            node(around:1000,${lat},${lng})[shop];
            node(around:1000,${lat},${lng})[tourism];
            node(around:1000,${lat},${lng})[public_transport];
          );
          out body;
        `;

        const res = await axios.get<OverpassResponse>('https://overpass-api.de/api/interpreter', {
          params: { data: query },
        });

        const raw = res.data.elements;

        const formatted = raw
          .filter(
            (e): e is OverpassElement & { tags: Required<OverpassElement>['tags'] } =>
              !!e.tags?.name
          )
          .map((e) => {
            const d = haversineDistance(lat, lng, e.lat, e.lon);
            return {
              name: e.tags.name!,
              point: { lat: e.lat, lon: e.lon },
              dist: d,
              type:
                e.tags.amenity ??
                e.tags.shop ??
                e.tags.tourism ??
                e.tags.public_transport ??
                'POI',
            };
          })
          .filter((s: Surrounding) => s.dist <= 300)
          .sort((a, b) => a.dist - b.dist);

        setSurroundings(formatted);
      } catch (err) {
        console.error('[useSurroundings] Error:', err);
        setError(err as Error);
        setSurroundings([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchSurroundings(); // Fixes no-floating-promise warning
  }, [lat, lng]);

  return { surroundings, loading, error };
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
