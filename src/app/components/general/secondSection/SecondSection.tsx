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
  const blockRefOne = useRef(null);
  const blockRefTwo = useRef(null);
  const blockRefThree = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const textRefs = [firstTextRef, secondTextRef, thirdTextRef];
      const blockRefs = [blockRefOne, blockRefTwo, blockRefThree];

      textRefs.forEach((textRef, index) => {
        if (!textRef.current) return;

        const split = new SplitText(textRef.current, {
          type: 'lines, words, chars',
        });

        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 100%',
            end: 'bottom 80%',
            scrub: 0.8,
            // markers: true,
          },
          opacity: 0,
          y: 100,
          stagger: 0.01,
          ease: 'power2.out',
        });
      });
      blockRefs.forEach((blockRef, index) => {
        if (!blockRef.current) return;

        gsap.to(blockRef.current, {
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top 20%',
            end: 'bottom top',
            scrub: 1,
            // markers: true,
          },
          x: index % 2 === 0 ? -1000 : 1000,

          y: 100,
          ease: 'power2.out',
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.Main} ref={containerRef}>
      <div className={styles.Container}>
        <div className={styles.TextContainer} ref={blockRefOne}>
          <h2 ref={firstTextRef}>
            We deliver <i>Hi Quality Web Solutions</i> for your Small business
            or whatever you need from us
          </h2>
        </div>
        <div className={styles.TextContainer} ref={blockRefTwo}>
          <h2 ref={secondTextRef}>
            While making sure you're <br />
            <span>standing out</span>
            <br /> from the crowd
          </h2>
        </div>
        <div className={styles.TextContainer} ref={blockRefThree}>
          <h2 ref={thirdTextRef}>
            <strong>Individual solutions </strong>for <br />
            individual preferences
          </h2>
        </div>
      </div>
    </section>
  );
};
