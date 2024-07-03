import React, { useRef } from 'react';
import { useControls } from 'leva';
import { fragment, vertex } from './shader';
import { useFrame } from '@react-three/fiber';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';

export default function Model() {
  const plane = useRef<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);
  const materialRef = useRef<Material | Material[]>();
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 1, min: 0, max: 2, step: 0.1 },
    waveLength: { value: 0, min: 0, max: 20, step: 1 },
  });

  const uniforms = useRef({
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  });

  useFrame((state) => {
    if (
      plane.current &&
      plane.current.material &&
      'uniforms' in plane.current.material
    ) {
      (plane.current.material as any).uniforms.uWaveLength.value = waveLength;
    }
  });

  return (
    <mesh ref={plane}>
      <planeGeometry args={[3, 3, 45, 45]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        wireframe={true}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
