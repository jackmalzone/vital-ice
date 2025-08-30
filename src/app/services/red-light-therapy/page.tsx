import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import RedLightTherapyPageClient from './RedLightTherapyPageClient';

// Export metadata for the red light therapy service page
export const metadata: Metadata = mergeMetadata('red-light-therapy');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const RedLightTherapyPage = () => {
  return <RedLightTherapyPageClient />;
};

export default RedLightTherapyPage;
