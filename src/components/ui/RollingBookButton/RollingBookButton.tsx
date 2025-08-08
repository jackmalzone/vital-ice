'use client';

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RollingBookButton.module.css';

const RollingBookButton: FC = () => {
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const buttonHeight = 60; // Approximate button height
        const buffer = 20; // Extra space above footer

        // Check if button would overlap with footer
        const buttonBottom = windowHeight - 2 * 16; // Current bottom position (2rem)
        const footerTop = footerRect.top;

        const shouldBeAboveFooter = buttonBottom + buttonHeight + buffer > footerTop;
        setIsNearFooter(shouldBeAboveFooter);

        // Set CSS custom property for precise positioning
        if (shouldBeAboveFooter) {
          document.documentElement.style.setProperty('--footer-top', `${footerRect.top}px`);
        } else {
          document.documentElement.style.removeProperty('--footer-top');
        }
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.removeProperty('--footer-top');
    };
  }, []);

  const handleBookClick = () => {
    // Navigate to booking page
    window.location.href = '/book';
  };

  return (
    <motion.div
      className={`${styles.rollingBookContainer} ${isNearFooter ? styles.aboveFooter : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.button
        className={styles.rollingBookButton}
        onClick={handleBookClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="Book your session"
      >
        <span className={styles.buttonText}>Book</span>
        <span className={styles.buttonIcon}>→</span>
      </motion.button>
    </motion.div>
  );
};

export default RollingBookButton;
