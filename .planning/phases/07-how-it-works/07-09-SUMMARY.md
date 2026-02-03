---
phase: 07-how-it-works
plan: 09
subsystem: how-you-earn
tags: [framer-motion, scroll-animation, odometer, svg-animation, rewards-loop]

dependency-graph:
  requires: [07-05]
  provides:
    - RewardsLoop section component
    - PointsBadge with animated counter
    - SourceBreakdown with three categories
    - FlowLines SVG animation
    - TuitionCard with reduction animation
    - LoopIndicator circular arrow
  affects: []

tech-stack:
  added: []
  patterns:
    - Scroll-linked MotionValue animation
    - SVG path drawing with strokeDashoffset
    - Odometer counter integration
    - Isometric card perspective

key-files:
  created:
    - components/how-you-earn/rewards-loop/index.ts
    - components/how-you-earn/rewards-loop/rewards-loop.tsx
    - components/how-you-earn/rewards-loop/points-badge.tsx
    - components/how-you-earn/rewards-loop/source-breakdown.tsx
    - components/how-you-earn/rewards-loop/flow-lines.tsx
    - components/how-you-earn/rewards-loop/tuition-card.tsx
    - components/how-you-earn/rewards-loop/loop-indicator.tsx
  modified:
    - components/how-you-earn/how-you-earn-section.tsx

decisions:
  - id: points-badge-gradient
    choice: "gradient from-primary/20 to-amber-500/20"
    rationale: "Warm gradient suggests value accumulation"
  - id: source-stagger-timing
    choice: "0.05 progress offset per source"
    rationale: "Creates cascade reveal effect"
  - id: tuition-card-perspective
    choice: "perspective(1000px) rotateY(-5deg) rotateX(5deg)"
    rationale: "Subtle 3D tilt for isometric aesthetic"
  - id: strikethrough-animation
    choice: "Width transition 0% to 100%"
    rationale: "Dramatic reveal of discount"
  - id: loop-arc-dasharray
    choice: "strokeDasharray 120, offset 120->30"
    rationale: "Draws 3/4 arc to show cycle continuation"

metrics:
  duration: "7min"
  completed: "2026-02-03"
---

# Phase 07 Plan 09: Rewards Loop Section Summary

Section 4 of How You Earn - shows points aggregation from all sources and tuition bill reduction.

## One-liner

Scroll-animated rewards loop showing 12,450 pts from 3 sources reducing $25,000 tuition to $24,875.50 with circular repeat indicator.

## What Was Built

### PointsBadge Component
Central display showing total accumulated points:
- Gradient background with primary/amber colors
- PointsOdometer integration (12,450 pts)
- Scale bounce animation on appear
- "combined from all sources" subtitle

### SourceBreakdown Component
Three earning categories with staggered reveal:
- Tuition (graduation cap): 250 pts, hue 260
- Everyday (credit card): 8,200 pts, hue 240
- Merchants (store): 4,000 pts, hue 85
- Each source has icon, odometer counter, label
- 0.05 progress stagger between items

### FlowLines Component
Animated SVG showing points converging:
- Three bezier paths from sources to center
- Gradient stroke from primary to success
- Staggered path drawing animations
- Arrow head appears at convergence

### TuitionCard Component
Isometric tuition bill with reduction animation:
- 3D perspective tilt (CSS transform)
- Original amount $25,000 with animated strikethrough
- New total $24,875.50 via DollarOdometer
- Savings badge pops: "$124.50 OFF" with checkmark
- "Points applied automatically at checkout" footer

### LoopIndicator Component
Circular arrow showing cycle continues:
- SVG circle with animated arc (strokeDashoffset)
- Arrow head fades in at end
- Rotation animation from -90deg to 0
- "Earn more next semester" pill text

### RewardsLoop Section
Main section composing all sub-components:
- Scroll-linked progress (0.1-0.75 range)
- Gradient background with primary tint
- Staged animation sequence:
  - Header (0-0.08)
  - Points badge (0.1-0.3)
  - Sources (0.3-0.5)
  - Flow lines (0.45-0.6)
  - Tuition card (0.55-0.8)
  - Loop indicator (0.8-0.95)

## Technical Patterns

### Animation Sequence
All animations driven by single `animationProgress` MotionValue:
```typescript
const animationProgress = useTransform(
  scrollYProgress,
  [0.1, 0.75],
  [0, 1]
)
```

Each component receives progress and maps to its own timing range.

### SVG Path Animation
Flow lines use strokeDashoffset for drawing effect:
```typescript
strokeDasharray="150"
style={{
  strokeDashoffset: useTransform(progress, [start, end], [150, 0])
}}
```

### Odometer Integration
Counters use shared Odometer components from 07-05:
- PointsOdometer for badge total
- Odometer for source amounts
- DollarOdometer for tuition amounts

## File Structure

```
components/how-you-earn/rewards-loop/
├── index.ts                 # Barrel exports
├── rewards-loop.tsx         # Main section (96 lines)
├── points-badge.tsx         # Central badge (59 lines)
├── source-breakdown.tsx     # 3 categories (89 lines)
├── flow-lines.tsx           # SVG animation (102 lines)
├── tuition-card.tsx         # Bill card (131 lines)
└── loop-indicator.tsx       # Cycle arrow (102 lines)
```

## Commits

| Hash | Message |
|------|---------|
| c6df197 | feat(07-09): create points badge component |
| 78cd6df | feat(07-09): create source breakdown component |
| 9cf807e | feat(07-09): create tuition card component |
| d1e7d5b | feat(07-09): create loop indicator component |
| 6aa584f | feat(07-09): create flow lines SVG component |
| 6856cc8 | feat(07-09): create main RewardsLoop section |

## Deviations from Plan

### Concurrent Integration
Task 7 (integration) was completed by concurrent plan 07-06 execution which cleaned up all remaining placeholders. The RewardsLoop import was already added and the component was rendering correctly.

## Verification

- [x] TypeScript compiles without errors
- [x] All 7 component files created
- [x] RewardsLoop integrated in HowYouEarnSection
- [x] Points badge shows 12,450 pts
- [x] Three sources display with correct amounts
- [x] Flow lines draw from sources to center
- [x] Tuition card shows $25,000 -> $24,875.50
- [x] Savings badge shows $124.50 OFF
- [x] Loop indicator shows "Earn more next semester"

## Next Steps

Phase 7 v2 redesign complete. All 4 sections implemented:
1. TuitionRewards - Bank -> ACH -> School -> $250
2. UnlockRate - Progress gauge with thresholds
3. DiscoverRewards - Campus map with merchant pins
4. RewardsLoop - Points aggregation and tuition reduction
