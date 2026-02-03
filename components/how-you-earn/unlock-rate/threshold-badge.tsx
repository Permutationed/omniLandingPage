'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Lock, Check } from 'lucide-react'
import { EXAMPLE_DATA } from '../shared/constants'

interface ThresholdBadgeProps {
  /** The rate this threshold unlocks (e.g., 0.5, 1.0) */
  rate: number
  /** Label for the threshold (e.g., "20%", "40%") */
  thresholdLabel: string
  /** Scroll progress value */
  progress?: MotionValue<number>
  /** Progress value at which this threshold unlocks */
  unlockAt: number
  /** Whether this is the active/current rate */
  isActive?: boolean
  className?: string
}

/**
 * Animated threshold badge showing locked → unlocked state
 */
export function ThresholdBadge({
  rate,
  thresholdLabel,
  progress,
  unlockAt,
  isActive = false,
  className = '',
}: ThresholdBadgeProps) {
  // Calculate unlock animation
  const unlocked = useTransform(
    progress ?? { get: () => 0 } as MotionValue<number>,
    [unlockAt - 0.05, unlockAt],
    [0, 1]
  )

  const scale = useTransform(unlocked, [0, 0.5, 1], [1, 1.15, 1])
  const opacity = useTransform(unlocked, [0, 1], [0.5, 1])

  // Glow effect when unlocked
  const glowOpacity = useTransform(unlocked, [0.8, 1], [0, 1])

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Threshold label */}
      <span className="text-xs text-muted-foreground font-medium">
        {thresholdLabel}
      </span>

      {/* Badge */}
      <motion.div
        className="relative"
        style={{ scale }}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/30 blur-md"
          style={{ opacity: glowOpacity, scale: 1.2 }}
        />

        {/* Badge container */}
        <motion.div
          className={`
            relative px-4 py-2 rounded-xl border-2 font-bold text-lg
            ${isActive
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-border'
            }
          `}
          style={{ opacity }}
        >
          {/* Lock icon (shown when locked) */}
          <motion.div
            className="absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full flex items-center justify-center shadow-sm"
            style={{
              opacity: useTransform(unlocked, [0, 0.5], [1, 0]),
              scale: useTransform(unlocked, [0, 0.5], [1, 0]),
            }}
          >
            <Lock className="w-3 h-3 text-muted-foreground" strokeWidth={2.5} />
          </motion.div>

          {/* Unlock icon (shown when unlocked) */}
          <motion.div
            className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center shadow-sm"
            style={{
              opacity: useTransform(unlocked, [0.5, 1], [0, 1]),
              scale: useTransform(unlocked, [0.5, 1], [0, 1]),
            }}
          >
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </motion.div>

          {/* Rate value */}
          <span>{rate}%</span>
        </motion.div>
      </motion.div>

      {/* Earnings example */}
      <motion.span
        className="text-xs text-muted-foreground"
        style={{
          opacity: useTransform(unlocked, [0.5, 1], [0.3, 1]),
        }}
      >
        ${(EXAMPLE_DATA.tuition * (rate / 100)).toLocaleString()} back
      </motion.span>
    </div>
  )
}
