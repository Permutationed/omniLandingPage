'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ISO_COLORS } from '../shared/constants'

interface CampusBuildingProps {
  progress?: MotionValue<number>
  /** Progress range when building appears */
  appearRange?: [number, number]
  className?: string
}

/**
 * Campus building illustration for map center - Professional Storyset design
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
        <Image
          src="/illustrations/buildings/campus.svg"
          alt="Campus building"
          width={112}
          height={112}
          className="w-full h-auto"
          priority
        />
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
