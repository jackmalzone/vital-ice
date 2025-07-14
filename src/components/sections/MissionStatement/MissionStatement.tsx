'use client';

import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './MissionStatement.module.css';

const MissionStatement: FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax effects (only on initial load)
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const statementY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  const missionStatement = "We're making elite recovery simple, social, and within reach. Fusing proven methods with a space designed to connect and evolve. Let's turn recovery into the new ";

  return (
    <section ref={containerRef} className={styles.mission}>
      {/* Ambient background elements */}
      <div className={styles.mission__ambient} />
      
      {/* Etched stone symbols */}
      <div className={styles.mission__symbols}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.mission__symbol}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: i % 2 === 0 ? '8%' : '88%',
              top: `${12 + (i * 10)}%`,
            }}
          >
            {i % 6 === 0 ? '◊' : i % 6 === 1 ? '○' : i % 6 === 2 ? '△' : i % 6 === 3 ? '□' : i % 6 === 4 ? '◉' : '◈'}
          </motion.div>
        ))}
      </div>

      {/* Bottom transition to black sand */}
      <div className={styles.mission__bottomTransition} />

      <div className={styles.mission__container}>
        <motion.div
          className={styles.mission__content}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h2
            className={styles.mission__title}
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Our Mission
          </motion.h2>
          
          <motion.p
            className={styles.mission__statement}
            style={{ y: statementY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1, 
              delay: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {missionStatement}
            <motion.span 
              className={styles.mission__highlight}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 40px rgba(0, 183, 181, 0.8)"
              }}
              transition={{ duration: 0.3 }}
            >
              happy hour
            </motion.span>.
          </motion.p>

          <motion.div
            className={styles.mission__divider}
            style={{ y: ctaY }}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />

          <motion.div
            className={styles.mission__cta}
            style={{ y: ctaY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.p 
              className={styles.mission__ctaText}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Challenge your limits. <em>Join The Ritual</em>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionStatement; 