import { Metadata } from 'next';
import { mergeMetadata } from '@/lib/seo/metadata';
import ClientPolicyPageClient from './ClientPolicyPageClient';

// Export metadata for the client-policy page
export const metadata: Metadata = mergeMetadata('client-policy');

const ClientPolicyPage = () => {
  return <ClientPolicyPageClient />;
};

export default ClientPolicyPage;
