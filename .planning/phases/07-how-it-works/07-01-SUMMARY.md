---
phase: 07-how-it-works
plan: 01
subsystem: ui
tags: [scroll-animation, motion, useScroll, reduced-motion, accessibility]

# Dependency graph
requires:
  - phase: 04-animation-infrastructure
    provides: motion library, MotionConfig with reducedMotion="user"
provides:
  - HowItWorksSection with scroll tracking infrastructure
  - HowItWorksStatic fallback for reduced motion users
  - 175vh tall container with sticky viewport pattern
affects: [07-02 payment flow animation, future scroll sections]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Tall container + sticky viewport for scroll-linked animation"
    - "useReducedMotion conditional render to static fallback"

key-files:
  created:
    - components/how-it-works/how-it-works-section.tsx
    - components/how-it-works/how-it-works-static.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "175vh container height for smooth animation pacing"
  - "useReducedMotion at section level, not per-element"
  - "Static fallback is completely separate component, not dimmed animations"

patterns-established:
  - "Tall container + sticky viewport: 175vh outer with 100vh sticky inner"
  - "Reduced motion fallback: completely different component, not slowed animations"

# Metrics
duration: 3min
completed: 2026-02-02
---

# Phase 7 Plan 01: Section Infrastructure Summary

**Scroll section infrastructure with 175vh tall container, sticky viewport pinning, and static step cards fallback for reduced motion accessibility**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-02
- **Completed:** 2026-02-02
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- HowItWorksStatic component with 3 step cards for reduced motion users
- HowItWorksSection with useScroll tracking and 175vh container
- Sticky viewport that pins during scroll through section
- Integrated into page.tsx, removed demo section from Phase 4

## Task Commits

Each task was committed atomically:

1. **Task 1: Create HowItWorksStatic component** - `efbe1a4` (feat)
2. **Task 2: Create HowItWorksSection wrapper** - `d86a12d` (feat)
3. **Task 3: Integrate into page.tsx** - `6b60b6a` (feat)

## Files Created/Modified
- `components/how-it-works/how-it-works-static.tsx` - Static 3-step cards for reduced motion
- `components/how-it-works/how-it-works-section.tsx` - Main section with scroll tracking
- `app/page.tsx` - Integrated section, removed animation demo

## Decisions Made
- **175vh container height:** Provides ~75vh of scroll distance for animation, smooth pacing
- **Static fallback as separate component:** Not dimmed/slowed animations but truly static content
- **useReducedMotion at section level:** Single check returns entire alternate component

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Section infrastructure ready for PaymentFlowAnimation (Plan 02)
- scrollYProgress already captured, just needs to be passed to animation component
- Static fallback complete, no changes needed for Plan 02

---
*Phase: 07-how-it-works*
*Completed: 2026-02-02*
