'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';
import styles from './About.module.css';

const About: FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.about__container}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.about__title} variants={fadeInUp}>
            Experience the Power of Cold Therapy
          </motion.h2>

          <motion.div className={styles.about__grid} variants={staggerContainer}>
            <motion.div className={styles.about__item} variants={fadeInUp}>
              <h3 className={styles.about__itemTitle}>Recovery</h3>
              <p className={styles.about__itemText}>
                Accelerate your recovery with our state-of-the-art cold therapy treatments. Reduce
                inflammation, relieve pain, and enhance your body&apos;s natural healing process.
              </p>
            </motion.div>

            <motion.div className={styles.about__item} variants={fadeInUp}>
              <h3 className={styles.about__itemTitle}>Wellness</h3>
              <p className={styles.about__itemText}>
                Boost your overall wellness through controlled cold exposure. Improve circulation,
                strengthen your immune system, and increase energy levels.
              </p>
            </motion.div>

            <motion.div className={styles.about__item} variants={fadeInUp}>
              <h3 className={styles.about__itemTitle}>Performance</h3>
              <p className={styles.about__itemText}>
                Enhance your athletic performance with our specialized cold therapy protocols.
                Optimize recovery time and maintain peak condition.
              </p>
            </motion.div>

            <motion.div className={styles.about__item} variants={fadeInUp}>
              <h3 className={styles.about__itemTitle}>Community</h3>
              <p className={styles.about__itemText}>
                Join a community of like-minded individuals committed to their health and wellness
                journey. Share experiences and support each other&apos;s growth.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
