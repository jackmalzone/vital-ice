'use client';

import { FC, useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

// Throttle function for scroll handling
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  return (...args: any[]) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

const Vision: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [hasStartedVision, setHasStartedVision] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [hasPlayedThisSession, setHasPlayedThisSession] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Check if sequence has been played this session
  useEffect(() => {
    const played = sessionStorage.getItem('visionPlayed');
    if (played === 'true') {
      setHasPlayedThisSession(true);
      setCurrentSentence(2); // Show last sentence
    }
  }, []);

  // Vision sentences
  const visionContent = [
    {
      text: "Born from a need to reset."
    },
    {
      text: "Vital Ice brings ancient rituals to modern rhythms."
    },
    {
      text: "Here, recovery is clarity."
    }
  ];

  // Background parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Scroll prevention - tied directly to hasStartedVision
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (hasStartedVision && !sequenceComplete) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
          e.preventDefault();
        }
      });
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [hasStartedVision, sequenceComplete]);

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle((e: WheelEvent) => {
      if (currentSentence < visionContent.length - 1) {
        setCurrentSentence(prev => prev + 1);
      } else {
        // Complete sequence
        setSequenceComplete(true);
        setHasStartedVision(false);
        sessionStorage.setItem('visionPlayed', 'true');
      }
    }, 800), // Slightly faster for better responsiveness
    [currentSentence, visionContent.length]
  );

  // Custom scroll handling for sequential reveals
  useEffect(() => {
    if (!hasStartedVision || !containerRef.current || sequenceComplete) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleScroll(e);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        handleScroll(e as any);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasStartedVision, handleScroll, sequenceComplete]);

  // Intersection Observer - lock before section enters view
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Lock scroll when section is 10-20% in view
        if (entry.isIntersecting && entry.intersectionRatio > 0.1 && !hasPlayedThisSession) {
          clearTimeout(timeoutId);
          setIsInView(true);
          
          // Start vision sequence immediately
          setHasStartedVision(true);
          setCurrentSentence(0);
        } else if (entry.intersectionRatio < 0.05) {
          // Only reset when mostly out of view
          timeoutId = setTimeout(() => {
            if (!sequenceComplete) {
              setIsInView(false);
              setHasStartedVision(false);
            }
          }, 200);
        }
      },
      { threshold: [0.05, 0.1, 0.7] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [hasPlayedThisSession, sequenceComplete]);

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
      <div ref={containerRef} className={styles.vision__container}>
        {/* Vision Sentences */}
        <AnimatePresence mode="wait">
          {((hasStartedVision && currentSentence < visionContent.length) || 
            (hasPlayedThisSession && currentSentence === 2)) && (
            <motion.div
              key={currentSentence}
              className={styles.vision__sentence}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className={styles.vision__text}>
                {visionContent[currentSentence].text}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator - Only show during active sequence */}
        {hasStartedVision && !sequenceComplete && (
          <motion.div
            className={styles.vision__progressIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.vision__progressText}>
              {currentSentence + 1} of {visionContent.length}
            </div>
            <div className={styles.vision__progressDots}>
              {visionContent.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.vision__progressDot} ${
                    index <= currentSentence ? styles.active : ''
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Scroll Hint - Only show during active sequence */}
        {hasStartedVision && currentSentence < visionContent.length - 1 && !sequenceComplete && (
          <motion.div
            className={styles.vision__scrollHint}
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className={styles.vision__scrollHintText}>Scroll to continue</div>
            <div className={styles.vision__scrollHintArrow}>↓</div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Vision;
