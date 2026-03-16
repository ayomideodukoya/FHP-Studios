import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// Using Inter as a fallback for the display font
const displayFont = Inter({
  subsets: ["latin"],
  weight: ['700', '800', '900'],
  variable: '--font-clash-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FHP Studios | A Hub for Creatives",
  description: "FHP Studios is a premier creative space and event venue located in Ogba, Lagos. A hub for live storytelling, spoken word events, and community gatherings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${displayFont.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
