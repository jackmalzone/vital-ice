import { useState, useEffect } from 'react';

// Performance Detection Utilities for Media Loading
// Determines optimal media strategy based on device capabilities

export interface PerformanceProfile {
  canHandleVideo: boolean;
  canHandleComplexAnimations: boolean;
  isLowEndDevice: boolean;
  isMobile: boolean;
  hasGoodConnection: boolean;
  recommendedMediaType: 'video' | 'image' | 'static';
  maxVideoQuality: 'high' | 'medium' | 'low' | 'none';
}

export interface MediaStrategy {
  useVideo: boolean;
  useAnimations: boolean;
  useParallax: boolean;
  videoQuality: 'high' | 'medium' | 'low' | 'none';
  fallbackToImage: boolean;
  reducedMotion: boolean;
}

// Core performance detection functions
export const detectDeviceCapabilities = (): PerformanceProfile => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isLowEndDevice = detectLowEndDevice();
  const hasGoodConnection = detectConnectionQuality();
  const canHandleVideo = detectVideoCapability();
  const canHandleComplexAnimations = detectAnimationCapability();

  // More aggressive mobile video optimization
  let recommendedMediaType: 'video' | 'image' | 'static' = 'image';
  let maxVideoQuality: 'high' | 'medium' | 'low' | 'none' = 'none';

  // Mobile-specific logic - more permissive for WebM
  if (isMobile) {
    if (canHandleVideo) {
      recommendedMediaType = 'video';
      maxVideoQuality = 'low'; // WebM will be used for better compression
    } else {
      recommendedMediaType = 'image';
      maxVideoQuality = 'none';
    }
  } else {
    // Desktop logic - more permissive
    if (canHandleVideo && hasGoodConnection && !isLowEndDevice) {
      recommendedMediaType = 'video';
      maxVideoQuality = 'high';
    } else if (canHandleVideo && hasGoodConnection) {
      recommendedMediaType = 'video';
      maxVideoQuality = 'medium';
    } else if (hasGoodConnection) {
      recommendedMediaType = 'image';
    } else {
      recommendedMediaType = 'static';
    }
  }

  return {
    canHandleVideo,
    canHandleComplexAnimations,
    isLowEndDevice,
    isMobile,
    hasGoodConnection,
    recommendedMediaType,
    maxVideoQuality,
  };
};

// Detect if device is low-end
const detectLowEndDevice = (): boolean => {
  // Check for low memory
  if ('deviceMemory' in navigator) {
    const memory = (navigator as { deviceMemory?: number }).deviceMemory;
    if (memory && memory < 4) return true;
  }

  // Check for low CPU cores
  if ('hardwareConcurrency' in navigator) {
    const cores = navigator.hardwareConcurrency;
    if (cores && cores < 4) return true;
  }

  // Check for slow connection
  if ('connection' in navigator) {
    const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
    if (connection && connection.effectiveType === 'slow-2g') return true;
  }

  // Check for older devices by user agent
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Android 4') || userAgent.includes('Android 5')) return true;
  if (userAgent.includes('iPhone OS 9') || userAgent.includes('iPhone OS 10')) return true;

  return false;
};

// Detect connection quality
const detectConnectionQuality = (): boolean => {
  if ('connection' in navigator) {
    const connection = (navigator as { connection?: { effectiveType?: string; downlink?: number } })
      .connection;
    if (connection) {
      // Good connection: 4g, 3g, or fast wifi
      return (
        ['4g', '3g'].includes(connection.effectiveType || '') || (connection.downlink || 0) > 1.5
      ); // > 1.5 Mbps
    }
  }

  // Fallback: assume good connection if we can't detect
  return true;
};

// Detect video playback capability with mobile-specific optimizations
const detectVideoCapability = (): boolean => {
  // Test if video element is supported
  const video = document.createElement('video');
  if (!video.canPlayType) return false;

  // Test for common video formats with mobile preference
  const canPlayMP4 = video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  const canPlayWebM = video.canPlayType('video/webm; codecs="vp8, vorbis"');
  const canPlayH264 = video.canPlayType('video/mp4; codecs="avc1.42E01E"');

  // Mobile devices often have better WebM support
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    // Mobile: prefer WebM, fallback to H.264
    return canPlayWebM !== '' || canPlayH264 !== '';
  } else {
    // Desktop: prefer MP4, fallback to WebM
    return canPlayMP4 !== '' || canPlayWebM !== '';
  }
};

// Mobile-specific video optimization
export const getMobileVideoStrategy = (): {
  useVideo: boolean;
  quality: 'low' | 'none';
  format: 'webm' | 'mp4';
  preload: 'metadata' | 'none';
} => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (!isMobile) {
    return {
      useVideo: true,
      quality: 'low',
      format: 'mp4',
      preload: 'metadata',
    };
  }

  // Mobile-specific checks
  const canHandleVideo = detectVideoCapability();

  // Mobile strategy: more aggressive for WebM
  if (canHandleVideo) {
    return {
      useVideo: true,
      quality: 'low',
      format: 'webm', // Aggressively prefer WebM on mobile for better compression
      preload: 'none', // Don't preload on mobile to save bandwidth
    };
  }

  return {
    useVideo: false,
    quality: 'none',
    format: 'mp4',
    preload: 'none',
  };
};

// Detect animation capability
const detectAnimationCapability = (): boolean => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;

  // Check for hardware acceleration support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const hasWebGL = !!gl;

  // Check for CSS transform support
  const supportsTransforms = 'transform' in document.documentElement.style;

  return hasWebGL && supportsTransforms;
};

// Generate media loading strategy
export const generateMediaStrategy = (profile: PerformanceProfile): MediaStrategy => {
  const strategy: MediaStrategy = {
    useVideo: profile.recommendedMediaType === 'video',
    useAnimations: profile.canHandleComplexAnimations && !profile.isLowEndDevice,
    useParallax: profile.canHandleComplexAnimations && !profile.isMobile,
    videoQuality: profile.maxVideoQuality,
    fallbackToImage: profile.recommendedMediaType === 'video',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

  return strategy;
};

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Monitor video loading performance
  async monitorVideoLoad(videoUrl: string): Promise<number> {
    const startTime = performance.now();

    return new Promise(resolve => {
      const video = document.createElement('video');
      video.src = videoUrl;

      video.addEventListener('loadeddata', () => {
        const loadTime = performance.now() - startTime;
        this.metrics.set(`video_load_${videoUrl}`, loadTime);
        resolve(loadTime);
      });

      video.addEventListener('error', () => {
        this.metrics.set(`video_error_${videoUrl}`, -1);
        resolve(-1);
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        this.metrics.set(`video_timeout_${videoUrl}`, -1);
        resolve(-1);
      }, 10000);
    });
  }

  // Monitor animation frame rate
  monitorFrameRate(duration: number = 5000): Promise<number> {
    return new Promise(resolve => {
      let frameCount = 0;
      const startTime = performance.now();

      const countFrame = () => {
        frameCount++;
        if (performance.now() - startTime < duration) {
          requestAnimationFrame(countFrame);
        } else {
          const fps = frameCount / (duration / 1000);
          this.metrics.set('fps', fps);
          resolve(fps);
        }
      };

      requestAnimationFrame(countFrame);
    });
  }

  // Get performance metrics
  getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }

  // Check if device should downgrade media
  shouldDowngradeMedia(): boolean {
    const fps = this.metrics.get('fps');
    const hasVideoErrors = Array.from(this.metrics.keys()).some(
      key => key.startsWith('video_error_') || key.startsWith('video_timeout_')
    );

    return (fps && fps < 30) || hasVideoErrors;
  }
}

// Hook for React components
export const usePerformanceDetection = () => {
  const [profile, setProfile] = useState<PerformanceProfile | null>(null);
  const [strategy, setStrategy] = useState<MediaStrategy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectPerformance = async () => {
      setIsLoading(true);

      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

      const detectedProfile = detectDeviceCapabilities();
      const generatedStrategy = generateMediaStrategy(detectedProfile);

      setProfile(detectedProfile);
      setStrategy(generatedStrategy);
      setIsLoading(false);
    };

    detectPerformance();
  }, []);

  return { profile, strategy, isLoading };
};

// Utility for conditional media loading
export const getOptimalMediaSource = (
  videoSources: { [key: string]: string },
  imageSource: string,
  strategy: MediaStrategy
): string => {
  if (!strategy.useVideo) {
    return imageSource;
  }

  switch (strategy.videoQuality) {
    case 'high':
      return videoSources.high || videoSources.medium || imageSource;
    case 'medium':
      return videoSources.medium || videoSources.low || imageSource;
    case 'low':
      return videoSources.low || imageSource;
    case 'none':
    default:
      return imageSource;
  }
};

// React hook for media loading
export const useAdaptiveMedia = (videoSources: { [key: string]: string }, imageSource: string) => {
  const { strategy, isLoading } = usePerformanceDetection();
  const [mediaSource, setMediaSource] = useState<string>(imageSource);
  const [mediaType, setMediaType] = useState<'video' | 'image'>('image');

  useEffect(() => {
    if (!isLoading && strategy) {
      const optimalSource = getOptimalMediaSource(videoSources, imageSource, strategy);
      setMediaSource(optimalSource);
      setMediaType(strategy.useVideo ? 'video' : 'image');
    }
  }, [strategy, isLoading, videoSources, imageSource]);

  return {
    mediaSource,
    mediaType,
    strategy,
    isLoading,
  };
};

// Performance detection utilities for choosing between video and photo gallery

export interface PerformanceMetrics {
  isLowPerformance: boolean;
  shouldUsePhotoGallery: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  connectionSpeed: 'slow' | 'medium' | 'fast';
}

// Detect device type
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';

  try {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  } catch {
    return 'desktop';
  }
};

// Detect connection speed
const getConnectionSpeed = (): 'slow' | 'medium' | 'fast' => {
  if (typeof navigator === 'undefined') {
    return 'medium'; // Default fallback
  }

  const connection = (
    navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number } }
  ).connection;
  if (!connection) {
    return 'medium'; // Default fallback
  }

  if (connection.effectiveType) {
    switch (connection.effectiveType) {
      case 'slow-2g':
      case '2g':
        return 'slow';
      case '3g':
        return 'medium';
      case '4g':
        return 'fast';
      default:
        return 'medium';
    }
  }

  if (connection.downlink) {
    if (connection.downlink < 1) return 'slow';
    if (connection.downlink < 5) return 'medium';
    return 'fast';
  }

  return 'medium';
};

// Check for low performance indicators
const isLowPerformanceDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  try {
    // Check for low memory
    if ('deviceMemory' in navigator) {
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      if (memory && memory < 4) return true;
    }

    // Check for low CPU cores
    if ('hardwareConcurrency' in navigator) {
      const cores = navigator.hardwareConcurrency;
      if (cores && cores < 4) return true;
    }

    // Check for slow connection
    const connectionSpeed = getConnectionSpeed();
    if (connectionSpeed === 'slow') return true;

    // Check for mobile device with limited capabilities
    const deviceType = getDeviceType();
    if (deviceType === 'mobile') {
      // Additional mobile checks
      const userAgent = navigator.userAgent.toLowerCase();
      const isOldMobile = /android [1-6]|iphone os [1-9]/.test(userAgent);
      if (isOldMobile) return true;
    }

    return false;
  } catch {
    return false;
  }
};

// Main function to determine if photo gallery should be used
export const shouldUsePhotoGallery = (): boolean => {
  // SSR safety check
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  try {
    const isLowPerformance = isLowPerformanceDevice();
    const deviceType = getDeviceType();
    const connectionSpeed = getConnectionSpeed();

    // Force photo gallery for low performance devices
    if (isLowPerformance) return true;

    // Use photo gallery for slow connections
    if (connectionSpeed === 'slow') return true;

    // Use photo gallery for older mobile devices
    if (deviceType === 'mobile') {
      const userAgent = navigator.userAgent.toLowerCase();
      const isOldMobile = /android [1-6]|iphone os [1-9]/.test(userAgent);
      if (isOldMobile) return true;
    }

    // Check for reduced motion preference
    if (window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) return true;
    }

    return false;
  } catch (error) {
    // Fallback to false if any browser API fails
    console.warn('Performance detection failed, defaulting to video:', error);
    return false;
  }
};

// Get comprehensive performance metrics
export const getPerformanceMetrics = (): PerformanceMetrics => {
  const isLowPerformance = isLowPerformanceDevice();
  const deviceType = getDeviceType();
  const connectionSpeed = getConnectionSpeed();
  const shouldUsePhotoGallery = isLowPerformance || connectionSpeed === 'slow';

  return {
    isLowPerformance,
    shouldUsePhotoGallery,
    deviceType,
    connectionSpeed,
  };
};

// Debug function to log performance metrics
export const logPerformanceMetrics = (): void => {
  if (typeof window === 'undefined') return;

  const metrics = getPerformanceMetrics();

  console.log('Performance Metrics:', {
    isLowPerformance: metrics.isLowPerformance,
    shouldUsePhotoGallery: metrics.shouldUsePhotoGallery,
    deviceType: metrics.deviceType,
    connectionSpeed: metrics.connectionSpeed,
    userAgent: navigator.userAgent,
    deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    connection: (
      navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number } }
    ).connection,
  });
};
