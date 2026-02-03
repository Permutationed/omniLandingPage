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
- [x] 02-01-PLAN.md — Dependencies and animation infrastructure (motion, shadcn Sheet, hooks)
- [x] 02-02-PLAN.md — Navigation components (Magnetic, MobileNav, HeaderNav, Header)
- [x] 02-03-PLAN.md — Footer components (FooterSocials, Footer)
- [x] 02-04-PLAN.md — Layout integration and visual verification

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

**Plans:** 2 plans

Plans:
- [x] 03-01-PLAN.md — Setup (Input, gradient CSS, variants) and EmailCapture component
- [x] 03-02-PLAN.md — HeroContent, MetricCards, page integration, visual verification

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

**Plans:** 1 plan

Plans:
- [x] 04-01-PLAN.md — ScrollReveal component, extended variants, and verification

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

**Plans:** 3 plans

Plans:
- [x] 05-01-PLAN.md — Install R3F v9 ecosystem and configure Next.js
- [x] 05-02-PLAN.md — Scene3D canvas infrastructure with View.Port pattern
- [x] 05-03-PLAN.md — Placeholder components and hero integration

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

**Plans:** 3 plans

Plans:
- [x] 06-01-PLAN.md — Install maath and create CardModel with premium materials
- [x] 06-02-PLAN.md — useDeviceOrientation hook and CardInteractive with cursor tracking
- [x] 06-03-PLAN.md — Full integration into HeroCard3D with Environment

---

### Phase 7: How You Earn (4-Section Animated Explainer)

**Goal:** User understands the complete Omni earning ecosystem through 4 premium scroll-animated sections
**Depends on:** Phase 4
**Requirements:** HIW-01, HIW-02, HIW-03, HIW-04

**Success Criteria:**
1. User sees "Earn on Tuition" section with isometric bank→school ACH flow and animated $250 reward counter
2. User sees "Unlock Better Rates" section with progress gauge showing 20%→0.5% and 40%→1.0% thresholds
3. User sees "Discover Local Rewards" section with isometric campus map and 3x-10x merchant pins appearing
4. User sees "Rewards Loop" section showing points combining and reducing next tuition bill
5. All animations are scroll-triggered and maintain 60fps
6. User with prefers-reduced-motion sees static isometric illustrations with all content

**Plans:** 9 plans (4 original deprecated, 5 new)

Plans (deprecated - to be deleted):
- [x] ~~07-01-PLAN.md~~ — (deprecated) Section infrastructure
- [x] ~~07-02-PLAN.md~~ — (deprecated) Payment flow animation
- [x] ~~07-03-PLAN.md~~ — (deprecated) Progress dots navigation
- [x] ~~07-04-PLAN.md~~ — (deprecated) Path particles

Plans (v2 redesign):
- [ ] 07-05-PLAN.md — Cleanup old implementation and create new section infrastructure
- [ ] 07-06-PLAN.md — "Earn on Tuition" section with isometric buildings and ACH flow
- [ ] 07-07-PLAN.md — "Unlock Better Rates" section with progress gauge and threshold animations
- [ ] 07-08-PLAN.md — "Discover Local Rewards" section with isometric map and merchant pins
- [ ] 07-09-PLAN.md — "Rewards Loop" section with points flow and tuition reduction

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
| 2 - Layout Components | Complete | 2026-02-01 |
| 3 - Hero Section | Complete | 2026-02-01 |
| 4 - Animation Infrastructure | Complete | 2026-01-31 |
| 5 - 3D Infrastructure | Complete | 2026-01-31 |
| 6 - 3D Card | Complete | 2026-02-02 |
| 7 - How You Earn | In Progress (v2 redesign) | - |
| 8 - Content Sections | Not started | - |
| 9 - Interactive Features | Not started | - |
| 10 - Final CTA & Polish | Not started | - |

---

*Roadmap for milestone: v1.0*
