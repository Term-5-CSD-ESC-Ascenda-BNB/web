import { createContext, useContext } from 'react';

export interface Coords {
  lat: number;
  lng: number;
}

export const CoordsContext = createContext<{
  coords: Coords | null;
  setCoords: (c: Coords | null) => void;
}>({
  coords: null,
  setCoords: () => {},
});

export const useCoords = () => useContext(CoordsContext);
