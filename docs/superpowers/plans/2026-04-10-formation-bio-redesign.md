# Astraea Formation Bio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Astraea landing page to match Formation Bio's exact design system with a 3-panel scroll-snap hero and SVG border-trace pipeline stacking animation.

**Architecture:** Replace dark enterprise theme with Formation Bio's warm cream (#FAF4EE) editorial design. Serif headings (Source Serif 4), sans body (Inter), dark buttons (#1F1F1F), 1px borders, no shadows. Hero uses scroll-snap with 3 animated panels. Pipeline section uses scroll-driven SVG stroke-dashoffset animation for border-trace progression (yellow for Review, green for Approved).

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Motion (Framer Motion), SVG animations, Google Fonts (Source Serif 4, Inter)

**Design Token Reference (from Formation Bio):**
| Token | Value |
|-------|-------|
| Background | `#FAF4EE` |
| Foreground/Text | `#1F1F1F` |
| Accent | `#ABAAFE` |
| Border trace yellow | `#D4A017` |
| Border trace green | `#2E8B57` |
| Heading font | Source Serif 4, serif (weight 600) |
| Body font | Inter, sans-serif (weight 400, 500, 700) |
| Button | #1F1F1F bg, #FAF4EE text, 5px radius, 40px height |
| Border | 1px solid #1F1F1F |
| Header | sticky, 60px, 1px solid bottom border |
| Section padding | 60px vertical |
| Border radius | 5px (buttons only) |

**Pipeline Border-Trace Spec:**
- Active block: 2.5px stroke, animates black -> yellow (#D4A017) -> green (#2E8B57)
- Completed blocks: 1px stroke, same green (#2E8B57), NOT muted, same text contrast
- Double border fix: margin-top: -1px on stacked blocks to collapse shared borders
- Trace direction: counterclockwise from center-top
- SVG path: `M 140 1 L 1 1 L 1 55 L 279 55 L 279 1 Z` (for 280x56 block)
- Uses pathLength="1", stroke-dasharray="1", scroll drives stroke-dashoffset from 1 to 0

---

## Chunk 1: Foundation — Design System + Cleanup

### Task 1: Rewrite Design Tokens in globals.css

**Files:**
- Modify: `app/globals.css` (complete rewrite of `:root` and `@theme inline` blocks)

- [ ] **Step 1: Rewrite globals.css**

Replace the entire file with Formation Bio design tokens. Key changes: all color values, font references, remove shadows, update grid pattern for light bg.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: #FAF4EE;
  --foreground: #1F1F1F;
  --card: #ffffff;
  --card-foreground: #1F1F1F;
  --popover: #ffffff;
  --popover-foreground: #1F1F1F;

  --primary: #1F1F1F;
  --primary-foreground: #FAF4EE;

  --secondary: #f0ebe5;
  --secondary-foreground: #1F1F1F;

  --muted: #f0ebe5;
  --muted-foreground: #888888;

  --accent: #ABAAFE;
  --accent-foreground: #1F1F1F;

  --destructive: #c44;
  --destructive-foreground: #ffffff;

  --border: #1F1F1F;
  --input: #1F1F1F;
  --ring: #1F1F1F;

  --radius: 5px;

  --pipeline-yellow: #D4A017;
  --pipeline-green: #2E8B57;

  --chart-1: #1F1F1F;
  --chart-2: #ABAAFE;
  --chart-3: #D4A017;
  --chart-4: #2E8B57;
  --chart-5: #c44;
}

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

  --color-pipeline-yellow: var(--pipeline-yellow);
  --color-pipeline-green: var(--pipeline-green);

  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 3px);
  --radius-xl: calc(var(--radius) + 5px);
  --radius-full: 9999px;

  --font-sans: var(--font-inter), -apple-system, ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-source-serif-4), Georgia, serif;
  --font-display: var(--font-source-serif-4), Georgia, serif;

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #c4bdb6;
  border-radius: 9999px;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  button:not(:disabled) {
    cursor: pointer;
  }
}

.container {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (CSS compiles without errors)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: replace dark theme with Formation Bio design tokens"
```

---

### Task 2: Switch Fonts in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite layout.tsx**

Switch from DM Sans to Source Serif 4 + Inter. Import HeaderNav. Update metadata. Remove Material Icons link.

```tsx
import type { Metadata } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { HeaderNav } from '@/components/layout/header-nav'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-4',
  display: 'swap',
  weight: ['400', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Astraea - Autonomous Clinical Trial Automation',
  description: 'Astraea accelerates the full trial lifecycle from protocol design to FDA submission using compliant, enterprise-grade AI designed for modern healthcare.',
  keywords: ['clinical trials', 'Phase II', 'Phase III', 'AI automation', 'pharma', 'CRO', 'clinical research', 'regulatory submission'],
  openGraph: {
    title: 'Astraea - Autonomous Clinical Trial Automation',
    description: 'AI automation for clinical trials. Built for regulated environments.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceSerif4.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <HeaderNav />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: switch to Source Serif 4 + Inter fonts, add header nav"
```

---

### Task 3: Remove Scene3D from Providers

**Files:**
- Modify: `components/providers.tsx`

- [ ] **Step 1: Rewrite providers.tsx**

```tsx
'use client'

import { MotionConfig } from 'motion/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/providers.tsx
git commit -m "feat: remove Scene3D provider, keep MotionConfig only"
```

---

### Task 4: Remove Three.js Config and Packages

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json` (via npm uninstall)

- [ ] **Step 1: Clear next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 2: Uninstall Three.js packages**

Run: `npm uninstall @react-three/drei @react-three/fiber three maath`

- [ ] **Step 3: Commit**

```bash
git add next.config.ts package.json package-lock.json
git commit -m "feat: remove Three.js dependencies and config"
```

---

### Task 5: Delete Dead Code

**Files:**
- Delete: `components/three/` (entire directory)
- Delete: `components/hero/hero-card-3d.tsx`
- Delete: `components/calculator/` (entire directory)
- Delete: `components/how-you-earn/` (entire directory)
- Delete: `components/faq/` (entire directory)
- Delete: `components/security/` (entire directory)
- Delete: `components/content-sections/architecture-section.tsx`
- Delete: `components/content-sections/audience-tabs/` (entire directory)
- Delete: `components/content-sections/discovery-preview/` (entire directory)
- Delete: `components/content-sections/feature-grid/` (entire directory)
- Delete: `components/content-sections/future-vision-section.tsx`
- Delete: `components/content-sections/problem-section.tsx`
- Delete: `components/content-sections/productivity-section.tsx`
- Delete: `components/content-sections/security-section.tsx`
- Delete: `components/content-sections/solution-section.tsx`
- Delete: `components/content-sections/trust-strip.tsx`
- Delete: `components/content-sections/index.ts`
- Delete: `components/hero/hero-content.tsx`
- Delete: `components/hero/metric-cards.tsx`
- Delete: `components/layout/footer-socials.tsx`
- Delete: `components/layout/mobile-nav.tsx`
- Delete: `components/layout/header.tsx`
- Delete: `components/ui/magnetic-button.tsx`
- Delete: `public/hero-video.mp4`
- Delete: `public/hero-video-original.mp4`
- Delete: `public/hero-earth.mp4`
- Delete: `public/card-face.png`

- [ ] **Step 1: Delete legacy component directories**

```bash
rm -rf components/three components/calculator components/how-you-earn components/faq components/security
rm -rf components/content-sections/audience-tabs components/content-sections/discovery-preview components/content-sections/feature-grid
```

- [ ] **Step 2: Delete individual legacy files**

```bash
rm -f components/hero/hero-card-3d.tsx components/hero/hero-content.tsx components/hero/metric-cards.tsx
rm -f components/content-sections/architecture-section.tsx components/content-sections/future-vision-section.tsx
rm -f components/content-sections/problem-section.tsx components/content-sections/productivity-section.tsx
rm -f components/content-sections/security-section.tsx components/content-sections/solution-section.tsx
rm -f components/content-sections/trust-strip.tsx components/content-sections/index.ts
rm -f components/layout/footer-socials.tsx components/layout/mobile-nav.tsx components/layout/header.tsx
rm -f components/ui/magnetic-button.tsx
```

- [ ] **Step 3: Delete video/image assets**

```bash
rm -f public/hero-video.mp4 public/hero-video-original.mp4 public/hero-earth.mp4 public/card-face.png
```

- [ ] **Step 4: Verify build still works**

Run: `npm run build`
Expected: Build succeeds (no broken imports)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Three.js, legacy Omni components, and video assets (~80MB)"
```

---

## Chunk 2: Header & Footer

### Task 6: Rewrite Header Nav

**Files:**
- Modify: `components/layout/header-nav.tsx`

- [ ] **Step 1: Rewrite header-nav.tsx**

Formation Bio style: sticky, 60px, cream bg, 1px solid dark bottom border. Text logo "Astraea" (sans, 18px, bold). Nav links: Platform, Technology, Pipeline. No CTA button.

```tsx
'use client'

import Link from 'next/link'

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground" style={{ height: '60px' }}>
      <div className="max-w-[1140px] mx-auto px-5 h-full flex justify-between items-center">
        <Link href="/" className="font-sans text-lg font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
          Astraea
        </Link>
        <nav>
          <ul className="flex gap-7">
            <li><Link href="#platform" className="text-foreground text-base font-normal hover:opacity-70 transition-opacity">Platform</Link></li>
            <li><Link href="#technology" className="text-foreground text-base font-normal hover:opacity-70 transition-opacity">Technology</Link></li>
            <li><Link href="#pipeline" className="text-foreground text-base font-normal hover:opacity-70 transition-opacity">Pipeline</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/header-nav.tsx
git commit -m "feat: Formation Bio header — sticky, 60px, dark border, text nav"
```

---

### Task 7: Rewrite Footer

**Files:**
- Modify: `components/layout/footer.tsx`

- [ ] **Step 1: Rewrite footer.tsx**

Formation Bio style: 1px top border, 4-column grid, small uppercase category headings, copyright below.

```tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-foreground">
      <div className="max-w-[1140px] mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="font-sans text-lg font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
            Astraea
          </Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Company</h5>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">About Us</Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Platform</h5>
          <Link href="#technology" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Technology</Link>
          <Link href="#pipeline" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Pipeline</Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Policies</h5>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Privacy Policy</Link>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Terms of Service</Link>
        </div>
      </div>
      <div className="max-w-[1140px] mx-auto px-5 pb-10 text-xs text-muted-foreground">
        &copy; Astraea Inc. {new Date().getFullYear()}
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/footer.tsx
git commit -m "feat: Formation Bio footer — 4-col grid, uppercase headings, dark border"
```

---

## Chunk 3: Hero Section — 3-Panel Scroll Snap

### Task 8: Rewrite Hero Section

**Files:**
- Modify: `components/hero/hero-section.tsx` (complete rewrite)

- [ ] **Step 1: Rewrite hero-section.tsx**

Three scroll-snap panels: (1) centered "Astraea" title, (2) 3-column Formation Bio grid with pillar cards, (3) CTA with email capture. Uses wheel-snap approach from current code but with new content.

```tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { EmailCapture } from '@/components/hero/email-capture'

const SNAP_POINTS = [0, 0.5, 1.0]
const SWOOP = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isAnimatingRef = useRef(false)
  const wheelAccumRef = useRef(0)
  const [currentSnap, setCurrentSnap] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scroll snapping via wheel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const WHEEL_THRESHOLD = 80
    let cooldownTimer: ReturnType<typeof setTimeout>

    const scrollToSnap = (index: number) => {
      const rect = container.getBoundingClientRect()
      const containerTop = window.scrollY + rect.top
      const totalScroll = container.offsetHeight - window.innerHeight
      const target = containerTop + SNAP_POINTS[index] * totalScroll

      isAnimatingRef.current = true
      setCurrentSnap(index)
      wheelAccumRef.current = 0

      window.scrollTo({ top: target, behavior: 'smooth' })

      clearTimeout(cooldownTimer)
      cooldownTimer = setTimeout(() => {
        isAnimatingRef.current = false
      }, 900)
    }

    const handleWheel = (e: WheelEvent) => {
      const progress = scrollYProgress.get()

      if (progress <= 0.001 && e.deltaY < 0) return
      if (progress >= 0.999 && e.deltaY > 0) return
      if (progress < -0.01 || progress > 1.01) return

      e.preventDefault()

      if (isAnimatingRef.current) return

      wheelAccumRef.current += e.deltaY

      if (Math.abs(wheelAccumRef.current) >= WHEEL_THRESHOLD) {
        const direction = wheelAccumRef.current > 0 ? 1 : -1

        let nearestSnap = 0
        let minDist = Infinity
        for (let i = 0; i < SNAP_POINTS.length; i++) {
          const dist = Math.abs(progress - SNAP_POINTS[i])
          if (dist < minDist) {
            minDist = dist
            nearestSnap = i
          }
        }

        const nextSnap = nearestSnap + direction
        if (nextSnap >= 0 && nextSnap < SNAP_POINTS.length) {
          scrollToSnap(nextSnap)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(cooldownTimer)
    }
  }, [scrollYProgress])

  // Panel 1: Astraea title
  const p1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0])
  const p1Y = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, -80])

  // Panel 2: Hero detail grid
  const p2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0])
  const p2Y = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [40, 0, 0, -80])

  // Panel 3: CTA
  const p3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1.0], [0, 1, 1])
  const p3Y = useTransform(scrollYProgress, [0.75, 0.85], [40, 0])
  const p3Scale = useTransform(scrollYProgress, [0.75, 0.85], [0.96, 1])

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-[60px] overflow-hidden flex items-center justify-center" style={{ height: 'calc(100vh - 60px)' }}>

        {/* Panel 1: Title */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: p1Opacity, y: p1Y }}
        >
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-[72px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Astraea
          </h1>
          <p className="text-base text-muted-foreground max-w-[400px]">
            Autonomous clinical trial automation for modern healthcare.
          </p>
        </motion.div>

        {/* Panel 2: Hero Detail Grid */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-5"
          style={{ opacity: p2Opacity, y: p2Y }}
        >
          <div className="max-w-[1140px] w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-5">
            {/* Left: Text */}
            <div className="pt-5">
              <h2 className="font-serif text-[32px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Ship clinical trials faster with autonomous automation.
              </h2>
              <p className="text-sm text-foreground leading-relaxed">
                Astraea accelerates the full trial lifecycle from protocol design to FDA
                submission using compliant, enterprise-grade AI designed for modern healthcare.
              </p>
            </div>

            {/* Center: Image placeholder */}
            <div className="min-h-[400px] lg:min-h-[500px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8e0d8 0%, #d5cdc5 100%)' }}>
              <span className="text-xs text-muted-foreground">[Clinical / pharma hero image]</span>
            </div>

            {/* Right: Pillar Cards */}
            <div className="flex flex-col gap-10 pt-5 pb-10">
              {[
                { title: 'Platform', desc: 'AI-native trial automation built for regulated environments.', href: '#platform', label: 'Our Platform' },
                { title: 'Technology', desc: 'Proprietary engine from protocol design through FDA submission.', href: '#technology', label: 'Our Technology' },
                { title: 'Pipeline', desc: 'End-to-end execution across Phase II and III clinical programs.', href: '#pipeline', label: 'Our Pipeline' },
              ].map((card) => (
                <div key={card.title} className="flex flex-col gap-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground" style={{ lineHeight: 1.2 }}>
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-snug">
                    {card.desc}
                  </p>
                  <Link
                    href={card.href}
                    className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-[34px] px-[13px] self-start"
                    style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
                  >
                    {card.label}
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Panel 3: CTA */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: p3Opacity, y: p3Y, scale: p3Scale }}
        >
          <h2 className="font-serif text-[38px] font-semibold text-foreground mb-3 max-w-[500px]" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            Ready to ship your trials faster?
          </h2>
          <p className="text-[15px] text-muted-foreground mb-7">
            Request a technical demo.
          </p>
          <EmailCapture />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it renders**

Run: `npm run dev`
Navigate to localhost:3000, verify 3-panel scroll snap works.

- [ ] **Step 3: Commit**

```bash
git add components/hero/hero-section.tsx
git commit -m "feat: 3-panel scroll-snap hero with Formation Bio grid layout"
```

---

### Task 9: Restyle Email Capture

**Files:**
- Modify: `components/hero/email-capture.tsx`

- [ ] **Step 1: Rewrite email-capture.tsx**

Formation Bio style: transparent bg input, 1px dark border, 5px radius. Dark button.

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

type ValidationState = 'idle' | 'invalid' | 'valid'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [validation, setValidation] = useState<ValidationState>('idle')

  const validateEmail = (value: string) => {
    if (!value) return 'idle' as const
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'valid' as const : 'invalid' as const
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const state = validateEmail(email)
    setValidation(state)
    if (state === 'valid') {
      console.log('Email submitted:', email)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setValidation('idle') }}
        onBlur={() => email && setValidation(validateEmail(email))}
        placeholder="Enter your email"
        className="h-10 px-[14px] bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-sans w-[260px] outline-none focus:ring-1 focus:ring-foreground"
        style={{
          border: `1px solid ${validation === 'invalid' ? '#c44' : 'var(--foreground)'}`,
          borderRadius: '5px',
        }}
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-sm font-normal h-10 px-5 whitespace-nowrap"
        style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
      >
        Request Demo
        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero/email-capture.tsx
git commit -m "feat: Formation Bio email capture — dark border, cream bg, 5px radius"
```

---

## Chunk 4: Content Sections

### Task 10: Rewrite Dashboard Mockup

**Files:**
- Modify: `components/content-sections/dashboard-mockup.tsx`

- [ ] **Step 1: Rewrite dashboard-mockup.tsx**

Editorial fifty-fifty layout. White card with 1px border, dark progress fill, step badges with 1px borders.

```tsx
'use client'

import { motion } from 'motion/react'

const STEPS = [
  { name: 'Protocol', done: true },
  { name: 'Site Select', done: true },
  { name: 'Recruitment', done: true },
  { name: 'Screening', done: false, active: true, pct: '78%' },
  { name: 'Treatment', done: false },
  { name: 'Data Lock', done: false },
  { name: 'Analysis', done: false },
]

export function DashboardMockup() {
  return (
    <section className="py-[60px]" style={{ background: '#fafafa' }}>
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-[38px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Real-time trial orchestration.
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              Track every phase of your trial from a single interface. Protocol, site selection,
              recruitment, screening, treatment, data lock, and analysis -- all visible, all automated.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="bg-white border border-foreground overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#e0dbd5' }}>
                <span className="w-[8px] h-[8px] rounded-full bg-[#ef4444]" />
                <span className="w-[8px] h-[8px] rounded-full bg-[#f59e0b]" />
                <span className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-xs text-muted-foreground ml-2">Astraea Trial Dashboard</span>
                <span className="ml-auto flex items-center gap-[4px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#22c55e]" />
                  <span className="text-[11px] text-muted-foreground">Live</span>
                </span>
              </div>

              {/* Dashboard body */}
              <div className="p-5">
                {/* Progress bar */}
                <div className="h-[6px] rounded-[3px] mb-5 overflow-hidden" style={{ background: '#e8e0d8' }}>
                  <div className="h-full rounded-[3px] bg-foreground" style={{ width: '60%' }} />
                </div>

                {/* Steps */}
                <div className="flex gap-[6px] flex-wrap">
                  {STEPS.map((step) => (
                    <span
                      key={step.name}
                      className="px-3 py-[5px] text-xs font-medium"
                      style={{
                        border: '1px solid',
                        borderColor: step.done ? '#c8c8c8' : step.active ? 'var(--foreground)' : '#ddd',
                        color: step.done ? '#666' : step.active ? 'var(--foreground)' : '#aaa',
                        background: step.active ? 'rgba(31,31,31,0.05)' : 'transparent',
                      }}
                    >
                      {step.name}{step.pct ? ` ${step.pct}` : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/content-sections/dashboard-mockup.tsx
git commit -m "feat: editorial dashboard mockup — white card, dark border, step badges"
```

---

### Task 11: Rewrite Problem/Solution as Disciplines Section

**Files:**
- Modify: `components/content-sections/problem-solution-strip.tsx`

- [ ] **Step 1: Rewrite problem-solution-strip.tsx**

Formation Bio fifty-fifty layout with discipline items separated by 1px top borders.

```tsx
'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export function ProblemSolutionStrip() {
  return (
    <section className="py-[60px]">
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-[38px] font-semibold text-foreground" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Built for the regulated complexity of modern clinical research.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="text-base text-foreground leading-relaxed mb-8">
              Our platform brings together expertise across three critical disciplines:
            </p>
            <div className="flex gap-0">
              {['Protocol Design', 'Patient Recruitment', 'Data Automation'].map((name) => (
                <div key={name} className="flex-1 pt-5 pr-5 border-t border-foreground">
                  <h4 className="font-serif text-lg font-semibold text-foreground">{name}</h4>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="#request-demo"
                className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
                style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
              >
                Request Demo
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/content-sections/problem-solution-strip.tsx
git commit -m "feat: disciplines section — fifty-fifty, top-border items, dark CTA"
```

---

### Task 12: Rewrite CTA Section

**Files:**
- Modify: `components/content-sections/cta-section.tsx`

- [ ] **Step 1: Rewrite cta-section.tsx**

Formation Bio "Partner With Us" pattern: uppercase label, serif heading, dark button, 2-column with accent mark.

```tsx
'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section id="request-demo" className="py-20 border-t border-foreground">
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-4">
              Partner With Us
            </p>
            <h2 className="font-serif text-[38px] font-semibold text-foreground mb-6" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Ready to ship your clinical trials faster? Let&apos;s accelerate together.
            </h2>
            <Link
              href="mailto:josh29@stanford.edu"
              className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
              style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
            >
              Request Demo
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>

          <motion.div
            className="flex justify-end items-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="w-[200px] h-[200px] bg-accent opacity-40" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/content-sections/cta-section.tsx
git commit -m "feat: Formation Bio partner CTA — uppercase label, serif heading, accent mark"
```

---

## Chunk 5: Pipeline Stacking Animation

### Task 13: Create Pipeline Block SVG Component

**Files:**
- Create: `components/content-sections/pipeline-block.tsx`

- [ ] **Step 1: Create pipeline-block.tsx**

SVG border-trace component. Uses a `<path>` tracing the rect perimeter counterclockwise from center-top. Two layers: yellow trace then green trace. Active block gets 2.5px stroke, completed blocks get 1px stroke with same green (#2E8B57). Uses `margin-top: -1px` to collapse double borders between stacked blocks.

```tsx
'use client'

import { motion, MotionValue, useTransform } from 'motion/react'

// Path traces 280x56 rect counterclockwise from center-top
// Center-top (140,1) -> left to (1,1) -> down to (1,55) -> right to (279,55) -> up to (279,1) -> back to (140,1)
const TRACE_PATH = 'M 140 1 L 1 1 L 1 55 L 279 55 L 279 1 L 140 1'

interface PipelineBlockProps {
  name: string
  isActive: boolean
  isCompleted: boolean
  isFirst: boolean
  /** 0-1 scroll progress within this step */
  progress?: MotionValue<number>
}

export function PipelineBlock({ name, isActive, isCompleted, isFirst, progress }: PipelineBlockProps) {
  // Yellow trace: covers 0-50% of progress
  const yellowOffset = useTransform(progress ?? new MotionValue(), [0, 0.5], [1, 0])
  // Green trace: covers 50-100% of progress
  const greenOffset = useTransform(progress ?? new MotionValue(), [0.5, 1.0], [1, 0])
  // Status text
  const statusText = useTransform(progress ?? new MotionValue(), (p: number) => {
    if (p < 0.33) return 'Pending'
    if (p < 0.66) return 'In Review'
    return 'Approved'
  })
  const statusColor = useTransform(progress ?? new MotionValue(), (p: number) => {
    if (p < 0.33) return '#999'
    if (p < 0.66) return '#D4A017'
    return '#2E8B57'
  })

  if (isCompleted) {
    return (
      <div
        className="relative w-full"
        style={{
          height: '56px',
          marginTop: isFirst ? 0 : '-1px',
        }}
      >
        <svg
          viewBox="0 0 280 56"
          fill="none"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <rect x="1" y="1" width="278" height="54" stroke="#2E8B57" strokeWidth="1" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-4 z-[2]">
          <span className="text-[11px] font-semibold tracking-[0.04em] text-foreground">{name}</span>
          <span
            className="text-[10px] font-medium px-[6px] py-[2px]"
            style={{ border: '1px solid #2E8B57', color: '#2E8B57', borderRadius: '2px' }}
          >
            Approved
          </span>
        </div>
      </div>
    )
  }

  if (isActive && progress) {
    return (
      <div
        className="relative w-full"
        style={{
          height: '56px',
          marginTop: isFirst ? 0 : '-1px',
        }}
      >
        <svg
          viewBox="0 0 280 56"
          fill="none"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Base faint border */}
          <rect x="1" y="1" width="278" height="54" stroke="#ddd" strokeWidth="1" fill="white" />
          {/* Yellow trace layer */}
          <motion.path
            d={TRACE_PATH}
            stroke="#D4A017"
            strokeWidth="2.5"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: yellowOffset }}
          />
          {/* Green trace layer */}
          <motion.path
            d={TRACE_PATH}
            stroke="#2E8B57"
            strokeWidth="2.5"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: greenOffset }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-4 z-[2]">
          <span className="text-[11px] font-semibold tracking-[0.04em] text-foreground">{name}</span>
          <motion.span
            className="text-[10px] font-medium px-[6px] py-[2px]"
            style={{
              border: '1px solid',
              borderColor: statusColor,
              color: statusColor,
              borderRadius: '2px',
            }}
          >
            {statusText}
          </motion.span>
        </div>
      </div>
    )
  }

  // Pending (not yet animated)
  return (
    <div
      className="relative w-full"
      style={{
        height: '56px',
        marginTop: isFirst ? 0 : '-1px',
      }}
    >
      <svg
        viewBox="0 0 280 56"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <rect x="1" y="1" width="278" height="54" stroke="#1F1F1F" strokeWidth="1.5" fill="white" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-between px-4 z-[2]">
        <span className="text-[11px] font-semibold tracking-[0.04em] text-foreground">{name}</span>
        <span
          className="text-[10px] font-medium px-[6px] py-[2px]"
          style={{ border: '1px solid #bbb', color: '#999', borderRadius: '2px' }}
        >
          Pending
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/content-sections/pipeline-block.tsx
git commit -m "feat: SVG pipeline block with border-trace animation component"
```

---

### Task 14: Rewrite Astraea Section with Pipeline Stacking

**Files:**
- Modify: `components/content-sections/astraea-section.tsx`

- [ ] **Step 1: Rewrite astraea-section.tsx**

Scroll-driven pipeline stacking with SVG border-trace. Each of 5 steps occupies a portion of the scroll. Left text crossfades between steps. Right side shows blocks stacking with animated borders.

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { PipelineBlock } from './pipeline-block'
import Link from 'next/link'

const PIPELINE_STEPS = [
  {
    name: 'RAW INGESTION',
    title: 'Raw Ingestion',
    desc: 'Clinical data enters the pipeline from disparate sources. The ingestion layer normalizes formats and validates integrity before downstream processing.',
  },
  {
    name: 'CDASH MAPPING',
    title: 'CDASH Mapping',
    desc: 'Raw clinical data is mapped to CDISC CDASH standards. AI-verified completeness checks eliminate weeks of manual annotation.',
  },
  {
    name: 'SDTM GENERATION',
    title: 'SDTM Generation',
    desc: 'CDASH data is transformed into SDTM submission-ready datasets. Define.xml, reviewer guides, and validation reports generated with full traceability.',
  },
  {
    name: 'ADaM TRANSFORMATION',
    title: 'ADaM Transformation',
    desc: 'SDTM datasets transformed into analysis-ready ADaM datasets. Derivation logic, population flags, and BDS/ADSL generation with automated QC.',
  },
  {
    name: 'TLF PRODUCTION',
    title: 'TLF Production',
    desc: 'Analysis datasets feed into automated Tables, Listings, and Figures generation. Submission-ready TLFs with version control and audit trails.',
  },
]

export function AstraeaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Each step occupies 1/5 of the scroll. Within each step:
  // 0-30%: block slides up (entrance)
  // 30-100%: border trace animates (progress)
  const stepProgress = PIPELINE_STEPS.map((_, i) => {
    const stepStart = i / 5
    const stepEnd = (i + 1) / 5
    const traceStart = stepStart + (stepEnd - stepStart) * 0.3
    return {
      // Block visibility: appears at stepStart, stays visible
      blockOpacity: useTransform(scrollYProgress, [stepStart, stepStart + 0.02], [0, 1]),
      blockY: useTransform(scrollYProgress, [stepStart, stepStart + 0.06], [60, 0]),
      // Border trace progress (0-1 within this step)
      traceProgress: useTransform(scrollYProgress, [traceStart, stepEnd], [0, 1]),
      // Text opacity for this step
      textOpacity: useTransform(
        scrollYProgress,
        [
          Math.max(0, stepStart - 0.02),
          stepStart + 0.04,
          stepEnd - 0.04,
          Math.min(1, stepEnd + 0.02),
        ],
        i === 4 ? [0, 1, 1, 1] : [0, 1, 1, 0]
      ),
    }
  })

  // Determine which step is "active" and which are "completed"
  // based on scroll progress (this is computed via the motion values above)

  return (
    <section id="pipeline" ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-[60px] overflow-hidden" style={{ height: 'calc(100vh - 60px)' }}>
        <div className="max-w-[1140px] mx-auto px-5 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] w-full items-start">

            {/* Left: Step text (crossfading) */}
            <div className="relative min-h-[300px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-4">
                Execution Pipeline v4.0
              </p>
              {PIPELINE_STEPS.map((step, i) => (
                <motion.div
                  key={step.name}
                  className="absolute top-8"
                  style={{ opacity: stepProgress[i].textOpacity }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">
                    Step {i + 1} of 5
                  </p>
                  <h2 className="font-serif text-[32px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h2>
                  <p className="text-[15px] text-foreground leading-relaxed max-w-[400px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}

              {/* Features list + CTA (static, visible when scrolled past pipeline) */}
              <div className="absolute bottom-0 left-0">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {['Data refinement', 'Standards generation', 'Statistical execution', 'Cross-track validation', 'Report automation', 'Full traceability'].map((feat) => (
                    <li key={feat} className="text-sm text-foreground py-1 border-b" style={{ borderColor: '#e0dbd5' }}>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#request-demo"
                  className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
                  style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
                >
                  Request Demo
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right: Stacking blocks */}
            <div className="flex flex-col justify-end items-center min-h-[400px]">
              <p className="self-start text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-6">
                Execution Pipeline v4.0
              </p>
              <div className="flex flex-col-reverse w-[280px]">
                {PIPELINE_STEPS.map((step, i) => {
                  // Determine state based on scroll-driven values
                  // We use the traceProgress: if > 0.95, it's completed
                  // The "active" one is the one currently being traced
                  return (
                    <motion.div
                      key={step.name}
                      style={{
                        opacity: stepProgress[i].blockOpacity,
                        y: stepProgress[i].blockY,
                      }}
                    >
                      <PipelineBlockWrapper
                        name={step.name}
                        index={i}
                        traceProgress={stepProgress[i].traceProgress}
                        scrollProgress={scrollYProgress}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Wrapper to determine active/completed state from scroll progress */
function PipelineBlockWrapper({
  name,
  index,
  traceProgress,
  scrollProgress,
}: {
  name: string
  index: number
  traceProgress: ReturnType<typeof useTransform>
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  // A step is "completed" when scroll has passed its end boundary
  const stepEnd = (index + 1) / 5
  const isCompleted = useTransform(scrollProgress, (p: number) => p > stepEnd + 0.01)
  // A step is "active" when scroll is within its range
  const stepStart = index / 5
  const isActive = useTransform(scrollProgress, (p: number) => p >= stepStart && p <= stepEnd + 0.01)

  return (
    <motion.div>
      <PipelineBlockDynamic
        name={name}
        isFirst={index === 0}
        traceProgress={traceProgress}
        isCompleted={isCompleted}
        isActive={isActive}
      />
    </motion.div>
  )
}

/** Reads motion values to render the right block state */
function PipelineBlockDynamic({
  name,
  isFirst,
  traceProgress,
  isCompleted,
  isActive,
}: {
  name: string
  isFirst: boolean
  traceProgress: ReturnType<typeof useTransform>
  isCompleted: MotionValue<boolean>
  isActive: MotionValue<boolean>
}) {
  // We always render the active variant and let the PipelineBlock component
  // use the motion values directly for the SVG animation
  return (
    <PipelineBlock
      name={name}
      isActive={true}
      isCompleted={false}
      isFirst={isFirst}
      progress={traceProgress}
    />
  )
}
```

**Note:** This initial implementation renders all blocks with the active trace animation driven by scroll. The `PipelineBlock` component handles the visual states internally via the progress motion value. A refinement pass (Task 15) will properly toggle between active/completed rendering.

- [ ] **Step 2: Verify scroll-driven pipeline works**

Run: `npm run dev`
Navigate to the pipeline section, scroll and verify blocks appear and border traces animate.

- [ ] **Step 3: Commit**

```bash
git add components/content-sections/astraea-section.tsx
git commit -m "feat: scroll-driven pipeline stacking with SVG border-trace animation"
```

---

### Task 15: Refine Pipeline Block State Management

**Files:**
- Modify: `components/content-sections/astraea-section.tsx`
- Modify: `components/content-sections/pipeline-block.tsx`

- [ ] **Step 1: Update PipelineBlock to accept scroll-driven completed state**

In `pipeline-block.tsx`, update the component to accept a `completionProgress` motion value. When the trace progress reaches 1.0, the block should transition from 2.5px active stroke to 1px completed stroke (same green color #2E8B57, NOT muted).

The `strokeWidth` on completed blocks is `1`, on active blocks `2.5`. The color stays `#2E8B57` in both cases. Text remains at full contrast.

- [ ] **Step 2: Test the full pipeline scroll sequence**

Run: `npm run dev`
Verify:
1. Each block slides up from below as you scroll
2. Border traces yellow then green counterclockwise from center-top
3. Completed blocks below have thinner (1px) green border, same color
4. No double borders between stacked blocks (margin-top: -1px)
5. Left text crossfades between pipeline steps
6. Status label transitions: Pending -> In Review -> Approved

- [ ] **Step 3: Commit**

```bash
git add components/content-sections/pipeline-block.tsx components/content-sections/astraea-section.tsx
git commit -m "fix: pipeline block state transitions — thin completed borders, no double borders"
```

---

## Chunk 6: Animation System & Polish

### Task 16: Update Animation Variants

**Files:**
- Modify: `lib/animation-variants.ts`

- [ ] **Step 1: Rewrite animation-variants.ts**

Update to Formation Bio easing and timing. Remove hero video variants. Add scroll entrance defaults.

```ts
import type { Variants, Transition } from 'motion/react'

// Formation Bio easing curve
export const swoopEase = [0.16, 1, 0.3, 1] as const

// Navigation
export const navVariants: Variants = {
  visible: { y: '0%' },
  hidden: { y: '-100%' },
}
export const navTransition: Transition = { duration: 0.2, ease: 'easeInOut' }

// Scroll entrance (primary pattern)
export const scrollEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}
export const scrollEntranceTransition: Transition = {
  duration: 0.6,
  ease: swoopEase,
}

// Fade only
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// Slide variants
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
}

// Stagger container
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// Default viewport settings
export const defaultViewport = { once: true, amount: 0.3 as const }
export const defaultRevealTransition: Transition = {
  duration: 0.6,
  ease: swoopEase,
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/animation-variants.ts
git commit -m "feat: Formation Bio animation system — swoop easing, scroll entrance variants"
```

---

### Task 17: Update page.tsx (if needed)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Verify page.tsx structure**

The page composition should remain the same. Verify it imports all the right components:

```tsx
import { HeroSection } from '@/components/hero/hero-section'
import { DashboardMockup } from '@/components/content-sections/dashboard-mockup'
import { ProblemSolutionStrip } from '@/components/content-sections/problem-solution-strip'
import { AstraeaSection } from '@/components/content-sections/astraea-section'
import { CTASection } from '@/components/content-sections/cta-section'

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <DashboardMockup />
      <ProblemSolutionStrip />
      <AstraeaSection />
      <CTASection />
    </main>
  )
}
```

No changes needed if it already matches. If `overflow-hidden` causes issues with the sticky pipeline section, remove it.

- [ ] **Step 2: Commit (only if changed)**

```bash
git add app/page.tsx
git commit -m "fix: update page composition for redesign"
```

---

### Task 18: Full Verification

- [ ] **Step 1: Build check**

Run: `npm run build`
Expected: Build succeeds with zero errors

- [ ] **Step 2: Visual verification — desktop**

Run: `npm run dev`
Open http://localhost:3000 at 1440px width. Verify:

1. **Header**: Sticky, 60px, cream bg (#FAF4EE), 1px dark bottom border, "Astraea" text logo, Platform/Technology/Pipeline nav links
2. **Hero Snap 1**: Centered "Astraea" in Source Serif 4 at 72px, tagline in Inter below
3. **Hero Snap 2**: 3-column grid — serif headline left, image placeholder center, 3 pillar cards right with dark buttons + arrows
4. **Hero Snap 3**: Serif heading, subtitle, email capture with dark input border and dark button
5. **Dashboard**: Fifty-fifty layout, white card with 1px dark border, dark progress fill, step badges
6. **Disciplines**: Fifty-fifty, 3 items with top borders, dark CTA button
7. **Pipeline**: Scroll-driven — blocks slide up, SVG border traces yellow then green counterclockwise, completed blocks have thinner stroke, no double borders
8. **CTA**: "Partner With Us" uppercase label, serif heading, dark button, accent mark
9. **Footer**: 1px dark top border, 4-column grid, uppercase category headings

3. **Fonts**: Source Serif 4 on all headings (serif), Inter on body/nav/buttons (sans)
4. **Colors**: Background #FAF4EE everywhere, text #1F1F1F, no blue/purple from old theme
5. **No old assets**: No video playback, no 3D elements, no Material Icons

- [ ] **Step 3: Visual verification — mobile**

Open at 375px width. Verify:
1. Sections stack vertically
2. Hero pillar cards stack below image
3. Pipeline section is usable on mobile
4. Footer columns wrap to 2-col

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Formation Bio redesign — all sections verified"
```

---

## File Map Summary

| File | Action | Task |
|------|--------|------|
| `app/globals.css` | Rewrite | 1 |
| `app/layout.tsx` | Rewrite | 2 |
| `app/page.tsx` | Verify/minor edit | 17 |
| `components/providers.tsx` | Rewrite | 3 |
| `next.config.ts` | Simplify | 4 |
| `package.json` | Remove deps | 4 |
| `components/layout/header-nav.tsx` | Rewrite | 6 |
| `components/layout/footer.tsx` | Rewrite | 7 |
| `components/hero/hero-section.tsx` | Complete rewrite | 8 |
| `components/hero/email-capture.tsx` | Rewrite | 9 |
| `components/content-sections/dashboard-mockup.tsx` | Rewrite | 10 |
| `components/content-sections/problem-solution-strip.tsx` | Rewrite | 11 |
| `components/content-sections/cta-section.tsx` | Rewrite | 12 |
| `components/content-sections/pipeline-block.tsx` | **Create** | 13 |
| `components/content-sections/astraea-section.tsx` | Complete rewrite | 14 |
| `lib/animation-variants.ts` | Rewrite | 16 |
| `components/three/` | **Delete** | 5 |
| ~60 legacy files | **Delete** | 5 |
| 4 video/image assets | **Delete** | 5 |
