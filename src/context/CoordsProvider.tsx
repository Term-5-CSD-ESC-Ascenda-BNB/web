import { useState, type ReactNode } from 'react';
import { CoordsContext, type Coords } from './coords-store';

export function CoordsProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<Coords | null>(null);

  return <CoordsContext.Provider value={{ coords, setCoords }}>{children}</CoordsContext.Provider>;
}
