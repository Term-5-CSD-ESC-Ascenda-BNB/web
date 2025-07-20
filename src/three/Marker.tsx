import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { latLngToVec3 } from './utils/latLngToVec3';
import { useCoords } from '@/context/coords-store';

interface MarkerProps {
  earthCenter: THREE.Vector3;
  earthRadius: number;
}

export function Marker({ earthCenter, earthRadius }: MarkerProps) {
  const gltf = useGLTF('/models/marker.glb');
  const ref = useRef<THREE.Group>(null!);

  const spinAngle = useRef(0); // lookAt resets the rotation so need to keep track of it

  const { coords } = useCoords();
  const isVisible = coords !== null;
  const position = isVisible
    ? latLngToVec3(coords.lat, coords.lng, earthRadius + 0.01)
    : new THREE.Vector3(0, 0, 0);

  useFrame((state, delta) => {
    if (ref.current) {
      // Always points into the center of the Earth
      ref.current.lookAt(earthCenter);

      // spin effect
      ref.current.rotateZ(spinAngle.current);
      spinAngle.current += (delta * 0.5) % (Math.PI * 2);
    }
  });

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        scale={0.2}
        position={position}
        visible={isVisible}
      />
    </>
  );
}
