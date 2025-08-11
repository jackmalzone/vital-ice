'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo/Logo';
import { springConfigs } from '@/lib/utils/animations';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const address = '2400 Chestnut St, San Francisco, CA 94123';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <motion.div
            className={styles.footer__brand}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Logo className={styles.footer__logo} width={140} height={40} />
            <p className={styles.footer__tagline}>Live Better — Together.</p>
          </motion.div>

          <motion.div
            className={styles.footer__contact}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className={styles.footer__sectionTitle}>Contact</h3>
            <div className={styles.footer__contactInfo}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springConfigs.quick}
              >
                <a href="mailto:info@vitalicesf.com" className={styles.footer__link}>
                  info@vitalicesf.com
                </a>
              </motion.div>

              <div className={styles.footer__addressContainer}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springConfigs.quick}
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footer__address}
                    aria-label={`Open ${address} in Google Maps`}
                  >
                    <address>
                      2400 Chestnut St
                      <br />
                      San Francisco, CA 94123
                    </address>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.footer__hours}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className={styles.footer__sectionTitle}>Operating Hours</h3>
            <div className={styles.footer__hoursInfo}>
              <div className={styles.footer__hoursDay}>
                <span className={styles.footer__hoursLabel}>Mon-Fri:</span>
                <span className={styles.footer__hoursTime}>6AM-10AM, 12PM-2PM, 4PM-9PM</span>
              </div>
              <div className={styles.footer__hoursDay}>
                <span className={styles.footer__hoursLabel}>Saturday:</span>
                <span className={styles.footer__hoursTime}>7AM-9PM</span>
              </div>
              <div className={styles.footer__hoursDay}>
                <span className={styles.footer__hoursLabel}>Sunday:</span>
                <span className={styles.footer__hoursTime}>8AM-7PM</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.footer__social}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.footer__sectionTitle}>Stay Connected</h3>
            <div className={styles.footer__socialLinks}>
              <a
                href="https://instagram.com/vitalice.sf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__socialLink}
                aria-label="Follow us on Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://linktr.ee/vitalicesf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__socialLink}
                aria-label="Visit our Linktree"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://apps.apple.com/us/app/vital-ice/id6748015943"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__socialLink}
                aria-label="Download Vital Ice App on App Store"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.footer__bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.footer__divider} />
          <div className={styles.footer__copyright}>
            <p>&copy; {currentYear} Vital Ice. All rights reserved.</p>
            <div className={styles.footer__legal}>
              <a href="/client-policy" className={styles.footer__legalLink}>
                Legal & Policies
              </a>
              <span className={styles.footer__separator}>•</span>
              <a href="/faq" className={styles.footer__legalLink}>
                FAQs
              </a>
              <span className={styles.footer__separator}>•</span>
              <a href="/careers" className={styles.footer__legalLink}>
                Careers
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
