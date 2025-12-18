# CSS Custom Properties Reference

## Complete Variable Mapping

### Core Theme Variables

#### Light Mode (`:root`)

```css
:root {
  /* Background & Foreground */
  --background: 0 0% 100%;           /* White background */
  --foreground: 0 0% 12%;            /* Dark text */

  /* Secondary & Muted */
  --secondary: 0 0% 50%;             /* Medium gray */
  --secondary-text: 0 0% 45%;        /* Medium-dark gray text */
  --muted-text: 0 0% 55%;            /* Light-medium gray text */

  /* Borders & Accents */
  --border: 0 0% 90%;                /* Light gray borders */
  --accent: 217 91% 60%;             /* Blue accent (#3b82f6) */
  --accent-foreground: 0 0% 100%;    /* White text on accent */
}
```

#### Dark Mode (`html.dark`)

```css
html.dark {
  /* Background & Foreground */
  --background: 0 0% 8%;             /* Very dark background */
  --foreground: 0 0% 98%;            /* Nearly white text */

  /* Secondary & Muted */
  --secondary: 0 0% 60%;             /* Medium-light gray */
  --secondary-text: 0 0% 70%;        /* Light gray text */
  --muted-text: 0 0% 55%;            /* Medium gray text */

  /* Borders & Accents */
  --border: 0 0% 20%;                /* Dark gray borders */
  --accent: 217 91% 60%;             /* Same blue accent */
  --accent-foreground: 0 0% 8%;      /* Dark text on accent */
}
```

### Fumadocs-Specific Variables

#### Light Mode

```css
:root {
  /* Fumadocs Background & Foreground */
  --fd-background: 0 0% 100%;
  --fd-foreground: 0 0% 12%;

  /* Fumadocs Muted */
  --fd-muted: 0 0% 50%;
  --fd-muted-foreground: 0 0% 32%;

  /* Fumadocs Border & Ring */
  --fd-border: 0 0% 90%;
  --fd-ring: 217 91% 60%;

  /* Fumadocs Primary */
  --fd-primary: 217 91% 60%;
  --fd-primary-foreground: 0 0% 100%;

  /* Fumadocs Secondary */
  --fd-secondary: 0 0% 96%;
  --fd-secondary-foreground: 0 0% 12%;

  /* Fumadocs Accent */
  --fd-accent: 217 91% 60%;
  --fd-accent-foreground: 0 0% 100%;

  /* Fumadocs Destructive */
  --fd-destructive: 0 84% 60%;
  --fd-destructive-foreground: 0 0% 100%;

  /* Fumadocs Card */
  --fd-card: 0 0% 100%;
  --fd-card-foreground: 0 0% 12%;
}
```

#### Dark Mode

```css
html.dark {
  /* Fumadocs Background & Foreground */
  --fd-background: 0 0% 8%;
  --fd-foreground: 0 0% 98%;

  /* Fumadocs Muted */
  --fd-muted: 0 0% 50%;
  --fd-muted-foreground: 0 0% 85%;

  /* Fumadocs Border & Ring */
  --fd-border: 0 0% 20%;
  --fd-ring: 217 91% 60%;

  /* Fumadocs Primary */
  --fd-primary: 217 91% 60%;
  --fd-primary-foreground: 0 0% 8%;

  /* Fumadocs Secondary */
  --fd-secondary: 0 0% 15%;
  --fd-secondary-foreground: 0 0% 98%;

  /* Fumadocs Accent */
  --fd-accent: 217 91% 60%;
  --fd-accent-foreground: 0 0% 8%;

  /* Fumadocs Destructive */
  --fd-destructive: 0 84% 60%;
  --fd-destructive-foreground: 0 0% 8%;

  /* Fumadocs Card */
  --fd-card: 0 0% 12%;
  --fd-card-foreground: 0 0% 98%;
}
```

---

## Neutral Color Scale

### Full Color Palette

Defined in `tailwind.config.ts`:

```
neutral-50:   #fafafa  (98% L)
neutral-100:  #f5f5f5  (96% L)
neutral-200:  #e7e7e7  (91% L)
neutral-300:  #d1d1d1  (82% L)
neutral-400:  #b0b0b0  (69% L)
neutral-500:  #888888  (53% L)
neutral-600:  #666666  (40% L)
neutral-700:  #424242  (26% L)
neutral-800:  #212121  (13% L)
neutral-900:  #121212  (7% L)
neutral-950:  #0a0a0a  (4% L)
```

### Recommended Usage

| Scale | Light Mode | Dark Mode | Use Case |
|-------|-----------|----------|----------|
| 50-100 | Background | - | Hover states, secondary backgrounds |
| 100-200 | Borders, dividers | - | Light borders, subtle dividers |
| 200-300 | Input borders | - | Form input borders |
| 400-500 | Muted text | Primary text | Secondary information |
| 500-600 | Text muted | Text muted | Less important text |
| 700-800 | Primary text | Borders | Body text, primary content |
| 800-900 | - | Background | Dark mode backgrounds |
| 950 | - | Deep background | Dark mode deep backgrounds |

---

## Tailwind CSS Class Usage

### With CSS Variables

All variables are accessible via Tailwind classes:

```tsx
/* Background colors */
<div className="bg-background">        {/* hsl(var(--background)) */}
<div className="bg-neutral-100">       {/* #f5f5f5 */}
<div className="bg-neutral-900">       {/* #212121 */}

/* Text colors */
<div className="text-foreground">      {/* hsl(var(--foreground)) */}
<div className="text-secondary-text">  {/* Secondary text color */}
<div className="text-muted-text">      {/* Muted text color */}

/* Border colors */
<div className="border-border">        {/* hsl(var(--border)) */}

/* Accent color */
<button className="bg-accent">        {/* hsl(var(--accent)) */}
```

---

## Component Styling Examples

### Card Component

**HTML:**
```html
<div class="rounded-lg border border-border bg-card p-6 shadow-sm">
  <h3 class="text-lg font-semibold text-foreground">Card Title</h3>
  <p class="text-sm text-secondary-text">Card content goes here</p>
</div>
```

**CSS Variables Used:**
- `--border` for border color
- `--fd-card` for background (if using Fumadocs card)
- `--foreground` for heading text
- `--secondary-text` for body text

### Button Component

**HTML:**
```html
<!-- Primary Button -->
<button class="bg-accent text-accent-foreground hover:bg-accent/90">
  Primary Action
</button>

<!-- Secondary Button -->
<button class="bg-secondary text-secondary-foreground hover:bg-secondary/80">
  Secondary Action
</button>

<!-- Ghost Button -->
<button class="text-accent hover:bg-neutral-100 dark:hover:bg-neutral-900">
  Ghost Action
</button>
```

**CSS Variables Used:**
- `--accent` for primary button
- `--accent-foreground` for text on accent
- `--secondary` for secondary button

### Input Component

**HTML:**
```html
<input
  class="border border-border bg-background text-foreground placeholder:text-muted-text focus:border-accent focus:ring-1 focus:ring-accent"
  placeholder="Enter text..."
/>
```

**CSS Variables Used:**
- `--border` for input border
- `--background` for input background
- `--foreground` for input text
- `--muted-text` for placeholder
- `--accent` for focus state

---

## HSL Color Format

### Understanding HSL Values

CSS variables use HSL format: `H S% L%`

- **H (Hue)**: 0-360 degrees
  - 0° = Red
  - 120° = Green
  - 240° = Blue

- **S (Saturation)**: 0-100%
  - 0% = Grayscale
  - 100% = Full color

- **L (Lightness)**: 0-100%
  - 0% = Black
  - 50% = Pure color
  - 100% = White

### Example: Converting Colors to HSL

```
#ffffff (white)     → hsl(0 0% 100%)
#000000 (black)     → hsl(0 0% 0%)
#ff0000 (red)       → hsl(0 100% 50%)
#3b82f6 (blue)      → hsl(217 91% 60%)
#808080 (gray)      → hsl(0 0% 50%)
```

### Adjusting Brightness

To adjust brightness while keeping the same color:

```css
/* Original */
--accent: 217 91% 60%;

/* Darker (decrease L) */
--accent-dark: 217 91% 40%;

/* Lighter (increase L) */
--accent-light: 217 91% 80%;
```

---

## CSS Variable Naming Convention

### Variable Naming Pattern

```
--[scope]-[property]: [value];
```

Where:
- `scope`: `root` (empty) or `fd` (Fumadocs)
- `property`: color purpose (background, foreground, border, etc.)

### Scopes

- **Global variables** (no prefix): Available everywhere
  - `--background`, `--foreground`, `--border`, `--accent`

- **Fumadocs variables** (fd- prefix): Fumadocs-specific
  - `--fd-background`, `--fd-primary`, `--fd-secondary`

---

## Dynamic Color Generation

### Creating Opacity Variants

Tailwind automatically creates opacity variants:

```tsx
/* Using CSS variables */
className="bg-background/50"      /* 50% opacity */
className="bg-accent/80"          /* 80% opacity */
className="text-foreground/60"    /* 60% opacity */

/* Hover states */
className="hover:bg-accent/90"    /* 90% opacity on hover */
```

### Creating Color Variants

Extend Tailwind config to create variants:

```typescript
colors: {
  'accent-light': 'hsl(var(--accent) / 20%)',
  'accent-dark': 'hsl(var(--accent) / 80%)',
}
```

---

## Quick Reference Table

| Variable | Light Value | Dark Value | Used For |
|----------|-------------|-----------|----------|
| `--background` | `0 0% 100%` | `0 0% 8%` | Page background |
| `--foreground` | `0 0% 12%` | `0 0% 98%` | Main text |
| `--border` | `0 0% 90%` | `0 0% 20%` | Borders, dividers |
| `--accent` | `217 91% 60%` | `217 91% 60%` | Links, buttons, accents |
| `--secondary` | `0 0% 50%` | `0 0% 60%` | Secondary elements |
| `--muted-text` | `0 0% 55%` | `0 0% 55%` | Less important text |
| `--fd-primary` | `217 91% 60%` | `217 91% 60%` | Fumadocs primary button |
| `--fd-secondary` | `0 0% 96%` | `0 0% 15%` | Fumadocs secondary bg |
| `--fd-card` | `0 0% 100%` | `0 0% 12%` | Fumadocs card bg |
| `--fd-destructive` | `0 84% 60%` | `0 84% 60%` | Error/delete states |

---

## Developer Notes

### When to Use Each Variable

1. **`--background`**: Page and container backgrounds
2. **`--foreground`**: All body text and primary text
3. **`--border`**: All borders, dividers, separators
4. **`--accent`**: Interactive elements (links, buttons, hover states)
5. **`--secondary`**: Secondary text, badges, muted content
6. **`--muted-text`**: Help text, captions, less important content

### Best Practices

1. Never hardcode colors - always use CSS variables
2. Use scoped variables for Fumadocs components
3. Test contrast ratios in both light and dark modes
4. Use opacity modifiers instead of hardcoding alpha values
5. Maintain consistent spacing with Tailwind scale

### Common Mistakes to Avoid

- Using hardcoded hex colors instead of variables
- Forgetting to set `html.dark` values
- Not testing dark mode contrast
- Using variables with wrong syntax
- Forgetting to update both light and dark mode values

---

## Testing CSS Variables

### Chrome DevTools

1. Open DevTools (F12)
2. Go to Elements tab
3. Select an element
4. Look at Computed Styles
5. Search for `--` to find CSS variables
6. Click variable name to see computed value

### Firefox DevTools

1. Open DevTools (F12)
2. Go to Inspector tab
3. Select an element
4. Look at Rules panel
5. Expand `:root` or `html.dark`
6. See all defined variables

### Verifying Values

```javascript
// In browser console
getComputedStyle(document.documentElement).getPropertyValue('--accent')
// Returns: " 217 91% 60%"

getComputedStyle(document.documentElement).getPropertyValue('--background')
// Returns: " 0 0% 100%" (light mode) or " 0 0% 8%" (dark mode)
```

---

**Last Updated:** 2024-12-19
**Version:** 1.0
