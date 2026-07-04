import type { Metadata } from 'next';
import { Manrope, Libre_Caslon_Text, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { PERSONAL_INFO } from '@/lib/constants';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import TerminalMode from '@/components/TerminalMode';
import Chatbot from '@/components/Chatbot';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const libreCaslon = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre-caslon',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
  description: PERSONAL_INFO.tagline,
  keywords: [
    'Bhupinder Singh',
    'Full-Stack Developer',
    'IT Support',
    'Software Tester',
    'Wellington NZ',
    'Next.js',
    'React',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Bhupinder Singh', url: PERSONAL_INFO.github }],
  openGraph: {
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.tagline,
    url: 'https://bhupindersingh-portfolio.vercel.app',
    siteName: 'Bhupinder Singh Portfolio',
    images: [
      {
        url: PERSONAL_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: 'Bhupinder Singh Portfolio',
      },
    ],
    type: 'website',
    locale: 'en_NZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.tagline,
    images: [PERSONAL_INFO.ogImage],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://bhupindersingh-portfolio.vercel.app'),
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
                  
                  var primary = localStorage.getItem('primary-theme') || 'cyan';
                  document.documentElement.setAttribute('data-primary', primary);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.setAttribute('data-primary', 'cyan');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${libreCaslon.variable} ${jetbrainsMono.variable}`}>
        {children}
        <ThemeCustomizer />
        <TerminalMode />
        <Chatbot />
        <Analytics />
      </body>
    </html>
  );
}
