'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { PointsOdometer } from '../shared/odometer'
import { EXAMPLE_DATA, ISO_COLORS } from '../shared/constants'

interface PointsBadgeProps {
  progress?: MotionValue<number>
  /** Progress range when badge appears and counter runs */
  appearRange?: [number, number]
  className?: string
}

/**
 * Central points badge showing total accumulated points
 */
export function PointsBadge({
  progress,
  appearRange = [0.1, 0.3],
  className = '',
}: PointsBadgeProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.05],
    [0, 1]
  )

  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.05, appearRange[0] + 0.1],
    [0.8, 1.05, 1]
  )

  return (
    <motion.div
      className={`text-center ${className}`}
      style={{ opacity, scale }}
    >
      {/* Badge container */}
      <div
        className="inline-block rounded-2xl p-6 md:p-8 shadow-xl"
        style={{
          background: `linear-gradient(to bottom right, color-mix(in oklch, ${ISO_COLORS.primary} 15%, white), color-mix(in oklch, ${ISO_COLORS.amber} 15%, white))`,
          borderWidth: 1,
          borderColor: `color-mix(in oklch, ${ISO_COLORS.primary} 30%, transparent)`,
        }}
      >
        <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
          Your Points
        </div>

        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          <PointsOdometer
            value={EXAMPLE_DATA.totalPoints}
            progress={progress}
            progressRange={appearRange}
          />
        </div>

        <div className="text-sm text-muted-foreground mt-2">
          combined from all sources
        </div>
      </div>
    </motion.div>
  )
}
