import React from 'react';
import styles from './FirstSection.module.css';
import StudioPoubelle from './studioPoubelle/StudioPoubelle';
import { TextComponent } from './textComponent/Text';

export const FirstSection = () => {
  return (
    <section className={styles.Main}>
      <div className={styles.Container}>
        <StudioPoubelle styles={styles} />
        <TextComponent styles={styles} />
      </div>
    </section>
  );
};
