import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import InfraredSaunaPageClient from './InfraredSaunaPageClient';

// Export metadata for the infrared sauna service page
export const metadata: Metadata = mergeMetadata('infrared-sauna');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const InfraredSaunaPage = () => {
  return <InfraredSaunaPageClient />;
};

export default InfraredSaunaPage;
