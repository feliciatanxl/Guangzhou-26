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
  title: 'Guangzhou 2026 · 5-Day Trip Planner',
  description: 'A 5-day Guangzhou itinerary with XHS inspiration pins and Amap links for 17–21 September 2026.',
  openGraph: {
    title: 'Guangzhou 2026 · Eat well. Walk slow.',
    description: 'Five days of old lanes, modern landmarks, outlet finds, and excellent food.',
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
    description: 'A 5-day Guangzhou trip plan with XHS pins and Amap links for 17–21 September 2026.',
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
