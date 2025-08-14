'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as Sentry from '@sentry/nextjs';
import styles from './Newsletter.module.css';

// Note: Mindbody widget may show Mixpanel errors in console:
// "You must name your new library: init(token, config, name)"
// This is a known issue with Mindbody's internal analytics and doesn't affect functionality.

// Global flag to prevent multiple script loads
let scriptLoaded = false;
let widgetCreated = false;

export default function Newsletter() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    // Prevent duplicate widget creation
    if (widgetCreated) {
      setIsLoading(false);
      return;
    }

    const loadWidget = () => {
      return Sentry.startSpan(
        {
          op: 'widget.load',
          name: 'Mindbody Newsletter Widget Load',
        },
        span => {
          if (widgetContainerRef.current && !widgetCreated) {
            try {
              span.setAttribute('widget_type', 'newsletter');
              span.setAttribute('script_loaded', scriptLoaded);

              console.log('Loading newsletter widget...');

              // Clear container
              widgetContainerRef.current.innerHTML = '';

              // Check if script is already loaded
              if (!scriptLoaded && typeof document !== 'undefined') {
                // Load the script first
                const script = document.createElement('script');
                script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
                script.type = 'text/javascript';

                script.onload = () => {
                  console.log('Script loaded, creating widget...');
                  scriptLoaded = true;
                  createWidget();
                };

                script.onerror = error => {
                  Sentry.captureException(error, {
                    tags: {
                      component: 'Newsletter',
                      widget_type: 'newsletter',
                      error_type: 'script_load_failed',
                    },
                  });
                  console.error('Failed to load script');
                  setHasError(true);
                  setIsLoading(false);
                };

                document.head.appendChild(script);
              } else {
                // Script already loaded, create widget directly
                console.log('Script already loaded, creating widget...');
                createWidget();
              }
            } catch (error) {
              Sentry.captureException(error, {
                tags: {
                  component: 'Newsletter',
                  widget_type: 'newsletter',
                  error_type: 'widget_load_failed',
                },
              });
              console.error('Error loading widget:', error);
              setHasError(true);
              setIsLoading(false);
            }
          }
        }
      );
    };

    const createWidget = () => {
      try {
        if (
          widgetContainerRef.current &&
          !widgetCreated &&
          typeof document !== 'undefined' &&
          document
        ) {
          // Create the widget element exactly as in the HTML
          const widgetElement = document.createElement('healcode-widget');
          widgetElement.setAttribute('data-type', 'prospects');
          widgetElement.setAttribute('data-widget-partner', 'object');
          widgetElement.setAttribute('data-widget-id', 'ec59331b5f7'); // Use original ID
          widgetElement.setAttribute('data-widget-version', '0');

          widgetContainerRef.current.appendChild(widgetElement);
          widgetCreated = true;

          // Check if widget loaded
          setTimeout(() => {
            const widget = widgetContainerRef.current?.querySelector('healcode-widget');
            if (widget && widget.children.length > 0) {
              console.log('Widget loaded successfully');
              setIsLoading(false);
            } else {
              console.log('Widget created, waiting for content...');
              // Wait a bit more
              setTimeout(() => {
                const widgetCheck = widgetContainerRef.current?.querySelector('healcode-widget');
                if (widgetCheck && widgetCheck.children.length > 0) {
                  console.log('Widget content now detected');
                  setIsLoading(false);
                } else {
                  console.warn('Widget not loading properly');
                  setHasError(true);
                  setIsLoading(false);
                }
              }, 3000);
            }
          }, 2000);
        }
      } catch (error) {
        console.error('Error creating widget:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Load widget when component mounts with a small delay to ensure DOM is ready
    setTimeout(() => {
      loadWidget();
    }, 100);

    // Cleanup function
    return () => {
      // Don't reset the global flags on cleanup to prevent re-creation
    };
  }, []);

  const handleRetry = () => {
    console.log('Retrying widget load...');
    setIsLoading(true);
    setHasError(false);

    // Reset global flags for retry
    scriptLoaded = false;
    widgetCreated = false;

    // Remove existing script and reload
    if (typeof document !== 'undefined') {
      const existingScript = document.querySelector('script[src*="healcode.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    }

    // Clear widget container
    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = '';
    }

    // Reload after a short delay
    setTimeout(() => {
      const loadWidget = () => {
        if (widgetContainerRef.current && typeof document !== 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
          script.type = 'text/javascript';

          script.onload = () => {
            const widgetElement = document.createElement('healcode-widget');
            widgetElement.setAttribute('data-type', 'prospects');
            widgetElement.setAttribute('data-widget-partner', 'object');
            widgetElement.setAttribute('data-widget-id', 'ec59331b5f7');
            widgetElement.setAttribute('data-widget-version', '0');

            widgetContainerRef.current!.appendChild(widgetElement);
            widgetCreated = true;

            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          };

          document.head.appendChild(script);
        }
      };

      loadWidget();
    }, 500);
  };

  return (
    <section id="newsletter" className={styles.newsletter}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Stay in the Loop
        </motion.h2>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          No spam, just reminders.
        </motion.p>

        <motion.div
          className={styles.widgetContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {isLoading && (
            <div className={styles.loadingContainer}>
              <p>Loading newsletter signup...</p>
            </div>
          )}

          {hasError && (
            <div className={styles.errorContainer}>
              <p>Unable to load newsletter signup at this time.</p>
              <button onClick={handleRetry} className={styles.retryButton}>
                Try Again
              </button>
            </div>
          )}

          <div
            ref={widgetContainerRef}
            className={styles.widgetContent}
            style={{ display: isLoading || hasError ? 'none' : 'block' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
