import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Welcome from '@/components/sections/Welcome/Welcome';
import OurStory from '@/components/sections/OurStory/OurStory';
import OurPurpose from '@/components/sections/OurPurpose/OurPurpose';
import OurVision from '@/components/sections/OurVision/OurVision';
import OurValues from '@/components/sections/OurValues/OurValues';
import JoinUs from '@/components/sections/JoinUs/JoinUs';
import Newsletter from '@/components/sections/Newsletter/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <Newsletter />
      <Welcome />
      <OurStory />
      <OurPurpose />
      <OurVision />
      <OurValues />
      <JoinUs />
      <About />
      </main>
  );
}
