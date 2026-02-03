// Isometric color palette - Premium fintech aesthetic
export const ISO_COLORS = {
  // Primary - Deep indigo with presence
  primary: 'oklch(0.50 0.22 270)',
  primaryLight: 'oklch(0.70 0.18 270)',
  primaryDark: 'oklch(0.35 0.20 270)',

  // Surfaces for isometric faces - Warm neutrals with depth
  surfaceTop: 'oklch(0.97 0.01 250)',
  surfaceLeft: 'oklch(0.88 0.02 250)',
  surfaceRight: 'oklch(0.82 0.03 250)',
  surfaceFront: 'oklch(0.92 0.015 250)',

  // Accents - Vibrant and distinct
  success: 'oklch(0.65 0.22 160)',      // Emerald green
  successLight: 'oklch(0.85 0.15 160)',
  amber: 'oklch(0.78 0.18 75)',          // Warm amber
  amberDark: 'oklch(0.65 0.20 65)',
  blue: 'oklch(0.55 0.20 250)',          // Deep blue

  // Merchant colors - Distinct and recognizable
  coffee: 'oklch(0.45 0.12 50)',         // Rich brown
  books: 'oklch(0.50 0.22 270)',         // Primary indigo
  food: 'oklch(0.60 0.22 30)',           // Warm coral
  retail: 'oklch(0.55 0.18 230)',        // Steel blue

  // Shadow - Deeper for better depth
  shadow: 'oklch(0.15 0.03 270 / 0.20)',
  shadowLight: 'oklch(0.20 0.02 270 / 0.10)',
} as const

// Animation timing
export const TIMING = {
  stagger: 0.1,
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
  spring: {
    stiff: { type: 'spring', stiffness: 300, damping: 30 },
    bouncy: { type: 'spring', stiffness: 400, damping: 25 },
    smooth: { type: 'spring', stiffness: 200, damping: 40 },
  },
} as const

// Example numbers used in animations
export const EXAMPLE_DATA = {
  tuition: 25000,
  rewardRate: 0.01, // 1%
  rewardAmount: 250, // 1% of 25k
  thresholds: {
    tier1: { spend: 0.20, rate: 0.005 }, // 20% spend -> 0.5% rate
    tier2: { spend: 0.40, rate: 0.01 },  // 40% spend -> 1.0% rate
  },
  merchantMultipliers: [3, 5, 7, 10],
  totalPoints: 12450,
  pointValue: 0.01, // 1 point = $0.01
} as const
