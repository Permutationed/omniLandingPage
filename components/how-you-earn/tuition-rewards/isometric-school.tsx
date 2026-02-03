'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { ISO_COLORS } from '../shared/constants'

interface IsometricSchoolProps {
  progress?: MotionValue<number>
  /** Progress range when school should fade in [start, end] */
  fadeInRange?: [number, number]
  /** Progress range when checkmark appears */
  checkmarkRange?: [number, number]
  className?: string
}

/**
 * Isometric university building with clock tower
 * Classic academic architecture - recognizable as educational institution
 */
export function IsometricSchool({
  progress,
  fadeInRange = [0.3, 0.5],
  checkmarkRange = [0.5, 0.6],
  className = '',
}: IsometricSchoolProps) {
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

  const checkmarkOpacity = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    checkmarkRange,
    [0, 1]
  )

  const checkmarkScale = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    checkmarkRange,
    [0.5, 1]
  )

  return (
    <motion.div
      className={`relative flex flex-col items-center ${className}`}
      style={{ opacity, y }}
    >
      <div className="relative w-32 md:w-40 lg:w-48">
        <svg
          viewBox="0 0 200 180"
          className="w-full h-auto"
          aria-label="University building with clock tower"
        >
          {/* Shadow ellipse */}
          <ellipse
            cx="100"
            cy="168"
            rx="70"
            ry="10"
            fill={ISO_COLORS.shadow}
          />

          {/* Main building base - wide academic hall */}
          {/* Left wing */}
          <polygon
            points="25,155 25,85 55,70 55,140"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="55,70 85,85 85,155 55,140"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Right wing */}
          <polygon
            points="115,85 145,70 145,140 115,155"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="145,70 175,85 175,155 145,140"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Center section - connects wings */}
          <polygon
            points="55,140 55,100 100,80 100,120"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="100,80 145,100 145,140 100,120"
            fill={ISO_COLORS.surfaceRight}
          />
          <polygon
            points="55,100 100,80 145,100 100,120"
            fill={ISO_COLORS.surfaceTop}
          />

          {/* Clock Tower - central academic landmark */}
          <polygon
            points="75,120 75,40 100,25 100,105"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="100,25 125,40 125,120 100,105"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Tower roof - peaked academic style */}
          <polygon
            points="100,25 125,40 100,55 75,40"
            fill={ISO_COLORS.surfaceTop}
          />

          {/* Tower dome/cupola */}
          <polygon
            points="90,40 100,15 110,40 100,48"
            fill={ISO_COLORS.primaryLight}
          />
          <polygon
            points="100,15 110,40 100,48"
            fill={ISO_COLORS.primary}
          />

          {/* Clock face - iconic academic symbol */}
          <ellipse
            cx="87"
            cy="58"
            rx="10"
            ry="12"
            fill="white"
            stroke={ISO_COLORS.primaryDark}
            strokeWidth="1.5"
          />
          {/* Clock hands */}
          <line
            x1="87"
            y1="58"
            x2="87"
            y2="50"
            stroke={ISO_COLORS.primaryDark}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="87"
            y1="58"
            x2="92"
            y2="60"
            stroke={ISO_COLORS.primaryDark}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Clock center dot */}
          <circle
            cx="87"
            cy="58"
            r="1.5"
            fill={ISO_COLORS.primaryDark}
          />

          {/* Tower windows below clock */}
          <polygon
            points="80,75 87,71 87,85 80,89"
            fill={ISO_COLORS.primaryDark}
            opacity="0.5"
          />
          <polygon
            points="80,95 87,91 87,105 80,109"
            fill={ISO_COLORS.primaryDark}
            opacity="0.5"
          />

          {/* Left wing windows - arched style */}
          {[0, 1].map((row) => (
            <g key={`left-windows-${row}`}>
              <polygon
                points={`32,${100 + row * 25} 40,${96 + row * 25} 40,${108 + row * 25} 32,${112 + row * 25}`}
                fill={ISO_COLORS.primaryDark}
                opacity="0.5"
              />
              <polygon
                points={`44,${93 + row * 25} 52,${89 + row * 25} 52,${101 + row * 25} 44,${105 + row * 25}`}
                fill={ISO_COLORS.primaryDark}
                opacity="0.5"
              />
            </g>
          ))}

          {/* Right wing windows */}
          {[0, 1].map((row) => (
            <g key={`right-windows-${row}`}>
              <polygon
                points={`148,${96 + row * 25} 156,${100 + row * 25} 156,${112 + row * 25} 148,${108 + row * 25}`}
                fill={ISO_COLORS.primaryDark}
                opacity="0.5"
              />
              <polygon
                points={`160,${89 + row * 25} 168,${93 + row * 25} 168,${105 + row * 25} 160,${101 + row * 25}`}
                fill={ISO_COLORS.primaryDark}
                opacity="0.5"
              />
            </g>
          ))}

          {/* Grand entrance - columns suggest academic institution */}
          {/* Entrance platform */}
          <polygon
            points="85,155 100,148 115,155 100,162"
            fill={ISO_COLORS.surfaceTop}
          />

          {/* Left column */}
          <polygon
            points="88,148 92,146 92,130 88,132"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="92,146 96,148 96,132 92,130"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Right column */}
          <polygon
            points="104,148 108,146 108,130 104,132"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="108,146 112,148 112,132 108,130"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Door between columns */}
          <polygon
            points="93,148 100,144 107,148 100,152"
            fill={ISO_COLORS.primaryDark}
          />

          {/* Steps */}
          <polygon
            points="80,162 100,154 120,162 100,170"
            fill={ISO_COLORS.surfaceTop}
          />
          <polygon
            points="80,162 100,170 100,173 80,165"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="100,170 120,162 120,165 100,173"
            fill={ISO_COLORS.surfaceRight}
          />
        </svg>

        {/* Checkmark badge */}
        <motion.div
          className="absolute -top-1 -right-1 md:top-0 md:right-0"
          style={{
            opacity: checkmarkOpacity,
            scale: checkmarkScale,
          }}
        >
          <div
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: ISO_COLORS.success }}
          >
            <Check className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={3} />
          </div>
        </motion.div>
      </div>
      <span
        className="mt-2 text-xs font-medium"
        style={{ color: ISO_COLORS.primaryDark }}
      >
        Your School
      </span>
    </motion.div>
  )
}
