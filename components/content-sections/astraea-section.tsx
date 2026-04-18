'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useInView, animate, MotionValue } from 'motion/react'
import { PipelineBlock } from './pipeline-block'
import Link from 'next/link'
import posthog from 'posthog-js'

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
const LOOP_DURATION = 20 // seconds (5 steps × 4s)

function useStepAnimations(progress: MotionValue<number>) {
  // Each step: 20% of loop. Within each: small entrance, then trace
  return PIPELINE_STEPS.map((_, i) => {
    const start = i * 0.2
    const end = (i + 1) * 0.2
    const traceStart = start + 0.03
    const isLast = i === PIPELINE_STEPS.length - 1
    return {
      traceProgress: useTransform(progress, [traceStart, end - 0.02], [0, 1]),
      textOpacity: useTransform(
        progress,
        isLast
          ? [Math.max(0, start - 0.01), start + 0.03, 1.0, 1.0]
          : [Math.max(0, start - 0.01), start + 0.03, end - 0.03, end],
        [0, 1, 1, isLast ? 1 : 0]
      ),
    }
  })
}

export function AstraeaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.3 })
  const progress = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(progress, [0, 1], {
      duration: LOOP_DURATION,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })
    return () => controls.stop()
  }, [inView, progress])

  const steps = useStepAnimations(progress)

  return (
    <section id="pipeline" ref={containerRef} className="py-[100px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">

          {/* Left: Step text (crossfading on loop) */}
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
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4" style={{ lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  {step.title}
                </h3>
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
                href="https://cal.com/team/astraea/product-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
                style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
                onClick={() => posthog.capture('request_demo_clicked', { source: 'pipeline_section' })}
              >
                Request Demo
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right: Stacking blocks — entrance once, trace loops */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col-reverse w-[280px]">
              {PIPELINE_STEPS.map((step, i) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
    </section>
  )
}
