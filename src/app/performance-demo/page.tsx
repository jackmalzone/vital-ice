import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import PerformanceDemoPageClient from './PerformanceDemoPageClient';

// Export metadata for the performance-demo page
export const metadata: Metadata = mergeMetadata('performance-demo');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const PerformanceDemoPage = () => {
  return <PerformanceDemoPageClient />;
};

export default PerformanceDemoPage;
