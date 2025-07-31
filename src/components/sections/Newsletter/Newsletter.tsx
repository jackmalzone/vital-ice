'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [shouldRenderWidget, setShouldRenderWidget] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    // Load the script if not already loaded
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        console.log('Healcode script loaded successfully');
        // Add a delay to ensure the script is fully initialized
        setTimeout(() => {
          setIsWidgetReady(true);
          // Wait a bit more before allowing widget render
          setTimeout(() => {
            setShouldRenderWidget(true);
          }, 500);
        }, 500);
      };

      script.onerror = error => {
        console.error('Failed to load Healcode script:', error);
      };

      document.head.appendChild(script);
      scriptRef.current = script;
    } else {
      // If script already loaded, set ready after a delay
      setTimeout(() => {
        setIsWidgetReady(true);
        setTimeout(() => {
          setShouldRenderWidget(true);
        }, 500);
      }, 500);
    }

    return () => {
      // Clean up
      setIsWidgetReady(false);
      setShouldRenderWidget(false);
    };
  }, []);

  // Separate effect to create widget when ready
  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    if (shouldRenderWidget && widgetContainerRef.current && isWidgetReady) {
      try {
        // Clear existing content
        widgetContainerRef.current.innerHTML = '';

        // Add a delay to ensure DOM is ready
        setTimeout(() => {
          try {
            // Check if the custom element is registered
            if (typeof window !== 'undefined' && window.customElements && window.customElements.get('healcode-widget')) {
              // Create the widget element
              const widgetElement = document.createElement('healcode-widget');
              widgetElement.setAttribute('data-type', 'prospects');
              widgetElement.setAttribute('data-widget-partner', 'object');
              widgetElement.setAttribute('data-widget-id', 'ec59329b5f7');
              widgetElement.setAttribute('data-widget-version', '0');

              // Add additional attributes that might be expected
              widgetElement.setAttribute('data-widget-type', 'prospects');
              widgetElement.setAttribute('data-widget-partner-id', 'object');

              // Append the widget to the container
              if (widgetContainerRef.current) {
                widgetContainerRef.current.appendChild(widgetElement);
                
                // Force the widget to initialize by dispatching a custom event
                setTimeout(() => {
                  if (widgetElement && typeof window !== 'undefined') {
                    // Try to trigger widget initialization
                    window.dispatchEvent(new Event('DOMContentLoaded'));
                    
                    // Check if widget has content after a delay
                    setTimeout(() => {
                      if (widgetElement.children.length === 0) {
                        console.log('Widget still empty, trying alternative approach...');
                        // Try creating the widget with innerHTML approach
                        widgetElement.innerHTML = '';
                        widgetElement.setAttribute('data-widget-id', 'ec59329b5f7');
                      }
                    }, 1000);
                  }
                }, 200);
              }
            } else {
              console.log('Healcode widget custom element not yet registered, retrying...');
              // Retry after a short delay
              setTimeout(() => {
                if (widgetContainerRef.current && shouldRenderWidget) {
                  widgetContainerRef.current.innerHTML = '';
                  const widgetElement = document.createElement('healcode-widget');
                  widgetElement.setAttribute('data-type', 'prospects');
                  widgetElement.setAttribute('data-widget-partner', 'object');
                  widgetElement.setAttribute('data-widget-id', 'ec59329b5f7');
                  widgetElement.setAttribute('data-widget-version', '0');
                  widgetElement.setAttribute('data-widget-type', 'prospects');
                  widgetElement.setAttribute('data-widget-partner-id', 'object');
                  widgetContainerRef.current.appendChild(widgetElement);
                }
              }, 500);
            }
          } catch (error) {
            console.error('Error creating Mindbody widget:', error);
          }
        }, 100); // 100ms delay to ensure DOM is ready
      } catch (error) {
        console.error('Error setting up widget container:', error);
      }
    }
  }, [shouldRenderWidget, isWidgetReady]);

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
          {isClient && shouldRenderWidget ? (
            <div ref={widgetContainerRef} className={styles.widgetContent} />
          ) : (
            <div className={styles.loadingContainer}>
              <p>Loading newsletter signup...</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
