'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ThresholdBadge } from './threshold-badge'

interface ProgressGaugeProps {
  progress?: MotionValue<number>
  /** Range when progress bar fills [start, end] */
  fillRange?: [number, number]
  className?: string
}

/**
 * Animated progress bar showing spending progress toward rate unlocks
 */
export function ProgressGauge({
  progress,
  fillRange = [0.2, 0.8],
  className = '',
}: ProgressGaugeProps) {
  // Map scroll progress to gauge fill (0-50% of gauge, since 40% is max threshold)
  const fillWidth = useTransform(
    progress ?? { get: () => 0 } as MotionValue<number>,
    fillRange,
    ['0%', '50%'] // Fill to 50% of bar (representing 40% spending + some buffer)
  )

  // Progress value for threshold badges
  const gaugeProgress = useTransform(
    progress ?? { get: () => 0 } as MotionValue<number>,
    fillRange,
    [0, 1]
  )

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Card icon and label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-6 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">OMNI</span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          YOUR EVERYDAY ANNUAL SPENDING
        </span>
      </div>

      {/* Progress bar container */}
      <div className="relative">
        {/* Background track */}
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          {/* Animated fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-primary to-green-500 rounded-full"
            style={{ width: fillWidth }}
          />
        </div>

        {/* Threshold markers on the bar */}
        <div className="absolute top-0 left-0 w-full h-4 pointer-events-none">
          {/* 20% marker line */}
          <div
            className="absolute top-0 h-full w-0.5 bg-foreground/30"
            style={{ left: '25%' }} // 20% threshold at 25% visual position
          />
          {/* 40% marker line */}
          <div
            className="absolute top-0 h-full w-0.5 bg-foreground/30"
            style={{ left: '50%' }} // 40% threshold at 50% visual position
          />
        </div>
      </div>

      {/* Threshold badges below bar */}
      <div className="relative mt-8 flex justify-between px-4">
        {/* 0% start */}
        <div className="text-xs text-muted-foreground">
          0%
        </div>

        {/* 20% threshold */}
        <div className="absolute" style={{ left: '25%', transform: 'translateX(-50%)' }}>
          <ThresholdBadge
            rate={0.5}
            thresholdLabel="20% of tuition spent"
            progress={gaugeProgress}
            unlockAt={0.4} // Unlock at 40% of animation progress
          />
        </div>

        {/* 40% threshold */}
        <div className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>
          <ThresholdBadge
            rate={1.0}
            thresholdLabel="40% of tuition spent"
            progress={gaugeProgress}
            unlockAt={0.8} // Unlock at 80% of animation progress
            isActive
          />
        </div>

        {/* Spacer for layout */}
        <div className="opacity-0">100%</div>
      </div>
    </div>
  )
}
