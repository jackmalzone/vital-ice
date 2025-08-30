import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import PercussionMassagePageClient from './PercussionMassagePageClient';

// Export metadata for the percussion massage service page
export const metadata: Metadata = mergeMetadata('percussion-massage');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const PercussionMassagePage = () => {
  return <PercussionMassagePageClient />;
};

export default PercussionMassagePage;
