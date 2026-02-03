# Phase 7 Research v2: How You Earn Animations

## Overview

Complete redesign of "How It Works" section into 4 full-width animated sections explaining the Omni earning ecosystem. Replaces the previous single scroll animation.

## Product Model (Source of Truth)

### Three Earning Streams

1. **Tuition Payments (up to 1%)**
   - Parents/students pay tuition through Omni platform
   - Omni does ACH transfer to school on their behalf
   - Earn up to 1% back in rewards
   - Rate unlocked by everyday card spending

2. **Everyday Purchases (1x)**
   - Use Omni student credit card anywhere
   - Earn 1x points on all purchases
   - Spending unlocks tuition reward rate:
     - 20% of tuition spent → 0.5% tuition rate
     - 40% of tuition spent → 1.0% tuition rate

3. **Partner Merchants (3x-10x)**
   - Discover participating merchants near campus via app
   - Earn 3x-10x points at these locations
   - Drives foot traffic to merchants

### Rewards Redemption

- All points go to single pool
- Redeem against NEXT tuition payment
- Creates virtuous cycle: pay → earn → reduce next bill → repeat

---

## Animation Research

### Sources Studied

- [Stripe gradient mesh](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/) - WebGL, lightweight
- [Build UI animated counter](https://buildui.com/recipes/animated-counter) - Spring + useTransform
- [Rive fintech examples](https://rive.app/marketplace/4147-8565-fintech-approval/) - State machines
- [Motion.dev scroll animations](https://motion.dev/docs/react-animation) - useScroll, useTransform
- [LottieFiles progress](https://lottiefiles.com/free-animations/progress) - Pre-built animations

### Key Patterns

| Pattern | Implementation | Performance |
|---------|---------------|-------------|
| Scroll-linked | useScroll + useTransform | GPU-only, 60fps |
| Number counter | Spring animation on digits | Lightweight |
| SVG path draw | strokeDashoffset animation | GPU-accelerated |
| Staggered reveals | variants + staggerChildren | Declarative |
| Progress fill | scaleX or SVG arc | Transform-only |

---

## Isometric Design System

### Grid & Angles

```
Standard isometric projection:
- 30° from horizontal (true isometric)
- 2:1 pixel ratio for easy alignment
- All parallel lines remain parallel (no vanishing point)

Axis system:
     Y (up)
      │
      │
      └────── X (right-forward)
     /
    /
   Z (left-forward)
```

### Color Palette (Extending Brand)

```css
/* Primary (from existing tokens) */
--iso-primary: oklch(0.65 0.25 260);      /* Purple - main accent */
--iso-primary-light: oklch(0.80 0.15 260); /* Light purple - highlights */
--iso-primary-dark: oklch(0.45 0.20 260);  /* Dark purple - shadows */

/* Surfaces */
--iso-surface-top: oklch(0.98 0.01 260);   /* Near white - top faces */
--iso-surface-left: oklch(0.90 0.02 260);  /* Light gray - left faces */
--iso-surface-right: oklch(0.85 0.02 260); /* Medium gray - right faces */

/* Accents */
--iso-success: oklch(0.70 0.20 145);       /* Green - completion states */
--iso-amber: oklch(0.75 0.15 85);          /* Amber - rewards highlight */
--iso-blue: oklch(0.65 0.20 240);          /* Blue - flow lines */

/* Shadows */
--iso-shadow: oklch(0.20 0.05 260 / 0.15); /* Soft purple shadow */
```

### Building Blocks

#### Bank Building (Source)
```
        ____
       /    \     ← Roof (primary-light)
      /______\
     |  $$   |    ← Front face (surface-left)
     | [==]  |       with dollar sign icon
     |_[==]__|    ← Columns detail
    /________\    ← Base (surface-right)
```
- Height: 80px
- Width: 60px
- Represents: User's bank account

#### School Building (Destination)
```
        /\
       /  \       ← Spire/tower
      |    |
     _|____|_
    |        |    ← Main building
    | [=][=] |       with windows
    |________|
```
- Height: 100px
- Width: 80px
- Represents: University/school

#### Credit Card (Omni Card)
```
    ___________
   /          /|
  /   OMNI   / |   ← Top face with logo
 /_________ /  |
|    ****  |  /    ← Front face with chip
|__________|/
```
- Aspect: 3.375:2.125 (standard credit card)
- Chip detail on front
- "OMNI" text on top

#### Phone/App (Discovery)
```
    _______
   |       |
   | [map] |      ← Screen with map UI
   |  pins |
   |_______|
   |   O   |      ← Home button area
   |_______|
```
- Height: 120px
- Width: 60px
- Shows stylized map on screen

#### Merchant Pin
```
      /\
     /  \
    | 5x |        ← Multiplier badge
     \  /
      \/
      ||          ← Pin stem
```
- Color-coded by multiplier
- Bounce animation on appear

---

## Section Specifications

### Section 1: Earn on Tuition

**Viewport:** 100vh minimum, content-driven height
**Scroll behavior:** Animate on viewport entry (whileInView)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌─────────────┐                                              │
│   │             │     EARN ON EVERY                            │
│   │   [BANK]    │     TUITION PAYMENT                          │
│   │             │                                              │
│   └──────┬──────┘     Pay your $25,000 tuition through Omni.   │
│          │            We handle the ACH transfer to your       │
│          │            school — you earn up to 1% back.         │
│   ──── ACH ────►                                               │
│          │            ┌──────────────────────┐                 │
│          │            │   +$250              │                 │
│   ┌──────▼──────┐     │   in rewards         │  ← Counter     │
│   │             │     └──────────────────────┘                 │
│   │  [SCHOOL]   │                                              │
│   │             │     That's money back on something           │
│   └─────────────┘     you're already paying.                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Animation Sequence:**
1. Bank building fades in (0-20% of animation)
2. ACH flow line draws from bank (20-50%)
3. School building fades in at destination (30-50%)
4. Checkmark appears on school (50-60%)
5. Reward counter animates up $0 → $250 (60-100%)
6. Particle burst on counter completion

**SVG Elements:**
- Bank building (isometric)
- School building (isometric)
- Dashed flow line with animated dash
- Dollar particles along path

**Text Content:**
- Headline: "Earn on Every Tuition Payment"
- Subhead: "Pay your $25,000 tuition through Omni. We handle the ACH transfer to your school — you earn up to 1% back."
- Counter: "$0" → "$250" (animated)
- Caption: "That's money back on something you're already paying."

---

### Section 2: Unlock Better Rates

**Viewport:** 100vh minimum
**Scroll behavior:** Progress bar fills as section scrolls into view

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         UNLOCK BETTER TUITION RATES                            │
│                                                                 │
│         Use your Omni card for everyday purchases.             │
│         The more you spend, the more you earn on tuition.      │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                                                         │  │
│   │   [Card icon]  YOUR EVERYDAY SPENDING                   │  │
│   │                                                         │  │
│   │   ┌───────────────────────────────────────────────────┐│  │
│   │   │████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░││  │
│   │   └───────────────────────────────────────────────────┘│  │
│   │            ↑                        ↑                   │  │
│   │          20%                      40%                   │  │
│   │        ┌─────┐                  ┌─────┐                │  │
│   │        │0.5% │                  │1.0% │ ← Unlocks      │  │
│   │        └─────┘                  └─────┘                │  │
│   │                                                         │  │
│   │   Current Tuition Rate: [ 0.5% ] → [ 1.0% ]            │  │
│   │                                                         │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│         Spend $5,000 on everyday purchases →                   │
│         Unlock 0.5% on your $25,000 tuition ($125)            │
│                                                                 │
│         Spend $10,000 on everyday purchases →                  │
│         Unlock 1.0% on your $25,000 tuition ($250)            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Animation Sequence:**
1. Card icon and header fade in (0-15%)
2. Progress bar container appears (15-25%)
3. Progress bar fills to 20% mark (25-45%)
4. First threshold badge unlocks with glow (45-55%)
5. Progress continues to 40% (55-75%)
6. Second threshold badge unlocks (75-85%)
7. Rate display animates 0.5% → 1.0% (85-100%)

**Visual Elements:**
- Isometric credit card (small, decorative)
- Progress bar with gradient fill
- Threshold markers with lock → unlock animation
- Rate badges that "pop" when reached
- Glow effect on active threshold

**Micro-interactions:**
- Progress bar has subtle pulse
- Threshold badges rotate slightly when unlocked
- Numbers use odometer animation

---

### Section 3: Discover Local Rewards

**Viewport:** 100vh minimum
**Scroll behavior:** Map pins appear sequentially as scrolling

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   DISCOVER LOCAL REWARDS                                        │
│                                                                 │
│   Find participating merchants near                             │
│   campus. Earn 3x to 10x points.                               │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                                                         │  │
│   │           🏫                                            │  │
│   │          Campus                                         │  │
│   │                                                         │  │
│   │     ☕5x              📚10x                             │  │
│   │                  👤                                     │  │
│   │                                                         │  │
│   │          🍕3x                    🍔5x                   │  │
│   │                                                         │  │
│   │                      🏪7x                               │  │
│   │                                                         │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │  📍 You're near Campus Coffee — earn 5x points today   │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Animation Sequence:**
1. Section title fades in (0-10%)
2. Isometric map base appears (10-20%)
3. Campus building appears at center (20-30%)
4. User icon appears (30-35%)
5. Merchant pins appear one by one with bounce (35-75%)
   - Pin 1 (coffee): 35-42%
   - Pin 2 (books): 42-49%
   - Pin 3 (pizza): 49-56%
   - Pin 4 (burger): 56-63%
   - Pin 5 (store): 63-70%
6. Notification toast slides up (75-85%)
7. Toast content types in or fades in (85-100%)

**Isometric Map Elements:**
- Base: Soft grid suggesting streets
- Campus: Central larger building with flag
- Merchants: Small isometric storefronts
- Pins: Floating above each merchant with multiplier
- User: Small figure or dot with pulse ring

**Merchant Types:**
| Merchant | Icon | Multiplier | Color |
|----------|------|------------|-------|
| Coffee shop | ☕ | 5x | Brown |
| Bookstore | 📚 | 10x | Purple (primary) |
| Pizza | 🍕 | 3x | Orange |
| Fast food | 🍔 | 5x | Yellow |
| Convenience | 🏪 | 7x | Blue |

**Notification Toast:**
- Slides up from bottom of map
- Gradient border (primary)
- Icon + text
- Subtle shadow

---

### Section 4: The Rewards Loop

**Viewport:** 100vh minimum
**Scroll behavior:** Points flow animation, then reduction counter

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         REDEEM & REPEAT                                         │
│                                                                 │
│         Your points work toward what matters most —             │
│         reducing your next tuition bill.                        │
│                                                                 │
│                    ┌───────────────┐                           │
│                    │  YOUR POINTS  │                           │
│                    │    12,450     │  ← Combined from all      │
│                    └───────┬───────┘                           │
│                            │                                    │
│           ┌────────────────┼────────────────┐                  │
│           │                │                │                   │
│           ▼                ▼                ▼                   │
│       [Tuition]      [Everyday]      [Merchants]               │
│         250            8,200           4,000                    │
│                            │                                    │
│                            ▼                                    │
│              ┌─────────────────────────┐                       │
│              │   NEXT SEMESTER         │                       │
│              │                         │                       │
│              │   $25,000  →  $24,875   │                       │
│              │            ───────────  │                       │
│              │            $125 OFF     │                       │
│              └─────────────────────────┘                       │
│                            │                                    │
│                            ▼                                    │
│              ┌─────────────────────────┐                       │
│              │   ↺ Earn more next      │                       │
│              │     semester            │                       │
│              └─────────────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Animation Sequence:**
1. Header fades in (0-10%)
2. Points total appears with counter animation (10-25%)
3. Lines draw to three source categories (25-40%)
4. Source amounts count up (40-55%)
5. Arrow draws down to tuition card (55-65%)
6. Tuition card appears (65-70%)
7. Original amount shows, then animates reduction (70-85%)
8. "OFF" badge pops in with celebration (85-90%)
9. Loop arrow and text fade in (90-100%)

**Visual Elements:**
- Central points badge (large, prominent)
- Flow lines (animated draw)
- Source icons (card, map pin, building)
- Tuition card (isometric, tilted slightly)
- Reduction animation (strikethrough + new number)
- Loop arrow (circular, animated)

**Numbers Used:**
- Total points: 12,450
- From tuition: 250 (1% of $25k)
- From everyday: 8,200
- From merchants: 4,000
- Tuition: $25,000 → $24,875.50
- Savings: $124.50 (using 1 point = 1 cent)

---

## Technical Specifications

### Dependencies

**Required (new):**
```bash
npm install @lottiefiles/react-lottie-player  # For Lottie integration
# OR
npm install @rive-app/react-canvas            # For Rive integration
```

**Already installed:**
- framer-motion (Motion)
- tailwindcss

### Component Architecture

```
components/
├── how-you-earn/                    # New directory (replaces how-it-works)
│   ├── index.ts                     # Barrel export
│   ├── how-you-earn-section.tsx     # Main section wrapper
│   │
│   ├── tuition-rewards/
│   │   ├── tuition-rewards.tsx      # Section 1 main component
│   │   ├── isometric-bank.tsx       # SVG bank building
│   │   ├── isometric-school.tsx     # SVG school building
│   │   ├── ach-flow-path.tsx        # Animated flow line
│   │   └── reward-counter.tsx       # Odometer counter
│   │
│   ├── unlock-rate/
│   │   ├── unlock-rate.tsx          # Section 2 main component
│   │   ├── progress-gauge.tsx       # Animated progress bar
│   │   ├── threshold-badge.tsx      # Lock/unlock badges
│   │   └── rate-display.tsx         # Animated rate number
│   │
│   ├── discover-rewards/
│   │   ├── discover-rewards.tsx     # Section 3 main component
│   │   ├── isometric-map.tsx        # Base map with grid
│   │   ├── campus-building.tsx      # Central campus
│   │   ├── merchant-pin.tsx         # Individual pin component
│   │   └── notification-toast.tsx   # Bottom notification
│   │
│   ├── rewards-loop/
│   │   ├── rewards-loop.tsx         # Section 4 main component
│   │   ├── points-badge.tsx         # Central points display
│   │   ├── flow-diagram.tsx         # Animated flow lines
│   │   ├── tuition-card.tsx         # Isometric tuition bill
│   │   └── loop-indicator.tsx       # Circular arrow
│   │
│   └── shared/
│       ├── isometric-utils.ts       # Isometric transform helpers
│       ├── scroll-section.tsx       # Reusable scroll-animated section
│       ├── odometer.tsx             # Reusable number animation
│       └── constants.ts             # Shared values (colors, timing)
```

### Scroll Animation Pattern

Each section uses this pattern:

```typescript
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ScrollSection({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]  // Trigger across viewport
  })

  return (
    <section ref={ref} className="min-h-screen relative">
      {/* Pass scrollYProgress to children for coordinated animations */}
      {children}
    </section>
  )
}
```

### Isometric Transform Utilities

```typescript
// Transform 2D coordinates to isometric
export function toIsometric(x: number, y: number, z: number = 0) {
  const isoX = (x - z) * Math.cos(Math.PI / 6)
  const isoY = (x + z) * Math.sin(Math.PI / 6) - y
  return { x: isoX, y: isoY }
}

// SVG transform for isometric elements
export function isometricTransform(x: number, y: number, z: number = 0) {
  const iso = toIsometric(x, y, z)
  return `translate(${iso.x}, ${iso.y})`
}
```

### Performance Requirements

- All animations use GPU-accelerated properties only: `transform`, `opacity`
- No layout-triggering animations
- Lazy load Lottie/Rive assets
- Use `will-change` sparingly and only during animation
- Target 60fps on mid-range mobile devices
- Respect `prefers-reduced-motion`: show static illustrations instead

### Reduced Motion Fallback

For users with `prefers-reduced-motion`, show:
- Static isometric illustrations
- All text content
- No scroll-linked animations
- Counters show final values immediately

---

## Lottie/Rive Enhancement Opportunities

### Where to Use Pre-built Animations

| Element | Enhancement | Source |
|---------|------------|--------|
| Checkmark on school | Lottie checkmark animation | LottieFiles |
| Particle burst | Lottie confetti | LottieFiles |
| Unlock badge | Rive state machine | Custom or marketplace |
| Notification slide | Could be Rive | Custom |
| Loop arrow | Lottie rotating arrow | LottieFiles |

### Recommended Lottie Files to Source

1. **Checkmark/Success**: Search "checkmark success green"
2. **Confetti/Celebration**: Search "confetti particles"
3. **Lock unlock**: Search "lock unlock security"
4. **Location pin bounce**: Search "map pin location"
5. **Circular arrow/loop**: Search "refresh loop arrow"

---

## Content Copy

### Section 1: Tuition Rewards
- **Headline:** "Earn on Every Tuition Payment"
- **Body:** "Pay your $25,000 tuition through Omni. We handle the ACH transfer to your school — you earn up to 1% back."
- **Counter label:** "in rewards"
- **Footer:** "That's money back on something you're already paying."

### Section 2: Unlock Rate
- **Headline:** "Unlock Better Tuition Rates"
- **Body:** "Use your Omni card for everyday purchases. The more you spend, the more you earn on tuition."
- **Threshold 1:** "Spend 20% of tuition → Earn 0.5% back"
- **Threshold 2:** "Spend 40% of tuition → Earn 1.0% back"
- **Example:** "Spend $10,000 on everyday purchases → Unlock 1.0% on your $25,000 tuition ($250)"

### Section 3: Discover Rewards
- **Headline:** "Discover Local Rewards"
- **Body:** "Find participating merchants near campus. Earn 3x to 10x points."
- **Notification:** "You're near Campus Coffee — earn 5x points today"

### Section 4: Rewards Loop
- **Headline:** "Redeem & Repeat"
- **Body:** "Your points work toward what matters most — reducing your next tuition bill."
- **Loop text:** "Earn more next semester"

---

## Success Metrics

### Visual Quality
- [ ] Isometric illustrations consistent in angle and style
- [ ] Color palette cohesive with brand
- [ ] Animations feel premium, not gimmicky
- [ ] Typography hierarchy clear

### Technical Quality
- [ ] 60fps on scroll
- [ ] No layout shifts
- [ ] Lottie/Rive assets under 100kb each
- [ ] Total section JS under 50kb (excluding shared deps)

### UX Quality
- [ ] Animations communicate product value
- [ ] User understands three earning streams
- [ ] User understands rate unlock mechanic
- [ ] User understands redemption loop
- [ ] Reduced motion users get full content
