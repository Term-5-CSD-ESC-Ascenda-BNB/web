import { useAtmosphereControls } from './leva/useAtmosphereControls';
import { useSunDirection } from './leva/useSunDirection';

/**
 * Initialize Leva controls
 */
export function useLevaControls() {
  useSunDirection();
  useAtmosphereControls();
}
