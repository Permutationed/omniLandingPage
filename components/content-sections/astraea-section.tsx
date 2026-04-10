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

function useStepAnimations(scrollYProgress: MotionValue<number>) {
  // Each step: 20% of total scroll. Within each: 0-30% entrance, 30-100% trace
  return PIPELINE_STEPS.map((_, i) => {
    const start = i * 0.2
    const end = (i + 1) * 0.2
    const traceStart = start + 0.06
    return {
      blockOpacity: i === 0
        ? useTransform(scrollYProgress, [0, 0], [1, 1])
        : useTransform(scrollYProgress, [start, start + 0.03], [0, 1]),
      blockY: i === 0
        ? useTransform(scrollYProgress, [0, 0], [0, 0])
        : useTransform(scrollYProgress, [start, start + 0.06], [40, 0]),
      traceProgress: useTransform(scrollYProgress, [traceStart, end - 0.02], [0, 1]),
      textOpacity: i === 0
        ? useTransform(scrollYProgress, [0, 0.03, 0.17, 0.2], [1, 1, 1, 0])
        : useTransform(
            scrollYProgress,
            i === 4
              ? [Math.max(0, start - 0.01), start + 0.03, 1.0, 1.0]
              : [Math.max(0, start - 0.01), start + 0.03, end - 0.03, end],
            [0, 1, 1, i === 4 ? 1 : 0]
          ),
    }
  })
}

export function AstraeaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const steps = useStepAnimations(scrollYProgress)

  return (
    <section id="pipeline" ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-[60px]" style={{ height: 'calc(100vh - 60px)' }}>
        <div className="max-w-[1320px] mx-auto px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] w-full items-center">

            {/* Left: Step text (crossfading) */}
            <div className="relative" style={{ minHeight: '380px' }}>
              {PIPELINE_STEPS.map((step, i) => (
                <motion.div
                  key={step.name}
                  className="absolute left-0 right-0"
                  style={{ top: '0px', opacity: steps[i].textOpacity }}
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

              {/* Features list + CTA pinned at bottom */}
              <div className="absolute left-0 right-0" style={{ bottom: 0 }}>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {FEATURES.map((feat) => (
                    <li key={feat} className="text-sm text-foreground py-1" style={{ borderBottom: '1px solid #e0dbd5' }}>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://cal.com/joshua-s-wang-z4anha/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
                  style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
                >
                  Request Demo
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right: Stacking blocks */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col-reverse w-[280px]">
                {PIPELINE_STEPS.map((step, i) => (
                  <motion.div
                    key={step.name}
                    style={{
                      opacity: steps[i].blockOpacity,
                      y: steps[i].blockY,
                    }}
                  >
                    <PipelineBlock
                      name={step.name}
                      isActive={true}
                      isCompleted={false}
                      isFirst={i === 0}
                      progress={steps[i].traceProgress}
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
