'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { DollarOdometer } from '../shared/odometer'
import { EXAMPLE_DATA, ISO_COLORS } from '../shared/constants'

interface RewardCounterProps {
  progress?: MotionValue<number>
  /** Progress range when counter animates [start, end] */
  counterRange?: [number, number]
  className?: string
}

/**
 * Animated reward counter showing earnings from tuition payment
 */
export function RewardCounter({
  progress,
  counterRange = [0.6, 1.0],
  className = '',
}: RewardCounterProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [counterRange[0], counterRange[0] + 0.1],
    [0, 1]
  )

  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [counterRange[0], counterRange[0] + 0.1],
    [0.8, 1]
  )

  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [counterRange[0], counterRange[0] + 0.1],
    [20, 0]
  )

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      style={{ opacity, scale, y }}
    >
      {/* Compact inline reward display */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
        <span className="text-sm text-muted-foreground">Rewards:</span>
        <span className="text-lg md:text-xl font-semibold text-foreground">
          +$<DollarOdometer
            value={EXAMPLE_DATA.rewardAmount}
            progress={progress}
            progressRange={counterRange}
          />
        </span>
        <span className="text-xs text-muted-foreground">pts</span>
      </div>
    </motion.div>
  )
}
