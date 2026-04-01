'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface PointsBadgeProps {
  progress?: MotionValue<number>
  /** Progress range when badge appears */
  appearRange?: [number, number]
  className?: string
}

/**
 * Badge showing CSR draft ready from combined outputs
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
      <div className="inline-block rounded-xl px-6 py-4 md:px-8 md:py-5 bg-muted/50 border border-border">
        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          Combined Output
        </div>

        <div className="text-2xl md:text-3xl font-semibold text-foreground">
          Report Draft Ready
        </div>

        <div className="text-xs text-muted-foreground mt-1">
          from upstream automation
        </div>
      </div>
    </motion.div>
  )
}
