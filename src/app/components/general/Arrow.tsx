import React, { useRef } from 'react';
import styles from './Arrow.module.css';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(DrawSVGPlugin);

export default function Arrow() {
  return (
    <svg
      width="491"
      height="382"
      viewBox="0 0 491 382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.Arrow}
    >
      <g filter="url(#filter0_d_10_7)">
        <path
          d="M0 71.1385L184.779 0L209.57 64.3927L301.959 28.8234L348.307 149.21L410.833 125.138L481.972 309.917L297.193 381.055L250.845 260.669L188.319 284.741L163.528 220.348L71.1385 255.918L0 71.1385Z"
          fill="white"
        />
        <path
          d="M210.109 65.7925L301.098 30.7622L346.907 149.749L347.446 151.149L348.846 150.61L409.972 127.076L480.033 309.056L298.054 379.117L252.245 260.13L251.706 258.73L250.306 259.269L189.18 282.802L164.928 219.809L164.389 218.41L162.989 218.949L71.9994 253.979L1.93877 71.9994L183.918 1.93877L208.17 64.9316L208.709 66.3314L210.109 65.7925Z"
          stroke="#E54C58"
          stroke-width="3"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_10_7"
          x="0"
          y="0"
          width="490.972"
          height="381.055"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="9" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.898039 0 0 0 0 0.298039 0 0 0 0 0.345098 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10_7"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10_7"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
