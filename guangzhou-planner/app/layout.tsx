import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL('http://localhost:3000');

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Guangzhou 2026 · Trip Planner',
  description: 'A six-day Guangzhou itinerary with XHS inspiration pins and Amap links for 17–22 September 2026.',
  openGraph: {
    title: 'Guangzhou 2026 · Eat well. Walk slow.',
    description: 'Six days of old lanes, late-night river light and excellent dim sum.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Guangzhou 2026 — Eat well. Walk slow.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guangzhou 2026 · Eat well. Walk slow.',
    description: 'A six-day Guangzhou trip plan with XHS pins and Amap links.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
