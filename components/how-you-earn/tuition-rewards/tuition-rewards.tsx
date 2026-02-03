'use client'

import { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'
import { IsometricBank } from './isometric-bank'
import { IsometricSchool } from './isometric-school'
import { AchFlowPath } from './ach-flow-path'
import { RewardCounter } from './reward-counter'
import { EXAMPLE_DATA, ISO_COLORS } from '../shared/constants'

/**
 * Section 1: Earn on Every Tuition Payment
 *
 * Shows the core value prop — bank → ACH → school → rewards
 * Scroll-animated isometric illustrations
 */
export function TuitionRewards() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Map scroll to animation progress (0-1 during the visible portion)
  const animationProgress = useTransform(
    scrollYProgress,
    [0.1, 0.6], // Start at 10% visible, complete by 60%
    [0, 1]
  )

  return (
    <section
      ref={sectionRef}
      className="bg-card rounded-xl p-6 md:p-8 lg:p-10 shadow-md border border-border/50 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: useTransform(animationProgress, [0, 0.15], [0, 1]),
            y: useTransform(animationProgress, [0, 0.15], [30, 0]),
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Earn on Every Tuition Payment
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Pay your (e.g.) ${EXAMPLE_DATA.tuition.toLocaleString()} tuition through Omni.
            We handle the ACH transfer to your school — you earn up to{' '}
            {(EXAMPLE_DATA.rewardRate * 100).toFixed(0)}% back.
          </p>
        </motion.div>

        {/* Animation area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          {/* Bank */}
          <div className="flex flex-col items-center">
            <IsometricBank
              progress={animationProgress}
              fadeInRange={[0.1, 0.25]}
            />
          </div>

          {/* Flow path (horizontal on desktop, vertical on mobile) */}
          <div className="flex-1 max-w-md w-full px-4 lg:px-0">
            <div className="hidden lg:block">
              <AchFlowPath
                progress={animationProgress}
                drawRange={[0.25, 0.55]}
              />
            </div>
            {/* Mobile: vertical simplified flow */}
            <div className="lg:hidden flex flex-col items-center gap-2">
              <motion.div
                className="w-0.5 h-16"
                style={{
                  background: `linear-gradient(to bottom, ${ISO_COLORS.primary}, ${ISO_COLORS.blue})`,
                  scaleY: useTransform(animationProgress, [0.25, 0.55], [0, 1]),
                  transformOrigin: 'top',
                }}
              />
              <motion.span
                className="text-xs font-medium px-3 py-1.5 rounded-md text-white"
                style={{
                  backgroundColor: ISO_COLORS.primary,
                  opacity: useTransform(animationProgress, [0.35, 0.45], [0, 1]),
                }}
              >
                ACH Transfer
              </motion.span>
              <motion.div
                className="w-0.5 h-16"
                style={{
                  background: `linear-gradient(to bottom, ${ISO_COLORS.blue}, ${ISO_COLORS.success})`,
                  scaleY: useTransform(animationProgress, [0.45, 0.55], [0, 1]),
                  transformOrigin: 'top',
                }}
              />
            </div>
          </div>

          {/* School */}
          <div className="flex flex-col items-center">
            <IsometricSchool
              progress={animationProgress}
              fadeInRange={[0.4, 0.55]}
              checkmarkRange={[0.55, 0.65]}
            />
          </div>
        </div>

        {/* Reward counter */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <RewardCounter
            progress={animationProgress}
            counterRange={[0.65, 0.95]}
          />
        </div>
      </div>
    </section>
  )
}

export default TuitionRewards
