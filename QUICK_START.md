# Fumadocs Neutral Theme - Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 18+
- Fumadocs installed
- Tailwind CSS configured

### Step 1: Copy Configuration Files (1 min)

Copy these files from this directory to your project:

```bash
# Tailwind configuration
cp tailwind-config-neutral.ts tailwind.config.ts

# Global styles
cp app/globals-neutral.css app/globals.css

# Root layout
cp app/layout-neutral.tsx app/layout.tsx
```

### Step 2: Verify Imports (1 min)

Open `app/layout.tsx` and ensure it has:

```typescript
import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';
```

### Step 3: Update Dependencies (1 min)

```bash
npm install fumadocs-ui fumadocs-core
```

### Step 4: Start Development Server (1 min)

```bash
npm run dev
```

### Step 5: Verify Theme (1 min)

1. Open browser to http://localhost:3000
2. Check that text is readable
3. Toggle theme (usually button in navbar)
4. Verify dark mode works

**Done!** Your Fumadocs site now uses the neutral theme.

---

## Customization Cheat Sheet

### Change Accent Color

Open `app/globals.css` and update:

```css
:root {
  --accent: 217 91% 60%;  /* Blue (current) */
  /* --accent: 142 71% 45%;   Green */
  /* --accent: 264 87% 51%;   Purple */
  /* --accent: 25 95% 53%;    Orange */
}

html.dark {
  --accent: 217 91% 60%;  /* Same blue */
}
```

### Adjust Background Tone

For slightly different backgrounds, modify:

```css
/* Light mode */
:root {
  --background: 0 0% 100%;  /* Pure white (current) */
  /* --background: 0 0% 99%;   Nearly white */
  /* --background: 0 5% 99%;   Slightly warm */
}

/* Dark mode */
html.dark {
  --background: 0 0% 8%;    /* Very dark (current) */
  /* --background: 0 0% 10%;   Slightly lighter */
}
```

### Make Text Darker/Lighter

```css
:root {
  --foreground: 0 0% 12%;   /* Dark gray (current) */
  /* --foreground: 0 0% 8%;    Much darker */
  /* --foreground: 0 0% 20%;   Lighter dark */
}
```

---

## File Structure

```
app/
├── layout.tsx              ← Root layout (updated)
├── globals.css             ← Global styles (updated)
└── page.tsx                ← Your pages

tailwind.config.ts          ← Tailwind config (updated)

Documentation/
├── FUMADOCS_NEUTRAL_THEME.md          ← Complete guide
├── IMPLEMENTATION_CHECKLIST.md        ← Detailed steps
├── CONFIGURATION_SUMMARY.md           ← Overview
├── CSS_VARIABLES_REFERENCE.md         ← All variables
└── QUICK_START.md                     ← This file
```

---

## Troubleshooting

### Colors not showing?

**Solution:** Restart the dev server
```bash
npm run dev
```

### Theme not switching?

**Solution:** Check that `suppressHydrationWarning` is on html element in layout.tsx

```typescript
<html lang="en" suppressHydrationWarning>
```

### Styles look weird?

**Solution:** Clear the build cache
```bash
rm -rf .next
npm run dev
```

### Text too light/dark?

**Solution:** Adjust HSL values in CSS variables
- Increase L value for lighter text
- Decrease L value for darker text

Example:
```css
--foreground: 0 0% 15%;  /* Darker (was 12%) */
```

---

## Key Files Explained

### tailwind.config.ts
- Extends Tailwind with neutral color palette
- Defines CSS variable mappings
- Includes Fumadocs UI paths

### app/globals.css
- Defines all CSS variables
- Separate values for light/dark modes
- Component utility classes

### app/layout.tsx
- Root layout component
- Fumadocs RootProvider configuration
- Theme toggle support

---

## What Gets Set Up

### Light Mode
- Clean white background (#ffffff)
- Dark text (#1f1f1f)
- Blue accent (#3b82f6)
- Subtle gray borders

### Dark Mode
- Very dark background (#141414)
- Nearly white text (#fafafa)
- Same blue accent (#3b82f6)
- Light gray borders

### Features
- Automatic dark mode detection
- Manual theme toggle
- Theme persistence (localStorage)
- Full accessibility support

---

## Next Steps

1. **Test the theme:**
   - Verify light and dark modes
   - Check text readability
   - Test interactive elements

2. **Customize colors (optional):**
   - Update accent color
   - Adjust neutral tones
   - Modify backgrounds

3. **Build your content:**
   - Create documentation pages
   - Add components
   - Publish your site

---

## Color Reference

### Standard Colors

| Color | Light | Dark |
|-------|-------|------|
| Background | #ffffff | #141414 |
| Text | #1f1f1f | #fafafa |
| Border | #e6e6e6 | #333333 |
| Accent | #3b82f6 | #3b82f6 |

### Neutral Scale

```
50 (lightest)  → #fafafa
100           → #f5f5f5
200           → #e7e7e7
300           → #d1d1d1
400           → #b0b0b0
500 (medium)  → #888888
600           → #666666
700           → #424242
800           → #212121
900           → #121212
950 (darkest) → #0a0a0a
```

---

## Common Customizations

### Make theme warmer
Change grays to have slight hue:
```css
--background: 30 10% 99%;  /* Warm white */
```

### Use different accent
Replace `--accent` with:
- Green: `142 71% 45%`
- Purple: `264 87% 51%`
- Orange: `25 95% 53%`
- Red: `0 84% 60%`

### Adjust contrast
For higher contrast:
```css
:root {
  --foreground: 0 0% 0%;    /* Pure black */
  --background: 0 0% 100%;  /* Pure white */
}
```

---

## Documentation

For more information, see:

- `FUMADOCS_NEUTRAL_THEME.md` - Complete theme guide
- `IMPLEMENTATION_CHECKLIST.md` - Step-by-step setup
- `CSS_VARIABLES_REFERENCE.md` - All CSS variables
- `CONFIGURATION_SUMMARY.md` - Configuration overview

---

## Support

### Fumadocs
- https://fumadocs.vercel.app
- https://github.com/fuma-nama/fumadocs

### Tailwind CSS
- https://tailwindcss.com
- https://tailwindcss.com/docs

### Next.js
- https://nextjs.org
- https://nextjs.org/docs

---

## Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Checklist Before Publishing

- [ ] Tested light mode
- [ ] Tested dark mode
- [ ] Verified text readability
- [ ] Tested on mobile
- [ ] Tested keyboard navigation
- [ ] Built project successfully
- [ ] No console errors
- [ ] Theme persists on reload
- [ ] All links working
- [ ] Images loading

---

**Version:** 1.0
**Last Updated:** 2024-12-19

Happy documenting!
