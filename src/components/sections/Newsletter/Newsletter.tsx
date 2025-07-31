'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const widgetCreatedRef = useRef(false);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    // Prevent duplicate widget creation
    if (widgetCreatedRef.current) {
      return;
    }

    const createWidget = () => {
      if (widgetContainerRef.current && !widgetCreatedRef.current) {
        // Clear any existing content
        widgetContainerRef.current.innerHTML = '';

        const widgetElement = document.createElement('healcode-widget');
        widgetElement.setAttribute('data-type', 'prospects');
        widgetElement.setAttribute('data-widget-partner', 'object');
        widgetElement.setAttribute('data-widget-id', 'ec59331b5f7');
        widgetElement.setAttribute('data-widget-version', '0');
        widgetContainerRef.current.appendChild(widgetElement);
        widgetCreatedRef.current = true;
      }
    };

    // Load the script if not already loaded
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        console.log('Healcode script loaded successfully');
        // Small delay to ensure script is fully initialized
        setTimeout(createWidget, 100);
      };

      script.onerror = error => {
        console.error('Failed to load Healcode script:', error);
      };

      document.head.appendChild(script);
      scriptRef.current = script;
    } else {
      // If script already loaded, create widget immediately
      setTimeout(createWidget, 100);
    }

    // Cleanup function
    return () => {
      widgetCreatedRef.current = false;
    };
  }, []);

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
          <div ref={widgetContainerRef} className={styles.widgetContent} />
        </motion.div>
      </motion.div>
    </section>
  );
}
