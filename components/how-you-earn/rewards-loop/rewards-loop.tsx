'use client'

import { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'
import { PointsBadge } from './points-badge'
import { SourceBreakdown } from './source-breakdown'
import { FlowLines } from './flow-lines'
import { TuitionCard } from './tuition-card'

/**
 * Section 4: Redeem & Repeat
 *
 * Shows how points from all sources combine and reduce the next tuition bill
 * Demonstrates the virtuous cycle of earning and redeeming
 */
export function RewardsLoop() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Map scroll to animation progress
  const animationProgress = useTransform(
    scrollYProgress,
    [0.1, 0.75],
    [0, 1]
  )

  return (
    <section
      ref={sectionRef}
      className="bg-card rounded-xl p-6 md:p-8 lg:p-10 shadow-md border border-border/50 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          style={{
            opacity: useTransform(animationProgress, [0, 0.08], [0, 1]),
            y: useTransform(animationProgress, [0, 0.08], [30, 0]),
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Redeem & Repeat
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Your points work toward what matters most —
            reducing your next tuition bill.
          </p>
        </motion.div>

        {/* Points badge */}
        <PointsBadge
          progress={animationProgress}
          appearRange={[0.1, 0.3]}
        />

        {/* Source breakdown */}
        <div className="mt-8">
          <SourceBreakdown
            progress={animationProgress}
            appearRange={[0.3, 0.5]}
          />
        </div>

        {/* Flow lines */}
        <div className="my-4">
          <FlowLines
            progress={animationProgress}
            drawRange={[0.45, 0.6]}
          />
        </div>

        {/* Tuition card */}
        <TuitionCard
          progress={animationProgress}
          appearRange={[0.55, 0.65]}
          reductionRange={[0.65, 0.8]}
        />
      </div>
    </section>
  )
}
