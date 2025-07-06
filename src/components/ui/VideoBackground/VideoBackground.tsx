'use client';

import { FC, useEffect, useState, useRef } from 'react';
import styles from './VideoBackground.module.css';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  overlayOpacity?: number;
  isActive?: boolean;
  onLoad?: () => void;
}

const VideoBackground: FC<VideoBackgroundProps> = ({
  videoSrc,
  posterSrc,
  overlayOpacity = 0.5,
  isActive = true,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isLoaded && onLoad) {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  // Reset video to beginning when it becomes active
  useEffect(() => {
    if (isActive && videoRef.current && isLoaded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions silently
      });
    }
  }, [isActive, isLoaded]);

  return (
    <div className={styles.videoContainer}>
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        className={`${styles.video} ${isActive ? styles.active : styles.inactive}`}
        poster={posterSrc}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        className={styles.overlay}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      <div className={styles.bottomGradient} />
    </div>
  );
};

export default VideoBackground;
