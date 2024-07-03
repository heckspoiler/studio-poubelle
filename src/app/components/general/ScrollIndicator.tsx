import React from 'react';
import styles from './ScrollIndicator.module.css';
import Arrow from './Arrow';

export default function ScrollIndicator() {
  return (
    <div className={styles.Container}>
      <div className={styles.InnerContainer}>
        <h1>scroll</h1>
        <Arrow />
      </div>
    </div>
  );
}
