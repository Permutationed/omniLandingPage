# Phase 5: 3D Infrastructure - Research

**Researched:** 2026-01-31
**Domain:** React Three Fiber / WebGL / Next.js Integration
**Confidence:** HIGH

## Summary

This research covers establishing the 3D rendering infrastructure for the Omni Card landing page using React Three Fiber (R3F) v9 with the View component pattern from drei. The goal is a single Canvas that can render 3D content in the hero section without blocking above-fold render, with proper handling for hydration, loading states, and iOS Safari WebGL context issues.

Key findings:
- **R3F v9 is required** for React 19 compatibility (the project uses React 19.2.3)
- **@react-three/drei v10+** is required for R3F v9 / React 19 compatibility
- **View component pattern** enables a single Canvas to render multiple 3D viewports without multiple WebGL contexts
- **Dynamic import with ssr: false** is the established pattern for avoiding hydration errors with 3D content
- **iOS Safari context loss** is a known issue requiring specific Canvas gl props and proper memory management

**Primary recommendation:** Use a single persistent Canvas with View.Port pattern, dynamically imported with `next/dynamic` and `ssr: false`, with iOS-specific gl settings to prevent context loss.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @react-three/fiber | ^9.5.0 | React renderer for Three.js | Required for React 19 compatibility |
| @react-three/drei | ^10.7.7 | Helper components/hooks | Required for R3F v9 / React 19 compatibility |
| three | ^0.170.0 | 3D rendering engine | R3F peer dependency, current stable |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tunnel-rat | ^0.1.2 | Portal React elements across renderers | If needing to render HTML from within Canvas |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| View component | Multiple Canvas | Multiple canvases cause context limit issues (8-10 max), worse performance |
| next/dynamic | React.lazy | next/dynamic handles SSR correctly, React.lazy does not |
| tunnel-rat | drei Html component | Html component is simpler for in-scene HTML; tunnel-rat for DOM-level portaling |

**Installation:**
```bash
npm install @react-three/fiber@^9 @react-three/drei@^10 three
```

**Next.js Configuration Required:**
```javascript
// next.config.js
module.exports = {
  transpilePackages: ['three'],
}
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── three/                    # All 3D-related components
│   ├── scene.tsx            # Main Scene3D component (client, dynamically imported)
│   ├── canvas-container.tsx # Canvas wrapper with View.Port
│   ├── card/                # 3D card model and materials (Phase 6)
│   └── loading-fallback.tsx # Skeleton/placeholder while 3D loads
└── providers.tsx            # Add Scene3D provider here
```

### Pattern 1: Single Canvas with View.Port

**What:** One Canvas component rendered at the app level, with View components positioned anywhere in the DOM tree.

**When to use:** Always for this project - prevents multiple WebGL contexts, enables shared resources.

**Example:**
```typescript
// Source: https://drei.docs.pmnd.rs/portals/view

// components/three/canvas-container.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { Suspense, useRef } from 'react'

interface Scene3DProps {
  children: React.ReactNode
}

export function Scene3D({ children }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {children}
      <Canvas
        eventSource={containerRef}
        gl={{
          powerPreference: 'default',
          antialias: false,  // Required for iOS Safari stability
        }}
        dpr={[1, 2]}
        fallback={<div>WebGL not supported</div>}
      >
        <View.Port />
      </Canvas>
    </div>
  )
}
```

### Pattern 2: Dynamic Import with SSR Disabled

**What:** Use `next/dynamic` to lazy-load 3D components, preventing server-side rendering attempts.

**When to use:** For all components that use Canvas or Three.js APIs.

**Example:**
```typescript
// Source: https://nextjs.org/docs/pages/guides/lazy-loading

// app/providers-wrapper.tsx or components/providers.tsx
import dynamic from 'next/dynamic'

const Scene3D = dynamic(
  () => import('@/components/three/canvas-container').then(mod => mod.Scene3D),
  {
    ssr: false,
    loading: () => null, // Canvas is positioned fixed, no layout shift
  }
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Scene3D>
        {children}
      </Scene3D>
    </MotionConfig>
  )
}
```

### Pattern 3: View Component for 3D Viewports

**What:** Use View from drei to define where 3D content renders in the DOM.

**When to use:** For each location where 3D content should appear (hero card).

**Example:**
```typescript
// Source: https://drei.docs.pmnd.rs/portals/view

// components/hero/hero-card-3d.tsx
'use client'

import { View } from '@react-three/drei'
import { Suspense } from 'react'

export function HeroCard3D() {
  return (
    <View className="absolute inset-0 pointer-events-auto">
      <Suspense fallback={null}>
        {/* 3D card content will go here in Phase 6 */}
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[1, 1.6, 0.02]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
      </Suspense>
    </View>
  )
}
```

### Pattern 4: Loading State with useProgress

**What:** Track loading progress for 3D assets and show skeleton/placeholder.

**When to use:** While 3D models and textures are loading.

**Example:**
```typescript
// Source: https://drei.docs.pmnd.rs/loaders/progress-use-progress

'use client'

import { useProgress } from '@react-three/drei'

export function LoadingOverlay() {
  const { active, progress } = useProgress()

  if (!active) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
      <div className="text-sm text-muted-foreground">
        Loading 3D... {Math.round(progress)}%
      </div>
    </div>
  )
}
```

### Anti-Patterns to Avoid

- **Multiple Canvas components:** Browser limits to 8-10 WebGL contexts before crashing. Always use View pattern instead.
- **Mounting/unmounting Canvas on route change:** Causes context loss and memory leaks. Keep Canvas mounted, route contents.
- **Using Canvas without ssr: false in Next.js:** Causes hydration errors. Always use dynamic import.
- **High DPR + antialiasing on iOS:** Causes memory crashes. Use `dpr={[1, 2]}` and `antialias: false` for mobile.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Multiple 3D viewports | Multiple Canvas elements | drei View + View.Port | Browser WebGL context limits (8-10 max), shared resources |
| Loading progress | Custom loading manager | drei useProgress hook | Wraps THREE.DefaultLoadingManager correctly |
| HTML in 3D scene | Custom DOM overlay | drei Html component | Handles viewport positioning, occlusion |
| WebGL fallback | Manual feature detection | Canvas fallback prop | Built-in, handles edge cases |
| SSR prevention | typeof window checks | next/dynamic ssr: false | Handles all edge cases, proper code splitting |

**Key insight:** React Three Fiber ecosystem (pmndrs) has solved most common 3D web problems. Using their battle-tested solutions prevents WebGL context limits, memory leaks, and iOS Safari crashes that custom solutions would encounter.

## Common Pitfalls

### Pitfall 1: iOS Safari WebGL Context Loss
**What goes wrong:** App crashes or forces page refresh on iOS Safari after extended use or navigation.
**Why it happens:** R3F enables high DPR and antialiasing by default, which exceeds iOS memory limits (~500MB heap, 256MB canvas limit).
**How to avoid:**
```typescript
<Canvas
  gl={{
    powerPreference: 'default',  // Not 'high-performance'
    antialias: false,            // Disable on mobile
  }}
  dpr={[1, 2]}  // Cap at 2x, not device pixel ratio
/>
```
**Warning signs:** "Too many active WebGL contexts" warning, forced page refresh, "Total canvas memory use exceeds limit" error.

### Pitfall 2: Hydration Errors with Canvas
**What goes wrong:** React hydration mismatch errors in console, content flickers on load.
**Why it happens:** Canvas renders differently on server (nothing) vs client (WebGL), causing mismatch.
**How to avoid:** Always use `next/dynamic` with `ssr: false` for any component using Canvas or Three.js.
**Warning signs:** Console errors mentioning "hydration failed" or "text content does not match".

### Pitfall 3: React 19 / R3F Version Mismatch
**What goes wrong:** Runtime errors, "Cannot read properties of undefined (reading 'ReactCurrentOwner')".
**Why it happens:** R3F v8 is not compatible with React 19. Drei v9 is not compatible with R3F v9.
**How to avoid:** Use exact versions: R3F ^9.5.0 + drei ^10.7.7 + React 19.
**Warning signs:** npm peer dependency warnings, React internals errors.

### Pitfall 4: Multiple WebGL Contexts
**What goes wrong:** After 8-10 contexts, browser force-closes oldest contexts or crashes tab.
**Why it happens:** Creating new Canvas on each route/component mount instead of reusing one.
**How to avoid:** Single Canvas at app root with View.Port pattern. Never unmount Canvas on navigation.
**Warning signs:** "Too many active WebGL contexts" warning, 3D content disappearing.

### Pitfall 5: Blocking Above-Fold Render
**What goes wrong:** Page appears blank until all 3D assets load, hurting perceived performance.
**Why it happens:** 3D models/textures in critical render path without Suspense boundary.
**How to avoid:** Use Suspense with lightweight fallback, show placeholder/skeleton immediately.
**Warning signs:** Lighthouse LCP score drops, blank hero section for 2-3 seconds on load.

## Code Examples

Verified patterns from official sources:

### Complete Canvas Setup for Next.js App Router
```typescript
// Source: https://github.com/pmndrs/react-three-next + official docs

// components/three/scene.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { View, Preload } from '@react-three/drei'
import { Suspense, useRef } from 'react'

export function Scene3D({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      {children}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        <Canvas
          eventSource={containerRef}
          eventPrefix="client"
          gl={{
            powerPreference: 'default',
            antialias: false,
          }}
          dpr={[1, 2]}
          fallback={<div className="sr-only">WebGL not supported</div>}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </div>
    </div>
  )
}
```

### Dynamic Import Wrapper
```typescript
// Source: https://nextjs.org/docs/pages/guides/lazy-loading

// components/providers.tsx
'use client'

import { MotionConfig } from 'motion/react'
import dynamic from 'next/dynamic'

const Scene3D = dynamic(
  () => import('@/components/three/scene').then(mod => mod.Scene3D),
  { ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Scene3D>
        {children}
      </Scene3D>
    </MotionConfig>
  )
}
```

### 3D Placeholder Component
```typescript
// components/hero/hero-card-placeholder.tsx
'use client'

import { View } from '@react-three/drei'
import { Suspense } from 'react'

// Placeholder mesh while actual card model loads
function CardPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[3.375, 2.125, 0.05]} /> {/* Credit card aspect ratio */}
      <meshBasicMaterial color="#e2e8f0" />
    </mesh>
  )
}

export function HeroCard3DPlaceholder() {
  return (
    <View className="absolute inset-0">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <CardPlaceholder />
      </Suspense>
    </View>
  )
}
```

### WebGL Fallback with DOM Skeleton
```typescript
// components/hero/hero-card-skeleton.tsx
export function HeroCardSkeleton() {
  return (
    <div className="aspect-[3.375/2.125] w-full max-w-sm mx-auto">
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
    </div>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| R3F v8 + React 18 | R3F v9 + React 19 | December 2024 | Required for React 19 compatibility |
| drei v9 | drei v10 | January 2025 | Required for R3F v9 compatibility |
| Hardcoded MeshProps types | ThreeElements['mesh'] | R3F v9 | Dynamic JSX types from Three.js |
| Multiple Canvas | View + View.Port | drei 9.x | Single context, better performance |
| Manual sRGB conversion | Automatic for built-in materials | R3F v9 | Simpler color management |

**Deprecated/outdated:**
- **R3F v8:** Does not work with React 19
- **drei v9.x:** Has peer dependency conflicts with React 19
- **Multiple Canvas pattern:** Causes WebGL context limit issues, deprecated in favor of View
- **Hardcoded TypeScript types (MeshProps, etc.):** Removed in v9, use ThreeElements interface

## Open Questions

Things that couldn't be fully resolved:

1. **Exact iOS Safari memory thresholds**
   - What we know: ~500MB heap limit, ~256MB canvas limit, varies by device
   - What's unclear: Exact per-device limits, how to detect approaching limit
   - Recommendation: Use conservative gl settings, test on real iOS devices

2. **WebGL context recovery behavior**
   - What we know: THREE.WebGLRenderer handles context lost/restored events by default
   - What's unclear: Whether R3F v9 exposes hooks for custom recovery UI
   - Recommendation: Rely on default handling, add DOM-level fallback if context permanently lost

3. **Preload strategy for 3D assets**
   - What we know: drei Preload component exists, useProgress tracks loading
   - What's unclear: Best strategy for preloading card model vs lazy loading
   - Recommendation: Start with lazy loading (Suspense fallback), optimize if LCP suffers

## Sources

### Primary (HIGH confidence)
- [React Three Fiber v9 Migration Guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide) - Breaking changes, new features
- [React Three Fiber Installation](https://r3f.docs.pmnd.rs/getting-started/installation) - Version compatibility, Next.js setup
- [drei View Documentation](https://drei.docs.pmnd.rs/portals/view) - View component props, usage
- [drei useProgress Documentation](https://drei.docs.pmnd.rs/loaders/progress-use-progress) - Loading state hook
- [React Three Fiber Canvas API](https://r3f.docs.pmnd.rs/api/canvas) - Canvas props, fallback

### Secondary (MEDIUM confidence)
- [Next.js Lazy Loading Guide](https://nextjs.org/docs/pages/guides/lazy-loading) - dynamic import with ssr: false
- [pmndrs/react-three-next](https://github.com/pmndrs/react-three-next) - Official Next.js starter patterns
- [Next.js Hydration Error Docs](https://nextjs.org/docs/messages/react-hydration-error) - Hydration mismatch solutions

### Tertiary (LOW confidence)
- GitHub Discussions on iOS Safari context loss - Community workarounds, device-specific issues
- WebSearch results on memory limits - Varies by iOS version and device

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official documentation confirms version requirements
- Architecture: HIGH - View pattern is documented, react-three-next starter validates approach
- Pitfalls: MEDIUM - iOS issues are well-documented but device-specific behavior varies

**Research date:** 2026-01-31
**Valid until:** 60 days (stable ecosystem, major versions settled)
