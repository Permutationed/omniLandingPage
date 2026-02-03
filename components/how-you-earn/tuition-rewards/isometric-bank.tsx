'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ISO_COLORS } from '../shared/constants'

interface IsometricBankProps {
  progress?: MotionValue<number>
  /** Progress range when bank should fade in [start, end] */
  fadeInRange?: [number, number]
  className?: string
}

/**
 * Bank building illustration - Professional Storyset design
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
        <Image
          src="/illustrations/buildings/bank.svg"
          alt="Bank building"
          width={176}
          height={176}
          className="w-full h-auto"
          priority
        />
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
