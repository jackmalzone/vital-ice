'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

const services = [
  {
    id: 'cold-plunge',
    title: 'Cold Plunge',
    tagline: 'Let the chill change you.',
    specs: '40–50 degrees. 2–5 minutes. A science backed remedy',
    description: 'Step in cold. Step out clear.',
    benefits: ['Faster Recovery', 'Reduced Inflammation', 'Mental Toughness', 'Improved Sleep'],
    image: '/images/coldplunge_woman.jpg',
    link: '/services/cold-plunge',
  },
  {
    id: 'infrared-sauna',
    title: 'Infrared Sauna',
    tagline: 'Let the light heat the body from within.',
    specs: '120-150 degrees. 30-40 minutes. A modern method of recovery',
    description: 'Release the strain. Welcome the repair',
    benefits: ['Detoxification', 'Pain Relief', 'Stress Reduction', 'Improved Circulation'],
    image: '/images/sauna-infraredwide.jpg',
    link: '/services/infrared-sauna',
  },
  {
    id: 'traditional-sauna',
    title: 'Traditional Sauna',
    tagline: 'Let the heat hold you.',
    specs: '160–200 degrees. 10–20 minutes. A time tested tradition',
    description: 'Exhale the noise. Inhale the calm.',
    benefits: ['Cardiovascular Health', 'Muscle Recovery', 'Immune Support', 'Mental Clarity'],
    image: '/images/sauna-traditional.jpg',
    link: '/services/traditional-sauna',
  },
  {
    id: 'red-light-therapy',
    title: 'Red Light Therapy',
    tagline: 'Rejuvenation by the power of light',
    specs: 'Ambient temp. 10-20 minutes. Mask your face in Low-level red and near-infrared light',
    description: 'Red light. Radiant skin.',
    benefits: ['Cellular Regeneration', 'Skin Health', 'Pain Relief', 'Anti-Aging'],
    image: '/images/redlight_jellyfish.jpg',
    link: '/services/red-light-therapy',
  },
  {
    id: 'compression-boots',
    title: 'Compression Boots',
    tagline: "Legs up. Pressure's on",
    specs: '15-20 minutes. Sequential compression improves circulation and brings relief.',
    description: 'Flush out the fatigue.',
    benefits: [
      'Improved Circulation',
      'Faster Recovery',
      'Reduced Swelling',
      'Enhanced Performance',
    ],
    image: '/images/cells-bloodcells.jpg',
    link: '/services/compression-boots',
  },
  {
    id: 'percussion-massage',
    title: 'Percussion Massagers',
    tagline: 'Powerful pulses. Faster recovery',
    specs: '10-20 minutes. Rapid, targeted pulses penetrate deep into muscle tissue.',
    description: 'Break the tension, with precision.',
    benefits: [
      'Muscle Recovery',
      'Tension Relief',
      'Improved Range of Motion',
      'Enhanced Performance',
    ],
    image: '/images/texture_blackmarble-cracks.jpg',
    link: '/services/percussion-massage',
  },
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
                  <p className={styles.service__tagline}>{service.tagline}</p>
                  <p className={styles.service__specs}>{service.specs}</p>
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
