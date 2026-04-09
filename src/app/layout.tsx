import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { PERSONAL_INFO } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} | Full-Stack Developer & IT Support`,
  description:
    'Bhupinder Singh — Full-Stack Developer and IT Support engineer based in Wellington, NZ. Crafting high-performance digital experiences with Next.js, React, Python, and more.',
  keywords: [
    'Bhupinder Singh',
    'Full-Stack Developer',
    'IT Support',
    'Wellington NZ',
    'Next.js',
    'React',
    'TypeScript',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Bhupinder Singh', url: PERSONAL_INFO.github }],
  openGraph: {
    title: `${PERSONAL_INFO.name} | Full-Stack Developer`,
    description:
      'Full-Stack Developer & IT Support based in Wellington, NZ. Crafting high-performance digital experiences.',
    url: 'https://bhupindersingh.dev',
    siteName: 'Bhupinder Singh Portfolio',
    images: [
      {
        url: PERSONAL_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: 'Bhupinder Singh — Full-Stack Developer',
      },
    ],
    type: 'website',
    locale: 'en_NZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.name} | Full-Stack Developer`,
    description: 'Full-Stack Developer & IT Support based in Wellington, NZ.',
    images: [PERSONAL_INFO.ogImage],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://bhupindersingh.dev'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var preferred = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', preferred);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
