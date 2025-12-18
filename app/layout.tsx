import './globals.css';
import 'fumadocs-ui/style.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';

/**
 * Load Inter font for body text
 * Optimized with latin subsets for better performance
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Load Geist Mono for code blocks
 * Used for inline code and code snippets
 */
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

/**
 * Metadata configuration for SEO and social sharing
 */
export const metadata: Metadata = {
  title: {
    default: 'SaaS Documentation',
    template: '%s | SaaS Documentation',
  },
  description: 'Comprehensive knowledge base and documentation for our SaaS platform',
  keywords: [
    'documentation',
    'SaaS',
    'guide',
    'API reference',
    'tutorials',
  ],
  authors: [
    {
      name: 'SaaS Team',
    },
  ],
  creator: 'SaaS Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.example.com',
    title: 'SaaS Documentation',
    description: 'Comprehensive knowledge base and documentation for our SaaS platform',
    siteName: 'SaaS Documentation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Documentation',
    description: 'Comprehensive knowledge base and documentation for our SaaS platform',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

/**
 * Viewport configuration for responsive design
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component for the entire application
 * - Applies font variables for sans and mono fonts
 * - Provides Fumadocs theme context
 * - Configures HTML language and hydration
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
