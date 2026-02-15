'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { FileText, BarChart3, Database, Activity, LucideIcon } from 'lucide-react'
import { ISO_COLORS } from '../shared/constants'

interface MerchantPinProps {
  /** Pipeline node name */
  name: string
  /** Step or stage identifier (e.g., 3, 4) */
  multiplier: number
  /** Icon component for the merchant */
  Icon: LucideIcon
  /** Pin color */
  color: string
  /** Position on the map (percentage) */
  position: { x: number; y: number }
  /** Scroll progress */
  progress?: MotionValue<number>
  /** Progress range when pin appears [start, end] */
  appearRange?: [number, number]
  className?: string
}

/**
 * Animated pipeline node pin with step badge
 */
export function MerchantPin({
  name,
  multiplier,
  Icon,
  color,
  position,
  progress,
  appearRange = [0, 0.1],
  className = '',
}: MerchantPinProps) {
  // Bounce-in animation
  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.02, appearRange[1]],
    [0, 1.3, 1]
  )

  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.02],
    [0, 1]
  )

  // Subtle float animation after appearing
  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[1], appearRange[1] + 0.3, appearRange[1] + 0.6],
    [0, -3, 0]
  )

  return (
    <motion.div
      className={`absolute flex flex-col items-center ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -100%)',
        scale,
        opacity,
        y,
      }}
    >
      {/* Pin body */}
      <div
        className="relative flex flex-col items-center"
        style={{ color }}
      >
        {/* Step badge */}
        <div
          className="px-2 py-0.5 rounded-full text-white text-xs font-bold shadow-lg mb-1"
          style={{ backgroundColor: color }}
        >
          Step {multiplier}
        </div>

        {/* Icon circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>

        {/* Pin point */}
        <div
          className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent -mt-1"
          style={{ borderTopColor: color }}
        />

        {/* Shadow ellipse */}
        <div
          className="w-6 h-2 rounded-full mt-1 opacity-30"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Node label */}
      <motion.span
        className="text-xs font-medium mt-1 whitespace-nowrap bg-background/80 px-2 py-0.5 rounded"
        style={{
          opacity: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [appearRange[1], appearRange[1] + 0.1],
            [0, 1]
          ),
        }}
      >
        {name}
      </motion.span>
    </motion.div>
  )
}

// Pipeline nodes
export const MERCHANTS = [
  {
    id: 'doc',
    name: 'Documents',
    Icon: FileText,
    multiplier: 3,
    color: ISO_COLORS.primary,
    position: { x: 12, y: 20 },
  },
  {
    id: 'plan',
    name: 'Analysis Plan',
    Icon: BarChart3,
    multiplier: 3,
    color: ISO_COLORS.blue,
    position: { x: 75, y: 25 },
  },
  {
    id: 'data',
    name: 'Datasets',
    Icon: Database,
    multiplier: 4,
    color: ISO_COLORS.food,
    position: { x: 18, y: 60 },
  },
  {
    id: 'analysis',
    name: 'Analysis',
    Icon: BarChart3,
    multiplier: 4,
    color: ISO_COLORS.amberDark,
    position: { x: 80, y: 65 },
  },
  {
    id: 'output',
    name: 'Output',
    Icon: Activity,
    multiplier: 4,
    color: ISO_COLORS.retail,
    position: { x: 55, y: 5 },
  },
]
