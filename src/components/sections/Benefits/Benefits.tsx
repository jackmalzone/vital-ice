'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Benefits.module.css';

const Benefits: FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const benefits = [
    {
      title: 'Cold Plunge',
      description: 'Recovery, clarity, vagus nerve activation',
      details: 'Experience the transformative power of cold water therapy. Our state-of-the-art cold plunge pools are maintained at optimal temperatures to activate your vagus nerve, reduce inflammation, and accelerate recovery. Each session is designed to enhance mental clarity and boost your body\'s natural healing processes.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
          <path
            d="M19 15L19.5 17L22 17.5L19.5 18L19 20L18.5 18L16 17.5L18.5 17L19 15Z"
            fill="currentColor"
          />
          <path
            d="M5 15L5.5 17L8 17.5L5.5 18L5 20L4.5 18L2 17.5L4.5 17L5 15Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: 'Infrared Sauna',
      description: 'Detox, circulation, immune support',
      details: 'Step into our advanced infrared sauna chambers where deep-penetrating heat works at the cellular level. This gentle yet powerful therapy promotes detoxification, improves circulation, and strengthens your immune system. Experience deep relaxation while your body naturally eliminates toxins and rejuvenates.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path
            d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: 'Community Ritual',
      description: 'Connection, breath, nervous system repair',
      details: 'Join a community of like-minded individuals committed to their wellness journey. Our guided sessions combine breathwork, meditation, and recovery practices in a supportive environment. Experience the power of collective intention and build lasting connections while repairing your nervous system.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="benefits" className={styles.benefits}>
      <div className={styles.benefits__container}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className={styles.benefits__content}
        >
          <motion.h2 
            className={styles.benefits__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Recovery
          </motion.h2>
          
          <motion.p 
            className={styles.benefits__subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experience the science-backed benefits of cold therapy and infrared sauna
          </motion.p>

          <motion.div 
            className={styles.benefits__grid}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className={`${styles.benefit__card} ${expandedCard === index ? styles.expanded : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleCardClick(index)}
              >
                <div className={styles.benefit__icon}>
                  {benefit.icon}
                </div>
                <h3 className={styles.benefit__title}>{benefit.title}</h3>
                <p className={styles.benefit__description}>{benefit.description}</p>
                <div className={styles.benefit__details}>
                  <p>{benefit.details}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits; 