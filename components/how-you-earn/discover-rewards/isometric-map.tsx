'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ReactNode } from 'react'
import { ISO_COLORS } from '../shared/constants'

interface IsometricMapProps {
  progress?: MotionValue<number>
  /** Progress range when map appears */
  appearRange?: [number, number]
  children?: ReactNode
  className?: string
}

/**
 * Isometric map base with grid streets
 */
export function IsometricMap({
  progress,
  appearRange = [0.1, 0.2],
  children,
  className = '',
}: IsometricMapProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    appearRange,
    [0, 1]
  )

  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    appearRange,
    [0.95, 1]
  )

  return (
    <motion.div
      className={`relative w-full max-w-2xl mx-auto aspect-[16/10] ${className}`}
      style={{ opacity, scale }}
    >
      {/* Map background */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden border border-border shadow-lg"
        style={{
          background: `linear-gradient(to bottom right, color-mix(in oklch, ${ISO_COLORS.success} 8%, white), color-mix(in oklch, ${ISO_COLORS.success} 15%, white))`
        }}
      >
        {/* Grid pattern (isometric) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 640 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Isometric grid pattern */}
            <pattern
              id="isoGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              {/* Horizontal-ish lines (going right-down) */}
              <line
                x1="0"
                y1="20"
                x2="40"
                y2="40"
                stroke={`color-mix(in oklch, ${ISO_COLORS.success} 30%, transparent)`}
                strokeWidth="1"
              />
              {/* Vertical-ish lines (going left-down) */}
              <line
                x1="0"
                y1="40"
                x2="40"
                y2="20"
                stroke={`color-mix(in oklch, ${ISO_COLORS.success} 30%, transparent)`}
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Apply grid pattern */}
          <rect width="640" height="400" fill="url(#isoGrid)" />

          {/* Main "streets" */}
          {/* Horizontal street */}
          <line
            x1="50"
            y1="200"
            x2="590"
            y2="200"
            stroke={ISO_COLORS.surfaceRight}
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Vertical street */}
          <line
            x1="320"
            y1="50"
            x2="320"
            y2="350"
            stroke={ISO_COLORS.surfaceRight}
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Street markings (dashed center lines) */}
          <line
            x1="60"
            y1="200"
            x2="580"
            y2="200"
            stroke={ISO_COLORS.amber}
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line
            x1="320"
            y1="60"
            x2="320"
            y2="340"
            stroke={ISO_COLORS.amber}
            strokeWidth="2"
            strokeDasharray="10 10"
          />
        </svg>

        {/* User location pulse */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Pulse rings */}
            <motion.div
              className="absolute w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              style={{ backgroundColor: `color-mix(in oklch, ${ISO_COLORS.primary} 25%, transparent)` }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              style={{ backgroundColor: `color-mix(in oklch, ${ISO_COLORS.primary} 25%, transparent)` }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 1,
              }}
            />
            {/* User dot */}
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: ISO_COLORS.primary }}
            />
          </div>
        </div>

        {/* Children (pins, buildings, etc.) */}
        {children}
      </div>
    </motion.div>
  )
}
