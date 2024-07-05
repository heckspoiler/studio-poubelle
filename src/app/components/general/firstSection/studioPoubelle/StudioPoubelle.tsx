'use client';

import React, { useRef, useState, useEffect } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin, ScrollTrigger);

export default function StudioPoubelle({ styles }: { styles: any }) {
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
        x: (index) => (index % 2 === 0 ? 50 : -50),
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    },
    { scope: textRef }
  );

  return (
    <div className={styles.TitleContainer}>
      <h1 ref={textRef} className={styles.Title}>
        StudioPoubelle
      </h1>
    </div>
  );
}
