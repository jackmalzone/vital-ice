'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Simple SVG icon components
const CheckIcon = () => (
  <svg className={styles.benefitIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const LockIcon = () => (
  <svg className={styles.benefitIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const FlashIcon = () => (
  <svg className={styles.benefitIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);

const CardIcon = () => (
  <svg className={styles.benefitIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);
import { Widget } from '@/components/ui/Widget/Widget';
import Logo from '@/components/ui/Logo/Logo';
import { useAppStore } from '@/lib/store/AppStore';
import styles from './page.module.css';

const BookPageClient: FC = () => {
  // Only subscribe to the specific state we need, not the entire store
  const showRegistration = useAppStore(state => state.showRegistration);
  const setShowRegistration = useAppStore(state => state.setShowRegistration);
  const [showTerms, setShowTerms] = useState(false);

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
      } catch {
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
      } catch {
        // Silently handle sessionStorage errors
      }
    });

    // Force widget to reload by toggling registration state
    setShowRegistration(false);
    setTimeout(() => setShowRegistration(true), 100);
  };

  const handleWidgetError = () => {
    setShowRegistration(false);
  };

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
        className={styles.foundingSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className={styles.backgroundText}>Coming Soon</div>
        <div className={styles.foundingContent}>
          <Logo className={styles.logo} width={200} height={100} />
          <h2 className={styles.foundingTitle}>Founding Memberships Available</h2>
          <p className={styles.foundingSubtitle}>
            <strong>Limited</strong> presale opportunity with exclusive benefits
          </p>

          {/* Unified Pricing Display */}
          <div className={styles.pricingDisplay}>
            <div className={styles.membershipType}>
              <h4 className={styles.typeTitle}>Community Membership</h4>
              <div className={styles.membershipContent}>
                <div className={styles.membershipInfo}>
                  <p className={styles.typeDescription}>
                    Access to shared recovery space with cold plunge, saunas, and recovery equipment
                  </p>
                  <p className={styles.limitedText}>
                    <strong>Limited availability</strong>
                  </p>
                </div>
                <div className={styles.priceColumn}>
                  <div className={styles.priceBox}>
                    <span className={styles.waveTitle}>Wave 1</span>
                    <span className={styles.price}>$149</span>
                  </div>
                  <div className={styles.priceBox}>
                    <span className={styles.waveTitle}>Wave 2</span>
                    <span className={styles.price}>$179</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.membershipType}>
              <h4 className={styles.typeTitle}>Private Membership</h4>
              <div className={styles.membershipContent}>
                <div className={styles.membershipInfo}>
                  <p className={styles.typeDescription}>
                    Exclusive access to private recovery room with personalized experience and
                    priority booking
                  </p>
                  <p className={styles.limitedText}>
                    <strong>Extremely limited availability</strong>
                  </p>
                </div>
                <div className={styles.priceColumn}>
                  <div className={styles.priceBox}>
                    <span className={styles.waveTitle}>Wave 1</span>
                    <span className={styles.price}>$189</span>
                  </div>
                  <div className={styles.priceBox}>
                    <span className={styles.waveTitle}>Wave 2</span>
                    <span className={styles.price}>$229</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <motion.div
            className={styles.benefitsSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              className={styles.benefitsToggle}
              onClick={() => setShowTerms(!showTerms)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Founding Member Benefits</span>
              <span className={`${styles.toggleIcon} ${showTerms ? styles.expanded : ''}`}>▼</span>
            </motion.button>

            <AnimatePresence>
              {showTerms && (
                <motion.div
                  className={styles.benefitsContent}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className={styles.benefitsList}>
                    <div className={styles.benefit}>
                      <CheckIcon />
                      <div>
                        <strong>Exclusive Presale Pricing</strong>
                        <p>Special discounted rates locked in at time of purchase</p>
                      </div>
                    </div>
                    <div className={styles.benefit}>
                      <LockIcon />
                      <div>
                        <strong>Lifetime Rate Lock</strong>
                        <p>Your founding member rate will never increase</p>
                      </div>
                    </div>
                    <div className={styles.benefit}>
                      <FlashIcon />
                      <div>
                        <strong>Early Access</strong>
                        <p>Access to the facility before official launch</p>
                      </div>
                    </div>
                    <div className={styles.benefit}>
                      <CardIcon />
                      <div>
                        <strong>Flexible Payment</strong>
                        <p>Monthly autopay or annual payment options</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className={styles.ctaButton}
            onClick={() =>
              window.open(
                'mailto:info@vitalicesf.com?subject=Founding Membership Inquiry',
                '_blank'
              )
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Secure Your Founding Membership
          </motion.button>
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
            >
              <h3 className={styles.registrationHeader}>
                New To Our Studio? Register with Mindbody.
              </h3>

              <Widget type="registration" onError={handleWidgetError} />

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
    </div>
  );
};

export default BookPageClient;
