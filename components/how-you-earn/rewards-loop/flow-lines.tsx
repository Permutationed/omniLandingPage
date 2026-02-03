'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface FlowLinesProps {
  progress?: MotionValue<number>
  /** Progress range when lines draw */
  drawRange?: [number, number]
  className?: string
}

/**
 * Animated SVG lines showing points flowing to tuition
 */
export function FlowLines({
  progress,
  drawRange = [0.5, 0.65],
  className = '',
}: FlowLinesProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [drawRange[0], drawRange[0] + 0.02],
    [0, 1]
  )

  return (
    <motion.svg
      viewBox="0 0 300 100"
      className={`w-full max-w-sm mx-auto ${className}`}
      style={{ opacity }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradient for flow lines */}
        <linearGradient id="flowGradientLoop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.65 0.25 260)" />
          <stop offset="100%" stopColor="oklch(0.70 0.20 145)" />
        </linearGradient>
      </defs>

      {/* Left line (from tuition source) */}
      <motion.path
        d="M 50 0 Q 50 50, 150 80"
        fill="none"
        stroke="url(#flowGradientLoop)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="150"
        style={{
          strokeDashoffset: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [drawRange[0], drawRange[0] + 0.08],
            [150, 0]
          ),
        }}
      />

      {/* Center line (from everyday source) */}
      <motion.path
        d="M 150 0 L 150 80"
        fill="none"
        stroke="url(#flowGradientLoop)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="80"
        style={{
          strokeDashoffset: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [drawRange[0] + 0.03, drawRange[0] + 0.1],
            [80, 0]
          ),
        }}
      />

      {/* Right line (from merchants source) */}
      <motion.path
        d="M 250 0 Q 250 50, 150 80"
        fill="none"
        stroke="url(#flowGradientLoop)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="150"
        style={{
          strokeDashoffset: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [drawRange[0] + 0.05, drawRange[0] + 0.13],
            [150, 0]
          ),
        }}
      />

      {/* Arrow at bottom */}
      <motion.path
        d="M 145 90 L 150 100 L 155 90"
        fill="none"
        stroke="oklch(0.70 0.20 145)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [drawRange[1] - 0.02, drawRange[1]],
            [0, 1]
          ),
        }}
      />
    </motion.svg>
  )
}
