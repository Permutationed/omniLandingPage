'use client'

import { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'
import { ProgressGauge } from './progress-gauge'
import { RateDisplay } from './rate-display'

/**
 * Section 2: Unlock Better Tuition Rates
 *
 * Shows how everyday spending unlocks higher tuition reward rates
 * Progress bar fills as user scrolls, unlocking threshold badges
 */
export function UnlockRate() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Map scroll to animation progress
  const animationProgress = useTransform(
    scrollYProgress,
    [0.15, 0.65],
    [0, 1]
  )

  return (
    <section
      ref={sectionRef}
      className="bg-card rounded-xl p-6 md:p-8 lg:p-10 shadow-md border border-border/50 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: useTransform(animationProgress, [0, 0.1], [0, 1]),
            y: useTransform(animationProgress, [0, 0.1], [30, 0]),
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Unlock Better Tuition Rates
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Use your Omni card for everyday purchases.
            The more you spend, the more you earn on tuition.
          </p>
        </motion.div>

        {/* Progress gauge card */}
        <motion.div
          className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border p-6 md:p-10 shadow-lg max-w-3xl mx-auto"
          style={{
            opacity: useTransform(animationProgress, [0.05, 0.15], [0, 1]),
            y: useTransform(animationProgress, [0.05, 0.15], [40, 0]),
          }}
        >
          <ProgressGauge
            progress={animationProgress}
            fillRange={[0.15, 0.75]}
          />
        </motion.div>

        {/* Rate display */}
        <div className="mt-12 md:mt-16">
          <RateDisplay
            progress={animationProgress}
            transitionAt={0.75}
          />
        </div>

      </div>
    </section>
  )
}
