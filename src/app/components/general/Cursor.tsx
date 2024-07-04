'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';
import CursorArrow from './CursorArrow';

export default function Cursor() {
  const cursorRef = useRef(null);
  const isTouchDevice = 'ontouchstart' in window;
  useEffect(() => {
    const cursor = cursorRef.current;

    if (isTouchDevice || !cursor) {
      return;
    }

    window.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      const target = e.target as HTMLElement;
      const isTargetLinkOrBtn =
        target?.closest('a') || target?.closest('button');
      gsap.to(cursor, {
        x: x - 15,
        y: y - 15,
        duration: 0.2,
        ease: 'power4',
        opacity: isTargetLinkOrBtn ? 0.6 : 1,
        transform: `scale(${isTargetLinkOrBtn ? 3.5 : 1})`,
      });
    });

    document.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        duration: 0.7,
        opacity: 0,
      });
    });
  }, []);

  return (
    <div className={styles.Container} ref={cursorRef}>
      <CursorArrow />
    </div>
  );
}
