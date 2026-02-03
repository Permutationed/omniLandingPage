---
phase: 07-how-it-works
plan: 08
subsystem: ui
tags: [framer-motion, scroll-animation, isometric, map, svg]

# Dependency graph
requires:
  - phase: 07-05
    provides: shared infrastructure (constants, isometric-utils)
provides:
  - DiscoverRewards section with isometric campus map
  - MerchantPin component with bounce animation
  - CampusBuilding SVG illustration
  - IsometricMap base with grid streets
  - NotificationToast slide-up component
affects: [07-09, how-you-earn integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Scroll-linked transforms via useScroll + useTransform"
    - "Staggered appearance ranges for sequential animations"
    - "Isometric map with SVG grid pattern"

key-files:
  created:
    - components/how-you-earn/discover-rewards/merchant-pin.tsx
    - components/how-you-earn/discover-rewards/campus-building.tsx
    - components/how-you-earn/discover-rewards/isometric-map.tsx
    - components/how-you-earn/discover-rewards/notification-toast.tsx
    - components/how-you-earn/discover-rewards/discover-rewards.tsx
    - components/how-you-earn/discover-rewards/index.ts
  modified:
    - components/how-you-earn/how-you-earn-section.tsx

key-decisions:
  - "MerchantPin uses percentage positioning for responsive layout"
  - "Pins appear staggered at 0.08 progress intervals"
  - "Toast appears late (0.75-0.85) as finishing touch"

patterns-established:
  - "Pin bounce: scale [0, 1.3, 1] over 0.02 progress"
  - "Toast slide: y from 100 to 0 with opacity fade"
  - "Map children render inside overflow-hidden container"

# Metrics
duration: 6min
completed: 2026-02-02
---

# Phase 07 Plan 08: Discover Local Rewards Summary

**Isometric campus map with 5 merchant pins showing 3x-10x multipliers, user location pulse, and notification toast**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-03T05:49:12Z
- **Completed:** 2026-02-03T05:55:00Z
- **Tasks:** 6
- **Files created:** 6
- **Files modified:** 1

## Accomplishments

- Built isometric map base with SVG grid pattern and crossroad streets
- Created campus building with tower, windows, and flag illustration
- Implemented 5 merchant pins with bounce-in animation and multiplier badges
- Added user location pulse with dual rings animation
- Created notification toast with slide-up effect showing nearby merchant

## Task Commits

Each task was committed atomically:

1. **Task 1: Create merchant pin component** - `be648ff` (feat)
2. **Task 2: Create campus building component** - `1d7d2d5` (feat)
3. **Task 3: Create isometric map base** - `26251f7` (feat)
4. **Task 4: Create notification toast component** - `a8b0019` (feat)
5. **Task 5: Create main DiscoverRewards section** - `6c14437` (feat)
6. **Task 6: Integrate into HowYouEarnSection** - `414a21c` (feat)

## Files Created/Modified

- `components/how-you-earn/discover-rewards/merchant-pin.tsx` - Animated pin with multiplier badge and MERCHANTS data
- `components/how-you-earn/discover-rewards/campus-building.tsx` - Isometric university building SVG
- `components/how-you-earn/discover-rewards/isometric-map.tsx` - Map base with grid, streets, user pulse
- `components/how-you-earn/discover-rewards/notification-toast.tsx` - Slide-up nearby merchant alert
- `components/how-you-earn/discover-rewards/discover-rewards.tsx` - Main section orchestrating all components
- `components/how-you-earn/discover-rewards/index.ts` - Barrel exports for all components
- `components/how-you-earn/how-you-earn-section.tsx` - Integrated DiscoverRewards, removed placeholder

## Decisions Made

- Used percentage-based positioning for pins (responsive to map size)
- Staggered pin appearance at 0.08 progress intervals for visual sequence
- Toast appears at 0.75-0.85 progress range as a late finishing element
- User location uses infinite pulse animation (not scroll-linked)
- Campus building includes flag detail for premium fintech aesthetic

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Build cache race conditions with Turbopack (resolved with rm -rf .next and rebuild)
- No functional issues with implemented code

## Next Phase Readiness

- DiscoverRewards section complete and integrated
- Ready for 07-09 (Rewards Loop section) - final How You Earn section
- All 4 sections will be complete after 07-09

---
*Phase: 07-how-it-works*
*Completed: 2026-02-02*
