'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceDetection } from '@/lib/utils/performanceDetection';
import styles from './PerformanceDemo.module.css';

const PerformanceDemo: FC = () => {
  const { profile, strategy, isLoading } = usePerformanceDetection();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Analyzing device capabilities...</p>
        </div>
      </div>
    );
  }

  if (!profile || !strategy) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Unable to detect device capabilities</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.demo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className={styles.title}>Device Performance Analysis</h3>
        
        <div className={styles.sections}>
          {/* Device Capabilities */}
          <div className={styles.section}>
            <h4>Device Capabilities</h4>
            <div className={styles.capabilities}>
              <div className={styles.capability}>
                <span className={styles.label}>Video Support:</span>
                <span className={`${styles.value} ${profile.canHandleVideo ? styles.positive : styles.negative}`}>
                  {profile.canHandleVideo ? '✅ Yes' : '❌ No'}
                </span>
              </div>
              <div className={styles.capability}>
                <span className={styles.label}>Animation Support:</span>
                <span className={`${styles.value} ${profile.canHandleComplexAnimations ? styles.positive : styles.negative}`}>
                  {profile.canHandleComplexAnimations ? '✅ Yes' : '❌ No'}
                </span>
              </div>
              <div className={styles.capability}>
                <span className={styles.label}>Connection Quality:</span>
                <span className={`${styles.value} ${profile.hasGoodConnection ? styles.positive : styles.negative}`}>
                  {profile.hasGoodConnection ? '✅ Good' : '❌ Poor'}
                </span>
              </div>
              <div className={styles.capability}>
                <span className={styles.label}>Device Type:</span>
                <span className={styles.value}>
                  {profile.isMobile ? '📱 Mobile' : '💻 Desktop'}
                </span>
              </div>
              <div className={styles.capability}>
                <span className={styles.label}>Performance Level:</span>
                <span className={`${styles.value} ${profile.isLowEndDevice ? styles.negative : styles.positive}`}>
                  {profile.isLowEndDevice ? '🐌 Low-end' : '🚀 High-end'}
                </span>
              </div>
            </div>
          </div>

          {/* Media Strategy */}
          <div className={styles.section}>
            <h4>Recommended Media Strategy</h4>
            <div className={styles.strategy}>
              <div className={styles.strategyItem}>
                <span className={styles.label}>Media Type:</span>
                <span className={`${styles.value} ${strategy.useVideo ? styles.video : styles.image}`}>
                  {strategy.useVideo ? '🎥 Video' : '🖼️ Image'}
                </span>
              </div>
              <div className={styles.strategyItem}>
                <span className={styles.label}>Video Quality:</span>
                <span className={styles.value}>
                  {strategy.videoQuality === 'high' ? '🔴 High' :
                   strategy.videoQuality === 'medium' ? '🟡 Medium' :
                   strategy.videoQuality === 'low' ? '🟢 Low' : '⚪ None'}
                </span>
              </div>
              <div className={styles.strategyItem}>
                <span className={styles.label}>Animations:</span>
                <span className={`${styles.value} ${strategy.useAnimations ? styles.positive : styles.negative}`}>
                  {strategy.useAnimations ? '✅ Enabled' : '❌ Disabled'}
                </span>
              </div>
              <div className={styles.strategyItem}>
                <span className={styles.label}>Parallax Effects:</span>
                <span className={`${styles.value} ${strategy.useParallax ? styles.positive : styles.negative}`}>
                  {strategy.useParallax ? '✅ Enabled' : '❌ Disabled'}
                </span>
              </div>
              <div className={styles.strategyItem}>
                <span className={styles.label}>Reduced Motion:</span>
                <span className={`${styles.value} ${strategy.reducedMotion ? styles.negative : styles.positive}`}>
                  {strategy.reducedMotion ? '✅ Enabled' : '❌ Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className={styles.section}>
            <h4>Performance Metrics</h4>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.label}>Memory:</span>
                <span className={styles.value}>
                  {'deviceMemory' in navigator ? `${(navigator as any).deviceMemory}GB` : 'Unknown'}
                </span>
              </div>
              <div className={styles.metric}>
                <span className={styles.label}>CPU Cores:</span>
                <span className={styles.value}>
                  {navigator.hardwareConcurrency || 'Unknown'}
                </span>
              </div>
              <div className={styles.metric}>
                <span className={styles.label}>Connection:</span>
                <span className={styles.value}>
                  {'connection' in navigator ? 
                    (navigator as any).connection.effectiveType || 'Unknown' : 'Unknown'}
                </span>
              </div>
              <div className={styles.metric}>
                <span className={styles.label}>User Agent:</span>
                <span className={styles.value}>
                  {navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className={styles.recommendations}>
          <h4>Recommendations</h4>
          <div className={styles.recommendationList}>
            {strategy.useVideo && (
              <div className={styles.recommendation}>
                ✅ Your device can handle video backgrounds. You'll see immersive video content.
              </div>
            )}
            {!strategy.useVideo && profile.canHandleVideo && (
              <div className={styles.recommendation}>
                ⚠️ Video available but disabled due to connection or performance concerns.
              </div>
            )}
            {!profile.canHandleVideo && (
              <div className={styles.recommendation}>
                📱 Your device doesn't support video playback. Images will be used instead.
              </div>
            )}
            {strategy.reducedMotion && (
              <div className={styles.recommendation}>
                ♿ Reduced motion enabled. Animations will be minimized.
              </div>
            )}
            {profile.isLowEndDevice && (
              <div className={styles.recommendation}>
                🐌 Low-end device detected. Performance optimizations applied.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceDemo; 