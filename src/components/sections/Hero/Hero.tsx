'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import VideoBackground from '@/components/ui/VideoBackground/VideoBackground';
import Logo from '@/components/ui/Logo/Logo';
import styles from './Hero.module.css';

const Hero: FC = () => {
  return (
    <section className={styles.hero}>
      <VideoBackground
        videoSrc="https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/ambient.mp4"
        posterSrc="/images/hero-poster.jpg"
        overlayOpacity={0}
      />
      <div className={styles.hero__gradientOverlay} aria-hidden="true" />
      <div className={styles.hero__content}>
        <motion.div className={styles.hero__textContainer} initial="initial" animate="animate">
          <motion.div
            variants={{
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } },
            }}
          >
            <Logo className={styles.heroLogo} />
          </motion.div>
          <motion.h1
            className={styles.hero__headline}
            variants={{
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
            }}
          >
            ELEVATE YOUR RECOVERY
          </motion.h1>
          <motion.p
            className={styles.hero__subhead}
            variants={{
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
            }}
          >
            Cold plunge and sauna experiences
            <br />
            reimagined for modern wellness.
          </motion.p>
          <motion.button
            className={styles.hero__button}
            variants={{
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.9 } },
            }}
            onClick={() => {
              document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join the Waitlist
            <span className={styles.hero__buttonIcon} aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 5L12 10L7 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>

      <div className={styles.hero__scrollIndicator}>
        <div className={styles.hero__scrollIndicatorContainer}>
          <div className={styles.hero__scrollIndicatorDot} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
