import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FHP Studios — Creative Space in Lagos',
  description: 'Book a creative studio, hot desk, or intimate event space in Ogba, Lagos. Where ideas come alive.',
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
