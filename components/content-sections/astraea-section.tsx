'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { PipelineBlock } from './pipeline-block'
import Link from 'next/link'

const PIPELINE_STEPS = [
  {
    name: 'RAW INGESTION',
    title: 'Raw Ingestion',
    desc: 'Clinical data enters the pipeline from disparate sources. The ingestion layer normalizes formats and validates integrity before downstream processing.',
  },
  {
    name: 'CDASH MAPPING',
    title: 'CDASH Mapping',
    desc: 'Raw clinical data is mapped to CDISC CDASH standards. AI-verified completeness checks eliminate weeks of manual annotation.',
  },
  {
    name: 'SDTM GENERATION',
    title: 'SDTM Generation',
    desc: 'CDASH data is transformed into SDTM submission-ready datasets. Define.xml, reviewer guides, and validation reports generated with full traceability.',
  },
  {
    name: 'ADaM TRANSFORMATION',
    title: 'ADaM Transformation',
    desc: 'SDTM datasets transformed into analysis-ready ADaM datasets. Derivation logic, population flags, and BDS/ADSL generation with automated QC.',
  },
  {
    name: 'TLF PRODUCTION',
    title: 'TLF Production',
    desc: 'Analysis datasets feed into automated Tables, Listings, and Figures generation. Submission-ready TLFs with version control and audit trails.',
  },
]

const FEATURES = ['Data refinement', 'Standards generation', 'Statistical execution', 'Cross-track validation', 'Report automation', 'Full traceability']

export function AstraeaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Each step occupies 1/5 of the scroll
  // Within each step: 0-30% block entrance, 30-100% border trace
  const stepAnimations = PIPELINE_STEPS.map((_, i) => {
    const stepStart = i / 5
    const stepEnd = (i + 1) / 5
    const traceStart = stepStart + (stepEnd - stepStart) * 0.3

    return {
      blockOpacity: useTransform(scrollYProgress, [stepStart, stepStart + 0.02], [0, 1]),
      blockY: useTransform(scrollYProgress, [stepStart, stepStart + 0.06], [60, 0]),
      traceProgress: useTransform(scrollYProgress, [traceStart, stepEnd], [0, 1]),
      textOpacity: useTransform(
        scrollYProgress,
        i === 4
          ? [Math.max(0, stepStart - 0.02), stepStart + 0.04, 1.0, 1.0]
          : [Math.max(0, stepStart - 0.02), stepStart + 0.04, stepEnd - 0.04, stepEnd + 0.02],
        [0, 1, 1, i === 4 ? 1 : 0]
      ),
      isCompleted: useTransform(scrollYProgress, (p: number) => p > stepEnd + 0.01),
      isActive: useTransform(scrollYProgress, (p: number) => p >= stepStart && p <= stepEnd + 0.01),
    }
  })

  return (
    <section id="pipeline" ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-[60px] overflow-hidden" style={{ height: 'calc(100vh - 60px)' }}>
        <div className="max-w-[1140px] mx-auto px-5 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] w-full items-center">

            {/* Left: Step text (crossfading) */}
            <div className="relative" style={{ minHeight: '350px' }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-8">
                Execution Pipeline v4.0
              </p>

              {PIPELINE_STEPS.map((step, i) => (
                <motion.div
                  key={step.name}
                  className="absolute left-0 right-0"
                  style={{ top: '40px', opacity: stepAnimations[i].textOpacity }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">
                    Step {i + 1} of 5
                  </p>
                  <h2 className="font-serif text-[32px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h2>
                  <p className="text-[15px] text-foreground leading-relaxed max-w-[400px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}

              {/* Features + CTA at bottom */}
              <div className="absolute left-0 right-0" style={{ bottom: 0 }}>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {FEATURES.map((feat) => (
                    <li key={feat} className="text-sm text-foreground py-1" style={{ borderBottom: '1px solid #e0dbd5' }}>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#request-demo"
                  className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
                  style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
                >
                  Request Demo
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right: Stacking blocks */}
            <div className="flex flex-col items-center">
              <p className="self-start text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-6">
                Execution Pipeline v4.0
              </p>
              <div className="flex flex-col-reverse w-[280px]">
                {PIPELINE_STEPS.map((step, i) => (
                  <motion.div
                    key={step.name}
                    style={{
                      opacity: stepAnimations[i].blockOpacity,
                      y: stepAnimations[i].blockY,
                    }}
                  >
                    <PipelineBlockStateful
                      name={step.name}
                      index={i}
                      traceProgress={stepAnimations[i].traceProgress}
                      isCompleted={stepAnimations[i].isCompleted}
                      isActive={stepAnimations[i].isActive}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PipelineBlockStateful({
  name,
  index,
  traceProgress,
}: {
  name: string
  index: number
  traceProgress: MotionValue<number>
  isCompleted: MotionValue<boolean>
  isActive: MotionValue<boolean>
}) {
  return (
    <PipelineBlock
      name={name}
      isActive={true}
      isCompleted={false}
      isFirst={index === 0}
      progress={traceProgress}
    />
  )
}
