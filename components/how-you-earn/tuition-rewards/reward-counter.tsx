'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'

interface RewardCounterProps {
  progress?: MotionValue<number>
  /** Progress range when counter animates [start, end] */
  counterRange?: [number, number]
  className?: string
}

/**
 * Status badge showing eCRF generation complete
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
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
        <Check className="w-5 h-5 text-green-600" strokeWidth={2.5} />
        <span className="text-sm text-muted-foreground">Forms ready for downstream</span>
      </div>
    </motion.div>
  )
}
