'use client';

import React, { useRef, useState, useEffect } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin, ScrollTrigger);

export const TextComponent = ({ styles }: { styles: any }) => {
  const textRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = new SplitText(textRef.current, { type: 'chars' });

      const tl = gsap.timeline();

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 65%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      scrollTl.from(split.chars, {
        opacity: 0,
        rotateY: 120,
        y: (index) => (index % 4 === 0 ? 30 : -30),
        stagger: 0.05,
        delay: (index) => (index < 17 ? 0 : 0.2),
        duration: 0.2,
        ease: 'power2.out',
      });
    },
    { scope: textRef }
  );
  return (
    <div className={styles.TextContainer}>
      <h2 ref={textRef}>
        is a <br />
        <i>Web Development</i>
        <br /> and <br />
        <i>Web Design</i> <br />
        Studio in Zurich, Switzerland
      </h2>
    </div>
  );
};
