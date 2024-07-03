import React, { useRef, useState, useEffect } from 'react';
import { useControls } from 'leva';
import { fragment, vertex } from './shader';
import { useFrame, useThree } from '@react-three/fiber';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';
import { useAspect, useTexture } from '@react-three/drei';

export default function Model() {
  const plane = useRef<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);
  const materialRef = useRef<Material | Material[]>();
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0, min: 0, max: 5, step: 0.05 },
    waveLength: { value: 0, min: 0, max: 20, step: 1 },
  });

  const texture = useTexture('/images/icon.png');
  const { width, height } = texture.image;
  const { viewport } = useThree();
  const scale = useAspect(width, height, 0.25);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
    uMouse: { value: [0, 0] },
  });

  useFrame(() => {
    if (
      plane.current &&
      plane.current.material &&
      'uniforms' in plane.current.material
    ) {
      (plane.current.material as any).uniforms.uWaveLength.value = waveLength;
    }

    if (
      plane.current &&
      plane.current.material &&
      'uniforms' in plane.current.material
    ) {
      (plane.current.material as any).uniforms.uAmplitude.value = amplitude;
    }

    // if (
    //   plane.current &&
    //   plane.current.material &&
    //   'uniforms' in plane.current.material
    // ) {
    //   (plane.current.material as any).uniforms.uTime.value += 0.02;
    // }

    if (
      plane.current &&
      plane.current.material &&
      'uniforms' in plane.current.material
    ) {
      (plane.current.material as any).uniforms.uMouse.value = [
        (mousePosition.x * viewport.width) / 16,
        (mousePosition.y * viewport.height) / 6,
      ];
    }
  });

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 65, 65]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
