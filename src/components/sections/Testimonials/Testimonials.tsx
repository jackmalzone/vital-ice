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
      quote: 'Cold Water is merciless, but righteous.',
      author: 'Wim Hoff',
      role: 'The Iceman',
      image: '/images/coldplunge_woman.jpg',
      accent: '#00b7b5',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a3a3a 100%)',
    },
    {
      quote:
        "Sauna bathing is almost like walking on a treadmill… but all you're doing is sitting in the heat.",
      author: 'Dr. Purvi Parikh',
      role: 'MD, Allergist & Immunologist',
      image: '/images/sauna-infraredwide.jpg',
      accent: '#f56f0d',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3a1a0a 100%)',
    },
    {
      quote: 'Conquer your inner bitch.',
      author: 'Joe Rogan',
      role: 'Podcast Host & Comedian',
      image: '/images/sauna-infraredwide.jpg',
      accent: '#f56f0d',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3a1a0a 100%)',
    },
    {
      quote:
        "It's absolute agony, and I dread it, but it allows my body to recover so much more quickly.",
      author: 'Paula Radcliffe',
      role: 'Triathlete & Long-Distance Runner',
      image: '/images/coldplunge_woman.jpg',
      accent: '#00b7b5',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a3a3a 100%)',
    },
    {
      quote: 'A person grows by facing resistance — and cold is a pure form of that.',
      author: 'Dr. Andrew Huberman',
      role: 'Neuroscientist',
      image: '/images/moon-yosemite.jpg',
      accent: '#8b4513',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
    },

    {
      quote: "True strength is in the recovery. That's where the body and mind rebuild.",
      author: 'Tom Brady',
      role: 'NFL Quarterback',
      image: '/images/embers_vertical.jpg',
      accent: '#2d1810',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #1a0a0a 100%)',
    },
    {
      quote:
        'Building your tolerance to cold water should be slow and gradual. Start with a few minutes and increase steadily.',
      author: 'Dr. Tracy Zaslow',
      role: 'Sports Physician',
      image: '/images/coldplunge_woman.jpg',
      accent: '#00b7b5',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a3a3a 100%)',
    },
    {
      quote:
        "Using the sauna regularly changed the way I recover. It's not just heat — it's therapy.",
      author: 'Lebron James',
      role: 'NBA Player',
      image: '/images/sauna-traditional.jpg',
      accent: '#ff6b35',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
    },
    {
      quote:
        "With women's bodies, we need to support homeostasis, not fight it… Hormetic stressors help homeostasis.",
      author: 'Dr. Jaime Seeman',
      role: 'OB-GYN',
      image: '/images/coldplunge_woman.jpg',
      accent: '#00b7b5',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a3a3a 100%)',
    },
    {
      quote: 'Sometimes you just gotta get a little comfortable with being uncomfortable.',
      author: 'Seamus Mullen',
      role: 'Chef & Wellness Advocate',
      image: '/images/moon-yosemite.jpg',
      accent: '#8b4513',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
    },
    {
      quote: 'Cold water is phenomenal. It has saved my life. In the water, I can do anything.',
      author: 'Menopausal Swimmer',
      role: 'UCL Study Participant',
      image: '/images/coldplunge_woman.jpg',
      accent: '#00b7b5',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a3a3a 100%)',
    },
    {
      quote: 'Sauna bathing has been linked to improved mental health and mood regulation.',
      author: 'Dr. Rhonda Patrick',
      role: 'Biomedical Scientist',
      image: '/images/sauna-traditional.jpg',
      accent: '#ff6b35',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
    },
    {
      quote:
        'Sauna sessions provide cardiovascular benefits, neuroprotection, and stress reduction.',
      author: 'Dr. Rhonda Patrick',
      role: 'Biomedical Scientist',
      image: '/images/sauna-infraredwide.jpg',
      accent: '#f56f0d',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3a1a0a 100%)',
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
                  &quot;
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
