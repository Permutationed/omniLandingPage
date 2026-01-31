# Phase 2: Layout Components - Research

**Researched:** 2026-01-31
**Domain:** Navigation, Footer, and Layout Components for Fintech Landing Page
**Confidence:** HIGH

## Summary

Phase 2 focuses on building the navigation and footer components that provide consistent page structure across all viewports. The key technical challenges are:

1. **Sticky navigation with hide/show on scroll** - Requires Motion's `useScroll` and `useMotionValueEvent` hooks
2. **Mobile hamburger menu with slide-out navigation** - Use shadcn Sheet component (built on Radix Dialog)
3. **Magnetic hover effect on CTA** - Custom component using Motion's spring physics and cursor tracking
4. **Smooth scroll to sections** - CSS `scroll-behavior: smooth` plus `scrollIntoView` for cross-browser support
5. **Footer with social icons** - Use `react-social-icons` library (not lucide-react, as social/brand icons are deprecated there)

The project already has Next.js 16.1.6, React 19.2.3, lucide-react, and Tailwind CSS v4 installed. Motion (framer-motion) needs to be installed for animations.

**Primary recommendation:** Install Motion library, use shadcn Sheet for mobile menu, implement scroll-direction detection hook, and create magnetic button wrapper component.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.6 | App Router, layouts | Installed |
| React | 19.2.3 | UI library | Installed |
| Tailwind CSS | 4.x | Utility styling | Installed |
| lucide-react | 0.563.0 | UI icons (hamburger, X, chevrons) | Installed |
| tw-animate-css | 1.4.0 | Simple CSS animations | Installed |

### Required Additions
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | ^12.0.0 | Animations, scroll detection, springs | Industry standard for React animations, useScroll/useMotionValueEvent for scroll-aware nav |
| react-social-icons | ^6.0.0 | Social media icons (Twitter/X, LinkedIn, etc.) | lucide-react deprecated brand icons; this library auto-detects from URL |

### shadcn Components Needed
| Component | Purpose | Installation |
|-----------|---------|--------------|
| Sheet | Mobile slide-out navigation | `npx shadcn@latest add sheet` |
| Navigation Menu | Desktop navigation (optional, may hand-roll simpler) | `npx shadcn@latest add navigation-menu` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-social-icons | Simple Icons + custom SVGs | More control but more work; react-social-icons is simpler |
| Motion useScroll | Custom scroll event listener | Motion handles edge cases, reduced motion, spring physics |
| shadcn Sheet | Custom portal + animation | Sheet is accessible out-of-box with Radix primitives |
| CSS scroll-behavior | JavaScript scroll library | CSS is simpler, but less control over easing |

**Installation:**
```bash
npm install motion react-social-icons
npx shadcn@latest add sheet
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── layout/
│   ├── header.tsx           # Server component shell
│   ├── header-nav.tsx       # Client component (scroll detection, mobile menu)
│   ├── mobile-nav.tsx       # Sheet-based mobile navigation
│   ├── footer.tsx           # Server component (mostly static)
│   └── footer-socials.tsx   # Client component (social icons)
├── ui/
│   ├── button.tsx           # Existing shadcn button
│   ├── sheet.tsx            # shadcn sheet (to be added)
│   ├── magnetic-button.tsx  # Magnetic hover wrapper
│   └── nav-link.tsx         # Scroll-linked navigation link
├── hooks/
│   └── use-scroll-direction.ts  # Scroll direction detection hook
└── lib/
    └── animation-variants.ts    # Shared Motion variants
```

### Pattern 1: Scroll Direction Detection Hook
**What:** Custom hook using Motion to detect scroll up/down
**When to use:** Auto-hiding navigation, scroll-linked animations
**Example:**
```typescript
// Source: Motion documentation + community patterns
'use client'

import { useScroll, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'

export function useScrollDirection() {
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isAtTop, setIsAtTop] = useState(true)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = current - previous

    setIsAtTop(current < 10)

    // Only update if scrolled more than threshold (prevents jitter)
    if (Math.abs(diff) > 10) {
      setScrollDirection(diff > 0 ? 'down' : 'up')
    }
  })

  return { scrollDirection, isAtTop, scrollY }
}
```

### Pattern 2: Magnetic Button Component
**What:** Button that pulls toward cursor on hover using spring physics
**When to use:** CTA buttons to increase engagement
**Example:**
```typescript
// Source: Olivier Larose tutorial verified pattern
'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react'

interface MagneticProps {
  children: React.ReactNode
  className?: string
}

export function Magnetic({ children, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 }) // 0.3 = pull strength
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 3: Auto-hiding Sticky Navigation
**What:** Navigation that hides on scroll down, shows on scroll up
**When to use:** Long pages where nav shouldn't consume space
**Example:**
```typescript
// Source: frontend.fyi tutorial pattern
'use client'

import { motion } from 'motion/react'
import { useScrollDirection } from '@/hooks/use-scroll-direction'

const navVariants = {
  visible: { y: '0%' },
  hidden: { y: '-100%' },
}

export function HeaderNav() {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const hidden = scrollDirection === 'down' && !isAtTop

  return (
    <motion.header
      variants={navVariants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      {/* Nav content */}
    </motion.header>
  )
}
```

### Pattern 4: Smooth Scroll Navigation Link
**What:** Anchor links that smooth scroll to sections
**When to use:** Single-page navigation within landing page
**Example:**
```typescript
// Source: MDN scrollIntoView + CSS scroll-behavior
'use client'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Update URL hash without jumping
      window.history.pushState(null, '', href)
    }
  }

  return (
    <a href={href} onClick={handleClick} className="nav-link">
      {children}
    </a>
  )
}
```

### Pattern 5: Mobile Sheet Navigation
**What:** Slide-out mobile menu using shadcn Sheet
**When to use:** Mobile breakpoints for hamburger menu
**Example:**
```typescript
// Source: shadcn/ui Sheet documentation
'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <nav className="flex flex-col gap-4">
          {/* Navigation links */}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

### Anti-Patterns to Avoid
- **Multiple scroll event listeners:** Use single Motion hook, share via context if needed
- **Client directive on entire header:** Keep outer header as Server Component, only interactive parts as Client
- **Hardcoded animation values:** Use CSS variables for timing, centralize in animation-variants.ts
- **Animating layout properties on nav hide:** Use transform (y) not height for GPU acceleration
- **Using lucide-react for social icons:** Brand icons are deprecated; use react-social-icons instead

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile slide-out menu | Custom portal + animation + focus trap | shadcn Sheet | Radix handles focus trap, escape key, click outside, accessibility |
| Scroll direction detection | window.addEventListener('scroll') | Motion useScroll + useMotionValueEvent | Handles edge cases, previous value tracking, no stale closure bugs |
| Spring physics for magnetic effect | Custom easing math | Motion spring transition | Battle-tested physics, customizable stiffness/damping |
| Social media icons | Custom SVGs or deprecated lucide icons | react-social-icons | Auto-detects network from URL, consistent styling, maintained |
| Reduced motion support | Manual media query checks | Motion reducedMotion or useReducedMotion | Built-in, respects OS settings, proper fallbacks |
| Navigation backdrop blur | Complex CSS stacking | Tailwind backdrop-blur-sm | Cross-browser, optimized |

**Key insight:** Animation physics (springs, scroll interpolation) are notoriously hard to get right. Motion has years of edge case handling. Don't reinvent.

## Common Pitfalls

### Pitfall 1: Stale Closure in Scroll Handler
**What goes wrong:** Scroll direction always reports "down" because useState closure captures stale value
**Why it happens:** Event listeners close over initial state value
**How to avoid:** Use Motion's `useMotionValueEvent` which properly tracks previous values via `getPrevious()`
**Warning signs:** Navigation never shows again after hiding

### Pitfall 2: Layout Shift on Nav Hide
**What goes wrong:** Content jumps when nav hides because it's removed from flow
**Why it happens:** Using `display: none` or `visibility: hidden` instead of transforms
**How to avoid:** Use `position: fixed` + `transform: translateY(-100%)` to hide
**Warning signs:** Page content shifts up/down as user scrolls

### Pitfall 3: Focus Trap Not Implemented in Mobile Menu
**What goes wrong:** User can tab to elements behind the open menu
**Why it happens:** Custom menu doesn't implement focus management
**How to avoid:** Use shadcn Sheet which includes Radix Dialog's focus trap
**Warning signs:** Tab navigation escapes the open menu overlay

### Pitfall 4: Smooth Scroll Affects Find-in-Page
**What goes wrong:** Browser's Cmd+F jumps slowly between matches
**Why it happens:** Global `scroll-behavior: smooth` on html element
**How to avoid:** Apply smooth scroll only to programmatic navigation via `scrollIntoView({ behavior: 'smooth' })`, not globally
**Warning signs:** User complaints about slow find-in-page

### Pitfall 5: Magnetic Effect Jitter on Fast Movement
**What goes wrong:** Button jumps erratically when cursor moves quickly
**Why it happens:** Spring physics too responsive (high stiffness, low damping)
**How to avoid:** Use moderate spring values: `stiffness: 150, damping: 15, mass: 0.1`
**Warning signs:** Button appears "nervous" on hover

### Pitfall 6: Social Icons Missing for Some Networks
**What goes wrong:** react-social-icons shows fallback for unknown URLs
**Why it happens:** URL pattern not recognized
**How to avoid:** Use standard URL patterns (e.g., `https://twitter.com/username` not `https://x.com/username`), or use network prop
**Warning signs:** Generic globe icon instead of brand icon

### Pitfall 7: Mobile Menu Doesn't Close on Link Click
**What goes wrong:** User clicks nav link, menu stays open
**Why it happens:** Sheet state not updated on navigation
**How to avoid:** Call `setOpen(false)` in link click handler
**Warning signs:** Menu blocks content after navigation

## Code Examples

Verified patterns from official sources:

### Header Component Structure
```typescript
// components/layout/header.tsx (Server Component)
import { HeaderNav } from './header-nav'

export function Header() {
  return <HeaderNav />
}
```

```typescript
// components/layout/header-nav.tsx (Client Component)
'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { MobileNav } from './mobile-nav'
import { Magnetic } from '@/components/ui/magnetic-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#calculator', label: 'Calculator' },
  { href: '#faq', label: 'FAQ' },
]

export function HeaderNav() {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const hidden = scrollDirection === 'down' && !isAtTop

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState(null, '', href)
  }

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.2 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors',
        isAtTop ? 'bg-transparent' : 'bg-background/80 backdrop-blur-sm border-b'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          Omni Card
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={scrollTo(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button with Magnetic Effect */}
        <div className="hidden md:block">
          <Magnetic>
            <Button>Join Waitlist</Button>
          </Magnetic>
        </div>

        {/* Mobile Menu */}
        <MobileNav items={navItems} />
      </div>
    </motion.header>
  )
}
```

### Footer Component Structure
```typescript
// components/layout/footer.tsx (Server Component)
import Link from 'next/link'
import { FooterSocials } from './footer-socials'

const footerLinks = {
  nav: [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '#faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="font-bold text-xl">
              Omni Card
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Earn rewards on your biggest expense. Pay tuition with your credit card.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Omni Card. All rights reserved.
          </p>
          <FooterSocials />
        </div>
      </div>
    </footer>
  )
}
```

### Footer Socials with react-social-icons
```typescript
// components/layout/footer-socials.tsx (Client Component)
'use client'

import { SocialIcon } from 'react-social-icons'

const socialLinks = [
  { url: 'https://twitter.com/omnicard', label: 'Twitter' },
  { url: 'https://linkedin.com/company/omnicard', label: 'LinkedIn' },
  { url: 'https://instagram.com/omnicard', label: 'Instagram' },
]

export function FooterSocials() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <SocialIcon
          key={social.url}
          url={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          style={{ width: 32, height: 32 }}
          bgColor="transparent"
          fgColor="currentColor"
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
      ))}
    </div>
  )
}
```

### Reduced Motion Support
```typescript
// app/layout.tsx - Add MotionConfig for reduced motion
import { MotionConfig } from 'motion/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  )
}
```

## Accessibility Requirements

### Navigation ARIA Pattern
```html
<!-- Hamburger button requirements -->
<button
  aria-label="Open navigation menu"
  aria-expanded="false"  <!-- Toggle to "true" when open -->
  aria-controls="mobile-nav"
>
  <Menu />
</button>

<!-- Mobile navigation container -->
<nav id="mobile-nav" aria-label="Mobile navigation">
  <!-- Links -->
</nav>
```

### Keyboard Navigation
- Tab through nav links
- Enter/Space to activate links
- Escape to close mobile menu
- Focus trap in open sheet (handled by Radix)

### Skip Link (Consider for Phase 2 or Later)
```html
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package | Mid-2024 | Import from `motion/react` not `framer-motion` |
| window scroll listeners | `useScroll` + `useMotionValueEvent` | Motion v10+ | Better performance, no stale closures |
| Custom mobile menu | shadcn Sheet (Radix Dialog) | 2023+ | Built-in accessibility, focus trap |
| Font Awesome social icons | react-social-icons | 2024+ | Smaller bundle, URL-based detection |
| Global scroll-behavior CSS | Per-action scrollIntoView | Always | Avoids find-in-page issues |
| lucide-react brand icons | Deprecated | 2025 | Use react-social-icons for brands |

**Deprecated/outdated:**
- `framer-motion` import path: Use `motion/react`
- lucide-react social icons: Deprecated, use react-social-icons
- window.addEventListener for scroll: Stale closure bugs, use Motion hooks

## Open Questions

Things that couldn't be fully resolved:

1. **Logo Asset**
   - What we know: Need logo for nav and footer
   - What's unclear: SVG or image? Text-only initially?
   - Recommendation: Start with text "Omni Card" in bold, swap for SVG when available

2. **Social Media URLs**
   - What we know: Need Twitter/X, LinkedIn, Instagram placeholders
   - What's unclear: Are these real accounts or just placeholder hrefs?
   - Recommendation: Use placeholder URLs that can be updated (e.g., `https://twitter.com/omnicard`)

3. **Legal Page Routes**
   - What we know: Need Privacy Policy and Terms of Service links
   - What's unclear: Are these separate pages or external links?
   - Recommendation: Use internal routes (`/privacy`, `/terms`) that can be built later or redirect

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Sheet Component](https://ui.shadcn.com/docs/components/sheet) - Installation and usage
- [Motion Documentation](https://motion.dev/) - useScroll, useMotionValueEvent, springs
- [MDN scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) - Smooth scroll API
- [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) - CSS smooth scroll

### Secondary (MEDIUM confidence)
- [Olivier Larose Magnetic Button Tutorial](https://blog.olivierlarose.com/tutorials/magnetic-button) - Magnetic effect implementation
- [Frontend.fyi Auto-hiding Navigation](https://www.frontend.fyi/tutorials/making-a-disappearing-sticky-navigation) - Scroll direction pattern
- [Josh Comeau useReducedMotion](https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/) - Accessibility pattern

### Tertiary (LOW confidence)
- [react-social-icons npm](https://www.npmjs.com/package/react-social-icons) - Social icon library
- [Next.js 16 Scroll Behavior](https://nextjs.org/docs/app/guides/upgrading/version-16) - Next.js 16 changes

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified via npm, official docs
- Architecture patterns: HIGH - Common patterns verified across multiple sources
- Animation implementation: HIGH - Motion documentation is authoritative
- Accessibility: HIGH - MDN and Radix documentation
- Social icons library: MEDIUM - Library works but limited documentation

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (Motion and shadcn are stable)
