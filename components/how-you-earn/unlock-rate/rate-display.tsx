'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ISO_COLORS } from '../shared/constants'

interface RateDisplayProps {
  progress?: MotionValue<number>
  /** Progress value at which rate changes from 0.5 to 1.0 */
  transitionAt?: number
  className?: string
}

/**
 * Animated display showing current tuition reward rate
 */
export function RateDisplay({
  progress,
  transitionAt = 0.7,
  className = '',
}: RateDisplayProps) {
  // Determine which rate to show based on progress
  const rateIndex = useTransform(
    progress ?? { get: () => 0 } as MotionValue<number>,
    [0, transitionAt - 0.1, transitionAt],
    [0, 0, 1]
  )

  const opacity = useTransform(
    progress ?? { get: () => 0 } as MotionValue<number>,
    [0.1, 0.2],
    [0, 1]
  )

  const scale = useTransform(
    progress ?? { get: () => 0 } as MotionValue<number>,
    [transitionAt - 0.05, transitionAt, transitionAt + 0.05],
    [1, 1.1, 1]
  )

  return (
    <motion.div
      className={`text-center ${className}`}
      style={{ opacity }}
    >
      <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
        Your Tuition Reward Rate
      </div>

      <motion.div
        className="relative inline-flex items-center gap-4"
        style={{ scale }}
      >
        {/* Previous rate (crossed out when upgraded) */}
        <motion.span
          className="text-2xl text-muted-foreground relative"
          style={{
            opacity: useTransform(rateIndex, [0, 1], [0.5, 0.3]),
          }}
        >
          0.5%
          <motion.span
            className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted-foreground"
            style={{
              scaleX: useTransform(rateIndex, [0.5, 1], [0, 1]),
              transformOrigin: 'left',
            }}
          />
        </motion.span>

        {/* Arrow */}
        <motion.span
          className="text-primary"
          style={{
            opacity: useTransform(rateIndex, [0.5, 1], [0, 1]),
          }}
        >
          →
        </motion.span>

        {/* Current/new rate */}
        <motion.span
          className="text-4xl md:text-5xl font-bold"
          style={{
            color: useTransform(
              rateIndex,
              [0, 1],
              [ISO_COLORS.primary, ISO_COLORS.success]
            ),
          }}
        >
          <motion.span
            style={{
              opacity: useTransform(rateIndex, [0, 0.5], [1, 0]),
              position: 'absolute',
            }}
          >
            0.5%
          </motion.span>
          <motion.span
            style={{
              opacity: useTransform(rateIndex, [0.5, 1], [0, 1]),
            }}
          >
            1.0%
          </motion.span>
        </motion.span>
      </motion.div>

    </motion.div>
  )
}
