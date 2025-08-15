'use client';

import { FC, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/layout/Footer/Footer';
import Logo from '@/components/ui/Logo/Logo';
import styles from './page.module.css';

// Type definitions for external libraries
interface JQuery {
  fn: {
    error: () => unknown;
  };
}

interface WindowWithJQuery extends Window {
  jQuery?: JQuery;
}

const BookPage: FC = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const [widgetKey, setWidgetKey] = useState(Date.now());

  // Function to reset the registration form
  const resetRegistrationForm = () => {
    // Clear localStorage items related to Mindbody/registration
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.includes('mindbody') || key.includes('healcode') || key.includes('registration'))
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        // Silently handle localStorage errors
      }
    });

    // Clear sessionStorage as well
    const sessionKeysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (
        key &&
        (key.includes('mindbody') || key.includes('healcode') || key.includes('registration'))
      ) {
        sessionKeysToRemove.push(key);
      }
    }

    sessionKeysToRemove.forEach(key => {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        // Silently handle sessionStorage errors
      }
    });

    // Force widget to reload with new key
    setWidgetKey(Date.now());
    setWidgetError(false);
  };

  // Error boundary for React rendering errors
  const handleWidgetError = useCallback(() => {
    setWidgetError(true);
  }, []);

  // Global error handler for React child errors
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      const errorMessage = args[0]?.toString() || '';
      if (errorMessage.includes('Objects are not valid as a React child')) {
        setWidgetError(true);
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    // Load Mindbody script
    const script = document.createElement('script');
    script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
    script.async = true;

    script.onload = () => {
      // Suppress Mindbody errors
      const originalConsoleError = console.error;
      console.error = function (...args) {
        const errorMessage = args[0]?.toString() || '';
        if (
          errorMessage.includes('Mixpanel error') ||
          errorMessage.includes('registrationSuccess') ||
          errorMessage.includes('Cannot read properties of null') ||
          errorMessage.includes('Objects are not valid as a React child')
        ) {
          return;
        }
        originalConsoleError.apply(console, args);
      };

      // Suppress jQuery errors
      if (typeof window !== 'undefined' && (window as WindowWithJQuery).jQuery) {
        (window as WindowWithJQuery).jQuery!.fn.error = function () {
          return this;
        };
      }

      // Suppress React rendering errors
      const originalConsoleWarn = console.warn;
      console.warn = function (...args) {
        const warningMessage = args[0]?.toString() || '';
        if (warningMessage.includes('Objects are not valid as a React child')) {
          return;
        }
        originalConsoleWarn.apply(console, args);
      };

      // Restore console after a delay
      setTimeout(() => {
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      }, 5000);
    };

    script.onerror = () => {
      setWidgetError(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://brandedweb.mindbodyonline.com/embed/widget.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (showRegistration) {
      // Load healcode script for registration widget
      const script = document.createElement('script');
      script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        console.log('Healcode registration script loaded successfully');

        // Add error boundary for Mindbody widget JSON parsing errors
        const handleWidgetError = (event: ErrorEvent) => {
          if (
            event.error &&
            event.error.message &&
            event.error.message.includes('not valid JSON')
          ) {
            event.preventDefault();
            console.warn('Mindbody registration widget JSON error prevented:', event.error.message);
            return false;
          }
        };

        // Suppress jQuery Migrate warnings from third-party widgets
        if (typeof window !== 'undefined' && (window as any).jQuery) {
          (window as any).jQuery.migrateMute = true;
        }

        window.addEventListener('error', handleWidgetError);

        // Suppress Mixpanel errors
        const originalConsoleError = console.error;
        console.error = function (...args) {
          if (args[0] && typeof args[0] === 'string' && args[0].includes('Mixpanel error')) {
            console.warn('Mixpanel error suppressed:', args[0]);
            return;
          }
          if (args[0] && typeof args[0] === 'string' && args[0].includes('registrationSuccess')) {
            console.warn('Mindbody registration success error suppressed:', args[0]);
            return;
          }
          originalConsoleError.apply(console, args);
        };

        // Suppress jQuery errors related to null properties
        if ((window as WindowWithJQuery).jQuery) {
          (window as WindowWithJQuery).jQuery!.fn.error = function () {
            console.warn('jQuery error suppressed in registration widget');
            return this;
          };
        }
      };

      script.onerror = error => {
        console.error('Failed to load Healcode registration script:', error);
      };

      document.head.appendChild(script);

      return () => {
        // Remove error handler
        window.removeEventListener('error', handleWidgetError);

        // Clean up script when component unmounts
        const existingScript = document.querySelector('script[src*="healcode.js"]');
        if (existingScript && existingScript.parentNode) {
          try {
            existingScript.parentNode.removeChild(existingScript);
          } catch (error) {
            console.warn('Error removing healcode script:', error);
          }
        }
      };
    }
  }, [showRegistration]);

  useEffect(() => {
    // Suppress jQuery Migrate warnings
    if (typeof window !== 'undefined') {
      (window as { jQuery?: { migrateMute?: boolean } }).jQuery = {
        ...(window as { jQuery?: { migrateMute?: boolean } }).jQuery,
        migrateMute: true,
      };
    }

    // Add error handler for widget JSON parsing errors
    const handleGlobalError = (event: ErrorEvent) => {
      // Only handle JSON parsing errors from Mindbody widgets
      if (event.message.includes('JSON') && event.message.includes('undefined')) {
        // Prevent the error from being logged to console
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>Book Your Session</h1>
        <p className={styles.subtitle}>Schedule your cold plunge, sauna, or recovery session</p>
      </motion.div>

      <motion.div
        className={styles.comingSoonContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className={styles.comingSoonContent}>
          <Logo className={styles.logo} width={200} height={100} />
          <h2 className={styles.comingSoonTitle}>Coming Soon</h2>
        </div>
      </motion.div>

      {/* Registration Section */}
      <motion.div
        className={styles.registrationSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.button
          className={styles.registrationButton}
          onClick={() => {
            if (!showRegistration) {
              // Reset form when opening registration
              resetRegistrationForm();
            }
            setShowRegistration(!showRegistration);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {showRegistration ? 'Hide Registration' : 'New Member Registration'}
        </motion.button>

        <AnimatePresence>
          {showRegistration && (
            <motion.div
              className={styles.registrationWidget}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onError={handleWidgetError}
            >
              <h3 className={styles.registrationHeader}>
                New To Our Studio? Register with Mindbody.
              </h3>
              {!widgetError ? (
                <div
                  key={`registration-widget-${widgetKey}`}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="ec161013b5f7" data-widget-version="0"></healcode-widget>',
                  }}
                  onError={handleWidgetError}
                  onLoad={() => {
                    // Widget loaded successfully
                  }}
                />
              ) : (
                <div className={styles.widgetError}>
                  <p>Registration widget temporarily unavailable. Please try again later.</p>
                  <button
                    onClick={() => {
                      setWidgetError(false);
                      // Force re-render with new key
                      setTimeout(() => {
                        const event = new Event('resize');
                        window.dispatchEvent(event);
                      }, 100);
                    }}
                    className={styles.retryButton}
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Reset Form Button */}
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  onClick={resetRegistrationForm}
                  className={styles.retryButton}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    marginTop: '0.5rem',
                  }}
                >
                  Reset Form
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
    </div>
  );
};

export default BookPage;
