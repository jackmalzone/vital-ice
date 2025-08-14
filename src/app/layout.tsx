import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import NavigationLoadingProvider from '@/components/providers/NavigationLoadingProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import SentryErrorBoundary from '@/components/providers/SentryErrorBoundary';
import Header from '@/components/layout/Header/Header';
import RollingBookButton from '@/components/ui/RollingBookButton/RollingBookButton';
import { initializeSentryTracking } from '@/lib/utils/sentryTracking';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'Vital Ice',
  description: 'Recovery and wellness through cold therapy',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vital Ice',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#00b7b5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize Sentry tracking on client side
  if (typeof window !== 'undefined') {
    initializeSentryTracking();
  }

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SentryErrorBoundary>
          <NavigationLoadingProvider>
            <SmoothScrollProvider>
              <ModalProvider>
                <Header />
                {children}
                <RollingBookButton />
              </ModalProvider>
            </SmoothScrollProvider>
          </NavigationLoadingProvider>
        </SentryErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
