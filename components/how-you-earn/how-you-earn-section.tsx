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
    <div className="pt-16 pb-8 md:pt-24 md:pb-12 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left column */}
        <div className="space-y-6 lg:space-y-8">
          <section className="bg-card rounded-xl p-8 shadow-md border border-border/50">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Earn on Every Tuition Payment</h2>
            <p className="text-muted-foreground">
              Pay your (e.g.) $25,000 tuition through Omni. We handle the ACH transfer
              to your school — you earn up to 1% back. That's $250 in rewards.
            </p>
          </section>
          <section className="bg-card rounded-xl p-8 shadow-md border border-border/50">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Discover Local Rewards</h2>
            <p className="text-muted-foreground">
              Find participating merchants near campus through the Omni app.
              Earn 3x to 10x points at select locations.
            </p>
          </section>
        </div>
        {/* Right column - staggered */}
        <div className="space-y-6 lg:space-y-8 lg:pt-48">
          <section className="bg-card rounded-xl p-8 shadow-md border border-border/50">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Unlock Better Tuition Rates</h2>
            <p className="text-muted-foreground">
              Use your Omni card for everyday purchases. Spend 20% of tuition to
              unlock 0.5% back. Spend 40% to unlock 1.0% back.
            </p>
          </section>
          <section className="bg-card rounded-xl p-8 shadow-md border border-border/50">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Redeem & Repeat</h2>
            <p className="text-muted-foreground">
              Your points work toward what matters most — reducing your next
              tuition bill. Then earn more the following semester.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

/**
 * Main "How You Earn" section with two-column staggered layout
 * Left column: TuitionRewards, DiscoverRewards
 * Right column: UnlockRate, RewardsLoop (offset down for stagger effect)
 */
export function HowYouEarnSection() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <HowYouEarnStatic />
  }

  return (
    <div id="how-it-works" className="pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left column */}
          <div className="space-y-6 lg:space-y-8">
            <TuitionRewards />
            <DiscoverRewards />
          </div>
          {/* Right column - staggered down */}
          <div className="space-y-6 lg:space-y-8 lg:pt-48">
            <UnlockRate />
            <RewardsLoop />
          </div>
        </div>
      </div>
    </div>
  )
}
