import { useFrame } from '@react-three/fiber';
import { AtmosphereMaterial } from './materials/AtmosphereMaterial';
import { EarthMaterial } from './materials/EarthMaterial';
import { useRef } from 'react';
import * as THREE from 'three';
import { Marker } from './Marker';
import { PresentationControls } from '@react-three/drei';

interface ThreeSceneProps {
  position?: [number, number, number];
}

export function ThreeScene({ position = [0, 0, 0] }: ThreeSceneProps) {
  const earthRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * 0.05;
  });

  return (
    <>
      <group position={position} ref={earthRef}>
        <PresentationControls polar={[-0.1, 0.1]} speed={2}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2, 64, 64]} />
            <EarthMaterial />
          </mesh>
          <mesh position={[0, 0, 0]} scale={1.01}>
            <sphereGeometry args={[2, 64, 64]} />
            <AtmosphereMaterial />
          </mesh>
          <Marker earthCenter={new THREE.Vector3(...position)} />
        </PresentationControls>
      </group>
    </>
  );
}
