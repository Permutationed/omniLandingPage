'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ISO_COLORS } from '../shared/constants'

interface CampusBuildingProps {
  progress?: MotionValue<number>
  /** Progress range when building appears */
  appearRange?: [number, number]
  className?: string
}

/**
 * Isometric campus building for map center - Clean geometric design
 */
export function CampusBuilding({
  progress,
  appearRange = [0.15, 0.25],
  className = '',
}: CampusBuildingProps) {
  const opacity = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    appearRange,
    [0, 1]
  )

  const scale = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    [appearRange[0], appearRange[0] + 0.05, appearRange[1]],
    [0.8, 1.05, 1]
  )

  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${className}`}
      style={{ opacity, scale }}
    >
      <div className="relative w-20 md:w-24 lg:w-28">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-auto"
          aria-label="Campus building"
        >
          {/* Shadow ellipse */}
          <ellipse
            cx="50"
            cy="92"
            rx="35"
            ry="6"
            fill={ISO_COLORS.shadow}
          />

          {/* Main building body - left face */}
          <polygon
            points="20,85 20,50 50,35 50,70"
            fill={ISO_COLORS.surfaceLeft}
          />

          {/* Main building body - right face */}
          <polygon
            points="50,35 80,50 80,85 50,70"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Building roof/top */}
          <polygon
            points="50,35 80,50 50,65 20,50"
            fill={ISO_COLORS.surfaceTop}
          />

          {/* Tower - left face */}
          <polygon
            points="40,65 40,25 50,20 50,60"
            fill={ISO_COLORS.surfaceLeft}
          />

          {/* Tower - right face */}
          <polygon
            points="50,20 60,25 60,65 50,60"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Tower roof */}
          <polygon
            points="50,20 60,25 50,30 40,25"
            fill={ISO_COLORS.surfaceTop}
          />

          {/* Spire */}
          <polygon
            points="50,8 53,20 47,20"
            fill={ISO_COLORS.primary}
          />

          {/* Tower windows - left side (2 windows) */}
          {[0, 1].map((i) => (
            <polygon
              key={`tower-left-${i}`}
              points={`43,${35 + i * 15} 48,${32 + i * 15} 48,${26 + i * 15} 43,${29 + i * 15}`}
              fill={ISO_COLORS.primaryDark}
              opacity="0.6"
            />
          ))}

          {/* Tower windows - right side (2 windows) */}
          {[0, 1].map((i) => (
            <polygon
              key={`tower-right-${i}`}
              points={`52,${32 + i * 15} 57,${35 + i * 15} 57,${29 + i * 15} 52,${26 + i * 15}`}
              fill={ISO_COLORS.primaryDark}
              opacity="0.5"
            />
          ))}

          {/* Main building windows - left (2x2 grid) */}
          {[0, 1].map((row) =>
            [0, 1].map((col) => (
              <polygon
                key={`main-left-${row}-${col}`}
                points={`
                  ${25 + col * 10},${60 + row * 12 - col * 5}
                  ${31 + col * 10},${57 + row * 12 - col * 5}
                  ${31 + col * 10},${52 + row * 12 - col * 5}
                  ${25 + col * 10},${55 + row * 12 - col * 5}
                `}
                fill={ISO_COLORS.primaryDark}
                opacity="0.6"
              />
            ))
          )}

          {/* Main building windows - right (2x2 grid) */}
          {[0, 1].map((row) =>
            [0, 1].map((col) => (
              <polygon
                key={`main-right-${row}-${col}`}
                points={`
                  ${55 + col * 10},${57 + row * 12 + col * 5}
                  ${61 + col * 10},${60 + row * 12 + col * 5}
                  ${61 + col * 10},${55 + row * 12 + col * 5}
                  ${55 + col * 10},${52 + row * 12 + col * 5}
                `}
                fill={ISO_COLORS.primaryDark}
                opacity="0.5"
              />
            ))
          )}

          {/* Entrance door - center */}
          <polygon
            points="45,82 50,79 50,70 45,73"
            fill={ISO_COLORS.primaryDark}
          />
          <polygon
            points="50,79 55,82 55,73 50,70"
            fill={ISO_COLORS.primary}
          />

          {/* Steps */}
          <polygon
            points="42,85 58,85 50,80"
            fill={ISO_COLORS.surfaceTop}
          />
          <polygon
            points="42,85 50,80 50,82 42,87"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="50,80 58,85 58,87 50,82"
            fill={ISO_COLORS.surfaceRight}
          />
        </svg>
      </div>

      {/* Campus label */}
      <div className="text-center mt-1">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded"
          style={{
            backgroundColor: `color-mix(in oklch, ${ISO_COLORS.primary} 10%, transparent)`,
            color: ISO_COLORS.primary,
          }}
        >
          Campus
        </span>
      </div>
    </motion.div>
  )
}
