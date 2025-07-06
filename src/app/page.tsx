import Hero from '@/components/sections/Hero/Hero';
import Vision from '@/components/sections/About/About';
import Services from '@/components/sections/Benefits/Benefits';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import Newsletter from '@/components/sections/Newsletter/Newsletter';
import Footer from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <Hero />
      <Vision />
      <Services />
      <Testimonials />
      <Newsletter />
      <section className={styles.connectSection}>
        <div className={styles.connectContainer}>
          <h2 className={styles.connectTitle}>Let's Connect</h2>
          <p className={styles.connectText}>
            Ready to begin your recovery journey? Join our community and discover the transformative power of cold therapy and heat therapy.
          </p>
          <div className={styles.connectButtons}>
            <a href="https://mindbody.com" target="_blank" rel="noopener noreferrer" className={styles.connectButton}>
              Book Your Session
            </a>
            <a href="/contact" className={styles.connectButtonSecondary}>
              Get in Touch
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
