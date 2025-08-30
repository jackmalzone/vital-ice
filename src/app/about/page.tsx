import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import AboutPageClient from './AboutPageClient';

// Export metadata for the about page
export const metadata: Metadata = mergeMetadata('about');

// Enable ISR for better performance (longer revalidation for static content)
export const revalidate = 86400; // Revalidate every 24 hours

const AboutPage = () => {
  return <AboutPageClient />;
};

export default AboutPage;
