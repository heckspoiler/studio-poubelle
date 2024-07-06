'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export const TextComponent = ({ styles }: { styles: any }) => {
  const textRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current || !boxRef.current) {
        console.log('Refs not ready');
        return;
      }

      console.log('Setting up animations');

      const split = new SplitText(textRef.current, { type: 'chars' });
      const box = boxRef.current;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
          scrub: 0.4,
          // markers: true,
          onEnter: () => console.log('ScrollTrigger entered'),
          onLeave: () => console.log('ScrollTrigger left'),
          onEnterBack: () => console.log('ScrollTrigger entered back'),
          onLeaveBack: () => console.log('ScrollTrigger left back'),
        },
      });

      const scrollTl2 = gsap.timeline({
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 30%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
          scrub: 0.4,
          markers: true,
          onEnter: () => console.log('ScrollTrigger entered'),
          onLeave: () => console.log('ScrollTrigger left'),
          onEnterBack: () => console.log('ScrollTrigger entered back'),
          onLeaveBack: () => console.log('ScrollTrigger left back'),
        },
      });

      scrollTl
        .from(box, {
          opacity: 0,
          y: 80,
          duration: 0.4,
          ease: 'power2.out',
        })
        .from(split.chars, {
          opacity: 0,
          rotateY: 120,
          x: (index) => (index % 4 === 0 ? 30 : -30),
          stagger: 0.05,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          box,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(split.chars, {
          opacity: 1,
          rotateY: 0,
        });

      scrollTl2.to(box, {
        x: 600,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.out',
      });

      return () => {
        split.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: boxRef }
  );

  return (
    <div className={styles.TextContainer} ref={boxRef}>
      <h2 ref={textRef}>
        <div className={styles.InnerTextContainer}>
          <strong>SAUCY WEB WORKS</strong>
        </div>
        from Zurich
      </h2>
    </div>
  );
};
