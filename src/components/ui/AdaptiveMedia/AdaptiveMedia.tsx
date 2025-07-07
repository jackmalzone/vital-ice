'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdaptiveMedia } from '@/lib/utils/performanceDetection';
import styles from './AdaptiveMedia.module.css';

interface AdaptiveMediaProps {
  videoSources: {
    high?: string;
    medium?: string;
    low?: string;
  };
  imageSource: string;
  alt: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const AdaptiveMedia: FC<AdaptiveMediaProps> = ({
  videoSources,
  imageSource,
  alt,
  className = '',
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  onLoad,
  onError,
}) => {
  const { mediaSource, mediaType, strategy, isLoading } = useAdaptiveMedia(videoSources, imageSource);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback to image if video fails
  const handleVideoError = () => {
    setHasError(true);
    onError?.();
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    onError?.();
  };

  // Reset error state when media source changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [mediaSource]);

  if (isLoading) {
    return (
      <div className={`${styles.loading} ${className}`}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  // If video failed or strategy doesn't use video, show image
  if (mediaType === 'image' || hasError) {
    return (
      <motion.div
        className={`${styles.imageContainer} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={imageSource}
          alt={alt}
          className={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      </motion.div>
    );
  }

  // Show video with fallback
  return (
    <motion.div
      className={`${styles.videoContainer} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!hasError ? (
          <motion.video
            key="video"
            className={styles.video}
            src={mediaSource}
            poster={poster || imageSource}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.img
            key="fallback-image"
            src={imageSource}
            alt={alt}
            className={styles.fallbackImage}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      {/* Performance indicator (debug mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className={styles.debugInfo}>
          <span>Type: {mediaType}</span>
          <span>Quality: {strategy?.videoQuality}</span>
          <span>Mobile: {strategy?.useVideo ? 'No' : 'Yes'}</span>
        </div>
      )}
    </motion.div>
  );
};

export default AdaptiveMedia; 