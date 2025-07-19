import { Canvas } from '@react-three/fiber';
import { ThreeScene } from './ThreeScene';
import { Environment } from '@react-three/drei';
import { Leva } from 'leva';
import { useAtmosphereControls } from './hooks/useAtmosphereControls';

export function ThreeCanvas() {
  // Init atmosphere controls
  useAtmosphereControls();

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
        <Canvas orthographic camera={{ zoom: 170, position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <Environment preset="warehouse" backgroundIntensity={0.5} />

          <ThreeScene position={[2, 0, 0]} />
        </Canvas>
      </div>
    </>
  );
}
