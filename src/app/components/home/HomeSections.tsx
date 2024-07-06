'use client';

import React, { useEffect, useRef } from 'react';
import { FirstSection } from '../general/firstSection/FirstSection';
import { SecondSection } from '../general/secondSection/SecondSection';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/all';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import styles from './HomeSections.module.css';
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function HomeSections() {
  const lenisRef = useRef<any | null>(null);

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 100000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  return (
    <section className={styles.Main}>
      <div>
        <FirstSection />
        <SecondSection />
      </div>
    </section>
  );
}
