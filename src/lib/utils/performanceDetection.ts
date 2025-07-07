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
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEndDevice = detectLowEndDevice();
  const hasGoodConnection = detectConnectionQuality();
  const canHandleVideo = detectVideoCapability();
  const canHandleComplexAnimations = detectAnimationCapability();

  // Determine recommended media type
  let recommendedMediaType: 'video' | 'image' | 'static' = 'image';
  let maxVideoQuality: 'high' | 'medium' | 'low' | 'none' = 'none';

  if (canHandleVideo && hasGoodConnection && !isLowEndDevice) {
    recommendedMediaType = 'video';
    maxVideoQuality = isMobile ? 'medium' : 'high';
  } else if (canHandleVideo && hasGoodConnection) {
    recommendedMediaType = 'video';
    maxVideoQuality = 'low';
  } else if (hasGoodConnection) {
    recommendedMediaType = 'image';
  } else {
    recommendedMediaType = 'static';
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
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 4) return true;
  }

  // Check for low CPU cores
  if ('hardwareConcurrency' in navigator) {
    const cores = navigator.hardwareConcurrency;
    if (cores && cores < 4) return true;
  }

  // Check for slow connection
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
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
    const connection = (navigator as any).connection;
    if (connection) {
      // Good connection: 4g, 3g, or fast wifi
      return ['4g', '3g'].includes(connection.effectiveType) || 
             connection.downlink > 1.5; // > 1.5 Mbps
    }
  }

  // Fallback: assume good connection if we can't detect
  return true;
};

// Detect video playback capability
const detectVideoCapability = (): boolean => {
  // Test if video element is supported
  const video = document.createElement('video');
  if (!video.canPlayType) return false;

  // Test for common video formats
  const canPlayMP4 = video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  const canPlayWebM = video.canPlayType('video/webm; codecs="vp8, vorbis"');
  
  return canPlayMP4 !== '' || canPlayWebM !== '';
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
    
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
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
    const hasVideoErrors = Array.from(this.metrics.keys()).some(key => 
      key.startsWith('video_error_') || key.startsWith('video_timeout_')
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
export const useAdaptiveMedia = (
  videoSources: { [key: string]: string },
  imageSource: string
) => {
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