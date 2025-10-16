'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Widget } from '@/components/ui/Widget/Widget';
import Logo from '@/components/ui/Logo/Logo';
import { useAppStore } from '@/lib/store/AppStore';
import styles from './page.module.css';

const BookPageClient: FC = () => {
  // Only subscribe to the specific state we need, not the entire store
  const showRegistration = useAppStore(state => state.showRegistration);
  const setShowRegistration = useAppStore(state => state.setShowRegistration);

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
        className={styles.comingSoonContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className={styles.backgroundText}>Coming Soon</div>
        <div className={styles.comingSoonContent}>
          <Logo className={styles.logo} width={200} height={100} />
          <h2 className={styles.comingSoonTitle}>Founding Memberships Available</h2>
          <motion.button
            className={styles.emailButton}
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
            Email for Details
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
