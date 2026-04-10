'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'

const STEP_NAMES = ['Protocol', 'Site Select', 'Recruitment', 'Screening', 'Treatment', 'Data Lock', 'Analysis']
const STEP_COUNT = STEP_NAMES.length
const BAR_START = 0.15
const BAR_END = 0.85

export function DashboardMockup() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Card entrance (0-15%)
  const cardOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const cardY = useTransform(scrollYProgress, [0, 0.15], [100, 0])
  const cardScale = useTransform(scrollYProgress, [0, 0.15], [0.9, 1])

  // Progress bar (15%-85%)
  const barWidth = useTransform(scrollYProgress, [BAR_START, BAR_END], ['0%', '100%'])

  // Active step index (-1 = none, 0-6 = step)
  const activeStep = useTransform(scrollYProgress, (p: number): number => {
    if (p < BAR_START) return -1
    const normalized = (p - BAR_START) / (BAR_END - BAR_START)
    return Math.min(STEP_COUNT - 1, Math.floor(normalized * STEP_COUNT))
  })

  // Screening percentage (step 3)
  const stepSize = (BAR_END - BAR_START) / STEP_COUNT
  const screenStart = BAR_START + 3 * stepSize
  const screenEnd = screenStart + stepSize
  const screeningPct = useTransform(scrollYProgress, [screenStart, screenEnd], [0, 100])

  return (
    <section ref={sectionRef} className="relative" style={{ height: '200vh', background: '#fafafa' }}>
      <div className="sticky top-[60px] flex items-center" style={{ height: 'calc(100vh - 60px)' }}>
        <div className="max-w-[1320px] mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
            {/* Left: heading */}
            <div>
              <h2 className="font-serif text-[38px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Real-time trial orchestration.
              </h2>
              <p className="text-base text-foreground leading-relaxed">
                Track every phase of your trial from a single interface. Protocol, site selection,
                recruitment, screening, treatment, data lock, and analysis -- all visible, all automated.
              </p>
            </div>

            {/* Right: dashboard card swoops in */}
            <motion.div style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}>
              <div className="bg-white overflow-hidden" style={{ border: '1px solid var(--foreground)' }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #e0dbd5' }}>
                  <span className="w-[8px] h-[8px] rounded-full bg-[#ef4444]" />
                  <span className="w-[8px] h-[8px] rounded-full bg-[#f59e0b]" />
                  <span className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                  <span className="text-xs text-muted-foreground ml-2">Astraea Trial Dashboard</span>
                  <span className="ml-auto flex items-center gap-[4px]">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#22c55e]" />
                    <span className="text-[11px] text-muted-foreground">Live</span>
                  </span>
                </div>
                <div className="p-5">
                  <div className="h-[6px] rounded-[3px] mb-5 overflow-hidden" style={{ background: '#e8e0d8' }}>
                    <motion.div className="h-full rounded-[3px] bg-foreground" style={{ width: barWidth }} />
                  </div>
                  <div className="flex gap-[6px] flex-wrap">
                    {STEP_NAMES.map((name, i) => (
                      <DashStep key={name} name={name} index={i} activeStep={activeStep} screeningPct={i === 3 ? screeningPct : undefined} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashStep({ name, index, activeStep, screeningPct }: {
  name: string
  index: number
  activeStep: MotionValue<number>
  screeningPct?: MotionValue<number>
}) {
  const borderColor = useTransform(activeStep, (a: number): string => {
    if (index < a) return '#c8c8c8'
    if (index === a) return 'var(--foreground)'
    return '#ddd'
  })
  const textColor = useTransform(activeStep, (a: number): string => {
    if (index < a) return '#666'
    if (index === a) return 'var(--foreground)'
    return '#aaa'
  })
  const bg = useTransform(activeStep, (a: number): string =>
    index === a ? 'rgba(31,31,31,0.05)' : 'transparent'
  )

  // For screening: show dynamic percentage when active, just name when done
  const label = screeningPct
    ? useTransform(
        [activeStep, screeningPct] as unknown as MotionValue<number>[],
        ([a, pct]: number[]): string => {
          if (index < a) return name // done, just show name
          if (index === a) {
            const rounded = Math.round(pct)
            return rounded >= 100 ? name : `Screening ${rounded}%`
          }
          return `${name} 0%` // pending
        }
      )
    : undefined

  return (
    <motion.span
      className="px-3 py-[5px] text-xs font-medium"
      style={{ border: '1px solid', borderColor, color: textColor, background: bg }}
    >
      {label ?? name}
    </motion.span>
  )
}
