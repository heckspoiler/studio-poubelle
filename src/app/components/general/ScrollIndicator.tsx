'use client';
import React, { useRef, useState } from 'react';
import styles from './ScrollIndicator.module.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/all';
import { indicatorHoverState } from '@/app/stores/indicatorHoverStore';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin, ScrollTrigger);

export default function ScrollIndicator() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isHovered = indicatorHoverState((state: any) => state.isHovered);
  const setIsHovered = indicatorHoverState((state: any) => state.setIsHovered);

  const handleContainerHover = (isHovered: boolean) => {
    setIsHovered(isHovered);
  };

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = new SplitText(textRef.current, { type: 'chars' });

      const tl = gsap.timeline();

      tl.from(split.chars, {
        opacity: 0,
        rotateX: 135,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1,
      });

      // Hover animation
      const hoverAnimation = gsap.to(split.chars, {
        y: (index) => (index % 2 === 0 ? 10 : 12),
        rotateZ: (index) => (index % 2 === 0 ? 10 : -10),
        duration: (index) => (index % 2 === 0 ? 0.3 : 0.4),
        paused: true,
        stagger: 0.02,
      });
      // ScrollTrigger animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 83%',
          end: 'bottom 40%',
          // markers: true,
          toggleActions: 'play none none reverse',
          onEnter: () => {
            hoverAnimation.pause();
            gsap.set(split.chars, { clearProps: 'y' });
          },
          onLeaveBack: () => {
            hoverAnimation.pause();
            gsap.set(split.chars, { clearProps: 'y' });
          },
        },
      });

      scrollTl.to(split.chars, {
        opacity: 0,
        scale: 0,
        y: -50,
        rotateZ: 0,
        stagger: 0.02,
        duration: 1,
        ease: 'power4.out',
      });

      const element = textRef.current as HTMLElement;
      const handleMouseEnter = () => {
        hoverAnimation.play();
      };
      const handleMouseLeave = () => {
        hoverAnimation.reverse();
      };
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        split.revert();
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: textRef }
  );

  return (
    <div
      className={styles.Container}
      onMouseEnter={() => handleContainerHover(true)}
      onMouseLeave={() => handleContainerHover(false)}
      ref={containerRef}
    >
      <div className={styles.InnerContainer} ref={textRef}>
        <h2>scroll</h2>
        <h2>down</h2>
      </div>
    </div>
  );
}
