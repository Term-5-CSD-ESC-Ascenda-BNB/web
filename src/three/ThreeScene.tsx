import { useFrame } from '@react-three/fiber';
import { AtmosphereMaterial } from './AtmosphereMaterial';
import { EarthMaterial } from './EarthMaterial';
import { useRef } from 'react';
import * as THREE from 'three';

export function ThreeScene({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const earthRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * 0.05;
  });

  return (
    <>
      <group position={position} ref={earthRef}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2, 64, 64]} />
          <EarthMaterial />
        </mesh>
        <mesh position={[0, 0, 0]} scale={1.01}>
          <sphereGeometry args={[2, 64, 64]} />
          <AtmosphereMaterial />
        </mesh>
      </group>
    </>
  );
}
