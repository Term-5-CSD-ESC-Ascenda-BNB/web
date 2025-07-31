import * as THREE from 'three';

export function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const elevation = THREE.MathUtils.degToRad(90 - lat);
  const azimuth = THREE.MathUtils.degToRad(lng) + Math.PI / 2; // Add PI/2 to align with the globe's coordinate system

  const position = new THREE.Vector3().setFromSphericalCoords(radius, elevation, azimuth);

  return position;
}
