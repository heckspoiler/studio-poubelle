import React from 'react';
import { useControls } from 'leva';

export default function Model() {
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 1, min: 0, max: 2, step: 0.1 },
    waveLength: { value: 1, min: 0, max: 20, step: 1 },
  });
  return (
    <mesh>
      <planeGeometry args={[3, 3, 15, 15]} />
      <meshBasicMaterial color={'#e54c58'} wireframe={true} />
    </mesh>
  );
}
