import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import CompressionBootsPageClient from './CompressionBootsPageClient';

// Export metadata for the compression boots service page
export const metadata: Metadata = mergeMetadata('compression-boots');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const CompressionBootsPage = () => {
  return <CompressionBootsPageClient />;
};

export default CompressionBootsPage;
