'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'
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
 * University building illustration - Professional Storyset design
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
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    fadeInRange,
    [0, 1]
  )

  const y = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    fadeInRange,
    [20, 0]
  )

  // Checkmark animation
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
        <Image
          src="/illustrations/buildings/university.svg"
          alt="University building"
          width={192}
          height={192}
          className="w-full h-auto"
          priority
        />

        {/* Checkmark badge - positioned on illustration */}
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
