'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './RollingBookButton.module.css';

const RollingBookButton: FC = () => {
  const handleBookClick = () => {
    window.open('https://mindbody.com', '_blank');
  };

  return (
    <motion.div
      className={styles.rollingBookContainer}
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