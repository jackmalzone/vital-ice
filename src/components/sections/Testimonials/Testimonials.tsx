'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: 'My body finally remembered how to heal itself.',
      author: 'David',
      role: 'Physical Therapist',
      image: '/images/testimonial-1.jpg',
    },
    {
      quote: 'In a city that never stops, this is where I find my pause button.',
      author: 'Sarah',
      role: 'Marketing Director',
      image: '/images/testimonial-2.jpg',
    },
    {
      quote: 'The rituals have taught me to breathe again.',
      author: 'Maya',
      role: 'Yoga Instructor',
      image: '/images/testimonial-3.jpg',
    },
    {
      quote: 'We\'re not just people working out—we\'re a tribe supporting each other\'s recovery.',
      author: 'Alex',
      role: 'Software Engineer',
      image: '/images/testimonial-4.jpg',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className={styles.testimonials}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className={`${styles.testimonial__section} ${index === currentIndex ? styles.active : ''}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Image */}
          <div className={styles.testimonial__background}>
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              fill
              className={styles.testimonial__backgroundImage}
              priority={index === 0}
            />
            <div className={styles.testimonial__overlay} />
          </div>

          {/* Content */}
          <div className={styles.testimonial__content}>
            <blockquote className={styles.testimonial__quote}>
              {testimonial.quote}
            </blockquote>
            <div className={styles.testimonial__author}>
              <cite className={styles.testimonial__name}>— {testimonial.author}</cite>
              <span className={styles.testimonial__role}>{testimonial.role}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Navigation Dots */}
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
    </section>
  );
};

export default Testimonials;
