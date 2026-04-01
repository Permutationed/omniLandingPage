'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { FileText, BarChart3, Activity } from 'lucide-react'
import { Odometer } from '../shared/odometer'
import { ISO_COLORS } from '../shared/constants'

interface SourceBreakdownProps {
  progress?: MotionValue<number>
  /** Progress range when sources appear */
  appearRange?: [number, number]
  className?: string
}

const SOURCES = [
  {
    id: 'documents',
    label: 'Documents',
    Icon: FileText,
    points: 1,
    color: ISO_COLORS.primary,
  },
  {
    id: 'analysis',
    label: 'Analysis',
    Icon: BarChart3,
    points: 1,
    color: ISO_COLORS.blue,
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    Icon: Activity,
    points: 1,
    color: ISO_COLORS.amber,
  },
] as const

/**
 * Three upstream input categories feeding CSR draft
 */
export function SourceBreakdown({
  progress,
  appearRange = [0.35, 0.55],
  className = '',
}: SourceBreakdownProps) {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 ${className}`}>
      {SOURCES.map((source, i) => {
        const itemStart = appearRange[0] + i * 0.05
        const itemEnd = itemStart + 0.1

        return (
          <motion.div
            key={source.id}
            className="flex flex-col items-center"
            style={{
              opacity: useTransform(
                progress ?? { get: () => 1 } as MotionValue<number>,
                [itemStart, itemStart + 0.03],
                [0, 1]
              ),
              y: useTransform(
                progress ?? { get: () => 1 } as MotionValue<number>,
                [itemStart, itemStart + 0.05],
                [20, 0]
              ),
            }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md"
              style={{ backgroundColor: `color-mix(in oklch, ${source.color} 15%, transparent)` }}
            >
              <source.Icon className="w-6 h-6" style={{ color: source.color }} strokeWidth={2} />
            </div>

            {/* Check */}
            <div className="text-lg font-bold" style={{ color: source.color }}>
              <Odometer
                value={source.points}
                progress={progress}
                progressRange={[itemStart, itemEnd]}
                format={(v) => (v ? '✓' : '')}
              />
            </div>

            {/* Label */}
            <div className="text-xs text-muted-foreground">
              {source.label}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export { SOURCES }
