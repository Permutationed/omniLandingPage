# Omni Card Landing Page

## What This Is

A premium marketing landing page for Omni Card — a tuition payments + rewards platform that lets families earn credit card rewards on tuition without schools paying the usual 2-3% processing fee. The page targets parents and students, explaining how Omni works and converting visitors to a waitlist. No product is live yet; the goal is credibility, clarity, and conversion.

## Core Value

Visitors immediately understand that Omni unlocks rewards on tuition (their biggest expense) without costing schools anything — and trust the page enough to join the waitlist.

## Requirements

### Validated

(None yet — ship to validate)

### Active

#### Navigation & Structure
- [ ] Sticky navigation with logo, section links, and waitlist CTA
- [ ] Mobile-responsive hamburger menu
- [ ] Smooth scroll to sections

#### Hero Section
- [ ] 3D interactive card (React Three Fiber) with cursor-reactive tilt, metallic materials, holographic shimmer
- [ ] Mobile: gyroscope-reactive card tilt
- [ ] Headline + subhead with staggered fade-in
- [ ] Dual CTAs: "Join Waitlist" (inline email capture) + "See How It Works"
- [ ] Trust microcopy line (security, no fees, rewards)
- [ ] Subtle animated gradient mesh background

#### Trust Bar
- [ ] 3-4 metric cards with hover lift effect
- [ ] Metrics phrased as "built for" / "designed for" (no false claims)

#### How It Works (Scroll-Linked)
- [ ] Brief scroll-driven animation (150-200vh, not a marathon)
- [ ] Animated payment flow: card swipe → particles → split to ACH (school) + rewards (user)
- [ ] Clickable progress dots to jump between steps
- [ ] Clear final frame: "You earn, school pays nothing"

#### Who It's For (Audience Tabs)
- [ ] Tab switcher: Students & Parents | Schools | Issuers
- [ ] Smooth crossfade between tab content
- [ ] Sliding underline indicator on active tab

#### Feature Grid (Bento)
- [ ] 6 feature cards with hover lift + icon animation
- [ ] Features: Rewards on Tuition, Zero School Fees, Pay Over Time, Smart Underwriting, Real-Time Tracking, Bank-Level Security
- [ ] Keyboard accessible (focusable cards)

#### Interactive Calculator
- [ ] Tuition slider ($5k–$80k)
- [ ] Everyday spend slider ($200–$2,000/mo)
- [ ] Typed input alternative for both sliders
- [ ] Odometer-style animated counters for points and dollar value
- [ ] "Effective tuition reduction" percentage
- [ ] Visual: points particles flowing into rewards container
- [ ] CTA below calculator → waitlist

#### Security & Trust
- [ ] Accordion for compliance details
- [ ] Security badges with hover states
- [ ] Honest messaging (what's in place vs. planned)
- [ ] Content: encryption, fund custody, data privacy

#### Testimonials
- [ ] Carousel with drag/swipe and arrow navigation
- [ ] 2-3 placeholder quotes labeled as "Early design partners"
- [ ] Position dots (clickable)

#### Pricing / Early Access
- [ ] "Founding Member" tier card ($0, early access)
- [ ] "Coming Soon" placeholder tiers
- [ ] Hover lift effect on cards

#### FAQ
- [ ] Accordion with smooth height animation
- [ ] Questions: How Omni makes money, school integration, supported cards, data safety

#### Final CTA
- [ ] Big emotional headline
- [ ] Inline email capture (not modal)
- [ ] Magnetic hover button
- [ ] Success state: checkmark + confirmation

#### Footer
- [ ] Logo, nav links, legal placeholders
- [ ] Social icon placeholders
- [ ] Copyright

#### Cross-Cutting
- [ ] Light mode only
- [ ] Proposed color palette (premium, finance-appropriate)
- [ ] Design system: spacing scale, type scale, color tokens, radii, shadows
- [ ] 60fps animations (GPU transforms, lazy loading)
- [ ] `prefers-reduced-motion` respect
- [ ] Accessible: keyboard nav, screen reader friendly
- [ ] SEO meta tags, Open Graph
- [ ] Lighthouse performance optimized

### Out of Scope

- Dark mode — not needed for v1, light mode only
- Backend / database — static landing page with client-side waitlist capture
- Payment processing — no live transactions
- User accounts / authentication — waitlist only
- CMS integration — hardcoded content for v1
- Multi-language — English only
- A/B testing infrastructure — manual for now

## Context

**Product mechanics:**
- Parents pay tuition through Omni using an Omni-issued card
- Omni initiates ACH transfer to school with full student identifiers (name, ID, term)
- School receives funds exactly like normal ACH — nothing changes for them
- Omni charges the parent's card internally and issues rewards on tuition amount
- Optional pay-over-time offered at checkout with clear terms
- Payment behavior feeds underwriting for future credit

**Rewards structure (durable, not loss-leader):**
- Points-based system tied to long-term customer value
- Rewards unlocked/enhanced only when card is used as primary (tuition share + everyday spend thresholds)
- Economics supported by: interchange on everyday spend, merchant-funded offers, long-term issuer LTV
- Prevents arbitrage; rewards scale sustainably

**Calculator logic:**
- Inputs: Annual tuition, annual student spending
- Outputs: Total points, estimated rewards value ($), implied tuition cost reduction (%)

**Audiences:**
- Primary (this page): Students & parents — "earn rewards on your biggest expense"
- Secondary (tabs): Schools — "ACH payments, no fees, complete data"; Issuers — "acquire at a pivotal moment"

**Visual direction:**
- Stripe/Brex-level premium
- Light mode only
- Generous whitespace, crisp typography, subtle gradients
- Interactive and alive, but not overdone
- Trustworthy fintech aesthetic

## Constraints

- **Tech stack**: Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + React Three Fiber
- **Performance**: Must hit 90+ Lighthouse scores; 60fps animations
- **Accessibility**: WCAG 2.1 AA compliance
- **No backend**: Static site with client-side email capture (can integrate with waitlist service later)
- **No product**: Copy must be confident but not claim shipped features

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Light mode only | Finance = trust = clean light aesthetic; matches Stripe | — Pending |
| React Three Fiber for hero card | Premium 3D feel worth the bundle size for hero impression | — Pending |
| Brief scroll animation (How It Works) | Apple-style but not overdone; respects user time | — Pending |
| Inline email capture (not modal) | Lower friction, higher conversion | — Pending |
| shadcn/ui for primitives | Accessible, composable, Tailwind-native | — Pending |

---
*Last updated: 2025-01-31 after initialization*
