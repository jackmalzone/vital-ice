// Analytics utility for proper Mixpanel initialization
// This fixes the "You must name your new library" error

declare global {
  interface Window {
    mixpanel?: {
      init: (token: string, config?: Record<string, unknown>, name?: string) => void;
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string) => void;
      people: {
        set: (properties: Record<string, unknown>) => void;
      };
    };
  }
}

// Initialize Mixpanel with proper configuration
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Check if Mixpanel is already loaded
  if (window.mixpanel) {
    // If Mixpanel is already initialized, reinitialize with proper name
    try {
      // This will fix the "You must name your new library" error
      window.mixpanel.init(
        'YOUR_PROJECT_TOKEN',
        {
          debug: false,
          track_pageview: true,
          persistence: 'localStorage',
        },
        'default' // ← This is the required name parameter!
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Mixpanel reinitialization failed:', error);
    }
  }
};

// Track events
export const trackEvent = (event: string, properties?: Record<string, unknown>) => {
  if (typeof window === 'undefined' || !window.mixpanel) return;

  try {
    window.mixpanel.track(event, properties);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to track event:', error);
  }
};

// Identify user
export const identifyUser = (userId: string) => {
  if (typeof window === 'undefined' || !window.mixpanel) return;

  try {
    window.mixpanel.identify(userId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to identify user:', error);
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, unknown>) => {
  if (typeof window === 'undefined' || !window.mixpanel) return;

  try {
    window.mixpanel.people.set(properties);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to set user properties:', error);
  }
};
