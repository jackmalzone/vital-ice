'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        '"After my first cold plunge session, I felt like I had just woken up from the deepest sleep of my life. My mind was crystal clear, and I had this incredible sense of calm that lasted for days."',
      author: 'Alex Chen',
      role: 'Software Engineer',
      image: '/images/testimonial-1.jpg',
    },
    {
      quote:
        "\"The community here is unlike anything I've experienced. We're not just people working out—we're a tribe supporting each other's recovery and growth. It's transformative.\"",
      author: 'Maya Rodriguez',
      role: 'Yoga Instructor',
      image: '/images/testimonial-2.jpg',
    },
    {
      quote:
        '"I was skeptical about infrared sauna, but after just a few sessions, my chronic pain started to fade. It\'s like my body finally remembered how to heal itself."',
      author: 'David Kim',
      role: 'Physical Therapist',
      image: '/images/testimonial-3.jpg',
    },
    {
      quote:
        '"Vital Ice has become my sanctuary. In a city that never stops, this is where I find my pause button. The rituals have taught me to breathe again."',
      author: 'Sarah Thompson',
      role: 'Marketing Director',
      image: '/images/testimonial-4.jpg',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.testimonials__container}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className={styles.testimonials__content}
        >
          <motion.h2
            className={styles.testimonials__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Voices of Recovery
          </motion.h2>

          <motion.p
            className={styles.testimonials__subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Real stories from our community members
          </motion.p>

          <div className={styles.testimonials__slider}>
            <div className={styles.testimonials__track}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`${styles.testimonial__slide} ${index === currentIndex ? styles.active : ''}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : 50,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.testimonial__content}>
                    <div className={styles.testimonial__image}>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={120}
                        height={120}
                        className={styles.testimonial__imageElement}
                      />
                    </div>
                    <blockquote className={styles.testimonial__quote}>
                      {testimonial.quote}
                    </blockquote>
                    <div className={styles.testimonial__author}>
                      <cite className={styles.testimonial__name}>{testimonial.author}</cite>
                      <span className={styles.testimonial__role}>{testimonial.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.testimonials__dots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.testimonial__dot} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
