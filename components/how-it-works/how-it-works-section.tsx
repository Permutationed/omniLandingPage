'use client'

import { useRef } from 'react'
import { useScroll, useReducedMotion } from 'motion/react'
import { HowItWorksStatic } from './how-it-works-static'
import { ProgressDots } from './progress-dots'

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Render static fallback for users with reduced motion preference
  if (prefersReducedMotion) {
    return <HowItWorksStatic />
  }

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative h-[175vh]"
    >
      {/* Progress navigation - only shows when section visible (desktop only) */}
      <ProgressDots progress={scrollYProgress} containerRef={containerRef} />

      {/* Sticky viewport that pins during scroll */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-muted/30">
        {/* PaymentFlowAnimation will go here in Plan 02 */}
        {/* It will receive scrollYProgress as prop */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Animation content coming in Plan 02
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Scroll to see sticky behavior
          </p>
        </div>
      </div>
    </section>
  )
}
