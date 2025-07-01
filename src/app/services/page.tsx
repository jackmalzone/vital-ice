'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

const services = [
  {
    id: 'infrared-sauna',
    title: 'Infrared Sauna',
    description: 'Deep tissue warming with infrared technology for detoxification and relaxation',
    benefits: ['Detoxification', 'Pain Relief', 'Stress Reduction', 'Improved Circulation'],
    image: '/images/sauna-ambient.jpg',
    link: '/services/infrared-sauna'
  },
  {
    id: 'traditional-sauna',
    title: 'Traditional Sauna',
    description: 'Classic Finnish-style sauna experience with dry heat therapy',
    benefits: ['Cardiovascular Health', 'Muscle Recovery', 'Immune Support', 'Mental Clarity'],
    image: '/images/traditional-sauna.jpg',
    link: '/services/traditional-sauna'
  },
  {
    id: 'cold-plunge',
    title: 'Cold Plunge',
    description: 'Ice-cold water therapy for enhanced recovery and mental resilience',
    benefits: ['Faster Recovery', 'Reduced Inflammation', 'Mental Toughness', 'Improved Sleep'],
    image: '/images/cold-plunge.jpg',
    link: '/services/cold-plunge'
  },
  {
    id: 'compression-boots',
    title: 'Compression Boots',
    description: 'Advanced compression therapy for enhanced circulation and recovery',
    benefits: ['Improved Circulation', 'Faster Recovery', 'Reduced Swelling', 'Enhanced Performance'],
    image: '/images/compression-boots.jpg',
    link: '/services/compression-boots'
  },
  {
    id: 'percussion-massage',
    title: 'Percussion Massage',
    description: 'Deep tissue percussion therapy for muscle recovery and tension relief',
    benefits: ['Muscle Recovery', 'Tension Relief', 'Improved Range of Motion', 'Enhanced Performance'],
    image: '/images/percussion-massage.jpg',
    link: '/services/percussion-massage'
  },
  {
    id: 'red-light-therapy',
    title: 'Red Light Therapy',
    description: 'Therapeutic light treatment for cellular regeneration and skin health',
    benefits: ['Cellular Regeneration', 'Skin Health', 'Pain Relief', 'Anti-Aging'],
    image: '/images/red-light-therapy.jpg',
    link: '/services/red-light-therapy'
  }
];

const ServicesPage: FC = () => {
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
            Our Services
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive wellness experiences designed to restore, rejuvenate, and transform
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className={styles.services}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.services__container}>
          <motion.h2
            className={styles.services__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Wellness Experiences
          </motion.h2>
          
          <div className={styles.services__grid}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={styles.service}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.service__image}>
                  <div 
                    className={styles.service__imageBg}
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                </div>
                <div className={styles.service__content}>
                  <h3 className={styles.service__title}>{service.title}</h3>
                  <p className={styles.service__description}>{service.description}</p>
                  
                  <div className={styles.service__benefits}>
                    <h4 className={styles.service__benefitsTitle}>Key Benefits</h4>
                    <ul className={styles.service__benefitsList}>
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className={styles.service__benefit}>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={service.link} className={styles.service__link}>
                    Learn More
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
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
          <h2 className={styles.cta__title}>Ready to Begin Your Journey?</h2>
          <p className={styles.cta__text}>
            Book your first session and experience the transformative power of contrast therapy
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

export default ServicesPage; 