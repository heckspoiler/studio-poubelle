'use client';
import React, { useRef, useState } from 'react';
import styles from './ScrollIndicator.module.css';
import Arrow from './Arrow';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/all';

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin);

export default function ScrollIndicator() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useGSAP(
    () => {
      if (!textRef.current) return;

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

      // Set up hover animation
      const hoverAnimation = gsap.to(split.chars, {
        y: 15,
        rotateY: 180,
        duration: 0.3,
        paused: true,
        stagger: 0.05,
      });

      // Attach event listeners
      const element = textRef.current as HTMLElement;
      element.addEventListener('mouseenter', () => hoverAnimation.play());
      element.addEventListener('mouseleave', () => hoverAnimation.reverse());

      return () => {
        split.revert();
        element.removeEventListener('mouseenter', () => hoverAnimation.play());
        element.removeEventListener('mouseleave', () =>
          hoverAnimation.reverse()
        );
      };
    },
    { scope: textRef }
  );

  return (
    <div className={styles.Container}>
      <div className={styles.InnerContainer} ref={textRef}>
        <h2>scroll</h2>
        <h2>down</h2>
        {/* <Arrow isFinished={isFinished} /> */}
      </div>
    </div>
  );
}
