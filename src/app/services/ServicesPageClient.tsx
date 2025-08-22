'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';
import { services, faqData } from '@/lib/seo/structured-data';
import styles from './page.module.css';

const servicesData = [
  {
    id: 'cold-plunge',
    title: 'Cold Plunge',
    tagline: 'Let the chill change you.',
    specs: '40–50 degrees. 2–5 minutes. A science backed remedy',
    description: 'Step in cold. Step out clear.',
    benefits: ['Faster Recovery', 'Reduced Inflammation', 'Mental Toughness', 'Improved Sleep'],
    image: 'https://media.vitalicesf.com/coldplunge_woman.jpg',
    link: '/services/cold-plunge',
  },
  {
    id: 'infrared-sauna',
    title: 'Infrared Sauna',
    tagline: 'Let the light heat the body from within.',
    specs: '120-150 degrees. 30-40 minutes. A modern method of recovery',
    description: 'Release the strain. Welcome the repair',
    benefits: ['Detoxification', 'Pain Relief', 'Stress Reduction', 'Improved Circulation'],
    image: 'https://media.vitalicesf.com/sauna-infraredwide.jpg',
    link: '/services/infrared-sauna',
  },
  {
    id: 'traditional-sauna',
    title: 'Traditional Sauna',
    tagline: 'Let the heat hold you.',
    specs: '160–200 degrees. 10–20 minutes. A time tested tradition',
    description: 'Exhale the noise. Inhale the calm.',
    benefits: ['Cardiovascular Health', 'Muscle Recovery', 'Immune Support', 'Mental Clarity'],
    image: 'https://media.vitalicesf.com/sauna-traditional.jpg',
    link: '/services/traditional-sauna',
  },
  {
    id: 'red-light-therapy',
    title: 'Red Light Therapy',
    tagline: 'Rejuvenation by the power of light',
    specs: 'Ambient temp. 10-20 minutes. Mask your face in Low-level red and near-infrared light',
    description: 'Red light. Radiant skin.',
    benefits: ['Cellular Regeneration', 'Skin Health', 'Pain Relief', 'Anti-Aging'],
    image: 'https://media.vitalicesf.com/redlight_jellyfish.jpg',
    link: '/services/red-light-therapy',
  },
  {
    id: 'compression-boots',
    title: 'Compression Boots',
    tagline: 'Let the pressure release you.',
    specs: 'Sequential compression. 20-30 minutes. A modern recovery tool',
    description: 'Compress. Decompress. Recover.',
    benefits: ['Improved Circulation', 'Muscle Recovery', 'Lymphatic Drainage', 'Reduced Swelling'],
    image: 'https://media.vitalicesf.com/compression-boots.jpg',
    link: '/services/compression-boots',
  },
  {
    id: 'percussion-massage',
    title: 'Percussion Massage',
    tagline: 'Let the rhythm heal you.',
    specs: 'Deep tissue percussion. 15-30 minutes. A targeted recovery method',
    description: 'Rhythm. Relief. Recovery.',
    benefits: ['Muscle Recovery', 'Pain Relief', 'Improved Mobility', 'Stress Reduction'],
    image: 'https://media.vitalicesf.com/percussion-massage.jpg',
    link: '/services/percussion-massage',
  },
];

const ServicesPageClient: FC = () => {
  return (
    <>
      {/* Structured Data for Services */}
      <StructuredData data={Object.values(services)} />
      <StructuredData data={faqData} />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>Our Services</h1>
          <p className={styles.subtitle}>
            Experience the full spectrum of recovery and wellness through our comprehensive suite of
            services.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.service}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  <h4 className={styles.service__benefitsTitle}>Benefits</h4>
                  <ul className={styles.service__benefitsList}>
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className={styles.service__benefit}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={service.link} className={styles.service__link}>
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className={styles.cta__container}>
            <h2 className={styles.cta__title}>Ready to Begin Your Recovery Journey?</h2>
            <p className={styles.cta__text}>
              Book your first session and experience the transformative power of our wellness
              services.
            </p>
            <Link href="/book" className={styles.cta__button}>
              Book Now
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ServicesPageClient;