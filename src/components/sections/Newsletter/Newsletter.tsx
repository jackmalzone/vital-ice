'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Integrate with your email service
  }

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

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className={styles.inputGroup}>
            <motion.input
              id="newsletter-email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="Your email address"
              required
              autoComplete="email"
              disabled={submitted}
              value={email}
              onChange={e => setEmail(e.target.value)}
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />

            <motion.button
              type="submit"
              className={styles.button}
              disabled={submitted}
              aria-live="polite"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.span
                    key="subscribe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Subscribe
                  </motion.span>
                ) : (
                  <motion.span
                    key="subscribed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.form>

        <AnimatePresence>
          {submitted && (
            <motion.div
              className={styles.feedback}
              aria-live="polite"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              Welcome. We&apos;ll stay in touch — lightly.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
