import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import FAQPageClient from './FAQPageClient';

// Export metadata for the FAQ page
export const metadata: Metadata = mergeMetadata('faq');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const FAQPage = () => {
  return <FAQPageClient />;
};

export default FAQPage;
