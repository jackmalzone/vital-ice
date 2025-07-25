'use client';

import { FC, useEffect, useState, useRef, useCallback } from 'react';
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
  const [preferredFormat, setPreferredFormat] = useState<'webm' | 'mp4'>('mp4');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mobile-specific WebM detection and prioritization
  useEffect(() => {
    const detectMobileWebM = () => {
      const video = document.createElement('video');
      const canPlayWebM = video.canPlayType('video/webm; codecs="vp8, vorbis"');
      const canPlayWebM9 = video.canPlayType('video/webm; codecs="vp9"');
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      // On mobile, aggressively prefer WebM if supported
      if (isMobile && webmSrc && (canPlayWebM !== '' || canPlayWebM9 !== '')) {
        setPreferredFormat('webm');
      } else if (webmSrc && (canPlayWebM !== '' || canPlayWebM9 !== '')) {
        setPreferredFormat('webm');
      } else {
        setPreferredFormat('mp4');
      }
    };

    detectMobileWebM();
  }, [webmSrc]);

  // Performance optimization: Cleanup video resources when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded && onLoad) {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  // Optimized video activation and playback with better memory management
  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    try {
      if (isActive) {
        // Performance: Only reset time if not already playing
        if (!isPlaying) {
          video.currentTime = 0;
        }

        // Performance: Use requestAnimationFrame for smoother playback
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Video playback error:', error);
      setHasError(true);
      setIsPlaying(false);
    }
  }, [isActive, isLoaded, isPlaying]);

  useEffect(() => {
    playVideo();
  }, [playVideo]);

  // Optimized user interaction handling with throttling
  useEffect(() => {
    let isHandlingInteraction = false;

    const handleUserInteraction = async () => {
      if (isHandlingInteraction) return;
      isHandlingInteraction = true;

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

      // Reset flag after a short delay
      setTimeout(() => {
        isHandlingInteraction = false;
      }, 100);
    };

    // Performance: Use passive listeners and reduce event frequency
    const events = ['touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, {
        once: true,
        passive: true,
      });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isActive, isPlaying, hasError]);

  // Handle video loading states with better error handling
  const handleVideoLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
  }, []);

  const handleCanPlay = useCallback(() => {
    if (isActive && videoRef.current && !isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, but video is ready
        setIsLoaded(true);
      });
    }
  }, [isActive, isPlaying]);

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        autoPlay={isActive}
        muted
        loop
        playsInline
        preload="metadata" // Performance: Only load metadata initially
        className={`${styles.video} ${isActive ? styles.active : styles.inactive}`}
        poster={posterSrc}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleCanPlay}
        onError={handleVideoError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        // Performance: Disable video processing when not visible
        style={{
          willChange: isActive ? 'auto' : 'none',
        }}
      >
        {/* Prioritize WebM on mobile for better performance */}
        {preferredFormat === 'webm' && webmSrc && <source src={webmSrc} type="video/webm" />}
        {/* MP4 fallback - always include for compatibility */}
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
