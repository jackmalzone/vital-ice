'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo/Logo';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

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
            <p className={styles.footer__tagline}>
              Cold plunge and sauna experiences reimagined for modern wellness.
            </p>
          </motion.div>

          <motion.div
            className={styles.footer__contact}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className={styles.footer__sectionTitle}>Contact</h3>
            <div className={styles.footer__contactInfo}>
              <a href="mailto:hello@vitalice.com" className={styles.footer__link}>
                hello@vitalice.com
              </a>
              <a href="tel:+14155551234" className={styles.footer__link}>
                (415) 555-1234
              </a>
              <address className={styles.footer__address}>
                2400 Chestnut St
                <br />
                San Francisco, CA 94123
              </address>
            </div>
          </motion.div>

          <motion.div
            className={styles.footer__social}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.footer__sectionTitle}>Follow Us</h3>
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
