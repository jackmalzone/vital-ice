import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import ColdPlungePageClient from './ColdPlungePageClient';

// Export metadata for the cold plunge service page
export const metadata: Metadata = mergeMetadata('cold-plunge');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const ColdPlungePage = () => {
  return <ColdPlungePageClient />;
};

export default ColdPlungePage;
