'use client';

import { FC, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as Sentry from '@sentry/nextjs';
import VideoBackground from '@/components/ui/VideoBackground/VideoBackground';
import Logo from '@/components/ui/Logo/Logo';
import { textRevealVariants, buttonVariants, springConfigs } from '@/lib/utils/animations';
import { usePerformance } from '@/lib/store/AppStore';
import styles from './Hero.module.css';

// Video rotation system - alternating cold and hot videos with WebM support
// NOTE: These videos require CORS configuration on the server to work in browsers
const VIDEOS = [
  {
    src: 'https://media.vitalicesf.com/cold-ambient-1.mp4',
    webm: 'https://media.vitalicesf.com/cold-ambient-1.webm',
    type: 'cold',
    textTheme: 'standard',
  },
  {
    src: 'https://media.vitalicesf.com/hot-ambient-1.mp4',
    webm: 'https://media.vitalicesf.com/hot-ambient-1.webm',
    type: 'hot',
    textTheme: 'standard',
  },
  {
    src: 'https://media.vitalicesf.com/cold-ambient-2.mp4',
    webm: 'https://media.vitalicesf.com/cold-ambient-2.webm',
    type: 'cold',
    textTheme: 'standard',
  },
  {
    src: 'https://media.vitalicesf.com/hot-ambient-2.mp4',
    webm: 'https://media.vitalicesf.com/hot-ambient-2.webm',
    type: 'hot',
    textTheme: 'standard',
  },
  {
    src: 'https://media.vitalicesf.com/cold-ambient-3.mp4',
    webm: 'https://media.vitalicesf.com/cold-ambient-3.webm',
    type: 'cold',
    textTheme: 'enhanced', // Stronger shadow for light background
  },
  {
    src: 'https://media.vitalicesf.com/hot-ambient-3.mp4',
    webm: 'https://media.vitalicesf.com/hot-ambient-3.webm',
    type: 'hot',
    textTheme: 'standard',
  },
  {
    src: 'https://media.vitalicesf.com/cold-ambient-4.mp4',
    webm: 'https://media.vitalicesf.com/cold-ambient-4.webm',
    type: 'cold',
    textTheme: 'standard',
  },
  {
    src: 'https://media.vitalicesf.com/hot-ambient-4.mp4',
    webm: 'https://media.vitalicesf.com/hot-ambient-4.webm',
    type: 'hot',
    textTheme: 'standard',
  },
];

// Enhanced text color schemes with better contrast and readability
const TEXT_THEMES = {
  standard: {
    headline: '#ffffff',
    subhead: 'rgba(255, 255, 255, 0.9)',
    button: '#ffffff',
    buttonBg: 'rgba(255, 255, 255, 0.12)',
    buttonBorder: 'rgba(255, 255, 255, 0.25)',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
  },
  enhanced: {
    headline: '#ffffff',
    subhead: 'rgba(255, 255, 255, 0.9)',
    button: '#ffffff',
    buttonBg: 'rgba(255, 255, 255, 0.12)',
    buttonBorder: 'rgba(255, 255, 255, 0.25)',
    textShadow: '0 3px 12px rgba(0, 0, 0, 0.7)', // Stronger shadow for light backgrounds
  },
};

const Hero: FC = () => {
  const { performanceProfile, updatePerformanceProfile } = usePerformance();
  const { currentVideoIndex } = performanceProfile;
  const { scrollYProgress } = useScroll();
  const currentVideoIndexRef = useRef(currentVideoIndex);

  // Get current video theme
  const currentVideo = VIDEOS[currentVideoIndex];
  const currentTheme =
    TEXT_THEMES[(currentVideo?.textTheme as keyof typeof TEXT_THEMES) || 'standard'];

  // Mobile-optimized: Remove scroll effects on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const blurAmount = useTransform(scrollYProgress, [0, 0.1], [isMobile ? 0 : 8, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, isMobile ? 1 : 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, isMobile ? 0 : -20]);

  // Update ref when currentVideoIndex changes
  useEffect(() => {
    currentVideoIndexRef.current = currentVideoIndex;
  }, [currentVideoIndex]);

  // Simple video rotation - no complex performance detection
  useEffect(() => {
    return Sentry.startSpan(
      {
        op: 'ui.video_rotation',
        name: 'Hero Video Rotation Setup',
      },
      span => {
        span.setAttribute('video_count', VIDEOS.length);
        span.setAttribute('rotation_interval', '8000ms');

        const interval = setInterval(() => {
          Sentry.startSpan(
            {
              op: 'ui.video_switch',
              name: 'Video Switch',
            },
            switchSpan => {
              const currentIndex = currentVideoIndexRef.current;
              const nextIndex = (currentIndex + 1) % VIDEOS.length;
              switchSpan.setAttribute('from_index', currentIndex);
              switchSpan.setAttribute('to_index', nextIndex);
              updatePerformanceProfile({ currentVideoIndex: nextIndex });
            }
          );
        }, 8000);

        return () => {
          clearInterval(interval);
        };
      }
    );
  }, [updatePerformanceProfile]);

  return (
    <section id="home" className={styles.hero}>
      {/* Always show videos - WebM will be prioritized on mobile */}
      {VIDEOS.map((video, index) => (
        <VideoBackground
          key={`${video.src}-${currentVideoIndex === index ? 'active' : 'inactive'}`}
          videoSrc={video.src}
          webmSrc={video.webm}
          overlayOpacity={0}
          isActive={index === currentVideoIndex}
        />
      ))}

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
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      <div className={styles.hero__content}>
        <motion.div
          className={styles.hero__textContainer}
          style={{
            filter: `blur(${blurAmount}px)`,
            opacity: textOpacity,
            y: textY,
          }}
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
          <motion.div
            className={styles.hero__location}
            style={{
              color: currentTheme.subhead,
              textShadow: currentTheme.textShadow,
            }}
            variants={textRevealVariants}
            transition={{
              ...springConfigs.gentle,
              duration: 0.8,
            }}
          >
            SAN FRANCISCO
          </motion.div>

          <motion.div
            className={styles.hero__logoContainer}
            variants={textRevealVariants}
            transition={{
              ...springConfigs.responsive,
              duration: 0.8,
            }}
          >
            <Logo className={styles.heroLogo} priority={true} />
          </motion.div>

          <motion.h1
            className={styles.hero__headline}
            style={{
              color: currentTheme.headline,
              textShadow: currentTheme.textShadow,
            }}
            variants={textRevealVariants}
            transition={{
              ...springConfigs.responsive,
              duration: 0.8,
            }}
          >
            Live Better — Together.
          </motion.h1>

          <motion.button
            className={styles.hero__button}
            style={{
              color: currentTheme.button,
              background: currentTheme.buttonBg,
              borderColor: currentTheme.buttonBorder,
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            transition={{
              ...springConfigs.responsive,
              duration: 0.6,
            }}
            onClick={useCallback(() => {
              document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
            }, [])}
          >
            <motion.span
              className={styles.hero__buttonText}
              whileHover={{ scale: 1.02 }}
              transition={springConfigs.quick}
            >
              <span className={styles.hero__buttonTextDefault}>COMING SOON</span>
              <span className={styles.hero__buttonTextHover}>Stay In The Loop</span>
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.hero__scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className={styles.hero__scrollIndicatorContainer}>
          <motion.div
            className={styles.hero__scrollIndicatorDot}
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
