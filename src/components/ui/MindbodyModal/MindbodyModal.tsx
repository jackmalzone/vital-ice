'use client';

import { FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MindbodyModal.module.css';



interface MindbodyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MindbodyModal: FC<MindbodyModalProps> = ({ isOpen, onClose }) => {
  console.log('MindbodyModal render - isOpen:', isOpen);
  
  useEffect(() => {
    console.log('Modal useEffect - isOpen:', isOpen);
    if (isOpen) {
      console.log('Modal opened, starting widget initialization...');
      
      // Find the modal content
      const modalContent = document.querySelector(`.${styles.widgetContainer}`);
      if (modalContent) {
        // Clear existing content
        modalContent.innerHTML = '';
        
        // Add the exact widget as provided
        modalContent.innerHTML = `
          <healcode-widget data-type="prospects" data-widget-partner="object" data-widget-id="ec59329b5f7" data-widget-version="0"></healcode-widget>
        `;
        
        // Load the script exactly as provided
        const script = document.createElement('script');
        script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
        script.type = 'text/javascript';
        script.async = true;
        
        script.onload = () => {
          console.log('Healcode script loaded successfully');
        };
        
        script.onerror = (error) => {
          console.error('Failed to load Healcode script:', error);
        };
        
        document.head.appendChild(script);
        console.log('Script added to document head');
      }

      return () => {
        console.log('Cleaning up modal...');
        // Remove the script when modal closes
        const existingScript = document.querySelector('script[src*="healcode.js"]');
        if (existingScript && existingScript.parentNode) {
          try {
            existingScript.parentNode.removeChild(existingScript);
            console.log('Script removed');
          } catch (error) {
            console.warn('Error removing script:', error);
          }
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <button className={styles.closeButton} onClick={onClose}>
                ×
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div 
                key={`mindbody-widget-${isOpen ? Date.now() : 'closed'}`}
                className={styles.widgetContainer}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MindbodyModal; 