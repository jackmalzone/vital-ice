'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

const About: FC = () => {
  return (
    <section id="about" className={styles.about}>
      {/* Background Image */}
      <div className={styles.about__background}>
        <Image
          src="/images/vision-forest.jpg"
          alt="Visionary forest scene"
          fill
          className={styles.about__backgroundImage}
          priority
        />
        <div className={styles.about__overlay} />
      </div>

      {/* Gradient Overlays */}
      <div className={styles.about__gradientTop} />
      <div className={styles.about__gradientBottom} />

      {/* Mist Effect */}
      <div className={styles.about__mist} />

      {/* Noise Overlay */}
      <div className={styles.about__noise} />

      {/* Content Container */}
      <div className={styles.about__container}>
        <motion.div
          className={styles.about__content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h2
            className={styles.about__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            OUR VISION
          </motion.h2>

          <motion.div
            className={styles.about__text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.p
              className={styles.about__tagline}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Reconnecting with the elemental rhythms that restore&nbsp;us.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Vital Ice reimagines ancient practices through a modern lens — creating space for
              recovery, clarity, and connection.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              In a world that moves fast, we return to what's slow, intentional, and effective.
              Through contrast therapy, we help people reset their systems and reawaken resilience.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              By blending time-tested rituals with leading-edge wellness, we empower individuals and
              communities to recover, thrive, and evolve.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              We&apos;re committed to making wellness accessible for everyone.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className={styles.about__scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className={styles.about__scrollIndicator}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  );
};

export default About;
