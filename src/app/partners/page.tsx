import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import PartnersPageClient from './PartnersPageClient';

// Export metadata for the partners page
export const metadata: Metadata = mergeMetadata('partners');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const PartnersPage = () => {
  return <PartnersPageClient />;
};

export default PartnersPage;
