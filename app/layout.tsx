import type { Metadata } from 'next';
import './globals.css';
import { siteUrl, siteTitle, siteDescription, isPreview } from '@/lib/site-seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: '/' },
  robots: { index: !isPreview, follow: true },
  openGraph: { type: 'website', url: siteUrl, title: siteTitle, description: siteDescription, siteName: 'FHP Studios', locale: 'en_NG' },
  twitter: { card: 'summary', title: siteTitle, description: siteDescription },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
