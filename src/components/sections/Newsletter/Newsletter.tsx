'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as Sentry from '@sentry/nextjs';
import { trackEvent } from '@/lib/utils/analytics';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetCreatedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    // Suppress jQuery Migrate warnings from third-party widgets
    if (
      typeof window !== 'undefined' &&
      (window as { jQuery?: { migrateMute?: boolean } }).jQuery
    ) {
      (window as { jQuery?: { migrateMute?: boolean } }).jQuery!.migrateMute = true;
    }

    // Don't override JSON.parse as it's causing issues with widget functionality

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
      // Prevent duplicate widget creation
      if (widgetCreatedRef.current) {
        return;
      }

      try {
        if (widgetContainerRef.current) {
          // Clear any existing content
          widgetContainerRef.current.innerHTML = '';

          // Create widget element
          const widgetElement = document.createElement('healcode-widget');
          widgetElement.setAttribute('data-type', 'prospects');
          widgetElement.setAttribute('data-widget-partner', 'object');
          widgetElement.setAttribute('data-widget-id', 'ec59331b5f7');
          widgetElement.setAttribute('data-widget-version', '0');

          widgetContainerRef.current.appendChild(widgetElement);
          widgetCreatedRef.current = true;

          // Check if widget loaded
          setTimeout(() => {
            const widget = widgetContainerRef.current?.querySelector('healcode-widget');
            if (widget && widget.children.length > 0) {
              setIsLoading(false);
              // Track successful widget load
              trackEvent('Newsletter Widget Loaded', {
                widget_type: 'newsletter',
                widget_id: 'ec59331b5f7',
              });
            } else {
              // Wait a bit more
              setTimeout(() => {
                const widgetCheck = widgetContainerRef.current?.querySelector('healcode-widget');
                if (widgetCheck && widgetCheck.children.length > 0) {
                  setIsLoading(false);
                  // Track successful widget load
                  trackEvent('Newsletter Widget Loaded', {
                    widget_type: 'newsletter',
                    widget_id: 'ec59331b5f7',
                  });
                } else {
                  setHasError(true);
                  setIsLoading(false);
                  // Track widget load failure
                  trackEvent('Newsletter Widget Failed', {
                    widget_type: 'newsletter',
                    widget_id: 'ec59331b5f7',
                    error: 'timeout',
                  });
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
      // Reset widget creation tracking
      widgetCreatedRef.current = false;
    };
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    widgetCreatedRef.current = false; // Reset widget creation tracking

    // Track retry attempt
    trackEvent('Newsletter Widget Retry', {
      widget_type: 'newsletter',
      widget_id: 'ec59331b5f7',
    });

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
          // Track retry success
          trackEvent('Newsletter Widget Retry Success', {
            widget_type: 'newsletter',
            widget_id: 'ec59331b5f7',
          });
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
