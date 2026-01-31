# Phase 1: Foundation - Research

**Researched:** 2026-01-31
**Domain:** Next.js 15 + Tailwind CSS v4 + shadcn/ui project setup with design tokens
**Confidence:** HIGH

## Summary

Phase 1 Foundation establishes the project infrastructure for the Omni Card landing page. This includes creating a Next.js 15 App Router project with TypeScript, configuring Tailwind CSS v4 with design system tokens (colors, spacing, typography, radii, shadows), initializing shadcn/ui, and verifying everything works with a test Button component.

The key insight from research is that Tailwind CSS v4 has fundamentally changed how theming works. There is no `tailwind.config.ts` file for new projects - everything is configured in CSS using the `@theme` directive. shadcn/ui has been updated for Tailwind v4 compatibility with OKLCH colors replacing HSL and `tw-animate-css` replacing the deprecated `tailwindcss-animate`.

**Primary recommendation:** Use `create-next-app@latest` with `--yes` flag, then run `npx shadcn@latest init` which handles Tailwind v4 CSS structure automatically. Define design tokens in `globals.css` using `@theme inline` for CSS variable bridging and `:root` for base values.

## Standard Stack

The established libraries/tools for this phase:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.x | React framework with App Router | Turbopack bundling, Server Components by default, static export capability |
| React | 19.x | UI library | Required for R3F v9 and Motion v12 in later phases |
| TypeScript | 5.x | Type safety | Built-in Next.js integration, typed routes |
| Tailwind CSS | 4.1.x | Utility-first CSS | CSS-first config with `@theme`, P3/OKLCH colors, 5x faster builds |
| shadcn/ui | latest | Component primitives | Full ownership of components, Tailwind v4 native, Radix accessibility |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.x | Conditional class logic | Every component with dynamic classes |
| tailwind-merge | 2.x | Class conflict resolution | Pair with clsx in `cn()` utility |
| tw-animate-css | latest | CSS animations | Required by shadcn/ui for Tailwind v4 (replaces tailwindcss-animate) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind v4 | Tailwind v3 | v3 requires `tailwind.config.ts`, slower builds, HSL instead of OKLCH |
| shadcn/ui | Radix Themes | Radix Themes adds bundle size, less Tailwind-native |
| OKLCH colors | HSL colors | HSL has smaller gamut, less perceptually uniform |

**Installation:**
```bash
# Create Next.js project with defaults (TypeScript, Tailwind, ESLint, App Router, Turbopack)
npx create-next-app@latest omni-card --yes

# Install utilities
npm install clsx tailwind-merge

# Initialize shadcn/ui (handles tw-animate-css automatically)
npx shadcn@latest init

# Add Button component for verification
npx shadcn@latest add button
```

## Architecture Patterns

### Recommended Project Structure
```
omni-card/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, providers
│   ├── page.tsx            # Landing page composition (Server Component)
│   └── globals.css         # Tailwind imports + design tokens
├── components/
│   └── ui/                 # shadcn/ui components (Button, etc.)
├── lib/
│   └── utils.ts            # cn() utility function
├── public/                 # Static assets
├── postcss.config.mjs      # Tailwind PostCSS plugin
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript config with path aliases
└── package.json
```

### Pattern 1: CSS-First Theme Configuration (Tailwind v4)

**What:** Define all design tokens in `globals.css` using `@theme` directive instead of `tailwind.config.ts`
**When to use:** All Tailwind v4 projects
**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";
@import "tw-animate-css";

/* Base CSS variables for theming */
:root {
  --background: oklch(0.99 0 0);
  --foreground: oklch(0.13 0 0);
  --primary: oklch(0.55 0.2 260);
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.96 0.01 260);
  --secondary-foreground: oklch(0.13 0 0);
  --muted: oklch(0.96 0 0);
  --muted-foreground: oklch(0.45 0 0);
  --accent: oklch(0.96 0.01 260);
  --accent-foreground: oklch(0.13 0 0);
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(0.99 0 0);
  --border: oklch(0.91 0 0);
  --input: oklch(0.91 0 0);
  --ring: oklch(0.55 0.2 260);
  --radius: 0.5rem;
}

/* Bridge CSS variables to Tailwind utilities */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

### Pattern 2: cn() Utility Function

**What:** Combine clsx for conditional classes with tailwind-merge for conflict resolution
**When to use:** Every component that accepts className prop
**Example:**
```typescript
// Source: shadcn/ui lib/utils.ts pattern
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage in components
<Button className={cn("px-4", isLarge && "px-8", className)} />
// If isLarge=true and className="px-2", result is "px-2" (last wins, conflicts resolved)
```

### Pattern 3: next/font for Self-Hosted Fonts

**What:** Use next/font/google to self-host Google Fonts with zero layout shift
**When to use:** Any project using custom typography
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

// In globals.css, connect to Tailwind:
@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

### Anti-Patterns to Avoid

- **Creating tailwind.config.ts:** Tailwind v4 uses CSS-first configuration. Do not create a JavaScript/TypeScript config file.
- **Using HSL colors with shadcn/ui v4:** The new default is OKLCH. HSL still works but OKLCH provides better color uniformity.
- **Using tailwindcss-animate:** Incompatible with Tailwind v4. Use tw-animate-css instead.
- **Importing framer-motion package:** Use `motion/react` instead (package renamed).
- **Wrapping variables in hsl():** Old pattern was `--background: 0 0% 100%;` with `hsl(var(--background))`. New pattern is `--background: oklch(0.99 0 0);` with `var(--background)` directly.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Class name conflicts | Custom merge logic | tailwind-merge | Handles all Tailwind specificity edge cases |
| Conditional classes | String concatenation | clsx | Clean object/array syntax, falsy values handled |
| Font loading | Manual @font-face | next/font | Zero layout shift, automatic self-hosting |
| Design tokens | Custom CSS system | Tailwind @theme | Generates utilities automatically |
| Component primitives | DIY accessible components | shadcn/ui + Radix | WCAG compliant, keyboard nav built-in |
| Animation utilities | Custom keyframes | tw-animate-css | Works with Tailwind v4, shadcn components expect it |

**Key insight:** Every piece of infrastructure in this phase has a standard solution. The foundation phase is about correctly integrating existing tools, not building custom solutions.

## Common Pitfalls

### Pitfall 1: Missing PostCSS Configuration
**What goes wrong:** Tailwind classes don't compile, CSS output is empty
**Why it happens:** Tailwind v4 requires `@tailwindcss/postcss` plugin configured correctly
**How to avoid:** Ensure `postcss.config.mjs` exists with correct content:
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```
**Warning signs:** Classes like `bg-primary` don't work, no CSS in output

### Pitfall 2: Wrong @theme vs @theme inline Usage
**What goes wrong:** CSS variables not accessible, or utility classes not generated
**Why it happens:** Misunderstanding when to use `@theme` vs `@theme inline`
**How to avoid:**
- Use `:root` to define base CSS variables
- Use `@theme inline` to bridge CSS variables to Tailwind utilities (references other variables)
- Use `@theme` directly for static values that don't reference other variables
**Warning signs:** Classes work but `var(--color-primary)` returns wrong value

### Pitfall 3: Font CSS Variables Not Connecting
**What goes wrong:** Custom fonts don't apply despite being loaded
**Why it happens:** next/font creates CSS variable, but Tailwind doesn't know about it
**How to avoid:**
1. Set `variable: '--font-name'` in next/font config
2. Add font variable to HTML element: `className={font.variable}`
3. Bridge in @theme inline: `--font-sans: var(--font-name), system-ui`
**Warning signs:** Font loads in Network tab but text uses system font

### Pitfall 4: shadcn/ui Init Fails with Tailwind v4
**What goes wrong:** CLI errors about missing config or wrong structure
**Why it happens:** Project structure doesn't match what shadcn/ui expects
**How to avoid:**
- Run `npx shadcn@latest init` (note: not `shadcn-ui`, just `shadcn`)
- Use pnpm, yarn, or bun to avoid React 19 peer dependency issues with npm
- If using npm, add `--legacy-peer-deps` flag when installing components
**Warning signs:** Errors about missing `tailwind.config.ts`, peer dependency conflicts

### Pitfall 5: Cursor Default on Buttons
**What goes wrong:** Buttons show default cursor instead of pointer
**Why it happens:** Tailwind v4 changed button default from pointer to default cursor
**How to avoid:** Add to globals.css:
```css
@layer base {
  button:not(:disabled) {
    cursor: pointer;
  }
}
```
**Warning signs:** Buttons feel unclickable, user confusion

## Code Examples

Verified patterns from official sources:

### Complete globals.css for Light-Mode Fintech Design System
```css
/* Source: shadcn/ui Tailwind v4 docs + Tailwind theme docs */
@import "tailwindcss";
@import "tw-animate-css";

/* Light mode only - fintech trust aesthetic */
:root {
  /* Backgrounds & Surfaces */
  --background: oklch(0.995 0 0);           /* Near white */
  --foreground: oklch(0.145 0.01 260);      /* Near black with slight blue */
  --card: oklch(0.995 0 0);
  --card-foreground: oklch(0.145 0.01 260);
  --popover: oklch(0.995 0 0);
  --popover-foreground: oklch(0.145 0.01 260);

  /* Primary - Brand color (premium purple/blue) */
  --primary: oklch(0.55 0.18 260);
  --primary-foreground: oklch(0.99 0 0);

  /* Secondary - Subtle backgrounds */
  --secondary: oklch(0.97 0.005 260);
  --secondary-foreground: oklch(0.25 0.01 260);

  /* Muted - Disabled/subtle text */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.55 0 0);

  /* Accent - Hover states */
  --accent: oklch(0.97 0.01 260);
  --accent-foreground: oklch(0.25 0.01 260);

  /* Destructive - Errors */
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(0.99 0 0);

  /* Borders & Inputs */
  --border: oklch(0.92 0.005 260);
  --input: oklch(0.92 0.005 260);
  --ring: oklch(0.55 0.18 260);

  /* Radii */
  --radius: 0.625rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1);

  /* Chart colors (for later phases) */
  --chart-1: oklch(0.55 0.18 260);
  --chart-2: oklch(0.65 0.15 180);
  --chart-3: oklch(0.60 0.12 320);
  --chart-4: oklch(0.70 0.15 80);
  --chart-5: oklch(0.55 0.20 20);
}

/* Bridge to Tailwind utilities */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-full: 9999px;

  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
}

/* Restore pointer cursor on buttons */
@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
  button:not(:disabled) {
    cursor: pointer;
  }
}
```

### Root Layout with Fonts and Metadata
```typescript
// app/layout.tsx
// Source: Next.js font docs + shadcn/ui patterns
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Omni Card - Earn Rewards on Tuition',
  description: 'Pay tuition with your credit card. Earn rewards on your biggest expense. Zero fees for schools.',
  keywords: ['tuition payments', 'student rewards', 'credit card rewards', 'college payments'],
  openGraph: {
    title: 'Omni Card - Earn Rewards on Tuition',
    description: 'Pay tuition with your credit card. Earn rewards on your biggest expense.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

### cn() Utility
```typescript
// lib/utils.ts
// Source: shadcn/ui standard pattern
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### PostCSS Configuration
```javascript
// postcss.config.mjs
// Source: Tailwind CSS v4 docs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```

### Verification Test Page
```typescript
// app/page.tsx
// Verify all foundation elements work
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      {/* Typography check */}
      <h1 className="text-4xl font-bold text-foreground">
        Omni Card Foundation
      </h1>
      <p className="text-muted-foreground">
        Design tokens and components are working.
      </p>

      {/* Color token check */}
      <div className="flex gap-4">
        <div className="size-16 rounded-lg bg-primary" title="Primary" />
        <div className="size-16 rounded-lg bg-secondary" title="Secondary" />
        <div className="size-16 rounded-lg bg-accent" title="Accent" />
        <div className="size-16 rounded-lg bg-muted" title="Muted" />
      </div>

      {/* Button variants check */}
      <div className="flex gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      {/* Shadow check */}
      <div className="flex gap-4">
        <div className="size-16 rounded-lg bg-card shadow-sm" />
        <div className="size-16 rounded-lg bg-card shadow-md" />
        <div className="size-16 rounded-lg bg-card shadow-lg" />
      </div>

      {/* Radius check */}
      <div className="flex gap-4">
        <div className="size-16 bg-primary rounded-sm" />
        <div className="size-16 bg-primary rounded-md" />
        <div className="size-16 bg-primary rounded-lg" />
        <div className="size-16 bg-primary rounded-xl" />
      </div>
    </main>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` | `@theme` in CSS | Tailwind v4 (Jan 2025) | No JS config file needed |
| HSL color format | OKLCH color format | Tailwind v4 / shadcn v4 | Better color uniformity, wider gamut |
| `tailwindcss-animate` | `tw-animate-css` | Tailwind v4 | Different import syntax |
| `framer-motion` package | `motion` package | Motion v12 | Import from `motion/react` |
| `React.forwardRef` | Function components | shadcn v4 | Simpler component patterns |
| `w-4 h-4` | `size-4` | Tailwind v3.4+ | Cleaner utility syntax |

**Deprecated/outdated:**
- `tailwind.config.js/ts`: Not needed for Tailwind v4, use CSS-first configuration
- `@layer components` for theme variables: Use `@theme inline` instead
- HSL in `:root` variables: OKLCH is now the default
- `npx shadcn-ui@latest`: Use `npx shadcn@latest` (package renamed)

## Open Questions

Things that couldn't be fully resolved:

1. **Exact font choices**
   - What we know: Inter is a safe default for body text
   - What's unclear: Whether to add a display font for headings
   - Recommendation: Start with Inter only, add display font in later polish phase if needed

2. **Exact color values for Omni brand**
   - What we know: OKLCH format is required, purple/blue hue (260) is fintech-appropriate
   - What's unclear: Final brand colors haven't been specified
   - Recommendation: Use provided values as starting point, can be tuned later (CSS variables make this easy)

3. **Turbopack + next/font interaction**
   - What we know: There was a reported bug with Google Fonts not bundling in Turbopack dev builds
   - What's unclear: Whether this is fixed in Next.js 15.5
   - Recommendation: Test during setup, fall back to `--webpack` flag if issues persist

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 @theme Documentation](https://tailwindcss.com/docs/theme) - Complete theming guide
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4) - Migration and setup
- [Next.js Installation Guide](https://nextjs.org/docs/app/getting-started/installation) - Project creation
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - next/font setup
- [shadcn/ui Button Component](https://ui.shadcn.com/docs/components/button) - Component reference

### Secondary (MEDIUM confidence)
- [Tailwind CSS v4.0 Release Blog](https://tailwindcss.com/blog/tailwindcss-v4) - Overview of changes
- [OKLCH Colors for Tailwind v4](https://kyrylo.org/css/2025/02/09/oklch-css-variables-for-tailwind-v4-colors.html) - Color format details
- [Mastering Tailwind CSS with tailwind-merge and clsx](https://dev.to/sheraz4194/mastering-tailwind-css-overcome-styling-conflicts-with-tailwind-merge-and-clsx-1dol) - cn() utility explanation

### Tertiary (LOW confidence)
- [Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) - Community guide (could not verify all details)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All versions verified via official sources, npm registry
- Architecture: HIGH - Patterns from official documentation and shadcn/ui source
- Design tokens: HIGH - @theme directive documented officially by Tailwind
- Pitfalls: MEDIUM - Based on community reports and version changelogs, some may be resolved

**Research date:** 2026-01-31
**Valid until:** ~60 days (stack is stable, Tailwind v4 and shadcn v4 are mature releases)
