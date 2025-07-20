import { shaderMaterial } from '@react-three/drei';
import vertexShader from '@/three/shaders/earth/vertex.glsl';
import fragmentShader from '@/three/shaders/earth/fragment.glsl';
import { TextureLoader } from 'three';
import { extend, useLoader, type ThreeElement } from '@react-three/fiber';
import * as THREE from 'three';
import { useAtmosphereControls } from '../hooks/leva/useAtmosphereControls';
import { useSunDirection } from '../hooks/leva/useSunDirection';

const EarthShaderMaterial = shaderMaterial(
  {
    uDayTexture: new THREE.Texture(),
    uNightTexture: new THREE.Texture(),
    uSpecularCloudsTexture: new THREE.Texture(),
    uSunDirection: new THREE.Vector3(0, 0, 1),
    uAtmosphereDayColor: new THREE.Color('#00aaff'),
    uAtmosphereTwilightColor: new THREE.Color('#ff6600'),
  },
  vertexShader,
  fragmentShader
);

extend({ EarthShaderMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    earthShaderMaterial: ThreeElement<typeof EarthShaderMaterial>;
  }
}

export function EarthMaterial() {
  const { atmosphereDayColor, atmosphereTwilightColor } = useAtmosphereControls();
  const { sunDirection } = useSunDirection();

  const dayTexture = useLoader(TextureLoader, '/textures/earth/day.jpg');
  dayTexture.colorSpace = THREE.SRGBColorSpace;
  dayTexture.anisotropy = 8;

  const nightTexture = useLoader(TextureLoader, '/textures/earth/night.jpg');
  nightTexture.colorSpace = THREE.SRGBColorSpace;
  nightTexture.anisotropy = 8;

  const specularTexture = useLoader(TextureLoader, '/textures/earth/specularClouds.jpg');
  specularTexture.anisotropy = 8;

  return (
    <>
      <earthShaderMaterial
        uDayTexture={dayTexture}
        uNightTexture={nightTexture}
        uSpecularCloudsTexture={specularTexture}
        uSunDirection={sunDirection}
        uAtmosphereDayColor={new THREE.Color(atmosphereDayColor)}
        uAtmosphereTwilightColor={new THREE.Color(atmosphereTwilightColor)}
      />
    </>
  );
}
