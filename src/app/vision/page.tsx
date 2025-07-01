'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const VisionPage: FC = () => {
  return (
    <main className={styles.main}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Vision
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Reconnecting with the elemental rhythms that restore us
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className={styles.philosophy}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.philosophy__container}>
          <motion.div
            className={styles.philosophy__content}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.philosophy__title}>Ancient Wisdom, Modern Intention</h2>
            <p className={styles.philosophy__text}>
              In a world that moves at breakneck speed, we've lost touch with the natural cycles 
              that our ancestors understood intimately. The contrast between fire and ice, 
              heat and cold, has been part of human wellness rituals for millennia.
            </p>
            <p className={styles.philosophy__text}>
              Vital Ice exists to bridge that gap—to bring the restorative power of elemental 
              therapy into the modern world, creating spaces where people can reconnect with 
              their innate capacity for healing and renewal.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={styles.elements}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.elements__container}>
          <motion.div
            className={styles.element}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.element__title}>The Power of Contrast</h3>
            <p className={styles.element__description}>
              Fire and ice, heat and cold—these opposing forces create the conditions for 
              transformation. Through intentional exposure to these elements, we activate 
              our body's natural healing mechanisms and strengthen our resilience.
            </p>
          </motion.div>

          <motion.div
            className={styles.element}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.element__title}>Community Ritual</h3>
            <p className={styles.element__description}>
              Wellness is not a solitary journey. We believe in the power of shared experience, 
              of gathering together to honor our bodies and minds through ancient practices 
              made accessible for modern life.
            </p>
          </motion.div>

          <motion.div
            className={styles.element}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.element__title}>Mindful Technology</h3>
            <p className={styles.element__description}>
              We embrace the best of both worlds—time-tested wellness practices enhanced by 
              modern technology. Our infrared saunas and precision-controlled cold plunge 
              systems deliver optimal therapeutic benefits in a safe, controlled environment.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={styles.cta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.cta__container}>
          <h2 className={styles.cta__title}>Experience the Transformation</h2>
          <p className={styles.cta__text}>
            Join us in creating a new relationship with your body, your mind, and your community.
          </p>
          <motion.button
            className={styles.cta__button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://mindbody.com', '_blank')}
          >
            Book Your First Session
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
};

export default VisionPage; 