import { Geist, Geist_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import LoadingProvider from '@/components/providers/LoadingProvider';
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LoadingProvider>
          <SmoothScrollProvider>
            <Header />
            {children}
            <RollingBookButton />
          </SmoothScrollProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
