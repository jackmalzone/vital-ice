'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './ServiceTemplate.module.css';

interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  ctaTitle: string;
  ctaText: string;
}

interface ServiceTemplateProps {
  data: ServiceData;
}

const ServiceTemplate: FC<ServiceTemplateProps> = ({ data }) => {
  return (
    <main className={styles.main}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.hero__background}>
          <div 
            className={styles.hero__image}
            style={{ backgroundImage: `url(${data.backgroundImage})` }}
          />
          <div className={styles.hero__overlay} />
        </div>
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.title}
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.subtitle}
          </motion.p>
          <motion.button
            className={styles.hero__cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://mindbody.com', '_blank')}
          >
            Book {data.title} Session
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        className={styles.overview}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.overview__container}>
          <motion.div
            className={styles.overview__content}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.overview__title}>What is {data.title}?</h2>
            <p className={styles.overview__text}>
              {data.description}
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={styles.benefits}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.benefits__container}>
          <motion.h2
            className={styles.benefits__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Key Benefits
          </motion.h2>
          <div className={styles.benefits__grid}>
            {data.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className={styles.benefit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className={styles.benefit__title}>{benefit.title}</h3>
                <p className={styles.benefit__description}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.process}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.process__container}>
          <motion.h2
            className={styles.process__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Your {data.title} Experience
          </motion.h2>
          <div className={styles.process__steps}>
            {data.process.map((step, index) => (
              <motion.div
                key={step.step}
                className={styles.process__step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={styles.process__stepNumber}>{step.step}</div>
                <div className={styles.process__stepContent}>
                  <h3 className={styles.process__stepTitle}>{step.title}</h3>
                  <p className={styles.process__stepDescription}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
          <h2 className={styles.cta__title}>{data.ctaTitle}</h2>
          <p className={styles.cta__text}>
            {data.ctaText}
          </p>
          <motion.button
            className={styles.cta__button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://mindbody.com', '_blank')}
          >
            Book Now
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
};

export default ServiceTemplate; 