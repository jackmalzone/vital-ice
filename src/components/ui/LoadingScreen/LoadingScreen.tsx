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

  useEffect(() => {
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
      onComplete();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

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
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.progressText}>{progress}%</div>
      </div>
    </div>
  );
}
