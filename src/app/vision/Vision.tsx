'use client';

import { FC, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './Vision.module.css';

const VisionPage: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Function to determine text color based on section
  const getTextColor = (sectionId: string) => {
    switch (sectionId) {
      case 'ancient-wisdom':
        return '#ffffff'; // White for dark Roman bathhouse
      case 'elemental-power':
        return '#ffffff'; // White for lava background
      case 'community':
        return '#ffffff'; // White for sunset couple
      case 'technology':
        return '#ffffff'; // White for infrared sauna
      default:
        return '#ffffff'; // Default white
    }
  };

  // Function to determine text shadow based on section
  const getTextShadow = (sectionId: string) => {
    switch (sectionId) {
      case 'ancient-wisdom':
        return '0 3px 12px rgba(0, 0, 0, 0.8)'; // Stronger shadow for complex background
      case 'elemental-power':
        return '0 3px 12px rgba(0, 0, 0, 0.8)'; // Stronger shadow for lava
      case 'community':
        return '0 2px 8px rgba(0, 0, 0, 0.6)'; // Medium shadow for sunset
      case 'technology':
        return '0 2px 8px rgba(0, 0, 0, 0.7)'; // Medium shadow for sauna
      default:
        return '0 2px 8px rgba(0, 0, 0, 0.5)'; // Default shadow
    }
  };

  const visionSections = [
    {
      id: 'hero',
      title: 'Our Vision',
      subtitle: 'Reconnecting with the elemental rhythms that restore us',
      image: '/images/vision-forest.jpg',
      alt: 'Mystical forest scene representing our vision',
      content: null,
    },
    {
      id: 'ancient-wisdom',
      title: 'Ancient Wisdom, Modern Intention',
      subtitle: 'Bridging millennia of healing traditions',
      image: '/images/origins_roman-hypocaust.JPG',
      alt: 'Ancient Roman bathhouse representing timeless wisdom',
      content:
        "In a world that moves at breakneck speed, we've lost touch with the natural cycles that our ancestors understood intimately. The contrast between fire and ice, heat and cold, has been part of human wellness rituals for millennia.",
    },
    {
      id: 'elemental-power',
      title: 'The Power of Contrast',
      subtitle: 'Fire and ice, heat and cold',
      image: '/images/lava-closeup.jpg',
      alt: 'Molten lava representing elemental power',
      content:
        "These opposing forces create the conditions for transformation. Through intentional exposure to these elements, we activate our body's natural healing mechanisms and strengthen our resilience.",
    },
    {
      id: 'community',
      title: 'Community Ritual',
      subtitle: 'Wellness is not a solitary journey',
      image: '/images/sunset-redcouple.jpg',
      alt: 'Couple in sunset representing community connection',
      content:
        'We believe in the power of shared experience, of gathering together to honor our bodies and minds through ancient practices made accessible for modern life.',
    },
    {
      id: 'technology',
      title: 'Mindful Technology',
      subtitle: 'The best of both worlds',
      image: '/images/sauna-infraredwide.jpg',
      alt: 'Modern infrared sauna representing mindful technology',
      content:
        'We embrace time-tested wellness practices enhanced by modern technology. Our infrared saunas and precision-controlled cold plunge systems deliver optimal therapeutic benefits in a safe, controlled environment.',
    },
  ];

  return (
    <main ref={sectionRef} className={styles.main}>
      {/* Ambient Background */}
      <div className={styles.main__ambient} />

      {/* Gradient Overlays */}
      <div className={styles.main__gradientTop} />
      <div className={styles.main__gradientBottom} />

      {/* Floating Elements */}
      <div className={styles.main__floatingElements}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles.main__floatingElement}
            style={
              {
                '--delay': `${i * 0.4}s`,
                '--duration': `${5 + i * 0.6}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {visionSections.map((section, index) => {
        const sectionRef = useRef<HTMLElement>(null);
        const isInView = useInView(sectionRef, {
          once: true,
          margin: '-100px',
          amount: 0.3,
        });

        return (
          <motion.section
            key={section.id}
            ref={sectionRef}
            className={styles.section}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            {/* Background Image */}
            <motion.div
              className={styles.section__background}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
              transition={{ duration: 1.5, delay: index * 0.2 + 0.3 }}
            >
              <Image
                src={section.image}
                alt={section.alt}
                fill
                className={styles.section__backgroundImage}
                priority={index < 2}
              />
              <div className={styles.section__overlay} />
            </motion.div>

            {/* Content */}
            <div className={styles.section__content}>
              <motion.div
                className={styles.section__textContainer}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <motion.h1
                  className={styles.section__title}
                  style={{
                    color: getTextColor(section.id),
                    textShadow: getTextShadow(section.id),
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.7,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {section.title}
                </motion.h1>

                <motion.p
                  className={styles.section__subtitle}
                  style={{
                    color: getTextColor(section.id),
                    textShadow: getTextShadow(section.id),
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.9,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {section.subtitle}
                </motion.p>

                {section.content && (
                  <motion.p
                    className={styles.section__content}
                    style={{
                      color: getTextColor(section.id),
                      textShadow: getTextShadow(section.id),
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 1.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {section.content}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.section>
        );
      })}

      {/* Call to Action Section */}
      <motion.section
        className={styles.cta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
      >
        <div className={styles.cta__background}>
          <Image
            src="/images/hero-ambient-water.jpg"
            alt="Ambient water representing transformation"
            fill
            className={styles.cta__backgroundImage}
          />
          <div className={styles.cta__overlay} />
        </div>

        <div className={styles.cta__container}>
          <motion.h2
            className={styles.cta__title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the Transformation
          </motion.h2>

          <motion.p
            className={styles.cta__text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us in creating a new relationship with your body, your mind, and your community.
          </motion.p>

          <motion.button
            className={styles.cta__button}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://mindbody.com', '_blank')}
          >
            Book Your First Session
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
};

export default VisionPage;
