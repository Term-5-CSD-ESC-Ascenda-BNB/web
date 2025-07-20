import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { latLngToVec3 } from './utils/latLngToVec3';

interface MarkerProps {
  lat?: number;
  lng?: number;
  visible?: boolean;
  earthCenter: THREE.Vector3;
}

export function Marker({ lat = 0, lng = 0, visible = true, earthCenter }: MarkerProps) {
  const gltf = useGLTF('/models/marker.glb');
  const ref = useRef<THREE.Group>(null!);

  const spinAngle = useRef(0); // lookAt resets the rotation so need to keep track of it

  const position = useMemo(() => {
    return latLngToVec3(lat, lng, 2);
  }, [lat, lng]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Always points into the center of the Earth
      ref.current.lookAt(earthCenter);

      // spin effect
      ref.current.rotateZ(spinAngle.current);
      spinAngle.current += (delta * 0.5) % (Math.PI * 2); // Spin the marker
    }
  });

  return (
    <>
      <primitive ref={ref} object={gltf.scene} scale={0.2} position={position} visible={visible} />
    </>
  );
}
