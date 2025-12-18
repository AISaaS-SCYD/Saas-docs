# Fumadocs Neutral Theme - Implementation Checklist

## Overview
This checklist guides you through implementing the neutral theme for Fumadocs in your project.

## Pre-Implementation
- [ ] Backup existing configuration files
- [ ] Review current tailwind.config.ts
- [ ] Review current app/layout.tsx
- [ ] Review current app/globals.css (if exists)
- [ ] Ensure Fumadocs is properly installed

## Step 1: Update Tailwind Configuration

### File: tailwind.config.ts

**Changes Required:**
- [ ] Import Config type from tailwindcss
- [ ] Update content array to include:
  - `'./node_modules/fumadocs-ui/dist/**/*.js'`
- [ ] Add to theme.extend.colors:
  ```typescript
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
  }
  ```
- [ ] Save and verify syntax

**Verification:**
```bash
npx tsc --noEmit tailwind.config.ts
```

---

## Step 2: Create/Update Global CSS

### File: app/globals.css

**Changes Required:**
- [ ] Add CSS custom properties (CSS variables) for light mode:
  ```css
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 12%;
    --secondary: 0 0% 50%;
    --secondary-text: 0 0% 45%;
    --muted-text: 0 0% 55%;
    --border: 0 0% 90%;
    --accent: 217 91% 60%;
    --accent-foreground: 0 0% 100%;

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
  }
  ```

- [ ] Add CSS custom properties for dark mode:
  ```css
  html.dark {
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
  }
  ```

- [ ] Add @layer base styles:
  ```css
  @layer base {
    body {
      @apply bg-background text-foreground transition-colors;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
  }
  ```

- [ ] Add @layer components for utility classes
- [ ] Add scrollbar styling
- [ ] Add syntax highlighting for code blocks
- [ ] Save and test

**Verification:**
- [ ] Inspect element in browser
- [ ] Verify CSS variables are applied
- [ ] Check both light and dark modes

---

## Step 3: Update Root Layout

### File: app/layout.tsx

**Changes Required:**
- [ ] Import globals.css:
  ```typescript
  import './globals.css';
  ```

- [ ] Add suppressHydrationWarning to html element:
  ```typescript
  <html lang="en" suppressHydrationWarning>
  ```

- [ ] Configure RootProvider with theme settings:
  ```typescript
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
  ```

- [ ] Add meta tags for theme support:
  ```typescript
  <meta name="theme-color" content="#ffffff" />
  <meta name="color-scheme" content="light dark" />
  ```

- [ ] Save and verify

**Verification:**
```bash
npm run build
npm run dev
```

---

## Step 4: Test Theme Implementation

### Light Mode
- [ ] Start development server
- [ ] Open browser DevTools
- [ ] Check CSS variables in :root
- [ ] Verify colors are applied correctly
- [ ] Test all interactive elements
- [ ] Check text contrast ratios (WCAG AA minimum 4.5:1)

### Dark Mode
- [ ] Toggle to dark mode
- [ ] Check CSS variables in html.dark
- [ ] Verify dark mode colors are applied
- [ ] Test all interactive elements
- [ ] Verify accessibility contrast ratios
- [ ] Check localStorage persistence

### Responsive Testing
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1440px width)
- [ ] Verify layout integrity

### Accessibility Testing
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify color contrast on all text
- [ ] Test focus states on interactive elements
- [ ] Verify form inputs are accessible

---

## Step 5: Verify Fumadocs Integration

### Component Testing
- [ ] Test Navigation component
- [ ] Test Sidebar component
- [ ] Test TOC (Table of Contents)
- [ ] Test Breadcrumb component
- [ ] Test Search component
- [ ] Test Callout/Alert components
- [ ] Test Code blocks with syntax highlighting
- [ ] Test Links and buttons
- [ ] Test Cards and other UI elements

### Content Testing
- [ ] Create sample documentation page
- [ ] Test markdown rendering
- [ ] Verify headings are properly styled
- [ ] Test code blocks and inline code
- [ ] Verify images display correctly
- [ ] Test lists and tables

---

## Step 6: Performance Verification

- [ ] Build production bundle:
  ```bash
  npm run build
  ```

- [ ] Check bundle size impact
- [ ] Verify no console errors
- [ ] Test page load speed
- [ ] Verify CSS is optimized

---

## Step 7: Documentation

- [ ] Update project README with theme information
- [ ] Document CSS variable naming convention
- [ ] Create example components page
- [ ] Document how to customize colors
- [ ] Add troubleshooting guide

---

## Color Customization Guide

### Change Primary Accent Color

If you want to change the accent color from blue to another color:

1. Open `app/globals.css`
2. Update these values in both `:root` and `html.dark`:
   ```css
   --accent: 217 91% 60%;  /* Change these HSL values */
   --fd-accent: 217 91% 60%;
   ```

3. Common accent colors:
   - Blue: `217 91% 60%` (current)
   - Green: `142 71% 45%`
   - Purple: `264 87% 51%`
   - Orange: `25 95% 53%`
   - Red: `0 84% 60%`

### Adjust Neutral Tones

To make the theme warmer or cooler:

1. Open `tailwind.config.ts`
2. Adjust neutral color values:
   ```typescript
   'neutral-100': '#f5f5f5',  // Cooler/warmer gray
   'neutral-200': '#e7e7e7',
   ```

---

## Troubleshooting

### CSS Variables Not Applied
- [ ] Verify `globals.css` is imported in `layout.tsx`
- [ ] Check for typos in variable names
- [ ] Clear browser cache
- [ ] Rebuild project: `npm run build`

### Theme Not Switching
- [ ] Verify `suppressHydrationWarning` is on html element
- [ ] Check localStorage for `fd_theme` key
- [ ] Verify RootProvider theme configuration
- [ ] Check browser console for errors

### Colors Look Wrong
- [ ] Verify HSL values in CSS variables
- [ ] Check Tailwind config for conflicts
- [ ] Test in incognito mode
- [ ] Clear `.next` build cache

### Accessibility Issues
- [ ] Test contrast ratios with WebAIM
- [ ] Verify focus states are visible
- [ ] Test with accessibility checker
- [ ] Review WCAG 2.1 AA guidelines

---

## Final Verification Checklist

- [ ] All CSS variables are correctly defined
- [ ] Tailwind config includes Fumadocs paths
- [ ] Root layout imports globals.css
- [ ] Theme switching works in both directions
- [ ] Dark mode has sufficient contrast
- [ ] Light mode has sufficient contrast
- [ ] All Fumadocs components render correctly
- [ ] No console errors or warnings
- [ ] Responsive design works on all breakpoints
- [ ] Keyboard navigation works
- [ ] Theme preference persists in localStorage
- [ ] Build process completes successfully
- [ ] Documentation is updated

---

## Next Steps

1. **Create Additional Pages**
   - Create more documentation pages
   - Test theme consistency across pages

2. **Add Custom Components**
   - Develop project-specific components using the theme
   - Ensure they follow the neutral theme design

3. **Deploy**
   - Deploy to staging environment
   - Test in production-like environment
   - Deploy to production

4. **Monitor**
   - Check browser console for errors
   - Monitor performance metrics
   - Gather user feedback on theme

---

## References

- Fumadocs Documentation: https://fumadocs.vercel.app
- Tailwind CSS Docs: https://tailwindcss.com
- CSS Variables Guide: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- WCAG Accessibility Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
