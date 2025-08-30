import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import TraditionalSaunaPageClient from './TraditionalSaunaPageClient';

// Export metadata for the traditional sauna service page
export const metadata: Metadata = mergeMetadata('traditional-sauna');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const TraditionalSaunaPage = () => {
  return <TraditionalSaunaPageClient />;
};

export default TraditionalSaunaPage;
