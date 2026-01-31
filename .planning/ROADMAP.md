# Roadmap

**Project:** Omni Card Landing Page
**Created:** 2025-01-31
**Phases:** 10

## Overview

This roadmap derives 10 phases from the 35 v1 requirements, respecting the architecture research's dependency graph: design tokens feed Tailwind which enables shadcn/ui; animation infrastructure precedes 3D; 3D infrastructure precedes the card; scroll section requires both. Each phase delivers a coherent, verifiable capability that unblocks subsequent work.

## Phases

### Phase 1: Foundation

**Goal:** Project infrastructure is in place with design system tokens ready for all components
**Depends on:** Nothing (first phase)
**Requirements:** CORE-01, CORE-02

**Success Criteria:**
1. Next.js app renders with correct fonts and metadata
2. Design tokens (colors, spacing, typography, radii, shadows) are defined in CSS variables
3. Tailwind config extends tokens correctly (classes like `bg-primary` work)
4. shadcn/ui is initialized and a test component (Button) renders with correct styling

**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md — Next.js project with Tailwind v4 and design tokens
- [x] 01-02-PLAN.md — shadcn/ui integration and Button verification

---

### Phase 2: Layout Components

**Goal:** Navigation and footer provide consistent page structure across all viewports
**Depends on:** Phase 1
**Requirements:** NAV-01, NAV-02, NAV-03, NAV-04, FOOT-01, FOOT-02

**Success Criteria:**
1. User sees sticky navigation with logo, section links, and "Join Waitlist" CTA on scroll
2. User can tap hamburger on mobile and navigate via slide-out menu
3. User observes magnetic hover effect when cursor approaches CTA button
4. User clicks nav link and page smoothly scrolls to target section
5. User sees footer with logo, nav links, legal placeholders, and social icons

**Plans:** 4 plans

Plans:
- [ ] 02-01-PLAN.md — Dependencies and animation infrastructure (motion, shadcn Sheet, hooks)
- [ ] 02-02-PLAN.md — Navigation components (Magnetic, MobileNav, HeaderNav, Header)
- [ ] 02-03-PLAN.md — Footer components (FooterSocials, Footer)
- [ ] 02-04-PLAN.md — Layout integration and visual verification

---

### Phase 3: Hero Section

**Goal:** User lands on a compelling hero with clear value proposition and can join waitlist
**Depends on:** Phase 2
**Requirements:** HERO-04, HERO-05, HERO-06, HERO-07, TRUST-01

**Success Criteria:**
1. User sees headline and subhead fade in with staggered animation on page load
2. User sees animated gradient mesh background with slow drift effect
3. User can enter email in inline capture field with micro-validation feedback
4. User sees trust microcopy line ("Bank-level security | No fees for schools | Rewards from day one")
5. User sees 3-4 metric cards with hover lift effect below hero

**Plans:** (created by /gsd:plan-phase)

---

### Phase 4: Animation Infrastructure

**Goal:** Reusable animation system is in place for scroll reveals and interactions
**Depends on:** Phase 3
**Requirements:** CORE-03, CORE-04

**Success Criteria:**
1. Elements animate into view on scroll with consistent timing across sections
2. User with prefers-reduced-motion sees static content without animations
3. Animations maintain 60fps (no jank visible on scroll)
4. Animation variants are centralized and reusable across components

**Plans:** (created by /gsd:plan-phase)

---

### Phase 5: 3D Infrastructure

**Goal:** Single R3F Canvas is rendering with dynamic imports and fallback handling
**Depends on:** Phase 4
**Requirements:** (infrastructure phase - no direct requirements, enables HERO-01, HERO-02, HERO-03)

**Success Criteria:**
1. Single Canvas with View.Port renders without hydration errors
2. 3D content loads asynchronously (no blocking above-fold render)
3. Placeholder/skeleton shows while 3D loads
4. iOS Safari WebGL context loss is handled gracefully (recovery or fallback)

**Plans:** (created by /gsd:plan-phase)

---

### Phase 6: 3D Card

**Goal:** Interactive 3D card in hero responds to user input and looks premium
**Depends on:** Phase 5
**Requirements:** HERO-01, HERO-02, HERO-03

**Success Criteria:**
1. User sees 3D credit card with metallic materials and holographic shimmer
2. User moves cursor and card tilts/rotates to follow
3. User on mobile tilts device and card responds to gyroscope
4. 3D card maintains 60fps during interaction

**Plans:** (created by /gsd:plan-phase)

---

### Phase 7: How It Works (Scroll Section)

**Goal:** User understands payment flow through scroll-driven animation
**Depends on:** Phase 4, Phase 5
**Requirements:** HIW-01, HIW-02, HIW-03, HIW-04

**Success Criteria:**
1. User scrolls through 150-200vh section with progress-linked animation
2. User sees animated payment flow: card swipe, particles along path, split to ACH + rewards
3. User can click progress dots to jump between steps
4. User with prefers-reduced-motion sees static step cards instead of animation

**Plans:** (created by /gsd:plan-phase)

---

### Phase 8: Content Sections

**Goal:** User can explore features, audience tabs, and discovery preview
**Depends on:** Phase 4
**Requirements:** AUD-01, AUD-02, AUD-03, FEAT-01, FEAT-02, FEAT-03, FEAT-04, DISC-01, DISC-02

**Success Criteria:**
1. User sees bento grid with 6 feature cards that lift and animate on hover
2. User can tab between Students/Parents and Partner Merchants with sliding underline
3. User sees content crossfade smoothly when switching tabs
4. User can navigate feature cards via keyboard (focusable, visible focus states)
5. User sees app mockup with map UI and proximity notification preview

**Plans:** (created by /gsd:plan-phase)

---

### Phase 9: Interactive Features

**Goal:** User can calculate rewards and find answers in FAQ
**Depends on:** Phase 4
**Requirements:** CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, FAQ-01, FAQ-02, TRUST-02

**Success Criteria:**
1. User can drag tuition slider ($5k-$80k) or type amount directly
2. User can drag everyday spend slider ($200-$2,000/mo)
3. User sees odometer-style animated counters update as sliders move
4. User sees total points, dollar value, and effective tuition reduction percentage
5. User can expand/collapse FAQ accordion items with smooth height animation
6. User can expand security section to see compliance details

**Plans:** (created by /gsd:plan-phase)

---

### Phase 10: Final CTA & Polish

**Goal:** User converts via final CTA and page passes all quality gates
**Depends on:** Phase 9
**Requirements:** CTA-01, CTA-02, CTA-03, CORE-05, CORE-06, CORE-07

**Success Criteria:**
1. User sees big emotional headline and inline email capture at page bottom
2. User experiences magnetic hover on CTA button
3. User sees success state with checkmark and confirmation after signup
4. Page scores 90+ on Lighthouse performance audit
5. Page passes WCAG 2.1 AA accessibility audit (keyboard nav, screen reader)
6. Page has correct SEO meta tags and Open Graph for social sharing

**Plans:** (created by /gsd:plan-phase)

---

## Progress

| Phase | Status | Completed |
|-------|--------|-----------|
| 1 - Foundation | Complete | 2026-01-31 |
| 2 - Layout Components | Planned | - |
| 3 - Hero Section | Not started | - |
| 4 - Animation Infrastructure | Not started | - |
| 5 - 3D Infrastructure | Not started | - |
| 6 - 3D Card | Not started | - |
| 7 - How It Works | Not started | - |
| 8 - Content Sections | Not started | - |
| 9 - Interactive Features | Not started | - |
| 10 - Final CTA & Polish | Not started | - |

---

*Roadmap for milestone: v1.0*
