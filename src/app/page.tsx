import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import HomePage from '@/components/pages/HomePage/HomePage';

export const metadata: Metadata = mergeMetadata('home');

export default function Home() {
  return <HomePage />;
}
