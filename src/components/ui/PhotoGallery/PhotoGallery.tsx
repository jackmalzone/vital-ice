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
    theme: 'hot',
  },
  {
    src: '/images/ice_morninglight.jpg',
    alt: 'Ice in morning light',
    theme: 'cold',
  },
  {
    src: '/images/water_lava-red-lighting.jpg',
    alt: 'Water with lava red lighting',
    theme: 'hot',
  },
  {
    src: '/images/cold_arctic-mountains.jpg',
    alt: 'Arctic mountains',
    theme: 'cold',
  },
  {
    src: '/images/lava_aerial-volcanic-cauldron.jpg',
    alt: 'Aerial volcanic cauldron',
    theme: 'hot',
  },
  {
    src: '/images/ice_stunning-glacier.jpg',
    alt: 'Stunning glacier',
    theme: 'cold',
  },
  {
    src: '/images/embers_vertical.jpg',
    alt: 'Vertical embers',
    theme: 'hot',
  },
  {
    src: '/images/moon_above-iceberg.jpg',
    alt: 'Moon above iceberg',
    theme: 'misc',
  },
  {
    src: '/images/lava_texture-aerial_flow.jpg',
    alt: 'Aerial lava flow texture',
    theme: 'hot',
  },
  {
    src: '/images/ice_texture-cracks.jpg',
    alt: 'Ice texture cracks',
    theme: 'cold',
  },
  {
    src: '/images/moon_majestic-mountain-sunrise.jpg',
    alt: 'Moon over majestic mountain sunrise',
    theme: 'misc',
  },
  {
    src: '/images/lava-closeup.jpg',
    alt: 'Lava closeup',
    theme: 'hot',
  },
  {
    src: '/images/ice_silver-texture.jpg',
    alt: 'Ice silver texture',
    theme: 'cold',
  },
  {
    src: '/images/sand_ripples.jpg',
    alt: 'Sand ripples',
    theme: 'misc',
  },
  {
    src: '/images/lavastones.jpg',
    alt: 'Lava stones',
    theme: 'hot',
  },
  {
    src: '/images/cold_usgs-aerial_coastline.jpg',
    alt: 'USGS aerial coastline',
    theme: 'cold',
  },
  {
    src: '/images/moon-snow.jpg',
    alt: 'Moon over snow',
    theme: 'misc',
  },
  {
    src: '/images/light_blurryhues.jpg',
    alt: 'Light blurry hues',
    theme: 'misc',
  },
  {
    src: '/images/ice-glaciersonblack.jpg',
    alt: 'Ice glaciers on black',
    theme: 'cold',
  },
  {
    src: '/images/moon-yosemite.jpg',
    alt: 'Moon over Yosemite',
    theme: 'misc',
  },
  {
    src: '/images/moonscape_snowdrift.jpg',
    alt: 'Moonscape snowdrift',
    theme: 'misc',
  },
];

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance images with continuous zoom effect
  useEffect(() => {
    if (galleryImages.length === 0) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
    }, 6000); // Change every 6 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Continuous zoom-in effect that doesn't reset between images
  useEffect(() => {
    if (galleryImages.length === 0) {
      return;
    }

    // Calculate zoom steps for the full 6-second duration
    const totalSteps = 60; // 6 seconds * 10 steps per second
    let currentStep = 0;

    const zoomInterval = setInterval(() => {
      currentStep++;

      if (currentStep <= totalSteps) {
        // Smooth zoom from 1.0 to 1.1 over the full duration
        const progress = currentStep / totalSteps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out curve
        setZoomScale(1 + 0.1 * easeProgress);
      } else {
        // Reset for next image cycle
        currentStep = 0;
        setZoomScale(1);
      }
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

  // Safety check for empty gallery
  if (galleryImages.length === 0) {
    return <div className={`${styles.photoGallery} ${className}`} />;
  }

  const currentImage = galleryImages[currentImageIndex] || galleryImages[0];

  return (
    <div className={`${styles.photoGallery} ${className}`} ref={containerRef}>
      {/* Background Image with Parallax and Zoom */}
      <div
        className={styles.backgroundImage}
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${zoomScale})`,
          transformOrigin: 'center center',
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
    </div>
  );
};

export default PhotoGallery;
