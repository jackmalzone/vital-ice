'use client';

import { FC } from 'react';
import styles from './VideoBackground.module.css';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc: string;
  overlayOpacity?: number;
}

const VideoBackground: FC<VideoBackgroundProps> = ({
  videoSrc,
  posterSrc,
  overlayOpacity = 0.5
}) => {
  return (
    <div className={styles.videoContainer}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div 
        className={styles.overlay}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
    </div>
  );
};

export default VideoBackground; 