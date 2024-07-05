'use client';

import { Canvas, Viewport } from '@react-three/fiber';
import Model from './Model';
import React, { useEffect } from 'react';
import { isMobileStore } from '@/app/stores/isMobileStore';

export default function Scene() {
  const setIsMobile = isMobileStore().setIsMobile;
  const isMobile = isMobileStore().isMobile;
  const width = window.innerWidth;

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    }
  }, [window.onload]);

  return (
    <Canvas>
      <Model />
    </Canvas>
  );
}
