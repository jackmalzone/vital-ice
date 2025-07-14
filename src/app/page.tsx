import Hero from '@/components/sections/Hero/Hero';
import Services from '@/components/sections/Benefits/Benefits';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import NewsletterWrapper from '@/components/sections/Newsletter/NewsletterWrapper';
import Footer from '@/components/layout/Footer/Footer';
import MissionStatement from '@/components/sections/MissionStatement/MissionStatement';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <main className={styles.mainContainer}>
        <Hero />
        <MissionStatement />
        <Services />
        <Testimonials />
        <NewsletterWrapper />
        <Footer />
      </main>
    </>
  );
}
