'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

const About: FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.about__container}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className={styles.about__content}
        >
          <motion.h2 
            className={styles.about__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h2>
          
          <motion.div 
            className={styles.about__story}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={styles.about__text}>
              <p>
                Vital Ice was born from a simple yet profound realization: modern life has disconnected us from the natural rhythms that our bodies evolved with. In a world of constant stimulation and stress, we&apos;ve lost touch with the restorative power of intentional cold exposure and mindful heat therapy.
              </p>
              <p>
                Our founders, having experienced the transformative effects of cold plunge and infrared sauna therapy firsthand, envisioned a space where people could reconnect with these ancient wellness practices in a modern, accessible way. We believe that true recovery isn&apos;t just about physical healing—it&apos;s about creating moments of presence, clarity, and connection.
              </p>
            </div>

            <motion.div 
              className={styles.about__image}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/images/founders-seanstephen.png"
                alt="Vital Ice founders"
                width={500}
                height={400}
                className={styles.about__imageElement}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.about__vision}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>What Sets Us Apart</h3>
            <p>
              Unlike traditional wellness centers, Vital Ice combines cutting-edge technology with time-tested practices. Our approach integrates the latest research in cold therapy and infrared sauna benefits with a focus on creating a community of individuals committed to their recovery journey.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 
