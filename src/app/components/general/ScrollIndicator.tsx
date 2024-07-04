'use client';

import React, { useLayoutEffect, useRef } from 'react';
import styles from './ScrollIndicator.module.css';
import Arrow from './Arrow';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, Flip, SplitText);

export default function ScrollIndicator() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(textRef.current, { type: 'chars' });

      gsap.from(split.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        delay: 2,
      });

      return () => split.revert();
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.Container} ref={containerRef}>
      <div className={styles.InnerContainer}>
        <h2 ref={textRef}>scroll</h2>
        <Arrow />
      </div>
    </div>
  );
}
