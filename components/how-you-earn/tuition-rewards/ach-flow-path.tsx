'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface AchFlowPathProps {
  progress?: MotionValue<number>
  /** Progress range when path draws [start, end] */
  drawRange?: [number, number]
  className?: string
}

/**
 * Animated dashed line showing ACH transfer from bank to school
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

  // Dollar sign particle positions along path
  const particleProgress = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    drawRange,
    [0, 1]
  )

  return (
    <motion.svg
      viewBox="0 0 300 60"
      className={`w-full max-w-md ${className}`}
      style={{ opacity }}
    >
      {/* Glow filter */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for the line */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.65 0.25 260)" />
          <stop offset="50%" stopColor="oklch(0.70 0.20 240)" />
          <stop offset="100%" stopColor="oklch(0.70 0.20 145)" />
        </linearGradient>
      </defs>

      {/* Background track (subtle) */}
      <path
        d="M 20 30 C 80 30, 100 30, 150 30 C 200 30, 220 30, 280 30"
        stroke="oklch(0.90 0.02 260)"
        strokeWidth="3"
        strokeDasharray="8 4"
        fill="none"
      />

      {/* Animated flowing line */}
      <motion.path
        d="M 20 30 C 80 30, 100 30, 150 30 C 200 30, 220 30, 280 30"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        fill="none"
        filter="url(#glow)"
        pathLength={1}
        strokeDasharray={1}
        style={{
          strokeDashoffset: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            drawRange,
            [1, 0]
          ),
        }}
      />

      {/* ACH label */}
      <motion.g
        style={{
          opacity: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [drawRange[0] + 0.1, drawRange[0] + 0.2],
            [0, 1]
          ),
        }}
      >
        <rect
          x="130"
          y="8"
          width="40"
          height="18"
          rx="4"
          fill="oklch(0.65 0.25 260)"
        />
        <text
          x="150"
          y="21"
          textAnchor="middle"
          fontSize="10"
          fill="white"
          fontWeight="600"
        >
          ACH
        </text>
      </motion.g>

      {/* Arrow head at end */}
      <motion.path
        d="M 275 25 L 285 30 L 275 35"
        stroke="oklch(0.70 0.20 145)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          opacity: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [drawRange[1] - 0.05, drawRange[1]],
            [0, 1]
          ),
        }}
      />

      {/* Animated dollar particles */}
      {[0, 0.2, 0.4].map((offset, i) => (
        <motion.text
          key={i}
          fontSize="12"
          fill="oklch(0.65 0.25 260)"
          fontWeight="bold"
          style={{
            opacity: useTransform(
              particleProgress,
              [offset, offset + 0.1, 0.8 + offset * 0.2, 1],
              [0, 1, 1, 0]
            ),
            x: useTransform(particleProgress, [0, 1], [30 + i * 10, 260]),
            y: 35,
          }}
        >
          $
        </motion.text>
      ))}
    </motion.svg>
  )
}
