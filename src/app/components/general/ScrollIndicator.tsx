'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './ScrollIndicator.module.css';
import Arrow from './Arrow';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/all';

gsap.registerPlugin(useGSAP, Flip, SplitText, DrawSVGPlugin);

export default function ScrollIndicator() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useGSAP(
    () => {
      const split = new SplitText(textRef.current, { type: 'chars' });
      gsap.from(split.chars, {
        opacity: 0,
        rotateX: 135,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1,
        onComplete: () => setIsFinished(true),
      });

      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.Container} ref={containerRef}>
      <div className={styles.InnerContainer}>
        <h2 ref={textRef}>scroll</h2>
        <div ref={arrowRef}>
          <Arrow isFinished={isFinished} />
        </div>
      </div>
    </div>
  );
}
