'use client';

import { useState, useEffect } from 'react';
import VILogo from '@/components/ui/Logo/VILogo';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number; // in milliseconds
}

export default function LoadingScreen({ onComplete, duration = 4000 }: LoadingScreenProps) {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const [logoColor, setLogoColor] = useState('#00b7b5');

  const loadingText = "Loading...";
  const breathDuration = 2000; // 2 seconds per breath cycle

  // Smooth color transition through subtle blue shades
  const blueShades = [
    '#00b7b5', // Vital Ice blue
    '#00a8a6', // Slightly darker
    '#00c4c2', // Slightly lighter
    '#009a98', // Darker
    '#00d0ce', // Lighter
    '#00b7b5'  // Back to original
  ];

  useEffect(() => {
    // Start the breathing animation
    const breathInterval = setInterval(() => {
      setBreathPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
    }, breathDuration);

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

    // Animate logo color through subtle blue shades
    const colorInterval = setInterval(() => {
      setLogoColor(prevColor => {
        const currentIndex = blueShades.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % blueShades.length;
        return blueShades[nextIndex];
      });
    }, 1200); // Change color every 1.2 seconds for subtle effect

    // Type the loading text
    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textIndex < loadingText.length) {
        setText(loadingText.slice(0, textIndex + 1));
        textIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 150);

    // Show logo after a short delay
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    // Complete loading after duration
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(breathInterval);
      clearInterval(progressInterval);
      clearInterval(colorInterval);
      clearInterval(textInterval);
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div className={styles.loadingScreen}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradient} />
      </div>

      {/* Breathing Orb */}
      <div className={styles.breathingContainer}>
        <div 
          className={`${styles.breathingOrb} ${styles[breathPhase]}`}
          style={{
            '--breath-scale': breathPhase === 'inhale' ? 1.2 : 0.8,
            '--breath-opacity': breathPhase === 'inhale' ? 0.9 : 0.6,
          } as React.CSSProperties}
        >
          {/* Inner glow */}
          <div className={styles.orbGlow} />
          
          {/* VI Logo in the center */}
          {showLogo && (
            <div className={styles.logoContainer}>
              <VILogo 
                width={100} 
                height={60} 
                color={logoColor} 
                strokeWidth={2}
                className={styles.loadingLogo}
              />
            </div>
          )}
        </div>

        {/* Breath indicator */}
        <div className={styles.breathIndicator}>
          <div className={styles.breathText}>
            {breathPhase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
          </div>
          <div className={styles.breathDots}>
            <div className={`${styles.dot} ${breathPhase === 'inhale' ? styles.active : ''}`} />
            <div className={`${styles.dot} ${breathPhase === 'exhale' ? styles.active : ''}`} />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className={styles.loadingText}>
        <span className={styles.typingText}>{text}</span>
        <span className={styles.cursor}>|</span>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressText}>{progress}%</div>
      </div>

      {/* Ambient Particles */}
      <div className={styles.particles}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${3 + i * 0.5}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
} 