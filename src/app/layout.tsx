import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import NavigationLoadingProvider from '@/components/providers/NavigationLoadingProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import SentryErrorBoundary from '@/components/providers/SentryErrorBoundary';
import ErrorSuppressionProvider from '@/components/providers/ErrorSuppressionProvider';
import { MindbodyErrorBoundary } from '@/components/providers/MindbodyErrorBoundary';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import RollingBookButton from '@/components/ui/RollingBookButton/RollingBookButton';
import StructuredData from '@/components/seo/StructuredData';
import { initializeSentryTracking } from '@/lib/utils/sentryTracking';
import { initializeAnalytics } from '@/lib/utils/analytics';
import { getPageSchema } from '@/lib/seo/structured-data';
import { mergeMetadata } from '@/lib/seo/metadata';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = mergeMetadata('home');

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#00b7b5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize tracking on client side
  if (typeof window !== 'undefined') {
    initializeSentryTracking();
    initializeAnalytics(); // Fix Mixpanel "name your new library" error
  }

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="https://media.vitalicesf.com/logo-dark.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="https://media.vitalicesf.com/coldplunge_woman.jpg"
          as="image"
          type="image/jpeg"
        />

        {/* DNS prefetch and preconnect for external domains */}
        <link rel="dns-prefetch" href="//media.vitalicesf.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://media.vitalicesf.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Mindbody error suppression - minimal and targeted */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Minimal error suppression for Mindbody widgets and development errors
            window.addEventListener('error', function(event) {
              if (event.error && event.error.message) {
                const message = event.error.message.toLowerCase();
                if (message.includes('mixpanel') || 
                    message.includes('mindbody') ||
                    message.includes('healcode') ||
                    message.includes('jquery') ||
                    message.includes('not valid json') ||
                    message.includes('message channel closed') ||
                    message.includes('cannot read properties of null') ||
                    message.includes('reading \\'match\\'') ||
                    message.includes('removechild') ||
                    message.includes('hotmodulereplacement') ||
                    message.includes('mini-css-extract-plugin')) {
                  event.preventDefault();
                  return false;
                }
              }
            }, true);
            
            // Suppress unhandled promise rejections from Mindbody and development
            window.addEventListener('unhandledrejection', function(event) {
              if (event.reason && event.reason.message) {
                const message = event.reason.message.toLowerCase();
                if (message.includes('mixpanel') || 
                    message.includes('mindbody') ||
                    message.includes('healcode') ||
                    message.includes('jquery') ||
                    message.includes('cannot read properties of null') ||
                    message.includes('removechild') ||
                    message.includes('hotmodulereplacement')) {
                  event.preventDefault();
                  return false;
                }
              }
            });
          `,
          }}
        />

        {/* Structured Data */}
        <StructuredData data={getPageSchema('home')} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ErrorSuppressionProvider>
          <SentryErrorBoundary>
            <MindbodyErrorBoundary>
              <NavigationLoadingProvider>
                <SmoothScrollProvider>
                  <ModalProvider>
                    <Header />
                    <RollingBookButton />
                    {children}
                    <Footer />
                  </ModalProvider>
                </SmoothScrollProvider>
              </NavigationLoadingProvider>
            </MindbodyErrorBoundary>
          </SentryErrorBoundary>
        </ErrorSuppressionProvider>
        <Analytics />
      </body>
    </html>
  );
}
