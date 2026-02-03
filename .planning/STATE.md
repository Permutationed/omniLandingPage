# Project State

## Project Reference

See: .planning/PROJECT.md

**Core value:** Visitors immediately understand that Omni unlocks rewards on tuition without costing schools anything - and trust the page enough to join the waitlist.
**Current focus:** Phase 7 v2 - How You Earn (complete redesign)

## Current Position

Phase: 7 of 10 (How You Earn v2 Redesign)
Plan: 3 of 5 new plans complete
Status: In progress - Tuition Rewards section complete
Last activity: 2026-02-02 - Completed 07-06-PLAN.md (Tuition Rewards section)

Progress: [##################-] 92% (07-05, 07-06, 07-07 complete, 2 section plans remaining)

## Phase 7 Redesign

**Why:** Original implementation didn't reflect actual product model. Omni has THREE earning streams, not one payment flow.

**New Structure (4 full-width sections):**
1. **Tuition Rewards** — Bank → ACH → School → $250 rewards (isometric)
2. **Unlock Rate** — Progress gauge, 20%→0.5%, 40%→1.0% thresholds
3. **Discover Rewards** — Isometric campus map, merchant pins 3x-10x
4. **Rewards Loop** — Points combine, reduce next tuition, cycle repeats

**Plans:**
- 07-05: Cleanup old implementation + new infrastructure
- 07-06: Tuition Rewards section
- 07-07: Unlock Rate section
- 07-08: Discover Rewards section
- 07-09: Rewards Loop section

## Performance Metrics

**Velocity:**
- Total plans completed: 17 (v1)
- Phase 7 v2 plans: 5 planned

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2/2 | 7min | 3.5min |
| 02-layout-components | 4/4 | 10min | 2.5min |
| 03-hero-section | 2/2 | 4min | 2min |
| 04-animation-infrastructure | 1/1 | 3min | 3min |
| 05-3d-infrastructure | 3/3 | 6min | 2min |
| 06-3d-card | 3/3 | 8min | 2.7min |
| 07-how-it-works v1 | 4/4 | 7min | 1.75min |
| 07-how-you-earn v2 | 3/5 | 14min | 4.7min |

## Accumulated Context

### Decisions

| Phase | Decision | Rationale |
|-------|----------|-----------|
| 01-01 | OKLCH color format | Tailwind v4 default, perceptually uniform colors |
| 01-01 | Light-mode only | Fintech trust aesthetic, no dark mode toggle |
| 01-01 | Inter font only | Clean typography, no display font needed |
| 01-01 | Purple/blue primary (hue 260) | Premium fintech feel |
| 01-02 | shadcn New York style | Cleaner, more professional appearance |
| 01-02 | Restored custom tokens after shadcn init | Preserved brand colors over shadcn neutral defaults |
| 02-01 | Providers component pattern | Keep layout.tsx as server component for metadata |
| 02-01 | Motion reducedMotion="user" | Respects OS prefers-reduced-motion setting |
| 02-02 | Logo text "Omni" | Shorter brand name for cleaner header |
| 02-02 | MobileNav from left (280px) | Standard mobile menu pattern |
| 02-02 | Magnetic on desktop CTA only | Mobile lacks hover, effect only for desktop |
| 02-04 | Container px-4 + mx-auto | Consistent padding and centering |
| 03-01 | Native validation over react-hook-form | Single field, simpler implementation |
| 03-01 | CSS animation for gradient mesh | GPU-accelerated, no React overhead |
| 03-02 | HeroSection as server component | Composes client components for animation |
| 03-02 | 4 trust metrics chosen | $50B+, Zero, 3x-10x, Day 1 |
| 04-01 | Direction prop uses 30px offset | Subtle but visible slide effect |
| 04-01 | 'as' prop for semantic HTML | Allow section, article instead of div |
| 04-01 | Demo section for verification | Temporary - remove when content sections added |
| 05-01 | R3F v9.5.0 exact version | Latest stable with React 19 support |
| 05-01 | drei v10.7.7 exact version | Required for R3F v9 compatibility |
| 05-01 | Only transpile 'three' | R3F and drei don't need transpilation |
| 05-02 | Conservative iOS gl settings | powerPreference: 'default', antialias: false |
| 05-02 | Dynamic import ssr: false | Prevents WebGL hydration errors |
| 05-02 | Ref non-null assertion | Required for R3F eventSource type |
| 05-03 | Loading fallback conditional | Return null when not loading to avoid layout shift |
| 05-03 | Credit card proportions | 3.375:2.125 box geometry matches standard card ratio |
| 05-03 | Mobile card first | order-first lg:order-last for visual impact on mobile |
| 06-02 | rotationFactor 0.25 | ~14 degrees max tilt for visual feedback |
| 06-02 | beta-45 offset | Offset for natural phone holding angle |
| 06-02 | 0.2 smoothing time | Responsive yet smooth feel for dampE |
| 06-02 | No useState in useFrame | Direct ref mutation for 60fps performance |
| 06-01 | RoundedBox 3.375x2.125x0.05 | Credit card ISO proportions |
| 06-01 | Iridescence 0.7 | Subtle holographic effect, not gaudy |
| 06-01 | Base color #0f0f23 | Dark premium appearance |
| 06-03 | Environment preset='city' | Urban HDR for premium metallic reflections |
| 06-03 | Reduced light intensities | ambient 0.3, directional 0.8 with Environment |
| 06-03 | Permission button pattern | Show only when isSupported AND permission === 'prompt' |
| 07-v2 | 4 full-width sections | Separate animations for each earning stream |
| 07-v2 | Isometric illustration style | Premium fintech aesthetic like Ramp |
| 07-v2 | Scroll-triggered (not interactive) | Consistent experience, easier to implement |
| 07-v2 | Delete old implementation | Complete redesign, not incremental |
| 07-v2 | Framer Motion + Rive/Lottie | Code-first with optional enhancements |
| 07-05 | ScrollSection render prop pattern | Children receive MotionValue for scroll progress |
| 07-05 | Generic useScrollTransform | Type-safe for number[] or string[] outputs |
| 07-05 | Isometric 30-degree projection | toIsometric(x,y,z) for coordinate transforms |
| 07-07 | Threshold visual positions | 20% threshold at 25% visual width, 40% at 50% |
| 07-07 | Progress mapping fillRange | [0.15, 0.75] for smooth animation window |
| 07-07 | Unlock stagger timing | 20% unlocks at 40% progress, 40% at 80% progress |
| 07-06 | pathLength={1} pattern | Clean SVG path drawing animation |
| 07-06 | Vertical mobile flow | Simplified ACH indicator on mobile |
| 07-06 | Isometric building pattern | Shadow ellipse, multi-face 3D, oklch colors |

### Pending Todos

(None yet)

### Blockers/Concerns

(None yet)

## Session Continuity

Last session: 2026-02-02
Stopped at: Completed 07-06-PLAN.md
Resume file: None - ready for 07-08, 07-09 (remaining sections)
