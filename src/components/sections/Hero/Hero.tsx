'use client';

import { FC, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoBackground from '@/components/ui/VideoBackground/VideoBackground';
import Logo from '@/components/ui/Logo/Logo';
import { textRevealVariants, buttonVariants, springConfigs } from '@/lib/utils/animations';
import { usePerformanceDetection } from '@/lib/utils/performanceDetection';
import styles from './Hero.module.css';

// Video rotation system - alternating cold and hot videos with WebM support
const VIDEOS = [
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-1.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-1.webm',
    type: 'cold',
    textTheme: 'standard',
  },
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-1.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-1.webm',
    type: 'hot',
    textTheme: 'standard',
  },
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-2.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-2.webm',
    type: 'cold',
    textTheme: 'standard',
  },
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-2.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-2.webm',
    type: 'hot',
    textTheme: 'standard',
  },
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-3.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-3.webm',
    type: 'cold',
    textTheme: 'enhanced', // Stronger shadow for light background
  },
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-3.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-3.webm',
    type: 'hot',
    textTheme: 'standard',
  },
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-4.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-4.webm',
    type: 'cold',
    textTheme: 'standard',
  },
  {
    src: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-4.mp4',
    webm: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-4.webm',
    type: 'hot',
    textTheme: 'standard',
  },
];

// Simplified text color schemes - all white with varying shadow strength
const TEXT_THEMES = {
  standard: {
    headline: '#ffffff',
    subhead: 'rgba(255, 255, 255, 0.95)',
    button: '#ffffff',
    buttonBg: 'rgba(255, 255, 255, 0.08)',
    buttonBorder: 'rgba(255, 255, 255, 0.15)',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  },
  enhanced: {
    headline: '#ffffff',
    subhead: 'rgba(255, 255, 255, 0.95)',
    button: '#ffffff',
    buttonBg: 'rgba(255, 255, 255, 0.08)',
    buttonBorder: 'rgba(255, 255, 255, 0.15)',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)', // Stronger shadow for light backgrounds
  },
};

const Hero: FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const { strategy, profile } = usePerformanceDetection();

  // Get current video theme
  const currentVideo = VIDEOS[currentVideoIndex];
  const currentTheme =
    TEXT_THEMES[(currentVideo?.textTheme as keyof typeof TEXT_THEMES) || 'standard'];

  // Scroll-based transforms for glassmorphic effects
  const blurAmount = useTransform(scrollYProgress, [0, 0.1], [8, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);

  // Mobile-optimized video strategy - prioritize WebM on mobile
  const shouldUseVideos = useMemo(() => {
    if (!strategy) return false;
    
    // On mobile, always try to use videos (especially WebM)
    if (profile?.isMobile) {
      return true; // Allow videos on mobile, WebM will be prioritized
    }
    
    return strategy.useVideo;
  }, [strategy, profile]);

  // Performance optimization: Only load videos when in viewport
  const [isInViewport, setIsInViewport] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Performance: Detect connection quality for adaptive loading
  const [connectionQuality, setConnectionQuality] = useState<'fast' | 'medium' | 'slow'>('medium');

  useEffect(() => {
    // Detect connection quality
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string } })
        .connection;
      if (connection?.effectiveType === '4g') {
        setConnectionQuality('fast');
      } else if (connection?.effectiveType === '3g') {
        setConnectionQuality('medium');
      } else {
        setConnectionQuality('slow');
      }
    }
  }, []);

  // Performance: Adaptive video loading based on connection
  const shouldPreloadVideos = useMemo(() => {
    return connectionQuality === 'fast' && shouldUseVideos && isInViewport;
  }, [connectionQuality, shouldUseVideos, isInViewport]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!shouldUseVideos) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [shouldUseVideos]);

  // Optimized video rotation with mobile considerations
  useEffect(() => {
    if (!shouldUseVideos || !isInViewport) return;

    // Preload next video only if connection is fast and in viewport
    const preloadNextVideo = () => {
      if (!shouldPreloadVideos) return;

      const nextIndex = (currentVideoIndex + 1) % VIDEOS.length;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = VIDEOS[nextIndex].src;
      document.head.appendChild(link);
    };

    // Preload on mount and video change
    preloadNextVideo();

    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % VIDEOS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentVideoIndex, shouldUseVideos, isInViewport, shouldPreloadVideos]);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      {/* Conditional Video Backgrounds - only render if videos should be used and in viewport */}
      {shouldUseVideos && isInViewport ? (
        VIDEOS.map((video, index) => (
          <VideoBackground
            key={`${video.src}-${currentVideoIndex === index ? 'active' : 'inactive'}`}
            videoSrc={video.src}
            webmSrc={video.webm}
            overlayOpacity={0}
            isActive={index === currentVideoIndex}
          />
        ))
      ) : (
        // Static background for mobile/performance-constrained devices
        <div className={styles.hero__staticBackground} />
      )}

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
            VITAL ICE
          </motion.h1>

          <motion.p
            className={styles.hero__subhead}
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
            Live Better — Together
          </motion.p>

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
                ease: 'easeInOut',
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

      {/* Video transition indicator - only show if videos are enabled */}
      {shouldUseVideos && (
        <motion.div
          className={styles.hero__videoIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className={styles.hero__videoType}>{VIDEOS[currentVideoIndex]?.type}</div>
        </motion.div>
      )}

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
