'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Coffee, BookOpen, Pizza, UtensilsCrossed, ShoppingBag, LucideIcon } from 'lucide-react'
import { ISO_COLORS } from '../shared/constants'

interface MerchantPinProps {
  /** Merchant name */
  name: string
  /** Reward multiplier (e.g., 3, 5, 10) */
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
 * Animated merchant pin with reward multiplier badge
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
        {/* Multiplier badge */}
        <div
          className="px-2 py-0.5 rounded-full text-white text-xs font-bold shadow-lg mb-1"
          style={{ backgroundColor: color }}
        >
          {multiplier}x
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

      {/* Merchant name (shown on hover/focus in real app, always visible here for demo) */}
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

// Pre-defined merchant data
export const MERCHANTS = [
  {
    id: 'coffee',
    name: 'Campus Coffee',
    Icon: Coffee,
    multiplier: 5,
    color: ISO_COLORS.coffee,
    position: { x: 25, y: 35 },
  },
  {
    id: 'books',
    name: 'University Books',
    Icon: BookOpen,
    multiplier: 10,
    color: ISO_COLORS.books,
    position: { x: 70, y: 30 },
  },
  {
    id: 'pizza',
    name: 'Campus Pizza',
    Icon: Pizza,
    multiplier: 3,
    color: ISO_COLORS.food,
    position: { x: 30, y: 65 },
  },
  {
    id: 'burger',
    name: 'Student Grill',
    Icon: UtensilsCrossed,
    multiplier: 5,
    color: ISO_COLORS.amberDark,
    position: { x: 75, y: 60 },
  },
  {
    id: 'store',
    name: 'Quick Mart',
    Icon: ShoppingBag,
    multiplier: 7,
    color: ISO_COLORS.retail,
    position: { x: 55, y: 75 },
  },
]
