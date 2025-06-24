'use client';

import { FC } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import VideoBackground from '@/components/ui/VideoBackground/VideoBackground';
import Logo from '@/components/ui/Logo/Logo';
import { textRevealVariants, buttonVariants, springConfigs } from '@/lib/utils/animations';
import styles from './Hero.module.css';

const Hero: FC = () => {
  return (
    <section id="home" className={styles.hero}>
      <VideoBackground
        videoSrc="https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/ambient.mp4"
        posterSrc="/images/hero-poster.jpg"
        overlayOpacity={0}
      />
      <div className={styles.hero__gradientOverlay} aria-hidden="true" />

      {/* Animated Blue Blob Overlay */}
      <motion.div
        className={styles.hero__blueBlob}
        animate={{
          x: [0, -20, 20, -10, 0],
          scaleX: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Logo positioned separately */}
      <motion.div
        className={styles.hero__logoContainer}
        variants={textRevealVariants}
        initial="hidden"
        animate="visible"
        transition={{
          ...springConfigs.gentle,
          duration: 0.8,
        }}
      >
        <Logo className={styles.heroLogo} />
      </motion.div>
      
      <div className={styles.hero__content}>
        <motion.div 
          className={styles.hero__textContainer} 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.h1 
            className={styles.hero__headline}
            variants={textRevealVariants}
            transition={{
              ...springConfigs.responsive,
              duration: 0.8,
            }}
          >
            VITAL ICE SAN FRANCISCO
          </motion.h1>
          
          <motion.p 
            className={styles.hero__subhead}
            variants={textRevealVariants}
            transition={{
              ...springConfigs.gentle,
              duration: 0.8,
            }}
          >
            Cold Plunges. Saunas. Community Recovery.
          </motion.p>
          
          <motion.button
            className={styles.hero__button}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            transition={{
              ...springConfigs.responsive,
              duration: 0.6,
            }}
            onClick={() => {
              document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <motion.span
              className={styles.hero__buttonText}
              whileHover={{ scale: 1.02 }}
              transition={springConfigs.quick}
            >
              Stay in the Loop
            </motion.span>
            <motion.span 
              className={styles.hero__buttonIcon} 
              aria-hidden="true"
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
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
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className={styles.hero__scrollIndicator}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className={styles.hero__scrollIndicatorContainer}>
          <motion.div 
            className={styles.hero__scrollIndicatorDot}
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 
