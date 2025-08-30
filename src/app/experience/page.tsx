import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import ExperiencePageClient from './ExperiencePageClient';

// Export metadata for the experience page
export const metadata: Metadata = mergeMetadata('experience');

const ExperiencePage = () => {
  return <ExperiencePageClient />;
};

export default ExperiencePage;
