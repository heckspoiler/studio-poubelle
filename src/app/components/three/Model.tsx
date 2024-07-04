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
    uAmplitude: { value: 0 },
    uWaveLength: { value: 0 },
    uMouse: { value: [0, 0] },
    uScrollOffset: { value: 0 },
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollY / maxScroll;
      if (materialRef.current && 'uniforms' in materialRef.current) {
        (materialRef.current as any).uniforms.uScrollOffset.value =
          scrollFraction;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (
      plane.current &&
      plane.current.material &&
      'uniforms' in plane.current.material
    ) {
      (plane.current.material as any).uniforms.uWaveLength.value = 0;
    }

    if (
      plane.current &&
      plane.current.material &&
      'uniforms' in plane.current.material
    ) {
      (plane.current.material as any).uniforms.uAmplitude.value = 0;
    }

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
