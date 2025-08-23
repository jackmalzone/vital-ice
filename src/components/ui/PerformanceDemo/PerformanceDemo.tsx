'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { getPreferredVideoFormat } from '@/lib/utils/videoFormat';
import styles from './PerformanceDemo.module.css';

const PerformanceDemo: FC = () => {
  const preferredFormat = getPreferredVideoFormat();
  const isWebMSupported = preferredFormat === 'webm';

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.demo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className={styles.title}>Video Format Support</h3>

        <div className={styles.sections}>
          {/* Video Format Support */}
          <div className={styles.section}>
            <h4>Video Format Support</h4>
            <div className={styles.capabilities}>
              <div className={styles.capability}>
                <span className={styles.label}>WebM Support:</span>
                <span
                  className={`${styles.value} ${isWebMSupported ? styles.positive : styles.negative}`}
                >
                  {isWebMSupported ? '✅ Supported' : '❌ Not Supported'}
                </span>
              </div>
              <div className={styles.capability}>
                <span className={styles.label}>Preferred Format:</span>
                <span className={styles.value}>{preferredFormat.toUpperCase()}</span>
              </div>
              <div className={styles.capability}>
                <span className={styles.label}>Fallback Format:</span>
                <span className={styles.value}>MP4</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceDemo;
