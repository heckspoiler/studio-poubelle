'use client';

import { Canvas } from '@react-three/fiber';
import Model from './Model';
import React from 'react';

export default function Scene() {
  return (
    <Canvas>
      <Model />
    </Canvas>
  );
}
