'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface IsometricSchoolProps {
  progress?: MotionValue<number>
  /** Progress range when school should fade in [start, end] */
  fadeInRange?: [number, number]
  /** Progress range when checkmark appears */
  checkmarkRange?: [number, number]
  className?: string
}

/**
 * Isometric school/university building SVG
 * Represents the school receiving tuition payment
 */
export function IsometricSchool({
  progress,
  fadeInRange = [0.3, 0.5],
  checkmarkRange = [0.5, 0.6],
  className = '',
}: IsometricSchoolProps) {
  // Fade in animation
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    fadeInRange,
    [0, 1]
  )

  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    fadeInRange,
    [20, 0]
  )

  // Checkmark animation
  const checkmarkOpacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    checkmarkRange,
    [0, 1]
  )

  const checkmarkScale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    checkmarkRange,
    [0.5, 1]
  )

  return (
    <motion.svg
      viewBox="0 0 140 160"
      className={`w-28 md:w-36 lg:w-44 ${className}`}
      style={{ opacity, y }}
    >
      {/* Shadow */}
      <ellipse
        cx="70"
        cy="150"
        rx="50"
        ry="10"
        fill="oklch(0.20 0.05 260 / 0.15)"
      />

      {/* Main building - right face */}
      <path
        d="M 70 60 L 120 35 L 120 110 L 70 135 Z"
        fill="oklch(0.85 0.02 260)"
      />

      {/* Main building - left face */}
      <path
        d="M 70 60 L 20 35 L 20 110 L 70 135 Z"
        fill="oklch(0.90 0.02 260)"
      />

      {/* Main building - top */}
      <path
        d="M 70 30 L 120 5 L 120 35 L 70 60 L 20 35 L 20 5 Z"
        fill="oklch(0.98 0.01 260)"
      />

      {/* Tower base - right */}
      <path
        d="M 70 30 L 85 22 L 85 60 L 70 68 Z"
        fill="oklch(0.82 0.03 260)"
      />

      {/* Tower base - left */}
      <path
        d="M 70 30 L 55 22 L 55 60 L 70 68 Z"
        fill="oklch(0.88 0.03 260)"
      />

      {/* Tower spire */}
      <path
        d="M 70 5 L 85 22 L 70 30 L 55 22 Z"
        fill="oklch(0.65 0.25 260)"
      />

      {/* Windows on left face */}
      <rect x="30" y="50" width="12" height="15" fill="oklch(0.70 0.10 240)" opacity="0.8" />
      <rect x="30" y="75" width="12" height="15" fill="oklch(0.70 0.10 240)" opacity="0.8" />
      <rect x="48" y="55" width="12" height="15" fill="oklch(0.70 0.10 240)" opacity="0.8" />
      <rect x="48" y="80" width="12" height="15" fill="oklch(0.70 0.10 240)" opacity="0.8" />

      {/* Windows on right face */}
      <rect x="80" y="50" width="12" height="15" fill="oklch(0.65 0.10 240)" opacity="0.7" />
      <rect x="80" y="75" width="12" height="15" fill="oklch(0.65 0.10 240)" opacity="0.7" />
      <rect x="98" y="55" width="12" height="15" fill="oklch(0.65 0.10 240)" opacity="0.7" />
      <rect x="98" y="80" width="12" height="15" fill="oklch(0.65 0.10 240)" opacity="0.7" />

      {/* Door */}
      <path
        d="M 63 105 L 77 97 L 77 120 L 63 128 Z"
        fill="oklch(0.45 0.20 260)"
      />

      {/* Flag pole */}
      <line x1="70" y1="5" x2="70" y2="-10" stroke="oklch(0.50 0.05 260)" strokeWidth="1.5" />

      {/* Flag */}
      <path
        d="M 70 -10 L 85 -5 L 70 0 Z"
        fill="oklch(0.65 0.25 260)"
      />

      {/* School label */}
      <text
        x="70"
        y="158"
        textAnchor="middle"
        fontSize="10"
        fill="oklch(0.50 0.05 260)"
        className="font-medium"
      >
        Your School
      </text>

      {/* Checkmark badge */}
      <motion.g
        style={{
          opacity: checkmarkOpacity,
          scale: checkmarkScale,
          transformOrigin: '110px 25px',
        }}
      >
        <circle cx="110" cy="25" r="15" fill="oklch(0.70 0.20 145)" />
        <path
          d="M 103 25 L 108 30 L 118 20"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </motion.svg>
  )
}
