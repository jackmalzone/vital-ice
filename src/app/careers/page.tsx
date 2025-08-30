import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import CareersPageClient from './CareersPageClient';

// Export metadata for the careers page
export const metadata: Metadata = mergeMetadata('careers');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const CareersPage = () => {
  return <CareersPageClient />;
};

export default CareersPage;
