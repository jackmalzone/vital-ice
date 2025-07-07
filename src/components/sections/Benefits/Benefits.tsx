'use client';

import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './Benefits.module.css';

const Benefits: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const benefits = [
    {
      title: 'Cold Plunge',
      tagline: 'Stillness that sharpens.',
      description: 'Nervous system reset through vagus nerve activation',
      image: '/images/ice-vitalblue.jpg',
      alt: 'Frozen lake scene with surface breaking'
    },
    {
      title: 'Infrared Sauna',
      tagline: 'Light that heals.',
      description: 'Circulatory restoration and cellular detoxification',
      image: '/images/sauna-infraredwide.jpg',
      alt: 'Warm interior glow with cedar panels'
    },
    {
      title: 'Traditional Sauna',
      tagline: 'Fire that remembers.',
      description: 'Mental clarity and emotional regulation',
      image: '/images/sauna-traditional.jpg',
      alt: 'Steam-filled dark wood with water hissing on rock'
    },
    {
      title: 'Red Light Therapy',
      tagline: 'Deeper than the skin.',
      description: 'Cellular repair and nervous system restoration',
      image: '/images/sunset-redhorizon.jpg',
      alt: 'Abstract light pulses or cellular microshot'
    }
  ];

  // Parallax effect for unified background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} id="benefits" className={styles.benefits}>
      {/* Unified Background */}
      <motion.div 
        className={styles.benefits__background}
        style={{ y: backgroundY }}
      >
        <div className={styles.benefits__backgroundGradient} />
      </motion.div>

      {/* Benefits Content */}
      <div className={styles.benefits__container}>
        {benefits.map((benefit, index) => {
          const benefitRef = useRef<HTMLDivElement>(null);
          const { scrollYProgress: benefitScrollYProgress } = useScroll({
            target: benefitRef,
            offset: ['start end', 'end start']
          });

          // Animation values
          const imageOpacity = useTransform(benefitScrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
          const imageScale = useTransform(benefitScrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
          const textOpacity = useTransform(benefitScrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
          const textX = useTransform(benefitScrollYProgress, [0, 0.3, 0.7, 1], [index % 2 === 0 ? 50 : -50, 0, 0, index % 2 === 0 ? -50 : 50]);

          const isImageLeft = index % 2 === 0;

          return (
            <motion.div 
              key={benefit.title} 
              ref={benefitRef} 
              className={styles.benefit}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Image Side */}
              <motion.div 
                className={`${styles.benefit__image} ${isImageLeft ? styles.left : styles.right}`}
                style={{
                  opacity: imageOpacity,
                  scale: imageScale,
                }}
              >
                <div className={styles.benefit__imageContainer}>
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    fill
                    className={styles.benefit__imageElement}
                    priority={index < 2}
                  />
                  <div className={styles.benefit__imageOverlay} />
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                className={`${styles.benefit__text} ${isImageLeft ? styles.right : styles.left}`}
                style={{
                  opacity: textOpacity,
                  x: textX,
                }}
              >
                <div className={styles.benefit__textContent}>
                  <h2 className={styles.benefit__title}>{benefit.title}</h2>
                  <p className={styles.benefit__tagline}>{benefit.tagline}</p>
                  <p className={styles.benefit__description}>{benefit.description}</p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Benefits;
