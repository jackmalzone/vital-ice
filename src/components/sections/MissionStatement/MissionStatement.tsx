'use client';

import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GiFire, 
  GiCaduceus, 
  GiDiamonds, 
  GiSun 
} from 'react-icons/gi';
import { TbPlant2, TbSnowflake } from 'react-icons/tb';
import { RxLightningBolt } from 'react-icons/rx';
import { FaWater } from 'react-icons/fa';
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

  const missionStatement = "We're making elite recovery simple, social, and within reach. Fusing proven methods with a space designed to connect and evolve. Let's turn recovery into the new happy hour.";

  const symbols = [
    { icon: GiFire, label: 'Fire' },
    { icon: GiSun, label: 'Sun' },
    { icon: FaWater, label: 'Water' },
    { icon: TbPlant2, label: 'Growth' },
    { icon: GiCaduceus, label: 'Healing' },
    { icon: TbSnowflake, label: 'Ice' },
    { icon: RxLightningBolt, label: 'Energy' },
    { icon: GiDiamonds, label: 'Strength' }
  ];

  return (
    <section ref={containerRef} className={styles.mission}>
      {/* Ambient background elements */}
      <div className={styles.mission__ambient} />
      
      {/* Etched stone symbols */}
      <div className={styles.mission__symbols}>
        {symbols.map((symbol, i) => {
          const IconComponent = symbol.icon;
          return (
            <motion.div
              key={i}
              className={styles.mission__symbol}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
              style={{
                left: i % 2 === 0 ? '8%' : '88%',
                top: `${15 + Math.floor(i / 2) * 25}%`,
              }}
            >
              <IconComponent />
            </motion.div>
          );
        })}
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
               <em>reset like it matters.</em>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionStatement; 