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
          start: 'top 90%',
          end: 'bottom 80%',
          toggleActions: 'play none none reverse',
          scrub: 0.8,
          // markers: true,
        },
      });

      const scrollTl2 = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 20%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
          scrub: 0.8,
          // markers: true,
        },
      });

      scrollTl.from(split.chars, {
        rotateZ: 120,
        y: (index) => (index < 7 ? -550 : 550),
        x: (index) => (index < 7 ? -550 : 550),
        stagger: 0.05,
        duration: 0.6,
        ease: 'circ.out',
      });
      scrollTl2
        .to(split.chars, {
          y: -500,
          stagger: 0.05,
          duration: 0.6,
          ease: 'linear',
        })
        .set(split.chars, { visibility: 'hidden' }, '>');
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
