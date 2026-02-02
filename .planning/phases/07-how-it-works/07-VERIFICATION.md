---
phase: 07-how-it-works
verified: 2026-02-02T23:15:00Z
status: passed
score: 7/7 must-haves verified
re_verification:
  previous_status: gaps_found
  previous_score: 6/7
  gaps_closed:
    - "User sees particles along SVG path during middle scroll"
  gaps_remaining: []
  regressions: []
---

# Phase 7: How It Works Verification Report

**Phase Goal:** User understands payment flow through scroll-driven animation
**Verified:** 2026-02-02T23:15:00Z
**Status:** passed
**Re-verification:** Yes - after gap closure (07-04-PLAN.md)

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | User scrolls through 150-200vh section with progress-linked animation | VERIFIED | Section has `h-[175vh]` class in how-it-works-section.tsx:27 |
| 2 | User sees animated card swipe as they start scrolling | VERIFIED | cardX, cardOpacity, cardScale transforms at lines 15-17, rendered at line 73 |
| 3 | User sees path drawing during middle scroll | VERIFIED | pathLength transform at line 20, SVG motion.path at lines 102-110 |
| 4 | User sees particles along path during middle scroll | VERIFIED | 5 motion.circle particles at lines 117-175 with staggered offset-distance |
| 5 | User sees funds split to ACH (school) and rewards (user) at end | VERIFIED | achY, achOpacity, rewardsY, rewardsOpacity at lines 44-47, rendered at lines 188-213 |
| 6 | User can click progress dots to jump between steps | VERIFIED | scrollToStep function in progress-dots.tsx:61-72 with smooth scroll |
| 7 | User with prefers-reduced-motion sees static step cards | VERIFIED | useReducedMotion conditional in how-it-works-section.tsx:11, 19-20 returns HowItWorksStatic |

**Score:** 7/7 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `components/how-it-works/how-it-works-section.tsx` | Main section with useScroll | VERIFIED | 38 lines, exports HowItWorksSection, uses useScroll with containerRef |
| `components/how-it-works/how-it-works-static.tsx` | Static fallback for reduced motion | VERIFIED | 65 lines, 3-step cards with grid layout, exports HowItWorksStatic |
| `components/how-it-works/payment-flow-animation.tsx` | Multi-phase scroll animation with particles | VERIFIED | 226 lines, has card/path/particles/split phases |
| `components/how-it-works/progress-dots.tsx` | Clickable navigation dots | VERIFIED | 90 lines, scrollToStep with smooth scroll, hidden md:flex |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| app/page.tsx | HowItWorksSection | import and render | WIRED | Line 2 import, line 9 render |
| how-it-works-section.tsx | useReducedMotion | conditional render | WIRED | Lines 4, 11, 19-20 |
| how-it-works-section.tsx | HowItWorksStatic | early return | WIRED | Line 20 |
| how-it-works-section.tsx | PaymentFlowAnimation | progress prop | WIRED | Line 34 passes scrollYProgress |
| how-it-works-section.tsx | ProgressDots | progress + containerRef | WIRED | Line 30 |
| payment-flow-animation.tsx | useTransform | scroll progress mapping | WIRED | 15 useTransform calls on progress (card, path, particles, split) |
| payment-flow-animation.tsx | particles | offset-path + offset-distance | WIRED | 5 particles with staggered p{N}Distance, p{N}Opacity, p{N}Scale |
| progress-dots.tsx | window.scrollTo | click handler | WIRED | Lines 68-71 with behavior: 'smooth' |

### Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| HIW-01: Scroll-linked animation section (150-200vh) | SATISFIED | None - 175vh implemented |
| HIW-02: Animated payment flow with particles | SATISFIED | Gap closed - 5 particles animate along path |
| HIW-03: Clickable progress dots | SATISFIED | scrollToStep with smooth scroll |
| HIW-04: Static step cards for prefers-reduced-motion | SATISFIED | HowItWorksStatic renders 3 cards |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (none found) | - | - | - | - |

No TODO, FIXME, placeholder, or stub patterns found in how-it-works components.

### Build Verification

- TypeScript: Compiles without errors
- Next.js build: Succeeds, static generation works
- All components properly exported

### Gap Closure Verification

**Previously Failed (07-VERIFICATION.md):**
- Truth: "User sees particles along SVG path during middle scroll"
- Issue: No particle elements existed

**Gap Closure Plan:** 07-04-PLAN.md

**Current State:**
- 5 motion.circle particles in payment-flow-animation.tsx lines 117-175
- Each particle has:
  - offsetPath: CSS offset-path for path following
  - offsetDistance: useTransform with staggered ranges (0.20-0.65, 0.23-0.68, etc.)
  - opacity: useTransform for fade in/out over 5% of range
  - scale: useTransform for pulse effect (0.5 -> 1 -> 0.5)
- Particles are wired to progress MotionValue through useTransform
- 3 primary + 2 amber colored particles foreshadow ACH/rewards split

**Result:** Gap CLOSED

### Human Verification Required

#### 1. Scroll Animation Smoothness
**Test:** Scroll through How It Works section on desktop
**Expected:** Animation maintains 60fps, no jank during card/path/particles/split phases
**Why human:** Performance feel cannot be verified programmatically

#### 2. Particle Animation Quality
**Test:** Scroll slowly through 25%-70% of the section
**Expected:** 5 particles flow along the path in a staggered trail, fading in/out smoothly
**Why human:** Visual appearance and timing feel need human judgment

#### 3. Progress Dots Click Navigation
**Test:** Click each progress dot while in the section
**Expected:** Page smoothly scrolls to corresponding animation phase
**Why human:** Scroll target accuracy and smooth behavior need visual confirmation

#### 4. Mobile Hidden Dots
**Test:** View section on viewport < 768px
**Expected:** Progress dots not visible
**Why human:** Responsive breakpoint behavior

#### 5. Reduced Motion Fallback
**Test:** Enable "Reduce motion" in OS settings, reload page
**Expected:** See static 3-card grid instead of scroll animation
**Why human:** OS preference detection

#### 6. Animation Phase Transitions
**Test:** Scroll slowly through section
**Expected:** Card appears first, path draws with particles, then ACH/rewards split - transitions smooth
**Why human:** Visual timing and overlap perception

### Summary

Phase 7 goal is achieved. All 7 observable truths are verified, all 4 artifacts pass 3-level verification (exists, substantive, wired), all key links are wired correctly, and all 4 requirements are satisfied.

The previous gap (missing particles) has been closed by plan 07-04-PLAN.md. The implementation adds 5 SVG circle particles that animate along the payment flow path using CSS offset-path with scroll-linked offset-distance. Particles are staggered, have smooth fade in/out, and subtle scale pulse for visual polish.

---

*Verified: 2026-02-02T23:15:00Z*
*Verifier: Claude (gsd-verifier)*
*Re-verification after gap closure: Yes*
