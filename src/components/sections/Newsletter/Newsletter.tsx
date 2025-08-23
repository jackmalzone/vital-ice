'use client';
import { motion } from 'framer-motion';
import { Widget } from '@/components/ui/Widget/Widget';
import { trackEvent } from '@/lib/utils/analytics';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const handleWidgetLoad = () => {
    trackEvent('newsletter_widget_loaded', {
      widget_type: 'newsletter',
      widget_id: 'ec59331b5f7',
    });
  };

  const handleWidgetError = () => {
    trackEvent('newsletter_widget_error', {
      widget_type: 'newsletter',
      widget_id: 'ec59331b5f7',
    });
  };

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
          <Widget type="newsletter" onLoad={handleWidgetLoad} onError={handleWidgetError} />
        </motion.div>
      </motion.div>
    </section>
  );
}
