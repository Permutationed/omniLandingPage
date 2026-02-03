'use client'

import { motion, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useEffect } from 'react'

interface OdometerProps {
  value: number
  /** If provided, animate based on scroll progress instead of on mount */
  progress?: MotionValue<number>
  /** Range of progress where animation happens [start, end] */
  progressRange?: [number, number]
  /** Format the number (e.g., add $ prefix, commas) */
  format?: (value: number) => string
  /** CSS class for the container */
  className?: string
  /** Duration in seconds (ignored if progress-driven) */
  duration?: number
}

/**
 * Animated number counter with odometer-style digit animation
 * Can be driven by scroll progress or animate on mount
 */
export function Odometer({
  value,
  progress,
  progressRange = [0, 1],
  format = (v) => v.toLocaleString(),
  className = '',
  duration = 1.5,
}: OdometerProps) {
  // Spring for mount-based animation
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration,
  })

  // If progress-driven, map progress to value
  const progressValue = useTransform(
    progress ?? spring,
    progress ? progressRange : [0, 1],
    [0, value]
  )

  // Round and format the animated value
  const displayValue = useTransform(progressValue, (v) => format(Math.round(v)))

  // Trigger spring animation on mount (if not progress-driven)
  useEffect(() => {
    if (!progress) {
      spring.set(1)
    }
  }, [spring, progress, value])

  return (
    <motion.span className={`tabular-nums ${className}`}>
      {displayValue}
    </motion.span>
  )
}

/**
 * Odometer with dollar formatting
 */
export function DollarOdometer(props: Omit<OdometerProps, 'format'>) {
  return (
    <Odometer
      {...props}
      format={(v) => `$${v.toLocaleString()}`}
    />
  )
}

/**
 * Odometer with percentage formatting
 */
export function PercentOdometer(props: Omit<OdometerProps, 'format'> & { decimals?: number }) {
  const { decimals = 1, ...rest } = props
  return (
    <Odometer
      {...rest}
      format={(v) => `${v.toFixed(decimals)}%`}
    />
  )
}

/**
 * Odometer with points formatting (e.g., "12,450 pts")
 */
export function PointsOdometer(props: Omit<OdometerProps, 'format'>) {
  return (
    <Odometer
      {...props}
      format={(v) => `${v.toLocaleString()} pts`}
    />
  )
}
