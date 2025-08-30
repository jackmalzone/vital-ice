'use client';

import { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Sentry from '@sentry/nextjs';
import { FaBug } from 'react-icons/fa';
import { useNavigation } from '@/lib/store/AppStore';
import styles from './RollingBookButton.module.css';

const RollingBookButton: FC = () => {
  const { isRollingButtonNearFooter, setRollingButtonNearFooter } = useNavigation();

  useEffect(() => {
    let ticking = false;
    let rafId: number;
    let footerElement: Element | null = null;

    // Cache footer element to avoid repeated DOM queries
    const getFooterElement = () => {
      if (!footerElement) {
        footerElement = document.querySelector('footer');
      }
      return footerElement;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const footer = getFooterElement();
          if (footer) {
            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const buttonHeight = 60; // Approximate button height
            const buffer = 20; // Extra space above footer

            // Check if button would overlap with footer
            const buttonBottom = windowHeight - 2 * 16; // Current bottom position (2rem)
            const footerTop = footerRect.top;

            const shouldBeAboveFooter = buttonBottom + buttonHeight + buffer > footerTop;
            setRollingButtonNearFooter(shouldBeAboveFooter);

            // Set CSS custom property for precise positioning
            if (shouldBeAboveFooter) {
              document.documentElement.style.setProperty('--footer-top', `${footerRect.top}px`);
            } else {
              document.documentElement.style.removeProperty('--footer-top');
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      // Reset footer cache on resize
      footerElement = null;
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.removeProperty('--footer-top');
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleBookClick = () => {
    // Navigate to booking page
    window.location.href = '/book';
  };

  const handleFeedbackClick = () => {
    // Get the feedback instance and open the form
    const feedback = Sentry.getFeedback();
    feedback?.createForm().then(form => {
      form.appendToDom();
      form.open();
    });
  };

  return (
    <motion.div
      className={`${styles.rollingBookContainer} ${isRollingButtonNearFooter ? styles.aboveFooter : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Feedback Button */}
      <motion.button
        className={`${styles.rollingBookButton} ${styles.feedbackButton}`}
        onClick={handleFeedbackClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="Report an issue"
      >
        <FaBug className={styles.buttonIcon} />
      </motion.button>

      {/* Book Button */}
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
