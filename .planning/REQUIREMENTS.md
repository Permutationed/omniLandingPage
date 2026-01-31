# Requirements: Omni Card Landing Page

**Defined:** 2025-01-31
**Core Value:** Visitors immediately understand Omni unlocks rewards on tuition + discover local merchant perks — and trust the page enough to join the waitlist.

## v1 Requirements

### Navigation

- [ ] **NAV-01**: Sticky nav with logo, section links, and "Join Waitlist" CTA
- [ ] **NAV-02**: Mobile hamburger menu with slide-out navigation
- [ ] **NAV-03**: Magnetic hover effect on CTA button (cursor-aware pull)
- [ ] **NAV-04**: Smooth scroll to sections on nav link click

### Hero

- [ ] **HERO-01**: 3D interactive card (React Three Fiber) with cursor-reactive tilt and rotation
- [ ] **HERO-02**: Metallic card materials with holographic shimmer effect
- [ ] **HERO-03**: Mobile: gyroscope-reactive card tilt
- [ ] **HERO-04**: Headline + subhead with staggered fade-in animation
- [ ] **HERO-05**: Inline email capture (single field, no modal) with micro-validation
- [ ] **HERO-06**: Trust microcopy line ("Bank-level security • No fees for schools • Rewards from day one")
- [ ] **HERO-07**: Animated gradient mesh background (slow drift)

### Trust & Social Proof

- [ ] **TRUST-01**: 3-4 metric cards with hover lift effect ("Built for $X in tuition" / "Zero fees for schools")
- [ ] **TRUST-02**: Security section with badges and expandable accordion for details

### How It Works

- [ ] **HIW-01**: Scroll-linked animation section (150-200vh, not a marathon)
- [ ] **HIW-02**: Animated payment flow: card swipe → particles along SVG path → split to ACH (school) + rewards (user)
- [ ] **HIW-03**: Clickable progress dots to jump between steps
- [ ] **HIW-04**: Static step cards fallback for prefers-reduced-motion

### Audience Tabs

- [ ] **AUD-01**: Tab switcher with sliding underline indicator
- [ ] **AUD-02**: Students & Parents tab: rewards on tuition, better loan rates, 3x-10x merchant points, discovery, proximity notifications
- [ ] **AUD-03**: Partner Merchants tab: student customer acquisition, visibility through Omni app, location-based notifications drive foot traffic

### Feature Grid

- [ ] **FEAT-01**: Bento grid layout with 6 feature cards
- [ ] **FEAT-02**: Features: Rewards on Tuition, Zero School Fees, Pay Over Time, Bank-Level Security, Real-Time Tracking, Smart Underwriting
- [ ] **FEAT-03**: Hover lift + icon animations on each card
- [ ] **FEAT-04**: Keyboard accessible (focusable cards)

### Interactive Calculator

- [ ] **CALC-01**: Tuition slider ($5k–$80k range) with typed input alternative
- [ ] **CALC-02**: Everyday spend slider ($200–$2,000/mo)
- [ ] **CALC-03**: Odometer-style animated counters for points and dollar value
- [ ] **CALC-04**: Output: total points, estimated value ($), effective tuition reduction (%)
- [ ] **CALC-05**: CTA below calculator → waitlist

### Discovery Preview

- [ ] **DISC-01**: App mockup showing map UI with nearby merchant markers
- [ ] **DISC-02**: Preview of proximity notification ("You're near Campus Coffee — earn 5x points today")

### FAQ

- [ ] **FAQ-01**: Accordion with smooth height animation (Framer Motion layout)
- [ ] **FAQ-02**: Questions: How Omni makes money, school integration, supported cards, data safety, how rewards work

### Final CTA

- [ ] **CTA-01**: Big emotional headline ("Stop leaving rewards on the table")
- [ ] **CTA-02**: Inline email capture with magnetic hover button
- [ ] **CTA-03**: Success state: checkmark + "You're on the list" confirmation

### Footer

- [ ] **FOOT-01**: Logo, nav links, legal placeholders (Privacy, Terms)
- [ ] **FOOT-02**: Social icon placeholders

### Cross-Cutting

- [ ] **CORE-01**: Light mode only (finance = trust = clean light aesthetic)
- [ ] **CORE-02**: Design system: spacing scale, type scale, color tokens, consistent radii/shadows
- [ ] **CORE-03**: 60fps animations (GPU transforms, lazy loading)
- [ ] **CORE-04**: prefers-reduced-motion support (legally required, WCAG 2.3.3)
- [ ] **CORE-05**: WCAG 2.1 AA accessibility (keyboard nav, screen reader friendly)
- [ ] **CORE-06**: SEO meta tags + Open Graph for social sharing
- [ ] **CORE-07**: Lighthouse 90+ performance score

## v2 Requirements

### Deferred Features

- **TEST-01**: Testimonials carousel (needs real early partner quotes)
- **PRICE-01**: Pricing tier cards (product not launched yet)
- **CALC-02**: Merchant bonus points in calculator (need merchant partner data)
- **DARK-01**: Dark mode toggle
- **I18N-01**: Multi-language support

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend / database | Static landing page; email capture via client-side service |
| User authentication | Waitlist only, no accounts |
| Payment processing | No live transactions |
| CMS integration | Hardcoded content for v1 |
| A/B testing infrastructure | Manual for now |
| Dark mode | Light mode sufficient for fintech trust aesthetic |
| Testimonials | Need real quotes from early partners first |
| Pricing tiers | Product not launched; focus on waitlist |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| (To be filled by roadmap creation) | | |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 0 (pending roadmap)
- Unmapped: 35

---
*Requirements defined: 2025-01-31*
*Last updated: 2025-01-31 after initial definition*
