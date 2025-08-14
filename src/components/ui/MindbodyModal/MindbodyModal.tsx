'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MindbodyModal.module.css';

interface MindbodyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MindbodyModal: FC<MindbodyModalProps> = ({ isOpen, onClose }) => {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [isWidgetReady, setIsWidgetReady] = useState(false);

  useEffect(() => {
    // Safety check - don't run effect if window is undefined
    if (typeof window === 'undefined') {
      return;
    }

    const container = widgetContainerRef.current;
    if (isOpen && container) {
      try {
        // Clear existing content
        container.innerHTML = '';

        // Create the widget element
        const widgetElement = document.createElement('healcode-widget');
        widgetElement.setAttribute('data-type', 'prospects');
        widgetElement.setAttribute('data-widget-partner', 'object');
        widgetElement.setAttribute('data-widget-id', 'ec59329b5f7');
        widgetElement.setAttribute('data-widget-version', '0');

        // Append the widget to the container
        container.appendChild(widgetElement);

        // Load the script if not already loaded
        if (!scriptRef.current) {
          const script = document.createElement('script');
          script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
          script.type = 'text/javascript';
          script.async = true;

          script.onload = () => {
            console.log('Healcode script loaded successfully');
            setIsWidgetReady(true);
          };

          script.onerror = error => {
            console.error('Failed to load Healcode script:', error);
          };

          document.head.appendChild(script);
          scriptRef.current = script;
        }
      } catch (error) {
        console.error('Error setting up Mindbody widget:', error);
      }

      return () => {
        // Clean up widget content when modal closes
        try {
          if (container) {
            container.innerHTML = '';
          }
        } catch (error) {
          console.error('Error cleaning up Mindbody widget:', error);
        }
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <button className={styles.closeButton} onClick={onClose}>
                ×
              </button>
            </div>

            <div className={styles.modalContent}>
              {isWidgetReady ? (
                <div ref={widgetContainerRef} className={styles.widgetContainer} />
              ) : (
                <div className={styles.loadingContainer}>
                  <p>Loading booking widget...</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MindbodyModal;
