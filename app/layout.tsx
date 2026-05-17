import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import css from './page.module.css';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({
  variable: '--font-family',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--second-family',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rental Car',
  description: 'Creating by GOIT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <TanStackProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
            }}
          />
          <div className={css.layout_container}>
            <Header />
            {children}
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
