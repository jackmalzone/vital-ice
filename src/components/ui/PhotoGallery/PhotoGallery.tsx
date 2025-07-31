'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './PhotoGallery.module.css';

interface PhotoGalleryProps {
  className?: string;
}

// Curated gallery of themed images (hot/cold/misc) - mixed order for variety
const galleryImages = [
  {
    src: '/images/calm_volcanic-lake-shore.jpg',
    alt: 'Volcanic lake shore',
    theme: 'hot'
  },
  {
    src: '/images/ice_morninglight.jpg',
    alt: 'Ice in morning light',
    theme: 'cold'
  },
  {
    src: '/images/water_lava-red-lighting.jpg',
    alt: 'Water with lava red lighting',
    theme: 'hot'
  },
  {
    src: '/images/cold_arctic-mountains.jpg',
    alt: 'Arctic mountains',
    theme: 'cold'
  },
  {
    src: '/images/lava_aerial-volcanic-cauldron.jpg',
    alt: 'Aerial volcanic cauldron',
    theme: 'hot'
  },
  {
    src: '/images/ice_stunning-glacier.jpg',
    alt: 'Stunning glacier',
    theme: 'cold'
  },
  {
    src: '/images/embers_vertical.jpg',
    alt: 'Vertical embers',
    theme: 'hot'
  },
  {
    src: '/images/moon_above-iceberg.jpg',
    alt: 'Moon above iceberg',
    theme: 'misc'
  },
  {
    src: '/images/lava_texture-aerial_flow.jpg',
    alt: 'Aerial lava flow texture',
    theme: 'hot'
  },
  {
    src: '/images/ice_texture-cracks.jpg',
    alt: 'Ice texture cracks',
    theme: 'cold'
  },
  {
    src: '/images/moon_majestic-mountain-sunrise.jpg',
    alt: 'Moon over majestic mountain sunrise',
    theme: 'misc'
  },
  {
    src: '/images/lava-closeup.jpg',
    alt: 'Lava closeup',
    theme: 'hot'
  },
  {
    src: '/images/ice_silver-texture.jpg',
    alt: 'Ice silver texture',
    theme: 'cold'
  },
  {
    src: '/images/sand_ripples.jpg',
    alt: 'Sand ripples',
    theme: 'misc'
  },
  {
    src: '/images/lavastones.jpg',
    alt: 'Lava stones',
    theme: 'hot'
  },
  {
    src: '/images/cold_usgs-aerial_coastline.jpg',
    alt: 'USGS aerial coastline',
    theme: 'cold'
  },
  {
    src: '/images/moon-snow.jpg',
    alt: 'Moon over snow',
    theme: 'misc'
  },
  {
    src: '/images/light_blurryhues.jpg',
    alt: 'Light blurry hues',
    theme: 'misc'
  },
  {
    src: '/images/ice-glaciersonblack.jpg',
    alt: 'Ice glaciers on black',
    theme: 'cold'
  },
  {
    src: '/images/moon-yosemite.jpg',
    alt: 'Moon over Yosemite',
    theme: 'misc'
  },
  {
    src: '/images/moonscape_snowdrift.jpg',
    alt: 'Moonscape snowdrift',
    theme: 'misc'
  }
];

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Safety check for empty gallery
  if (galleryImages.length === 0) {
    return <div className={`${styles.photoGallery} ${className}`} />;
  }

  // Auto-advance images with zoom effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      // Reset zoom when changing images
      setZoomScale(1);
    }, 6000); // Change every 6 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Subtle zoom-in effect over time
  useEffect(() => {
    const zoomInterval = setInterval(() => {
      setZoomScale(prev => Math.min(prev + 0.001, 1.1)); // Gradual zoom to 1.1x
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(zoomInterval);
  }, [currentImageIndex]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3; // Subtle parallax
        setParallaxOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentImage = galleryImages[currentImageIndex] || galleryImages[0];

  return (
    <div className={`${styles.photoGallery} ${className}`} ref={containerRef}>
      {/* Background Image with Parallax and Zoom */}
      <div 
        className={styles.backgroundImage}
        style={{ 
          transform: `translateY(${parallaxOffset}px) scale(${zoomScale})`,
          transformOrigin: 'center center'
        }}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Image Indicator */}
      <div className={styles.indicator}>
        <div className={styles.indicatorDots}>
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentImageIndex ? styles.active : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Theme Label */}
      <div className={styles.themeLabel}>
        <span className={styles.themeText}>
          {currentImage.theme === 'hot' && 'Heat'}
          {currentImage.theme === 'cold' && 'Cold'}
          {currentImage.theme === 'misc' && 'Nature'}
        </span>
      </div>
    </div>
  );
};

export default PhotoGallery; 