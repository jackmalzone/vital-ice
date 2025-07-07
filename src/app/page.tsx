import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Services from '@/components/sections/Benefits/Benefits';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import NewsletterWrapper from '@/components/sections/Newsletter/NewsletterWrapper';
import Footer from '@/components/layout/Footer/Footer';
import FogTransition from '@/components/ui/FogTransition/FogTransition';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <main className={styles.mainContainer}>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <NewsletterWrapper />
        <Footer />
      </main>

      {/* Fog overlay positioned outside normal flow */}
      <FogTransition />
    </>
  );
}
