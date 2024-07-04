import React, { useRef } from 'react';
import styles from './Arrow.module.css';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(DrawSVGPlugin);

export default function Arrow({ isFinished }: { isFinished: boolean }) {
  const arrowOutlineRef = useRef(null);
  const arrowFillRef = useRef(null);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(arrowOutlineRef.current, { drawSVG: 0 });
      gsap.set(arrowFillRef.current, { scale: 0, transformOrigin: 'center' });

      // Animate based on isFinished
      if (isFinished) {
        const tl = gsap.timeline();
        tl.to(arrowOutlineRef.current, { drawSVG: '100%', duration: 0.8 }).to(
          arrowFillRef.current,
          { scale: 1, duration: 0.5 },
          '-=0.1'
        );
      }
    },
    { scope: arrowOutlineRef, dependencies: [isFinished] }
  );

  const arrowPath =
    'M283.35 5.85C5.35001 284.75 5.85 284.85 5.85 284.85C-1.95 292.65 -1.95 305.35 5.85 313.05L20.05 327.25C27.85 335.05 40.55 335.05 48.35 327.25L251.35 124.35C257.65 118.05 268.45 122.55 268.45 131.45V581.35C268.45 592.35 277.45 601.35 288.45 601.35H308.45C319.45 601.35 328.45 592.35 328.45 581.35V131.25C328.45 122.35 339.25 117.85 345.55 124.15L548.65 327.25C556.45 335.05 569.15 335.05 576.95 327.25L591.05 313.15C598.85 305.35 598.85 292.65 591.05 284.85L311.75 5.85C303.85 -1.95 291.15 -1.95 283.35 5.85Z';

  return (
    <svg
      width="50%"
      height="50%"
      viewBox="0 0 597 602"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.Arrow}
    >
      <path
        ref={arrowOutlineRef}
        d={arrowPath}
        stroke="#E54C58"
        strokeWidth="20"
        fill="none"
      />
      <path ref={arrowFillRef} d={arrowPath} fill="#E54C58" />
    </svg>
  );
}
