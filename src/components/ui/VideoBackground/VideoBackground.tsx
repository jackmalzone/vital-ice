'use client';

import { FC, useEffect, useState, useRef, useCallback } from 'react';
import * as Sentry from '@sentry/nextjs';
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

  // Performance optimization: Cleanup video resources when component unmounts
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        // Cancel any pending play promises
        video.pause();
        // Clear the source to stop any pending operations
        video.src = '';
        video.load();
        // Reset state
        setIsPlaying(false);
        setIsLoaded(false);
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
    return Sentry.startSpan(
      {
        op: 'video.playback',
        name: `Video Playback: ${videoSrc}`,
      },
      async span => {
        const video = videoRef.current;
        if (!video || !isLoaded) return;

        span.setAttribute('video_src', videoSrc);
        span.setAttribute('is_active', isActive);
        span.setAttribute('is_loaded', isLoaded);
        span.setAttribute('is_playing', isPlaying);

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
              // Check if video is still mounted before updating state
              if (videoRef.current === video) {
                setIsPlaying(true);
              }
            }
          } else {
            video.pause();
            if (videoRef.current === video) {
              setIsPlaying(false);
            }
          }
        } catch (error) {
          // Check if this is an AbortError (video removed from DOM)
          if (error instanceof Error && error.name === 'AbortError') {
            // This is expected when video is removed during play request
            // Don't log to Sentry for this specific case
            return;
          }

          // Log other errors to Sentry
          Sentry.captureException(error, {
            tags: {
              component: 'VideoBackground',
              video_src: videoSrc,
              is_active: isActive,
            },
            extra: {
              isLoaded,
              isPlaying,
              error: error instanceof Error ? error.message : String(error),
            },
          });

          // eslint-disable-next-line no-console
          console.warn('Video playback error:', error);
          if (videoRef.current === video) {
            setHasError(true);
            setIsPlaying(false);
          }
        }
      }
    );
  }, [isActive, isLoaded, isPlaying, videoSrc]);

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
          if (videoRef.current === video) {
            setIsPlaying(true);
            setHasError(false);
          }
        } catch (error) {
          // Check if this is an AbortError (video removed from DOM)
          if (error instanceof Error && error.name === 'AbortError') {
            // This is expected when video is removed during play request
            return;
          }
          // Silently handle other autoplay errors
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
    Sentry.startSpan(
      {
        op: 'video.load',
        name: `Video Load: ${videoSrc}`,
      },
      span => {
        span.setAttribute('video_src', videoSrc);
        span.setAttribute('is_active', isActive);
        setIsLoaded(true);
        setHasError(false);
      }
    );
  }, [videoSrc, isActive]);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
  }, []);

  const handleCanPlay = useCallback(() => {
    if (isActive && videoRef.current && !isPlaying) {
      videoRef.current.play().catch((error) => {
        // Check if this is an AbortError (video removed from DOM)
        if (error instanceof Error && error.name === 'AbortError') {
          // This is expected when video is removed during play request
          return;
        }
        // Autoplay failed, but video is ready
        if (videoRef.current) {
          setIsLoaded(true);
        }
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
        onPlay={() => {
          if (videoRef.current) {
            setIsPlaying(true);
          }
        }}
        onPause={() => {
          if (videoRef.current) {
            setIsPlaying(false);
          }
        }}
        // Performance: Disable video processing when not visible
        style={{
          willChange: isActive ? 'auto' : 'none',
        }}
      >
        {/* Always include WebM first if available for better mobile performance */}
        {webmSrc && <source src={webmSrc} type="video/webm" />}
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
