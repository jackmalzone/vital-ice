'use client';

import { FC, useEffect, useState, useRef } from 'react';
import styles from './VideoBackground.module.css';

interface VideoBackgroundProps {
  videoSrc: string;
  webmSrc?: string; // WebM format for better mobile performance
  posterSrc?: string;
  overlayOpacity?: number;
  isActive?: boolean;
  onLoad?: () => void;
}

const VideoBackground: FC<VideoBackgroundProps> = ({
  videoSrc,
  webmSrc,
  posterSrc,
  overlayOpacity = 0.5,
  isActive = true,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isLoaded && onLoad) {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  // Optimized video activation and playback for mobile
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    const playVideo = async () => {
      try {
        if (isActive) {
          // Mobile optimization: don't reset video time on every activation
          if (!isPlaying) {
            video.currentTime = 0;
          }

          // Try to play with user interaction fallback
          const playPromise = video.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        } else {
          video.pause();
          setIsPlaying(false);
        }
      } catch {
        setHasError(true);
        setIsPlaying(false);
      }
    };

    playVideo();
  }, [isActive, isLoaded, isPlaying]);

  // Optimized user interaction handling for mobile
  useEffect(() => {
    const handleUserInteraction = async () => {
      const video = videoRef.current;
      if (video && isActive && !isPlaying && !hasError) {
        try {
          await video.play();
          setIsPlaying(true);
          setHasError(false);
        } catch {
          // Silently handle autoplay errors
        }
      }
    };

    // Mobile-optimized event listeners
    const events = ['touchstart', 'click']; // Reduced event list for mobile
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isActive, isPlaying, hasError]);

  // Handle video loading states
  const handleVideoLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const handleCanPlay = () => {
    if (isActive && videoRef.current && !isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, but video is ready
        setIsLoaded(true);
      });
    }
  };

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        autoPlay={isActive}
        muted
        loop
        playsInline
        preload="metadata" // Changed from "auto" to "metadata" for better mobile performance
        className={`${styles.video} ${isActive ? styles.active : styles.inactive}`}
        poster={posterSrc}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleCanPlay}
        onError={handleVideoError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* WebM format for better mobile performance */}
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        {/* MP4 fallback */}
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for unsupported video */}
        <div className={styles.videoFallback}>
          <p>Video not supported</p>
        </div>
      </video>

      {/* Error state icon */}
      {hasError && (
        <div className={styles.errorIcon}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
            <path
              d="M12 8V12M12 16H12.01"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      <div
        className={styles.overlay}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      <div className={styles.bottomGradient} />
    </div>
  );
};

export default VideoBackground;
