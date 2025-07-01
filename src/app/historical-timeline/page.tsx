'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const timelineEvents = [
  {
    year: '2000 BCE',
    title: 'Ancient Finnish Saunas',
    description: 'The first documented saunas emerge in Finland, built as underground dwellings heated with hot stones. These early saunas served as both bathing facilities and spiritual centers for purification rituals.',
    region: 'Finland',
    category: 'Heat Therapy',
    image: '/images/finnish-sauna.jpg'
  },
  {
    year: '1000 BCE',
    title: 'Irish Sweat Houses',
    description: 'Tigh \'n Alluis (houses of sweat) become central to Irish wellness culture. These stone structures used heated stones and steam for purification, healing, and community bonding.',
    region: 'Ireland',
    category: 'Heat Therapy',
    image: '/images/irish-sweat-house.jpg'
  },
  {
    year: '1600 CE',
    title: 'Japanese Onsen Culture',
    description: 'During the Edo period, onsen (hot springs) become deeply integrated into Japanese culture. These natural thermal baths are valued for their healing properties and social significance.',
    region: 'Japan',
    category: 'Heat Therapy',
    image: '/images/japanese-onsen.jpg'
  },
  {
    year: '1900s',
    title: 'European Cold Hydrotherapy',
    description: 'Cold water therapy gains popularity in European spas and sanatoriums. Doctors begin prescribing cold baths for various ailments, recognizing the therapeutic benefits of cold exposure.',
    region: 'Europe',
    category: 'Cold Therapy',
    image: '/images/european-hydrotherapy.jpg'
  },
  {
    year: '2010s',
    title: 'Wim Hof Method',
    description: 'Dutch extreme athlete Wim Hof develops his method combining cold exposure, breathing techniques, and meditation. His approach brings ancient practices into the modern wellness conversation.',
    region: 'Netherlands',
    category: 'Cold Therapy',
    image: '/images/wim-hof.jpg'
  },
  {
    year: '2020s',
    title: 'Cold Plunge & Biohacking Surge',
    description: 'Cold plunge therapy explodes in popularity as part of the biohacking movement. Athletes, celebrities, and wellness enthusiasts embrace cold exposure for its proven benefits.',
    region: 'Global',
    category: 'Cold Therapy',
    image: '/images/cold-plunge-modern.jpg'
  },
  {
    year: '2025',
    title: 'Vital Ice Opens in SF',
    description: 'Vital Ice brings together the best of ancient wisdom and modern technology, creating a space where people can experience the transformative power of contrast therapy in the heart of San Francisco.',
    region: 'San Francisco',
    category: 'Modern Integration',
    image: '/images/vital-ice-facility.jpg'
  }
];

const TimelinePage: FC = () => {
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
            Historical Timeline
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A journey through 4,000 years of recovery rituals and wellness traditions
          </motion.p>
        </div>
      </motion.section>

      <section className={styles.timeline}>
        <div className={styles.timeline__container}>
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className={styles.timeline__event}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={`${styles.timeline__content} ${index % 2 === 0 ? styles.timeline__contentLeft : styles.timeline__contentRight}`}>
                <div className={styles.timeline__image}>
                  <div 
                    className={styles.timeline__imageBg}
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                </div>
                <div className={styles.timeline__text}>
                  <div className={styles.timeline__year}>{event.year}</div>
                  <h3 className={styles.timeline__title}>{event.title}</h3>
                  <div className={styles.timeline__meta}>
                    <span className={styles.timeline__region}>{event.region}</span>
                    <span className={styles.timeline__category}>{event.category}</span>
                  </div>
                  <p className={styles.timeline__description}>{event.description}</p>
                </div>
              </div>
              <div className={styles.timeline__marker}>
                <div className={styles.timeline__dot} />
                <div className={styles.timeline__line} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        className={styles.legacy}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.legacy__container}>
          <motion.h2
            className={styles.legacy__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Continuing the Legacy
          </motion.h2>
          <motion.p
            className={styles.legacy__text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            At Vital Ice, we honor these ancient traditions while embracing modern technology 
            and scientific understanding. Our approach combines the wisdom of centuries with 
            cutting-edge wellness practices, creating experiences that are both deeply rooted 
            in history and perfectly suited for contemporary life.
          </motion.p>
          <motion.button
            className={styles.legacy__button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://mindbody.com', '_blank')}
          >
            Experience the Tradition
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
};

export default TimelinePage; 