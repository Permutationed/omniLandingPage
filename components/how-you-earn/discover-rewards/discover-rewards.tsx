'use client'

import { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'
import { MapPin, BarChart3 } from 'lucide-react'
import { IsometricMap } from './isometric-map'
import { CampusBuilding } from './campus-building'
import { MerchantPin, MERCHANTS } from './merchant-pin'
import { NotificationToast } from './notification-toast'

/**
 * Steps 3–4: SAP parsing & gap detection, SDTM/ADaM code generation
 *
 * Isometric map as visualization of data pipeline nodes
 */
export function DiscoverRewards() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Map scroll to animation progress
  const animationProgress = useTransform(
    scrollYProgress,
    [0.1, 0.7],
    [0, 1]
  )

  // Staggered pin appearance ranges
  const pinRanges = MERCHANTS.map((_, i) => ({
    start: 0.3 + i * 0.08,
    end: 0.38 + i * 0.08,
  }))

  return (
    <section
      ref={sectionRef}
      className="bg-card rounded-xl p-6 md:p-8 lg:p-10 shadow-md border border-border/50 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-transparent pointer-events-none" />

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
            Analysis Planning & Dataset Generation
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Automated analysis planning and dataset generation.
          </p>
        </motion.div>

        {/* Map area */}
        <div className="relative">
          <IsometricMap
            progress={animationProgress}
            appearRange={[0.1, 0.25]}
          >
            {/* Central building (data hub) */}
            <CampusBuilding
              progress={animationProgress}
              appearRange={[0.2, 0.3]}
            />

            {/* Merchant pins */}
            {MERCHANTS.map((merchant, i) => (
              <MerchantPin
                key={merchant.id}
                {...merchant}
                progress={animationProgress}
                appearRange={[pinRanges[i].start, pinRanges[i].end]}
              />
            ))}
          </IsometricMap>

          {/* Status toast */}
          <div className="mt-6">
            <NotificationToast
              label="Analysis plan processed"
              subtext="Dataset generation in progress"
              Icon={BarChart3}
              progress={animationProgress}
              appearRange={[0.5, 0.6]}
            />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto text-center"
          style={{
            opacity: useTransform(animationProgress, [0.6, 0.7], [0, 1]),
            y: useTransform(animationProgress, [0.6, 0.7], [20, 0]),
          }}
        >
          <div>
            <div className="font-display text-2xl font-bold text-primary">Standards</div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-accent">Automated</div>
            <div className="text-xs text-muted-foreground">Validation</div>
          </div>
          <div>
            <div className="flex justify-center">
              <MapPin className="w-6 h-6 text-primary" strokeWidth={2.5} />
            </div>
            <div className="text-xs text-muted-foreground">Traceable</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
