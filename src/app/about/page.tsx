'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './page.module.css';

const AboutPage: FC = () => {
  const values = [
    {
      title: 'Community First',
      description: 'We believe wellness is a shared journey. Our space fosters connection, support, and collective growth.',
      icon: '🤝'
    },
    {
      title: 'Ancient Wisdom',
      description: 'We honor time-tested practices while embracing modern science and technology for optimal results.',
      icon: '🧘'
    },
    {
      title: 'Inclusive Wellness',
      description: 'Wellness should be accessible to everyone. We create a welcoming, judgment-free environment.',
      icon: '❤️'
    },
    {
      title: 'Evidence-Based',
      description: 'Our approach combines traditional practices with cutting-edge research and proven methodologies.',
      icon: '🔬'
    }
  ];

  const team = [
    {
      name: 'Sean O\'Connor',
      role: 'Co-Founder & CEO',
      bio: 'Former professional athlete turned wellness advocate, Sean brings his passion for peak performance and recovery to Vital Ice.',
      image: '/images/founder-sean.png'
    },
    {
      name: 'Stephen Chen',
      role: 'Co-Founder & CTO',
      bio: 'Technology entrepreneur with a deep interest in biohacking and human optimization. Stephen oversees our innovative wellness technology.',
      image: '/images/founder-stephen.png'
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
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Vital Ice
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where ancient wisdom meets modern wellness
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className={styles.story}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.story__container}>
          <motion.div
            className={styles.story__content}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.story__title}>Our Story</h2>
            <p className={styles.story__text}>
              Vital Ice was born from a simple yet profound realization: modern life has disconnected 
              us from the natural rhythms that our bodies evolved with. In a world of constant 
              stimulation and stress, we've lost touch with the restorative power of intentional 
              cold exposure and mindful heat therapy.
            </p>
            <p className={styles.story__text}>
              Our founders, having experienced the transformative effects of cold plunge and infrared 
              sauna therapy firsthand, envisioned a space where people could reconnect with these 
              ancient wellness practices in a modern, accessible way. We believe that true recovery 
              isn't just about physical healing—it's about creating moments of presence, clarity, 
              and connection.
            </p>
          </motion.div>
          <motion.div
            className={styles.story__image}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/founders-seanstephen.png"
              alt="Vital Ice founders"
              width={500}
              height={400}
              className={styles.story__imageElement}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={styles.values}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.values__container}>
          <motion.h2
            className={styles.values__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          <div className={styles.values__grid}>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className={styles.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.value__icon}>{value.icon}</div>
                <h3 className={styles.value__title}>{value.title}</h3>
                <p className={styles.value__description}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.team}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.team__container}>
          <motion.h2
            className={styles.team__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Meet Our Founders
          </motion.h2>
          <div className={styles.team__grid}>
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className={styles.team__member}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.team__image}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className={styles.team__imageElement}
                  />
                </div>
                <div className={styles.team__info}>
                  <h3 className={styles.team__name}>{member.name}</h3>
                  <p className={styles.team__role}>{member.role}</p>
                  <p className={styles.team__bio}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.mission}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.mission__container}>
          <motion.h2
            className={styles.mission__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className={styles.mission__text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            To create spaces where people can reconnect with their innate capacity for healing and 
            renewal through the power of contrast therapy. We believe that by honoring ancient 
            wisdom while embracing modern technology, we can help individuals achieve optimal 
            wellness and build resilient, thriving communities.
          </motion.p>
          <motion.button
            className={styles.mission__button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://mindbody.com', '_blank')}
          >
            Join Our Community
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
};

export default AboutPage; 