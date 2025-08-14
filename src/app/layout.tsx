import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import LoadingProvider from '@/components/providers/LoadingProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import Header from '@/components/layout/Header/Header';
import RollingBookButton from '@/components/ui/RollingBookButton/RollingBookButton';
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
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'icon', url: '/favicon.ico' }],
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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LoadingProvider>
          <SmoothScrollProvider>
            <ModalProvider>
              <Header />
              {children}
              <RollingBookButton />
            </ModalProvider>
          </SmoothScrollProvider>
        </LoadingProvider>
        <Analytics />
      </body>
    </html>
  );
}
