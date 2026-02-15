'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { MapPin, LucideIcon } from 'lucide-react'
import { ISO_COLORS } from '../shared/constants'

interface NotificationToastProps {
  /** Node or status label */
  label: string
  /** Secondary text (e.g., step number) */
  subtext: string
  /** Icon component */
  Icon: LucideIcon
  /** Scroll progress */
  progress?: MotionValue<number>
  /** Progress range when toast appears */
  appearRange?: [number, number]
  className?: string
}

/**
 * Animated status toast for pipeline progress
 */
export function NotificationToast({
  label,
  subtext,
  Icon,
  progress,
  appearRange = [0.75, 0.85],
  className = '',
}: NotificationToastProps) {
  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[1]],
    [100, 0]
  )

  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.05],
    [0, 1]
  )

  return (
    <motion.div
      className={`w-full max-w-md mx-auto ${className}`}
      style={{ y, opacity }}
    >
      <div className="bg-background border border-border rounded-xl shadow-xl overflow-hidden">
        {/* Gradient top border */}
        <div className="h-1 bg-gradient-to-r from-primary via-green-500 to-amber-500" />

        <div className="p-4 flex items-center gap-4">
          {/* Location icon */}
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary" strokeWidth={2} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {label}
            </p>
            <p className="text-xs text-muted-foreground">
              {subtext}
            </p>
          </div>

          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-foreground" strokeWidth={2} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
