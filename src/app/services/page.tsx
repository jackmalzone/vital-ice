import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import ServicesPageClient from './ServicesPageClient';

// Export metadata for the services page
export const metadata: Metadata = mergeMetadata('services');

const ServicesPage = () => {
  return <ServicesPageClient />;
};

export default ServicesPage;
