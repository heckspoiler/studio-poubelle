import React, { useRef } from 'react';
import styles from './SecondSection.module.css';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export const SecondSection = () => {
  const containerRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const textRefs = [firstTextRef, secondTextRef, thirdTextRef];

      textRefs.forEach((textRef, index) => {
        if (!textRef.current) return;

        const split = new SplitText(textRef.current, {
          type: 'lines, words, chars',
        });

        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 90%', // Animation starts when the top of the text enters the bottom of the viewport
            end: 'bottom 60%', // Animation ends when the bottom of the text reaches 80% of the viewport height
            scrub: 0.8, // Smooth scrubbing effect
            // markers: true,
          },
          opacity: 0,
          y: 100,
          stagger: 0.01,
          ease: 'power2.out',
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.Main} ref={containerRef}>
      <div className={styles.Container}>
        <div className={styles.TextContainer}>
          <h2 ref={firstTextRef}>
            We deliver Hi Quality Web Solutions for your Small business or
            whatever you need from us
          </h2>
        </div>
        <div className={styles.TextContainer}>
          <h2 ref={secondTextRef}>
            While making sure you're standing out from the crowd
          </h2>
        </div>
        <div className={styles.TextContainer}>
          <h2 ref={thirdTextRef}>
            Individual solutions for individual preferences
          </h2>
        </div>
      </div>
    </section>
  );
};
