'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const ColdPlungePage: FC = () => {
  const benefits = [
    {
      title: 'Enhanced Recovery',
      description: 'Accelerate muscle recovery and reduce inflammation through controlled cold exposure',
      icon: '❄️'
    },
    {
      title: 'Mental Resilience',
      description: 'Build mental toughness and improve stress response through cold adaptation',
      icon: '🧠'
    },
    {
      title: 'Improved Sleep',
      description: 'Regulate circadian rhythms and enhance sleep quality through cold therapy',
      icon: '😴'
    },
    {
      title: 'Immune Support',
      description: 'Strengthen immune function and increase white blood cell production',
      icon: '🛡️'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Preparation',
      description: 'Begin with a brief consultation and safety briefing. Our team will guide you through proper breathing techniques.'
    },
    {
      step: '02',
      title: 'Gradual Exposure',
      description: 'Start with a 30-second to 2-minute immersion in our 50°F cold plunge, gradually building tolerance.'
    },
    {
      step: '03',
      title: 'Breathing Focus',
      description: 'Practice controlled breathing to manage the cold shock response and maximize benefits.'
    },
    {
      step: '04',
      title: 'Recovery',
      description: 'Warm up gradually and hydrate. Many clients pair this with our infrared sauna for contrast therapy.'
    }
  ];

  return (
    <main className={styles.main}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.hero__background}>
          <div className={styles.hero__image} />
          <div className={styles.hero__overlay} />
        </div>
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cold Plunge Therapy
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the transformative power of controlled cold exposure for enhanced recovery, mental resilience, and overall wellness
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
            Book Cold Plunge Session
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
            <h2 className={styles.overview__title}>What is Cold Plunge Therapy?</h2>
            <p className={styles.overview__text}>
              Cold plunge therapy involves immersing your body in cold water (typically 50-60°F) 
              for short periods to trigger a range of physiological responses. This ancient practice 
              has been used for centuries across cultures and is now backed by modern science.
            </p>
            <p className={styles.overview__text}>
              At Vital Ice, we provide a safe, controlled environment for cold exposure therapy, 
              combining traditional wisdom with modern technology to deliver optimal results.
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
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className={styles.benefit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.benefit__icon}>{benefit.icon}</div>
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
            Your Cold Plunge Experience
          </motion.h2>
          <div className={styles.process__steps}>
            {process.map((step, index) => (
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
          <h2 className={styles.cta__title}>Ready to Experience Cold Plunge?</h2>
          <p className={styles.cta__text}>
            Book your first session and discover the transformative benefits of cold therapy
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

export default ColdPlungePage; 