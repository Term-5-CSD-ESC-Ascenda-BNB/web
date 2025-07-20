import { shaderMaterial } from '@react-three/drei';
import vertexShader from './shaders/atmosphere/vertex.glsl';
import fragmentShader from './shaders/atmosphere/fragment.glsl';
import { extend, type ThreeElement } from '@react-three/fiber';
import * as THREE from 'three';
import { useAtmosphereControls } from './hooks/leva/useAtmosphereControls';
import { useSunDirection } from './hooks/leva/useSunDirection';

const AtmosphereShaderMaterial = shaderMaterial(
  {
    uSunDirection: new THREE.Vector3(0, 0, 1),
    uAtmosphereDayColor: new THREE.Color('#00aaff'),
    uAtmosphereTwilightColor: new THREE.Color('#ff6600'),
  },
  vertexShader,
  fragmentShader
);

extend({ AtmosphereShaderMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    atmosphereShaderMaterial: ThreeElement<typeof AtmosphereShaderMaterial>;
  }
}

export function AtmosphereMaterial() {
  const { atmosphereDayColor, atmosphereTwilightColor } = useAtmosphereControls();
  const { sunDirection } = useSunDirection();

  return (
    <>
      <atmosphereShaderMaterial
        uSunDirection={sunDirection}
        uAtmosphereDayColor={new THREE.Color(atmosphereDayColor)}
        uAtmosphereTwilightColor={new THREE.Color(atmosphereTwilightColor)}
        side={THREE.BackSide}
        transparent
      />
    </>
  );
}
