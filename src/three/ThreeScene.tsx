import { useFrame } from '@react-three/fiber';
import { AtmosphereMaterial } from './materials/AtmosphereMaterial';
import { EarthMaterial } from './materials/EarthMaterial';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Marker } from './Marker';
import { PresentationControls } from '@react-three/drei';
import { useCoords } from '@/context/coords-store';
import { animated, useSpring, easings } from '@react-spring/three';

interface ThreeSceneProps {
  position?: [number, number, number];
}

export function ThreeScene({ position = [0, 0, 0] }: ThreeSceneProps) {
  const earthRef = useRef<THREE.Group>(null!);
  const { coords } = useCoords();
  const isSnapping = useRef(false);

  const [{ rotationY }, api] = useSpring(() => ({
    rotationY: -Math.PI * 1.2,
    config: {
      duration: 700,
      easing: easings.easeInOutCubic,
    },
  }));

  useEffect(() => {
    if (!coords) return;
    const lngRad = -((THREE.MathUtils.degToRad(coords.lng) + Math.PI * 0.75) % (Math.PI * 2));
    const current = rotationY.get();

    void api.start({
      from: { rotationY: current },
      to: { rotationY: lngRad },
      reset: true,
      onStart: () => {
        isSnapping.current = true;
      },
      onRest: () => {
        isSnapping.current = false;
      },
    });
  }, [coords, api, rotationY]);

  useFrame((_, delta) => {
    if (!isSnapping.current) {
      rotationY.set(rotationY.get() + delta * 0.05);
    }
  });

  return (
    <>
      <group position={position}>
        {/* <PresentationControls polar={[-0.1, 0.1]} speed={2}> */}
        <animated.group rotation-y={rotationY} ref={earthRef}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2, 64, 64]} />
            <EarthMaterial />
          </mesh>
          <mesh position={[0, 0, 0]} scale={1.01}>
            <sphereGeometry args={[2, 64, 64]} />
            <AtmosphereMaterial />
          </mesh>
          <Marker earthCenter={new THREE.Vector3(...position)} earthRadius={2} />
        </animated.group>
        {/* </PresentationControls> */}
      </group>
    </>
  );
}
