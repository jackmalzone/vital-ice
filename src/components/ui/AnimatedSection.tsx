'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

interface IAnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedSection: FC<IAnimatedSectionProps> = ({ children, className = '' }) => {
  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      <motion.div variants={fadeInUp}>{children}</motion.div>
    </motion.section>
  );
};
