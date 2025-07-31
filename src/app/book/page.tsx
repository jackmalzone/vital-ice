'use client';

import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiFire, GiCaduceus, GiDiamonds, GiSun } from 'react-icons/gi';
import { TbPlant2, TbSnowflake } from 'react-icons/tb';
import { RxLightningBolt } from 'react-icons/rx';
import { FaWater } from 'react-icons/fa';
import Footer from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

const BookPage: FC = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const [widgetKey, setWidgetKey] = useState(Date.now());

  // Function to reset the registration form
  const resetRegistrationForm = () => {
    // Clear any stored form data from localStorage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('mindbody') || key.includes('healcode') || key.includes('registration'))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('Error removing localStorage item:', key, error);
      }
    });

    // Clear sessionStorage as well
    const sessionKeysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (key.includes('mindbody') || key.includes('healcode') || key.includes('registration'))) {
        sessionKeysToRemove.push(key);
      }
    }
    
    sessionKeysToRemove.forEach(key => {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.warn('Error removing sessionStorage item:', key, error);
      }
    });

    // Force widget to reload with new key
    setWidgetKey(Date.now());
    setWidgetError(false);
    
    console.log('Registration form reset - cleared stored data and reloading widget');
  };

  // Error boundary for React rendering errors
  const handleWidgetError = (error: any) => {
    console.warn('Registration widget rendering error:', error);
    setWidgetError(true);
  };

  // Global error handler for React child errors
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      const errorMessage = args[0]?.toString() || '';
      if (errorMessage.includes('Objects are not valid as a React child')) {
        console.warn('React child error intercepted:', errorMessage);
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
      console.log('Mindbody script loaded successfully');
      
              // Suppress Mindbody errors
        const originalConsoleError = console.error;
        console.error = function (...args) {
          const errorMessage = args[0]?.toString() || '';
          if (errorMessage.includes('Mixpanel error') || 
              errorMessage.includes('registrationSuccess') ||
              errorMessage.includes('Cannot read properties of null') ||
              errorMessage.includes('Objects are not valid as a React child')) {
            console.warn('Mindbody widget error suppressed:', errorMessage);
            return;
          }
          originalConsoleError.apply(console, args);
        };

        // Suppress jQuery errors
        if (typeof window !== 'undefined' && (window as any).jQuery) {
          const originalJQueryError = (window as any).jQuery.fn.error;
          (window as any).jQuery.fn.error = function() {
            console.warn('jQuery error suppressed in Mindbody widget');
            return this;
          };
        }

        // Suppress React rendering errors
        const originalConsoleWarn = console.warn;
        console.warn = function (...args) {
          const warningMessage = args[0]?.toString() || '';
          if (warningMessage.includes('Objects are not valid as a React child')) {
            console.log('React child error suppressed:', warningMessage);
            return;
          }
          originalConsoleWarn.apply(console, args);
        };
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Mindbody script:', error);
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      const existingScript = document.querySelector('script[src*="mindbodyonline.com"]');
      if (existingScript && existingScript.parentNode) {
        try {
          existingScript.parentNode.removeChild(existingScript);
        } catch (error) {
          console.warn('Error removing Mindbody script:', error);
        }
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
        
        // Suppress Mindbody JSON parsing errors
        const originalJSONParse = JSON.parse;
        JSON.parse = function (text) {
          try {
            return originalJSONParse.call(this, text);
          } catch (error) {
            console.warn('Mindbody registration widget JSON parse error suppressed:', error);
            return null;
          }
        };

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
        const originalJQueryError = (window as any).jQuery?.fn?.error || (() => {});
        if ((window as any).jQuery) {
          (window as any).jQuery.fn.error = function() {
            console.warn('jQuery error suppressed in registration widget');
            return this;
          };
        }
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Healcode registration script:', error);
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
    }
  }, [showRegistration]);

  const symbols = [
    { icon: GiFire, label: 'Fire' },
    { icon: GiSun, label: 'Sun' },
    { icon: FaWater, label: 'Water' },
    { icon: TbPlant2, label: 'Growth' },
    { icon: GiCaduceus, label: 'Healing' },
    { icon: TbSnowflake, label: 'Ice' },
    { icon: RxLightningBolt, label: 'Energy' },
    { icon: GiDiamonds, label: 'Strength' },
  ];

  return (
    <div className={styles.container}>
      {/* Etched stone symbols */}
      <div className={styles.symbols}>
        {symbols.map((symbol, i) => {
          const IconComponent = symbol.icon;
          return (
            <motion.div
              key={i}
              className={styles.symbol}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
              style={{
                left: i % 2 === 0 ? '5%' : '92%',
                top: `${20 + Math.floor(i / 2) * 20}%`,
              }}
            >
              <IconComponent />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>Book Your Session</h1>
        <p className={styles.subtitle}>
          Schedule your cold plunge, sauna, or recovery session
        </p>
      </motion.div>
      
      <motion.div
        className={styles.widgetContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div 
          className="mindbody-widget" 
          data-widget-type="Appointments" 
          data-widget-id="ec34949b5f7"
        />
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
              <h3 className={styles.registrationHeader}>New To Our Studio? Register with Mindbody.</h3>
              {!widgetError ? (
                <div 
                  key={`registration-widget-${widgetKey}`}
                  dangerouslySetInnerHTML={{
                    __html: '<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="ec161013b5f7" data-widget-version="0"></healcode-widget>'
                  }}
                  onError={handleWidgetError}
                  onLoad={() => {
                    // Widget loaded successfully
                    console.log('Registration widget loaded successfully');
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
                    marginTop: '0.5rem'
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