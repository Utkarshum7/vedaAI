/**
 * Root Layout
 * 
 * Main application layout with metadata, fonts, and global styles.
 * Wraps all pages in the application.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_METADATA } from "@/lib/constants";

/**
 * Font Configuration
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application Metadata
 */
export const metadata: Metadata = {
  title: {
    default: APP_METADATA.NAME,
    template: `%s | ${APP_METADATA.NAME}`,
  },
  description: APP_METADATA.DESCRIPTION,
  keywords: [
    "AI",
    "assignment generation",
    "education",
    "question paper",
    "automated assessment",
    "VedaAI",
  ],
  authors: [
    {
      name: APP_METADATA.AUTHOR,
    },
  ],
  creator: APP_METADATA.AUTHOR,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: APP_METADATA.NAME,
    description: APP_METADATA.DESCRIPTION,
    siteName: APP_METADATA.NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_METADATA.NAME,
    description: APP_METADATA.DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Root Layout Component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-neutral-950">
        {children}
      </body>
    </html>
  );
}

// Made with Bob
