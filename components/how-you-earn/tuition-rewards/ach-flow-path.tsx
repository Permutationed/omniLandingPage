'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ISO_COLORS } from '../shared/constants'

interface AchFlowPathProps {
  progress?: MotionValue<number>
  /** Progress range when path draws [start, end] */
  drawRange?: [number, number]
  className?: string
}

/**
 * Horizontal gradient line showing data flow between pipeline stages
 */
export function AchFlowPath({
  progress,
  drawRange = [0.2, 0.5],
  className = '',
}: AchFlowPathProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [drawRange[0], drawRange[0] + 0.05],
    [0, 1]
  )

  // Scale X for the draw animation (0 to 1)
  const scaleX = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    drawRange,
    [0, 1]
  )

  // Label fade in
  const labelOpacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [drawRange[0] + 0.1, drawRange[0] + 0.2],
    [0, 1]
  )

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      style={{ opacity }}
    >
      {/* Left segment - gradient line */}
      <motion.div
        className="h-0.5 flex-1 origin-left"
        style={{
          background: `linear-gradient(to right, ${ISO_COLORS.primary}, ${ISO_COLORS.blue})`,
          scaleX,
        }}
      />

      {/* Data flow label badge */}
      <motion.div
        className="px-3 py-1.5 rounded-md text-xs font-medium text-white shrink-0"
        style={{
          backgroundColor: ISO_COLORS.primary,
          opacity: labelOpacity,
        }}
      >
        Data Flow
      </motion.div>

      {/* Right segment - gradient line */}
      <motion.div
        className="h-0.5 flex-1 origin-left"
        style={{
          background: `linear-gradient(to right, ${ISO_COLORS.blue}, ${ISO_COLORS.success})`,
          scaleX,
        }}
      />
    </motion.div>
  )
}
