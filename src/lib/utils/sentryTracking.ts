import * as Sentry from '@sentry/nextjs';

// Track page reloads and performance issues
export const trackPageReload = () => {
  if (typeof window === 'undefined') return;

  // Track if this is a page reload
  const navigationEntry = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;

  if (navigationEntry && navigationEntry.type === 'reload') {
    Sentry.captureMessage('Page reload detected', {
      level: 'warning',
      tags: {
        navigation_type: 'reload',
        url: window.location.href,
        user_agent: navigator.userAgent,
      },
      extra: {
        navigation_timing: {
          loadEventEnd: navigationEntry.loadEventEnd,
          domContentLoadedEventEnd: navigationEntry.domContentLoadedEventEnd,
          responseEnd: navigationEntry.responseEnd,
        },
      },
    });
  }
};

// Track video performance issues
export const trackVideoPerformance = (videoSrc: string, error?: Error) => {
  if (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'VideoBackground',
        video_src: videoSrc,
        error_type: 'video_performance',
      },
      extra: {
        video_src: videoSrc,
        user_agent: navigator.userAgent,
        connection: (navigator as any).connection,
        device_memory: (navigator as any).deviceMemory,
        hardware_concurrency: navigator.hardwareConcurrency,
      },
    });
  }
};

// Track smooth scrolling issues
export const trackSmoothScrollIssue = (error: Error) => {
  Sentry.captureException(error, {
    tags: {
      component: 'SmoothScrollProvider',
      error_type: 'smooth_scroll',
    },
    extra: {
      user_agent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    },
  });
};

// Track Mindbody widget issues
export const trackMindbodyWidgetIssue = (widgetType: string, error: Error) => {
  Sentry.captureException(error, {
    tags: {
      component: 'MindbodyWidget',
      widget_type: widgetType,
      error_type: 'widget_load',
    },
    extra: {
      widget_type: widgetType,
      user_agent: navigator.userAgent,
      url: window.location.href,
    },
  });
};

// Track browser-specific issues
export const trackBrowserIssue = (browser: string, issue: string, details?: Record<string, unknown>) => {
  Sentry.captureMessage(`Browser-specific issue: ${issue}`, {
    level: 'warning',
    tags: {
      browser,
      issue_type: issue,
    },
    extra: {
      browser,
      issue,
      details,
      user_agent: navigator.userAgent,
      url: window.location.href,
    },
  });
};

// Track memory usage issues
export const trackMemoryUsage = () => {
  if (typeof window === 'undefined' || !(performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory) return;

  const memory = (performance as Performance & { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
  const usedMB = memory.usedJSHeapSize / 1024 / 1024;
  const totalMB = memory.totalJSHeapSize / 1024 / 1024;
  const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;

  // Alert if memory usage is high
  if (usedMB > limitMB * 0.8) {
    Sentry.captureMessage('High memory usage detected', {
      level: 'warning',
      tags: {
        issue_type: 'high_memory_usage',
      },
      extra: {
        used_mb: usedMB,
        total_mb: totalMB,
        limit_mb: limitMB,
        usage_percentage: (usedMB / limitMB) * 100,
      },
    });
  }
};

// Track page visibility changes (potential reload indicators)
export const trackPageVisibility = () => {
  if (typeof document === 'undefined') return;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      Sentry.addBreadcrumb({
        category: 'navigation',
        message: 'Page hidden',
        level: 'info',
      });
    } else if (document.visibilityState === 'visible') {
      Sentry.addBreadcrumb({
        category: 'navigation',
        message: 'Page visible',
        level: 'info',
      });
    }
  });
};

// Initialize all tracking
export const initializeSentryTracking = () => {
  if (typeof window === 'undefined') return;

  // Track page reloads
  trackPageReload();

  // Track page visibility
  trackPageVisibility();

  // Monitor memory usage
  setInterval(trackMemoryUsage, 30000); // Check every 30 seconds

  // Track browser-specific issues
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    // Safari-specific tracking
    Sentry.setTag('browser', 'safari');
  } else if (userAgent.includes('Chrome')) {
    // Chrome-specific tracking
    Sentry.setTag('browser', 'chrome');
  }

  // Start profiling for page load performance
  Sentry.startSpan(
    {
      op: 'pageload',
      name: 'Page Load Performance',
    },
    span => {
      span.setAttribute('url', window.location.href);
      span.setAttribute('user_agent', userAgent);

      // Track when page is fully loaded
      if (document.readyState === 'complete') {
        span.setAttribute('load_time', performance.now());
      } else {
        window.addEventListener('load', () => {
          span.setAttribute('load_time', performance.now());
        });
      }
    }
  );
};
