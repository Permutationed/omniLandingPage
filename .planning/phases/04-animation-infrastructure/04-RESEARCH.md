# Phase 4: Animation Infrastructure - Research

**Researched:** 2026-01-31
**Domain:** Scroll-triggered animations, motion accessibility, 60fps performance
**Confidence:** HIGH

## Summary

Phase 4 builds a reusable animation system for scroll reveals and interactions. The project already has `motion@12.29.2` installed with `MotionConfig reducedMotion="user"` configured, providing the foundation for accessible animations. The existing `lib/animation-variants.ts` file contains nav and hero variants, which this phase will extend with scroll-reveal variants.

The standard approach uses Motion's built-in `whileInView` prop with `viewport={{ once: true }}` for scroll-triggered animations. This is simpler and more performant than combining separate libraries like `react-intersection-observer`. For reusability, a wrapper component pattern (e.g., `<ScrollReveal>`) encapsulates animation logic while centralized variants in `lib/animation-variants.ts` ensure consistency.

Performance is achieved by animating only GPU-accelerated properties (transform, opacity) and using the `will-change` hint sparingly. The existing `reducedMotion="user"` configuration automatically disables transform animations for users who prefer reduced motion, keeping opacity animations intact.

**Primary recommendation:** Create a `<ScrollReveal>` wrapper component using `whileInView` with centralized variants, extending the existing `animation-variants.ts` pattern.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.29.2 | Animation engine | Already installed; native Intersection Observer (0.5kb), hardware-accelerated |
| motion/react | (bundled) | React bindings | `whileInView`, `useInView`, `MotionConfig` for scroll animations |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | Motion includes all needed scroll animation features |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| whileInView | react-intersection-observer + motion | Extra dependency; only needed for callback-based detection without re-renders |
| useInView | useScroll | useScroll is for scroll-progress animations (parallax), not reveal triggers |

**Installation:** No new dependencies required. `motion@12.29.2` already installed.

## Architecture Patterns

### Recommended Project Structure
```
lib/
├── animation-variants.ts    # Centralized variant definitions (extend existing)
└── utils.ts                 # Existing utilities

components/
├── ui/
│   ├── scroll-reveal.tsx    # NEW: Reusable scroll reveal wrapper
│   ├── magnetic-button.tsx  # Existing
│   └── ...
└── ...
```

### Pattern 1: Scroll Reveal Wrapper Component

**What:** A reusable wrapper component that animates children when scrolled into view
**When to use:** Any content section that should fade/slide in on scroll

**Example:**
```typescript
// components/ui/scroll-reveal.tsx
'use client'

import { motion, Variants } from 'motion/react'
import { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  amount?: 'some' | 'all' | number
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.3,
}: ScrollRevealProps) {
  const offset = directionOffsets[direction]

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      }
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 2: Centralized Variants with TypeScript

**What:** Type-safe animation variants exported from a central file
**When to use:** When multiple components share the same animation patterns

**Example:**
```typescript
// lib/animation-variants.ts (extend existing file)
import type { Variants, Transition } from 'motion/react'

// Existing variants...

// Scroll reveal variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

// Stagger container for lists/grids
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Transition presets
export const defaultTransition: Transition = {
  duration: 0.5,
  ease: 'easeOut',
}

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}
```

### Pattern 3: Stagger Animation for Lists

**What:** Animate list items sequentially as they enter the viewport
**When to use:** Feature grids, metric cards, FAQ items

**Example:**
```typescript
// Usage with existing MetricCards pattern
<motion.div
  variants={staggerContainerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-2 md:grid-cols-4 gap-4"
>
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      variants={slideUpVariants}
      transition={{ ...defaultTransition, delay: i * 0.1 }}
    >
      {/* card content */}
    </motion.div>
  ))}
</motion.div>
```

### Anti-Patterns to Avoid

- **Animating layout properties:** Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`. These trigger expensive layout recalculations. Use `transform` and `opacity` only.
- **Using `useInView` + `useAnimation` for simple reveals:** The `whileInView` prop is simpler and performs the same function with less code.
- **Omitting `viewport={{ once: true }}`:** Without this, animations replay every time the element enters the viewport, which is jarring and wastes performance.
- **Animating named CSS colors:** Motion cannot interpolate between named colors like `navy` and `orange`. Use hex, rgb, hsl, or oklch values.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll detection | Custom scroll listeners | `whileInView` prop | Native Intersection Observer under the hood, off main thread |
| Viewport entry tracking | Manual IntersectionObserver | Motion's `useInView` hook | 0.5kb, handles cleanup, returns reactive boolean |
| Reduced motion support | Manual `matchMedia` listener | `MotionConfig reducedMotion="user"` | Already configured; auto-disables transform animations |
| Hardware acceleration | Manual `will-change` CSS | Motion's built-in handling | Motion optimizes GPU layer promotion automatically |

**Key insight:** Motion's `whileInView` uses native Intersection Observer internally, running calculations off the main JavaScript thread. Custom implementations typically run on the main thread and are less performant.

## Common Pitfalls

### Pitfall 1: Animation Jank on Low-Power Devices

**What goes wrong:** Animations stutter or drop frames on mobile or low-power mode
**Why it happens:** Animating non-GPU properties, too many simultaneous animations, or iOS low-power mode throttling
**How to avoid:**
- Only animate `transform` and `opacity`
- Limit concurrent animations (stagger instead of all at once)
- Test on real mobile devices, not just desktop
**Warning signs:** DevTools Performance panel shows long paint/layout times; visible stutter on scroll

### Pitfall 2: Reduced Motion Setting Ignored

**What goes wrong:** Users with vestibular disorders experience dizziness/nausea
**Why it happens:** Forgot to handle `prefers-reduced-motion` or used CSS animations without the media query
**How to avoid:**
- Already configured: `MotionConfig reducedMotion="user"` wraps the app
- For CSS animations, add `@media (prefers-reduced-motion: reduce)` (already done for `.hero-gradient`)
- Verify transform animations disable (opacity persists, which is fine)
**Warning signs:** Animations play even with "Reduce motion" enabled in OS settings

### Pitfall 3: Animations Replay on Scroll

**What goes wrong:** Elements animate in again when scrolling up/down past them
**Why it happens:** Missing `viewport={{ once: true }}` on `whileInView`
**How to avoid:** Always include `once: true` for reveal animations
**Warning signs:** Same element fades in multiple times during a scroll session

### Pitfall 4: Layout Shift During Animation

**What goes wrong:** Content jumps around as animations complete
**Why it happens:** Animating from opacity: 0 while other content hasn't reserved space
**How to avoid:**
- Ensure containers have fixed/min heights
- Animate from transform only (element is invisible but takes space)
- Consider skeleton placeholders for async content
**Warning signs:** CLS (Cumulative Layout Shift) score increases; content "jumps"

### Pitfall 5: Too Many Intersection Observers

**What goes wrong:** Performance degrades with many observed elements
**Why it happens:** Creating individual observers per element instead of reusing
**How to avoid:** Motion's `whileInView` reuses observers efficiently; wrap groups in a single `<ScrollReveal>` when possible
**Warning signs:** DevTools shows many IntersectionObserver entries; scroll becomes sluggish

## Code Examples

Verified patterns from official sources and existing project code:

### Basic Scroll Reveal Usage
```typescript
// Source: motion.dev documentation
import { motion } from 'motion/react'

<motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {/* Section content */}
</motion.section>
```

### Using the ScrollReveal Wrapper
```typescript
// After Phase 4 implementation
import { ScrollReveal } from '@/components/ui/scroll-reveal'

// Default: fade up
<ScrollReveal>
  <FeatureCard />
</ScrollReveal>

// Customized: fade from left with delay
<ScrollReveal direction="left" delay={0.2}>
  <FeatureCard />
</ScrollReveal>

// For lists: use stagger at container level
<motion.div
  variants={staggerContainerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map(item => (
    <ScrollReveal key={item.id} direction="up">
      <Item {...item} />
    </ScrollReveal>
  ))}
</motion.div>
```

### Extend Existing animation-variants.ts
```typescript
// lib/animation-variants.ts - additions for Phase 4
import type { Variants, Transition } from 'motion/react'

// ... existing navVariants, heroContainerVariants, etc.

// === SCROLL REVEAL VARIANTS ===

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
}

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

// Stagger container (for grids/lists)
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// === TRANSITION PRESETS ===

export const defaultRevealTransition: Transition = {
  duration: 0.5,
  ease: 'easeOut',
}

export const quickRevealTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
}

export const springRevealTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}

// === VIEWPORT PRESETS ===

export const defaultViewport = {
  once: true,
  amount: 0.3 as const,
}

export const fullViewport = {
  once: true,
  amount: 'all' as const,
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| react-intersection-observer + framer-motion | Motion's built-in whileInView | Motion v10+ | One less dependency, simpler API |
| framer-motion package | motion package | 2024 | Same library, new name/package |
| Manual requestAnimationFrame | WAAPI/ScrollTimeline under the hood | Motion v11+ | Hardware-accelerated animations on supported browsers |

**Deprecated/outdated:**
- `framer-motion` package name: Now just `motion` (already using correct package)
- `LazyMotion` with `loadFeatures`: Still works but less necessary with tree-shaking improvements

## Open Questions

Things that couldn't be fully resolved:

1. **Exact amount threshold for viewport detection**
   - What we know: `amount: 0.3` means 30% of element must be visible
   - What's unclear: Optimal percentage for this project's section heights
   - Recommendation: Start with 0.3, adjust per-section if needed during implementation

2. **Stagger timing for different list sizes**
   - What we know: `staggerChildren: 0.1` works well for 4-6 items
   - What's unclear: May need adjustment for larger lists (Features has 6, FAQ may have 8+)
   - Recommendation: Use smaller stagger (0.05-0.08) for lists > 6 items

## Sources

### Primary (HIGH confidence)
- [Motion for React - useInView](https://motion.dev/docs/react-use-in-view) - Hook API, viewport options
- [Motion for React - MotionConfig](https://motion.dev/docs/react-motion-config) - reducedMotion configuration
- [Motion Performance Guide](https://motion.dev/docs/performance) - GPU acceleration, property recommendations

### Secondary (MEDIUM confidence)
- [LogRocket - React scroll animations with Framer Motion](https://blog.logrocket.com/react-scroll-animations-framer-motion/) - whileInView patterns
- [Victor Eke - Scroll Reveal Animation](https://victoreke.com/blog/scroll-reveal-animation-in-react-using-framer-motion) - Reusable wrapper component pattern
- [Josh W. Comeau - Accessible Animations](https://www.joshwcomeau.com/react/prefers-reduced-motion/) - prefers-reduced-motion best practices

### Tertiary (Verified in project)
- Existing `motion@12.29.2` installation in package.json
- Existing `MotionConfig reducedMotion="user"` in components/providers.tsx
- Existing animation-variants.ts pattern in lib/

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - motion already installed, patterns well-documented
- Architecture: HIGH - wrapper component pattern is established, existing variants file to extend
- Pitfalls: HIGH - well-documented in official docs and community sources
- Code examples: HIGH - verified against motion.dev documentation

**Research date:** 2026-01-31
**Valid until:** 2026-03-31 (60 days - stable library, no major changes expected)
