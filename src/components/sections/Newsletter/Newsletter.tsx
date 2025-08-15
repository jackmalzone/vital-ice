'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as Sentry from '@sentry/nextjs';
import styles from './Newsletter.module.css';

// Note: Mindbody widget may show Mixpanel errors in console:
// "You must name your new library: init(token, config, name)"
// This is a known issue with Mindbody's internal analytics and doesn't affect functionality.

export default function Newsletter() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    // Add error boundary for Mindbody widget JSON parsing errors
    const handleWidgetError = (event: ErrorEvent) => {
      // Prevent JSON parsing errors from Mindbody widgets
      if (event.error && event.error.message && event.error.message.includes('not valid JSON')) {
        event.preventDefault();
        return false;
      }

      // Also catch SyntaxError for JSON parsing
      if (
        event.error &&
        event.error.name === 'SyntaxError' &&
        event.error.message.includes('not valid JSON')
      ) {
        event.preventDefault();
        return false;
      }

      // Catch any JSON.parse errors
      if (event.error && event.error.message && event.error.message.includes('JSON.parse')) {
        event.preventDefault();
        return false;
      }

      // Suppress Mixpanel errors from Mindbody's internal analytics
      if (
        event.error &&
        event.error.message &&
        event.error.message.includes('You must name your new library')
      ) {
        event.preventDefault();
        return false;
      }
    };

    // Suppress jQuery Migrate warnings from third-party widgets
    if (
      typeof window !== 'undefined' &&
      (window as { jQuery?: { migrateMute?: boolean } }).jQuery
    ) {
      (window as { jQuery?: { migrateMute?: boolean } }).jQuery!.migrateMute = true;
    }

    // Override JSON.parse to prevent errors from Mindbody widgets
    const originalJSONParse = JSON.parse;
    JSON.parse = function (text, reviver) {
      try {
        return originalJSONParse.call(this, text, reviver);
      } catch (error) {
        // If it's a Mindbody-related error, suppress it
        if (error instanceof Error && error.message && error.message.includes('not valid JSON')) {
          return {}; // Return empty object as fallback
        }
        throw error; // Re-throw other errors
      }
    };

    window.addEventListener('error', handleWidgetError);

    const loadWidget = () => {
      return Sentry.startSpan(
        {
          op: 'widget.load',
          name: 'Mindbody Newsletter Widget Load',
        },
        span => {
          try {
            span.setAttribute('widget_type', 'newsletter');

            // Clear container
            if (widgetContainerRef.current) {
              widgetContainerRef.current.innerHTML = '';
            }

            // Check if script is already loaded
            const existingScript = document.querySelector('script[src*="healcode.js"]');

            if (!existingScript) {
              // Load the script
              const script = document.createElement('script');
              script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
              script.type = 'text/javascript';

              script.onload = () => {
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
                setHasError(true);
                setIsLoading(false);
              };

              document.head.appendChild(script);
            } else {
              // Script already loaded, create widget directly
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
            setHasError(true);
            setIsLoading(false);
          }
        }
      );
    };

    const createWidget = () => {
      try {
        if (widgetContainerRef.current) {
          // Use the simplest approach - just set innerHTML with the exact HTML
          widgetContainerRef.current.innerHTML = `
            <healcode-widget 
              data-type="prospects" 
              data-widget-partner="object" 
              data-widget-id="ec59331b5f7" 
              data-widget-version="0"
              data-widget-config="{}"
              data-widget-options="{}">
            </healcode-widget>
          `;

          // Check if widget loaded
          setTimeout(() => {
            const widget = widgetContainerRef.current?.querySelector('healcode-widget');
            if (widget && widget.children.length > 0) {
              setIsLoading(false);
            } else {
              // Wait a bit more
              setTimeout(() => {
                const widgetCheck = widgetContainerRef.current?.querySelector('healcode-widget');
                if (widgetCheck && widgetCheck.children.length > 0) {
                  setIsLoading(false);
                } else {
                  setHasError(true);
                  setIsLoading(false);
                }
              }, 3000);
            }
          }, 2000);
        }
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Load widget when component mounts
    loadWidget();

    // Cleanup function
    return () => {
      window.removeEventListener('error', handleWidgetError);

      // Restore original JSON.parse
      JSON.parse = originalJSONParse;
    };
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);

    // Clear widget container
    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = '';
    }

    // Reload
    const loadWidget = () => {
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = `
          <healcode-widget 
            data-type="prospects" 
            data-widget-partner="object" 
            data-widget-id="ec59331b5f7" 
            data-widget-version="0"
            data-widget-config="{}"
            data-widget-options="{}">
          </healcode-widget>
        `;

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    loadWidget();
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
