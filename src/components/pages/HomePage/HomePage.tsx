'use client';

import { FC } from 'react';
import Hero from '@/components/sections/Hero/Hero';
import Services from '@/components/sections/Benefits/Benefits';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import NewsletterWrapper from '@/components/sections/Newsletter/NewsletterWrapper';
import MissionStatement from '@/components/sections/MissionStatement/MissionStatement';
import styles from './HomePage.module.css';

const HomePage: FC = () => {
  return (
    <main className={styles.mainContainer}>
      <Hero />
      <MissionStatement />
      <Services />
      <Testimonials />
      <NewsletterWrapper />
    </main>
  );
};

export default HomePage;
