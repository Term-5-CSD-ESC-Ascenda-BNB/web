import { Canvas } from '@react-three/fiber';
import { ThreeScene } from './ThreeScene';
import { Environment, Loader, OrbitControls, PresentationControls } from '@react-three/drei';
import { Leva } from 'leva';
import { useLevaControls } from './hooks/useLevaControls';
import { Suspense } from 'react';

export function ThreeCanvas() {
  // Init atmosphere controls
  useLevaControls();

  //TODO: retrieve lat/lng coords from search destination and create a marker at those coordiantes on the globe

  // TODO currently the Suspense fallback is just a text message might make it look better later

  return (
    <>
      <Leva hidden={window.location.hash !== '#debug'} />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <Suspense fallback={null}>
          <Canvas orthographic camera={{ zoom: 170, position: [0, 0, 10] }}>
            {/* <Canvas camera={{ position: [0, 0, 10], fov: 30 }}> */}
            {/* <OrbitControls /> */}
            <ambientLight intensity={0.5} />
            <Environment preset="warehouse" backgroundIntensity={0.5} />
            <ThreeScene position={[1.8, 0, 0]} />
          </Canvas>
        </Suspense>
        <Loader containerStyles={{ backgroundColor: 'transparent' }} />
      </div>
    </>
  );
}
