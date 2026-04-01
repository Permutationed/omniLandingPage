'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'

interface TuitionCardProps {
  progress?: MotionValue<number>
  /** Progress range when card appears */
  appearRange?: [number, number]
  /** Progress range when completion animates */
  reductionRange?: [number, number]
  className?: string
}

/**
 * Submission artifacts card showing CSR and regulatory outputs ready
 */
export function TuitionCard({
  progress,
  appearRange = [0.55, 0.65],
  reductionRange = [0.7, 0.85],
  className = '',
}: TuitionCardProps) {
  const cardOpacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.05],
    [0, 1]
  )

  const cardY = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[1]],
    [30, 0]
  )

  const reductionOpacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [reductionRange[0], reductionRange[0] + 0.05],
    [0, 1]
  )

  const reductionScale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [reductionRange[0], reductionRange[0] + 0.05, reductionRange[0] + 0.1],
    [0.8, 1.1, 1]
  )

  return (
    <motion.div
      className={`${className}`}
      style={{ opacity: cardOpacity, y: cardY }}
    >
      <div
        className="bg-background border border-border/70 rounded-xl shadow-lg p-8 md:p-10 max-w-sm mx-auto"
        style={{
          transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            REPORT PACKAGE
          </span>
          <span className="text-xs bg-muted px-2 py-0.5 rounded">
            Step 7
          </span>
        </div>

        <div className="relative">
          <div className="text-2xl md:text-3xl font-bold text-muted-foreground">
            Report Draft
          </div>
        </div>

        <motion.div
          className="mt-4"
          style={{ opacity: reductionOpacity, scale: reductionScale }}
        >
          <div className="text-3xl md:text-4xl font-bold text-foreground">
            Ready for Review
          </div>

          <motion.div
            className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-accent/15 text-accent rounded-full"
            style={{
              opacity: useTransform(
                progress ?? { get: () => 1 } as MotionValue<number>,
                [reductionRange[1] - 0.05, reductionRange[1]],
                [0, 1]
              ),
              scale: useTransform(
                progress ?? { get: () => 1 } as MotionValue<number>,
                [reductionRange[1] - 0.05, reductionRange[1]],
                [0.8, 1]
              ),
            }}
          >
            <Check className="w-5 h-5" strokeWidth={3} />
            <span className="font-bold">Audit-ready</span>
          </motion.div>
        </motion.div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Updates flow automatically
          </div>
        </div>
      </div>
    </motion.div>
  )
}
