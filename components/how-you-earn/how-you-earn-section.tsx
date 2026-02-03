'use client'

import { useReducedMotion } from 'framer-motion'
import { UnlockRate } from './unlock-rate'

// Placeholder components - will be replaced in subsequent plans
function TuitionRewardsPlaceholder() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Earn on Every Tuition Payment</h2>
        <p className="text-muted-foreground">Animation coming in 07-06</p>
      </div>
    </section>
  )
}

function DiscoverRewardsPlaceholder() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Discover Local Rewards</h2>
        <p className="text-muted-foreground">Animation coming in 07-08</p>
      </div>
    </section>
  )
}

function RewardsLoopPlaceholder() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Redeem & Repeat</h2>
        <p className="text-muted-foreground">Animation coming in 07-09</p>
      </div>
    </section>
  )
}

/**
 * Static fallback for reduced motion users
 */
function HowYouEarnStatic() {
  return (
    <div className="py-24 space-y-24">
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Earn on Every Tuition Payment</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Pay your $25,000 tuition through Omni. We handle the ACH transfer
          to your school — you earn up to 1% back. That's $250 in rewards.
        </p>
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Unlock Better Tuition Rates</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Use your Omni card for everyday purchases. Spend 20% of tuition to
          unlock 0.5% back. Spend 40% to unlock 1.0% back.
        </p>
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Discover Local Rewards</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find participating merchants near campus through the Omni app.
          Earn 3x to 10x points at select locations.
        </p>
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Redeem & Repeat</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your points work toward what matters most — reducing your next
          tuition bill. Then earn more the following semester.
        </p>
      </section>
    </div>
  )
}

/**
 * Main "How You Earn" section containing 4 animated subsections
 */
export function HowYouEarnSection() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <HowYouEarnStatic />
  }

  return (
    <div id="how-it-works">
      <TuitionRewardsPlaceholder />
      <UnlockRate />
      <DiscoverRewardsPlaceholder />
      <RewardsLoopPlaceholder />
    </div>
  )
}
