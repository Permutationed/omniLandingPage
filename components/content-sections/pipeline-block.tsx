'use client'

import { motion, MotionValue, useTransform, useMotionValue } from 'motion/react'

// Path traces 280x56 rect counterclockwise from center-top
const TRACE_PATH = 'M 140 1 L 1 1 L 1 55 L 279 55 L 279 1 L 140 1'

interface PipelineBlockProps {
  name: string
  isActive: boolean
  isCompleted: boolean
  isFirst: boolean
  progress?: MotionValue<number>
}

export function PipelineBlock({ name, isActive, isCompleted, isFirst, progress }: PipelineBlockProps) {
  const defaultMV = useMotionValue(0)
  const safeProgress = progress ?? defaultMV

  const yellowOffset = useTransform(safeProgress, [0, 0.5], [1, 0])
  const greenOffset = useTransform(safeProgress, [0.5, 1.0], [1, 0])

  const statusText = useTransform(safeProgress, (p: number): string => {
    if (p < 0.33) return 'Pending'
    if (p < 0.66) return 'In Review'
    return 'Approved'
  })
  const statusColor = useTransform(safeProgress, (p: number) => {
    if (p < 0.33) return '#999'
    if (p < 0.66) return '#D4A017'
    return '#2E8B57'
  })

  const mt = isFirst ? 0 : -1

  if (isCompleted) {
    return (
      <div className="relative w-full" style={{ height: '56px', marginTop: `${mt}px` }}>
        <svg viewBox="0 0 280 56" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <rect x="1" y="1" width="278" height="54" stroke="#2E8B57" strokeWidth="1" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-4 z-[2]">
          <span className="text-[11px] font-semibold tracking-[0.04em] text-foreground">{name}</span>
          <span className="text-[10px] font-medium px-[6px] py-[2px]" style={{ border: '1px solid #2E8B57', color: '#2E8B57', borderRadius: '2px' }}>
            Approved
          </span>
        </div>
      </div>
    )
  }

  if (isActive && progress) {
    return (
      <div className="relative w-full" style={{ height: '56px', marginTop: `${mt}px` }}>
        <svg viewBox="0 0 280 56" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <rect x="1" y="1" width="278" height="54" stroke="#ddd" strokeWidth="1" fill="white" />
          <motion.path
            d={TRACE_PATH}
            stroke="#D4A017"
            strokeWidth="2.5"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: yellowOffset }}
          />
          <motion.path
            d={TRACE_PATH}
            stroke="#2E8B57"
            strokeWidth="2.5"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: greenOffset }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-4 z-[2]">
          <span className="text-[11px] font-semibold tracking-[0.04em] text-foreground">{name}</span>
          <motion.span
            className="text-[10px] font-medium px-[6px] py-[2px]"
            style={{ border: '1px solid', borderColor: statusColor, color: statusColor, borderRadius: '2px' }}
          >
            {statusText}
          </motion.span>
        </div>
      </div>
    )
  }

  // Pending
  return (
    <div className="relative w-full" style={{ height: '56px', marginTop: `${mt}px` }}>
      <svg viewBox="0 0 280 56" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <rect x="1" y="1" width="278" height="54" stroke="#1F1F1F" strokeWidth="1.5" fill="white" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-between px-4 z-[2]">
        <span className="text-[11px] font-semibold tracking-[0.04em] text-foreground">{name}</span>
        <span className="text-[10px] font-medium px-[6px] py-[2px]" style={{ border: '1px solid #bbb', color: '#999', borderRadius: '2px' }}>
          Pending
        </span>
      </div>
    </div>
  )
}
