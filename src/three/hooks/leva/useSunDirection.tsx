import { useControls } from 'leva';
import * as THREE from 'three';

export function useSunDirection() {
  const { elevation, azimuth } = useControls('Sun Direction', {
    elevation: {
      value: Math.PI / 2,
      min: 0,
      max: Math.PI,
      step: 0.01,
      label: 'Elevation',
    },
    azimuth: {
      value: -1.2,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
      label: 'Azimuth',
    },
  });

  // Convert spherical coordinates to Cartesian coordinates
  const sunSpherical = new THREE.Spherical(1, elevation, azimuth);
  const sunDirection = new THREE.Vector3().setFromSpherical(sunSpherical).normalize();

  return { elevation, azimuth, sunDirection };
}
