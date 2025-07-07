'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      quote: 'My body finally remembered how to heal itself.',
      author: 'David',
      role: 'Physical Therapist',
      image: '/images/coldplunge_woman.jpg',
      accent: '#00b7b5',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a3a3a 100%)',
    },
    {
      quote: 'In a city that never stops, this is where I find my pause button.',
      author: 'Sarah',
      role: 'Marketing Director',
      image: '/images/sauna-infraredwide.jpg',
      accent: '#f56f0d',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3a1a0a 100%)',
    },
    {
      quote: 'The rituals have taught me to breathe again.',
      author: 'Maya',
      role: 'Yoga Instructor',
      image: '/images/moon-yosemite.jpg',
      accent: '#8b4513',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
    },
    {
      quote: "We're not just people working out—we're a tribe supporting each other's recovery.",
      author: 'Alex',
      role: 'Software Engineer',
      image: '/images/embers_vertical.jpg',
      accent: '#2d1810',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #1a0a0a 100%)',
    },
  ];

  useEffect(() => {
    const nextTestimonial = () => {
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      }, 400);
    };

    timeoutRef.current = setTimeout(nextTestimonial, 6000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, testimonials.length]);

  const handleDotClick = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setTimeout(() => {
      setCurrentIndex(index);
    }, 400);
  };

  return (
    <section id="testimonials" className={styles.testimonials}>
      {/* Background Image */}
      <div className={styles.testimonials__background}>
        <Image
          src="/images/texture_blacksand.jpg"
          alt="Black sand texture background"
          fill
          className={styles.testimonials__backgroundImage}
          priority
        />
        <div className={styles.testimonials__backgroundOverlay} />
      </div>

      {/* Ambient Background */}
      <div className={styles.testimonials__ambient} />

      {/* Gradient Overlays */}
      <div className={styles.testimonials__gradientTop} />
      <div className={styles.testimonials__gradientBottom} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.testimonial__section}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Split Layout: Image and Content */}
          <div className={styles.testimonial__layout}>
            {/* Image Side */}
            <motion.div
              className={styles.testimonial__imageSide}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.testimonial__imageContainer}>
                <Image
                  src={testimonials[currentIndex].image}
                  alt={`${testimonials[currentIndex].author} testimonial`}
                  fill
                  className={styles.testimonial__image}
                  priority
                />
                <div className={styles.testimonial__imageOverlay} />

                {/* Floating Accent Elements */}
                <motion.div
                  className={styles.testimonial__accentElement}
                  style={{ background: testimonials[currentIndex].accent }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              className={styles.testimonial__contentSide}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.testimonial__content}>
                {/* Quote Icon */}
                <motion.div
                  className={styles.testimonial__quoteIcon}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'backOut' }}
                  style={{ color: testimonials[currentIndex].accent }}
                >
                  "
                </motion.div>

                <motion.blockquote
                  className={styles.testimonial__quote}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {testimonials[currentIndex].quote.replace(/"/g, '&quot;')}
                </motion.blockquote>

                <motion.div
                  className={styles.testimonial__author}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <cite className={styles.testimonial__name}>
                    {testimonials[currentIndex].author}
                  </cite>
                  <span className={styles.testimonial__role}>
                    {testimonials[currentIndex].role}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <motion.div
        className={styles.testimonials__dots}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.button
            key={index}
            className={`${styles.testimonial__dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={
              {
                '--accent-color': testimonial.accent,
              } as React.CSSProperties
            }
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
