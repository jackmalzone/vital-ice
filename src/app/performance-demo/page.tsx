'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import PerformanceDemo from '@/components/ui/PerformanceDemo/PerformanceDemo';
import AdaptiveMedia from '@/components/ui/AdaptiveMedia/AdaptiveMedia';
import styles from './page.module.css';

const PerformanceDemoPage: FC = () => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.title}>Performance Detection Demo</h1>
        <p className={styles.subtitle}>
          See how your device capabilities affect media loading and animations
        </p>
      </motion.div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Performance Analysis */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Device Analysis</h2>
          <PerformanceDemo />
        </section>

        {/* Adaptive Media Test */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Adaptive Media Test</h2>
          <div className={styles.mediaTest}>
            <div className={styles.mediaContainer}>
              <h3>High-Quality Video (if supported)</h3>
              <AdaptiveMedia
                videoSources={{
                  high: '/videos/ambient-water-high.mp4',
                  medium: '/videos/ambient-water-medium.mp4',
                  low: '/videos/ambient-water-low.mp4',
                }}
                imageSource="/images/hero-ambient-water.jpg"
                alt="Ambient water background"
                className={styles.testMedia}
              />
            </div>

            <div className={styles.mediaContainer}>
              <h3>Historical Timeline Video</h3>
              <AdaptiveMedia
                videoSources={{
                  high: '/videos/indus-valley-ambient.mp4',
                  medium: '/videos/indus-valley-ambient-720p.mp4',
                  low: '/videos/indus-valley-ambient-480p.mp4',
                }}
                imageSource="/images/indusValley.png"
                alt="Indus Valley background"
                className={styles.testMedia}
              />
            </div>
          </div>
        </section>

        {/* Information */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3>🔍 Detection</h3>
              <p>
                The system analyzes your device&apos;s capabilities including memory, CPU cores,
                connection quality, and video support to determine the optimal media strategy.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3>🎯 Strategy</h3>
              <p>
                Based on the analysis, it chooses between video (high/medium/low quality) or static
                images, and adjusts animation complexity accordingly.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3>⚡ Performance</h3>
              <p>
                The system continuously monitors performance and can downgrade media if it detects
                issues like slow loading or poor frame rates.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3>♿ Accessibility</h3>
              <p>
                Respects user preferences like reduced motion and provides fallbacks for devices
                that don&apos;t support certain features.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default PerformanceDemoPage;
