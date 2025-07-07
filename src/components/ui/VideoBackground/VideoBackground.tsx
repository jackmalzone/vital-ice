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

  // Handle video activation and playback
  useEffect(() => {
    if (videoRef.current && isLoaded) {
      if (isActive) {
        // Only reset if video is paused or at the end
        if (videoRef.current.paused || videoRef.current.currentTime >= videoRef.current.duration - 0.1) {
          videoRef.current.currentTime = 0;
        }
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions silently
        });
      } else {
        // Pause inactive videos to save resources
        videoRef.current.pause();
      }
    }
  }, [isActive, isLoaded]);

  return (
    <div className={styles.videoContainer}>
      <video 
        ref={videoRef}
        autoPlay={isActive}
        muted 
        loop 
        playsInline 
        preload="auto"
        className={`${styles.video} ${isActive ? styles.active : styles.inactive}`}
        poster={posterSrc}
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => {
          if (isActive && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Handle autoplay restrictions silently
            });
          }
        }}
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
