'use client';

import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

const Vision: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Scroll-triggered animations for each sentence
  const firstSentenceOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0]);
  const firstSentenceY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [50, 0, 0, -50]);
  
  const secondSentenceOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.9], [0, 1, 1, 0]);
  const secondSentenceY = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.9], [50, 0, 0, -50]);
  
  const thirdSentenceOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 0]);
  const thirdSentenceY = useTransform(scrollYProgress, [0.6, 0.8, 1], [50, 0, -50]);

  // Background parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} id="vision" className={styles.vision}>
      {/* Background Image with Parallax */}
      <motion.div 
        className={styles.vision__background}
        style={{ y: backgroundY }}
      >
        <Image
          src="/images/vision-forest.jpg"
          alt="Visionary forest scene"
          fill
          className={styles.vision__backgroundImage}
          priority
        />
        <div className={styles.vision__overlay} />
      </motion.div>

      {/* Content Container */}
      <div className={styles.vision__container}>
        {/* First Sentence */}
        <motion.div
          className={styles.vision__sentence}
          style={{
            opacity: firstSentenceOpacity,
            y: firstSentenceY,
          }}
        >
          <h2 className={styles.vision__text}>
            Born from a need to reset.
          </h2>
        </motion.div>

        {/* Second Sentence */}
        <motion.div
          className={styles.vision__sentence}
          style={{
            opacity: secondSentenceOpacity,
            y: secondSentenceY,
          }}
        >
          <h2 className={styles.vision__text}>
            Vital Ice brings ancient rituals to modern rhythms.
          </h2>
        </motion.div>

        {/* Third Sentence */}
        <motion.div
          className={styles.vision__sentence}
          style={{
            opacity: thirdSentenceOpacity,
            y: thirdSentenceY,
          }}
        >
          <h2 className={styles.vision__text}>
            Here, recovery is clarity.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
