import { Canvas } from '@react-three/fiber';
import { ThreeScene } from './ThreeScene';
import { Environment, OrbitControls } from '@react-three/drei';

export function ThreeCanvas() {
  return (
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
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <Environment preset="warehouse" backgroundIntensity={0.5} />

        <ThreeScene />
      </Canvas>
    </div>
  );
}
