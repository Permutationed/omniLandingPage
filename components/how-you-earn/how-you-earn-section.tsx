'use client'

import { useReducedMotion } from 'framer-motion'
import { TuitionRewards } from './tuition-rewards'
import { UnlockRate } from './unlock-rate'
import { DiscoverRewards } from './discover-rewards'
import { RewardsLoop } from './rewards-loop'

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
      <TuitionRewards />
      <UnlockRate />
      <DiscoverRewards />
      <RewardsLoop />
    </div>
  )
}
