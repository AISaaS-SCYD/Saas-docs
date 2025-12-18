import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import './globals.css';

export const metadata = {
  title: 'Saas Docs - Neutral Theme',
  description: 'Documentation site with neutral theme',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <RootProvider
          search={{
            enabled: true,
          }}
          theme={{
            enabled: true,
            default: 'light',
            storageKey: 'fd_theme',
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
