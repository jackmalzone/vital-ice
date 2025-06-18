'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/utils/animations';
import styles from './Hero.module.css';

const Hero: FC = () => {
  return (
    <section className={styles.hero}>
      {/* Video Background */}
      <div className={styles.hero__videoContainer}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.hero__video}
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className={styles.hero__overlay} />
      </div>

      {/* Content */}
      <div className={styles.hero__content}>
        <motion.div
          className={styles.hero__textContainer}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <motion.h1 
            className={styles.hero__title}
            variants={fadeInUp}
          >
            Vital Ice
          </motion.h1>
          <motion.p 
            className={styles.hero__subtitle}
            variants={fadeInUp}
          >
            Recovery and wellness through cold therapy
          </motion.p>
          <motion.div variants={fadeInUp}>
            <button className={styles.hero__button}>
              Book Now
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.hero__scrollIndicator}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className={styles.hero__scrollIndicatorContainer}>
          <motion.div
            className={styles.hero__scrollIndicatorDot}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 