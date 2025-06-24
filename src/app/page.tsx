import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Benefits from '@/components/sections/Benefits/Benefits';
import Newsletter from '@/components/sections/Newsletter/Newsletter';
import Footer from '@/components/layout/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Benefits />
      <Newsletter />
      <Footer />
    </main>
  );
}
