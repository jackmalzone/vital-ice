'use client';

import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoBackground from '@/components/ui/VideoBackground/VideoBackground';
import Logo from '@/components/ui/Logo/Logo';
import { textRevealVariants, buttonVariants, springConfigs } from '@/lib/utils/animations';
import styles from './Hero.module.css';

// Video rotation system - alternating cold and hot videos
const VIDEOS = [
  { src: "https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/ripples-ambient.mp4", type: "ripples" },
  { src: "https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient.mp4", type: "cold" },
  { src: "https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient.mp4", type: "hot" },
  { src: "https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-2.mp4", type: "cold" },
  { src: "https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-2.mp4", type: "hot" },
  { src: "https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/cold-ambient-3.mp4", type: "cold" },
  { src: "https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/hot-ambient-3.mp4", type: "hot" },
];

const Hero: FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Scroll-based transforms for glassmorphic effects
  const blurAmount = useTransform(scrollYProgress, [0, 0.1], [8, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);

  // Video rotation with sequential switching and preloading
  useEffect(() => {
    // Preload next video
    const preloadNextVideo = () => {
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
      setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentVideoIndex]);

  return (
    <section id="home" className={styles.hero}>
      {/* Multiple Video Backgrounds with opacity transitions */}
      {VIDEOS.map((video, index) => (
        <VideoBackground
          key={video.src}
          videoSrc={video.src}
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

      {/* Video transition indicator */}
      <motion.div
        className={styles.hero__videoIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className={styles.hero__videoType}>
          {useMemo(() => {
            const videoType = VIDEOS[currentVideoIndex].type;
            return videoType === 'cold' ? '❄️ Cold' : videoType === 'hot' ? '🔥 Hot' : '💧 Ripples';
          }, [currentVideoIndex])} Ambience
        </div>
      </motion.div>

      <motion.div
        className={styles.hero__scrollIndicator}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
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
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
