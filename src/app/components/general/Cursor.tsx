'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';
import CursorArrow from './CursorArrow';
import { indicatorHoverState } from '@/app/stores/indicatorHoverStore';

export default function Cursor() {
  const cursorRef = useRef(null);
  const isTouchDevice = 'ontouchstart' in window;
  const isHovered = indicatorHoverState((state: any) => state.isHovered);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (isTouchDevice || !cursor) {
      return;
    }

    const updateCursorPosition = (e: any) => {
      const { clientX: x, clientY: y } = e;

      gsap.to(cursor, {
        x: x - 15,
        y: y - 15,
        transform: `rotate(${isHovered ? -145 : 0}deg) scale(${isHovered ? 1.2 : 1})`,
        duration: 0.3,
        ease: 'power4',
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [isHovered, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className={styles.Container} ref={cursorRef}>
      <CursorArrow />
    </div>
  );
}
