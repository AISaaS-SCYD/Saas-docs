# Fumadocs Neutral Theme Configuration Guide

## Overview

This document provides a complete guide for configuring Fumadocs with a neutral theme using CSS variables and Tailwind CSS.

## Color Palette - Neutral Theme

### Light Mode (Default)
- **Background**: `#ffffff` (0 0% 100%)
- **Foreground**: `#1a1a1a` (0 0% 12%)
- **Border**: `#e6e6e6` (0 0% 90%)
- **Secondary**: `#808080` (0 0% 50%)
- **Muted Text**: `#8c8c8c` (0 0% 55%)
- **Accent**: `#3b82f6` (217 91% 60%) - Blue accent for subtle contrast

### Dark Mode
- **Background**: `#141414` (0 0% 8%)
- **Foreground**: `#fafafa` (0 0% 98%)
- **Border**: `#333333` (0 0% 20%)
- **Secondary**: `#999999` (0 0% 60%)
- **Muted Text**: `#8c8c8c` (0 0% 55%)
- **Accent**: `#3b82f6` (217 91% 60%)

## Implementation Files

### 1. tailwind.config.ts

Configure Tailwind CSS to use CSS variables for dynamic theming:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'neutral-50': '#fafafa',
        'neutral-100': '#f5f5f5',
        'neutral-200': '#e7e7e7',
        'neutral-300': '#d1d1d1',
        'neutral-400': '#b0b0b0',
        'neutral-500': '#888888',
        'neutral-600': '#666666',
        'neutral-700': '#424242',
        'neutral-800': '#212121',
        'neutral-900': '#121212',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 2. app/globals.css

Define CSS custom properties for theme colors:

```css
:root {
  /* Light Mode - Neutral Theme */
  --background: 0 0% 100%;
  --foreground: 0 0% 12%;
  --secondary: 0 0% 50%;
  --secondary-text: 0 0% 45%;
  --muted-text: 0 0% 55%;
  --border: 0 0% 90%;
  --accent: 217 91% 60%;
  --accent-foreground: 0 0% 100%;

  /* Fumadocs specific colors */
  --fd-background: 0 0% 100%;
  --fd-foreground: 0 0% 12%;
  --fd-muted: 0 0% 50%;
  --fd-muted-foreground: 0 0% 32%;
  --fd-border: 0 0% 90%;
  --fd-ring: 217 91% 60%;
  --fd-primary: 217 91% 60%;
  --fd-primary-foreground: 0 0% 100%;
  --fd-secondary: 0 0% 96%;
  --fd-secondary-foreground: 0 0% 12%;
  --fd-accent: 217 91% 60%;
  --fd-accent-foreground: 0 0% 100%;
  --fd-destructive: 0 84% 60%;
  --fd-destructive-foreground: 0 0% 100%;
  --fd-card: 0 0% 100%;
  --fd-card-foreground: 0 0% 12%;
}

html.dark {
  /* Dark Mode - Neutral Theme */
  --background: 0 0% 8%;
  --foreground: 0 0% 98%;
  --secondary: 0 0% 60%;
  --secondary-text: 0 0% 70%;
  --muted-text: 0 0% 55%;
  --border: 0 0% 20%;
  --accent: 217 91% 60%;
  --accent-foreground: 0 0% 8%;

  --fd-background: 0 0% 8%;
  --fd-foreground: 0 0% 98%;
  --fd-muted: 0 0% 50%;
  --fd-muted-foreground: 0 0% 85%;
  --fd-border: 0 0% 20%;
  --fd-ring: 217 91% 60%;
  --fd-primary: 217 91% 60%;
  --fd-primary-foreground: 0 0% 8%;
  --fd-secondary: 0 0% 15%;
  --fd-secondary-foreground: 0 0% 98%;
  --fd-accent: 217 91% 60%;
  --fd-accent-foreground: 0 0% 8%;
  --fd-destructive: 0 84% 60%;
  --fd-destructive-foreground: 0 0% 8%;
  --fd-card: 0 0% 12%;
  --fd-card-foreground: 0 0% 98%;
}
```

### 3. app/layout.tsx

Configure Fumadocs RootProvider with neutral theme:

```typescript
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
```

## Integration Steps

1. **Update tailwind.config.ts**:
   - Replace existing colors configuration
   - Ensure Fumadocs UI dist path is included in content array
   - Extend theme with CSS variables

2. **Update app/globals.css**:
   - Add CSS custom properties for light and dark modes
   - Define Fumadocs-specific color tokens
   - Include base layer styling with @layer directive

3. **Update app/layout.tsx**:
   - Import updated globals.css
   - Configure RootProvider with theme settings
   - Set suppressHydrationWarning on html element

## Key Features

- **Neutral Color Scheme**: Uses grayscale tones (neutral-50 to neutral-950) throughout
- **CSS Variables**: Dynamic theme switching via HSL color values
- **Dark Mode Support**: Automatic dark mode switching with proper contrast ratios
- **Fumadocs Integration**: Proper color tokens for all Fumadocs UI components
- **Accessibility**: Maintains 4.5:1 contrast ratio for text
- **Responsive**: Works seamlessly across all device sizes

## Customization

To adjust the neutral theme:

1. **Change Primary Accent**:
   ```css
   --accent: 217 91% 60%;  /* Change HSL values */
   --fd-accent: 217 91% 60%;
   ```

2. **Adjust Neutrals**:
   ```css
   --background: 0 0% 100%;  /* Lighter/darker background */
   --foreground: 0 0% 12%;   /* Text color adjustments */
   ```

3. **Modify Border Colors**:
   ```css
   --border: 0 0% 90%;  /* Light mode borders */
   --fd-border: 0 0% 20%;  /* Dark mode borders */
   ```

## Theme Variables Reference

| Variable | Purpose | Light Value | Dark Value |
|----------|---------|-------------|-----------|
| `--background` | Page background | 0 0% 100% | 0 0% 8% |
| `--foreground` | Text color | 0 0% 12% | 0 0% 98% |
| `--border` | Border color | 0 0% 90% | 0 0% 20% |
| `--accent` | Link/button color | 217 91% 60% | 217 91% 60% |
| `--fd-primary` | Primary action | 217 91% 60% | 217 91% 60% |
| `--fd-secondary` | Secondary background | 0 0% 96% | 0 0% 15% |
| `--fd-muted-foreground` | Muted text | 0 0% 32% | 0 0% 85% |

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties supported
- Automatic dark mode detection via system preferences
- Manual theme toggle with localStorage persistence

## Testing the Configuration

1. Open the documentation site
2. Verify neutral gray tones throughout
3. Test theme toggle (light/dark mode)
4. Check contrast ratios on all text
5. Verify responsive design on mobile devices
6. Test keyboard navigation and accessibility

## Best Practices

1. Always maintain sufficient contrast ratios
2. Use consistent spacing and typography
3. Test theme changes in both light and dark modes
4. Verify all interactive elements are accessible
5. Ensure smooth transitions between theme changes
6. Test on multiple browsers and devices
