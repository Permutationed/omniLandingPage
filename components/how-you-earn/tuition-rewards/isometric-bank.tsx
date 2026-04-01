'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ISO_COLORS } from '../shared/constants'

interface IsometricBankProps {
  progress?: MotionValue<number>
  /** Progress range when bank should fade in [start, end] */
  fadeInRange?: [number, number]
  className?: string
}

/**
 * Isometric bank building - Clean geometric design
 * Represents the user's bank account (source of funds)
 */
export function IsometricBank({
  progress,
  fadeInRange = [0, 0.2],
  className = '',
}: IsometricBankProps) {
  // Fade in animation based on scroll
  const opacity = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    fadeInRange,
    [0, 1]
  )

  const y = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    fadeInRange,
    [20, 0]
  )

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      style={{ opacity, y }}
    >
      <div className="relative w-28 md:w-36 lg:w-44">
        <svg
          viewBox="0 0 160 140"
          className="w-full h-auto"
          aria-label="Bank building"
        >
          {/* Shadow ellipse */}
          <ellipse
            cx="80"
            cy="130"
            rx="55"
            ry="8"
            fill={ISO_COLORS.shadow}
          />

          {/* Base platform - isometric */}
          <polygon
            points="80,115 140,85 80,55 20,85"
            fill={ISO_COLORS.surfaceTop}
          />
          <polygon
            points="20,85 80,115 80,120 20,90"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="80,115 140,85 140,90 80,120"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Main building body - left face */}
          <polygon
            points="30,80 30,35 80,5 80,55"
            fill={ISO_COLORS.surfaceLeft}
          />

          {/* Main building body - right face */}
          <polygon
            points="80,5 130,35 130,80 80,55"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Building roof/top */}
          <polygon
            points="80,5 130,35 80,55 30,35"
            fill={ISO_COLORS.surfaceTop}
          />

          {/* Pediment (triangular top) - left face */}
          <polygon
            points="40,35 80,10 80,5 40,30"
            fill={ISO_COLORS.surfaceLeft}
          />

          {/* Pediment - right face */}
          <polygon
            points="80,10 120,35 120,30 80,5"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Columns - left side (3 columns) */}
          {[0, 1, 2].map((i) => (
            <g key={`left-col-${i}`}>
              {/* Column shaft */}
              <polygon
                points={`${40 + i * 15},${75 - i * 7.5} ${45 + i * 15},${72.5 - i * 7.5} ${45 + i * 15},${42.5 - i * 7.5} ${40 + i * 15},${45 - i * 7.5}`}
                fill={ISO_COLORS.surfaceLeft}
                stroke={ISO_COLORS.primaryLight}
                strokeWidth="0.5"
              />
              {/* Column capital */}
              <polygon
                points={`${38 + i * 15},${46 - i * 7.5} ${47 + i * 15},${41.5 - i * 7.5} ${47 + i * 15},${39.5 - i * 7.5} ${38 + i * 15},${44 - i * 7.5}`}
                fill={ISO_COLORS.surfaceTop}
              />
            </g>
          ))}

          {/* Columns - right side (3 columns) */}
          {[0, 1, 2].map((i) => (
            <g key={`right-col-${i}`}>
              {/* Column shaft */}
              <polygon
                points={`${115 - i * 15},${75 - i * 7.5} ${120 - i * 15},${72.5 - i * 7.5} ${120 - i * 15},${42.5 - i * 7.5} ${115 - i * 15},${45 - i * 7.5}`}
                fill={ISO_COLORS.surfaceRight}
                stroke={ISO_COLORS.primaryLight}
                strokeWidth="0.5"
              />
              {/* Column capital */}
              <polygon
                points={`${113 - i * 15},${41.5 - i * 7.5} ${122 - i * 15},${46 - i * 7.5} ${122 - i * 15},${44 - i * 7.5} ${113 - i * 15},${39.5 - i * 7.5}`}
                fill={ISO_COLORS.surfaceTop}
              />
            </g>
          ))}

          {/* Entrance door - left face */}
          <polygon
            points="70,80 80,75 80,55 70,60"
            fill={ISO_COLORS.primaryDark}
          />

          {/* Entrance door - right face */}
          <polygon
            points="80,75 90,80 90,60 80,55"
            fill={ISO_COLORS.primary}
          />

          {/* Door frame accent */}
          <polygon
            points="73,77 80,73 80,58 73,62"
            fill={ISO_COLORS.primaryLight}
            opacity="0.3"
          />

          {/* Steps - 3 levels */}
          {[0, 1, 2].map((i) => (
            <g key={`step-${i}`}>
              {/* Step top */}
              <polygon
                points={`${65 - i * 3},${85 + i * 3} ${95 + i * 3},${85 + i * 3} ${80},${77.5 + i * 3}`}
                fill={ISO_COLORS.surfaceTop}
              />
              {/* Step front left */}
              <polygon
                points={`${65 - i * 3},${85 + i * 3} ${80},${77.5 + i * 3} ${80},${80 + i * 3} ${65 - i * 3},${87.5 + i * 3}`}
                fill={ISO_COLORS.surfaceLeft}
              />
              {/* Step front right */}
              <polygon
                points={`${80},${77.5 + i * 3} ${95 + i * 3},${85 + i * 3} ${95 + i * 3},${87.5 + i * 3} ${80},${80 + i * 3}`}
                fill={ISO_COLORS.surfaceRight}
              />
            </g>
          ))}

          {/* Dollar sign emblem on pediment */}
          <text
            x="80"
            y="25"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={ISO_COLORS.primary}
          >
            $
          </text>
        </svg>
      </div>
      <span
        className="mt-2 text-xs font-medium"
        style={{ color: ISO_COLORS.primaryDark }}
      >
        Your Bank
      </span>
    </motion.div>
  )
}
