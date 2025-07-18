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
            OUR STORY
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
              Behind the name, we&apos;re just three local enthusiasts who wanted something simple.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              A place to cold plunge with our friends, close to home. When we couldn&apos;t find
              anything that felt right—affordable, high-quality, and built around community—we
              decided to create it ourselves. Vital Ice was built to bridge the gap between
              high-performance recovery and everyday accessibility.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              This started as a personal need and turned into something bigger: a space where people
              can reset, recover, and connect. No pressure. No BS. Just cold water, hot air, and the
              pride that comes with prioritizing your health and wellness.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              We built this for the early risers, the post-work plungers, the weekend warriors, and
              anyone trying to take care of their body and mind in a way that feels real. Whether
              you&apos;re here to get centered, recover from a hard workout, or just share a moment
              of peace—we&apos;re glad you&apos;re here.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              Recovery isn&apos;t a luxury — it&apos;s a ritual.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              — The Vital Ice Team
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
