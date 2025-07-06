'use client';

import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './Benefits.module.css';

const Services: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const services = [
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

  return (
    <section ref={sectionRef} id="services" className={styles.services}>
      {services.map((service, index) => {
        const serviceRef = useRef<HTMLDivElement>(null);
        const { scrollYProgress: serviceScrollYProgress } = useScroll({
          target: serviceRef,
          offset: ['start end', 'end start']
        });

        // Parallax effect for background
        const backgroundY = useTransform(serviceScrollYProgress, [0, 1], [0, -50]);
        
        // Text animations
        const textOpacity = useTransform(serviceScrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
        const textX = useTransform(serviceScrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

        return (
          <div key={service.title} ref={serviceRef} className={styles.service__section}>
            {/* Background Image with Parallax */}
            <motion.div 
              className={styles.service__background}
              style={{ y: backgroundY }}
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className={styles.service__backgroundImage}
                priority={index === 0}
              />
              <div className={styles.service__overlay} />
            </motion.div>

            {/* Content */}
            <div className={styles.service__content}>
              <motion.div
                className={styles.service__text}
                style={{
                  opacity: textOpacity,
                  x: textX,
                }}
              >
                <h2 className={styles.service__title}>{service.title}</h2>
                <p className={styles.service__tagline}>{service.tagline}</p>
                <p className={styles.service__description}>{service.description}</p>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Services;
