'use client';

import { useState, useEffect } from 'react';
import VILogo from '@/components/ui/Logo/VILogo';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number; // in milliseconds
}

export default function LoadingScreen({ onComplete, duration = 4000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reset state when component mounts
    setProgress(0);
    setIsVisible(true);

    // Start the loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    // Complete loading after duration
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.loadingScreen}>
      {/* Background */}
      <div className={styles.background} />

      {/* Logo */}
      <div className={styles.logoContainer}>
        <VILogo
          width={200}
          height={120}
          color="#00b7b5"
          strokeWidth={2}
          className={styles.loadingLogo}
        />
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
              opacity: progress > 0 ? 1 : 0,
            }}
          />
        </div>
        <div className={styles.progressText}>{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
