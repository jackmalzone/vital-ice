'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  useEffect(() => {
    // Load Mindbody healcode script
    const script = document.createElement('script');
    script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      console.log('Healcode script loaded successfully');
      
      // Suppress Mindbody JSON parsing errors
      const originalJSONParse = JSON.parse;
      JSON.parse = function (text) {
        try {
          return originalJSONParse.call(this, text);
        } catch (error) {
          console.warn('Mindbody widget JSON parse error suppressed:', error);
          return null;
        }
      };
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Healcode script:', error);
    };
    
    document.head.appendChild(script);
    
    return () => {
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
          dangerouslySetInnerHTML={{
            __html: '<healcode-widget data-type="prospects" data-widget-partner="object" data-widget-id="ec59331b5f7" data-widget-version="0"></healcode-widget>'
          }}
        />
      </motion.div>
    </section>
  );
}
