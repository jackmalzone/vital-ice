import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import BookPageClient from './BookPageClient';

// Export metadata for the book page
export const metadata: Metadata = mergeMetadata('book');

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour

const BookPage = () => {
  return <BookPageClient />;
};

export default BookPage;
