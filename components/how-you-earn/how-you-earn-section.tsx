'use client'

import { useReducedMotion } from 'framer-motion'
import { TuitionRewards } from './tuition-rewards'
import { UnlockRate } from './unlock-rate'
import { DiscoverRewards } from './discover-rewards'
import { RewardsLoop } from './rewards-loop'

/**
 * Static fallback for reduced motion users
 */
function HowYouEarnStatic() {
  const steps = [
    { title: 'Document ingestion', desc: 'Automated document processing and structuring.' },
    { title: 'Form generation', desc: 'Automated creation of data collection forms.' },
    { title: 'Analysis planning', desc: 'Automated planning and gap detection.' },
    { title: 'Dataset generation', desc: 'Automated dataset creation and validation.' },
    { title: 'Monitoring', desc: 'Automated oversight and anomaly detection.' },
    { title: 'Analysis outputs', desc: 'Automated tables and figures.' },
    { title: 'Report drafting', desc: 'Automated regulatory reports. Changes propagate downstream.' },
  ]
  return (
    <div className="pt-16 pb-8 md:pt-24 md:pb-12 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-6 lg:space-y-8">
          {steps.slice(0, 4).map((s) => (
            <section key={s.title} className="bg-card rounded-xl p-8 shadow-md border border-border/50">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-4">{s.title}</h2>
              <p className="text-muted-foreground">{s.desc}</p>
            </section>
          ))}
        </div>
        <div className="space-y-6 lg:space-y-8 lg:pt-48">
          {steps.slice(4, 7).map((s) => (
            <section key={s.title} className="bg-card rounded-xl p-8 shadow-md border border-border/50">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-4">{s.title}</h2>
              <p className="text-muted-foreground">{s.desc}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * The 7-Step Agentic Workflow
 * Left column: Steps 1-4 (Protocol → eCRF → SAP → SDTM/ADaM)
 * Right column: Steps 5-7 (Monitoring → TLF → CSR)
 */
export function HowYouEarnSection() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <HowYouEarnStatic />
  }

  return (
    <div id="how-it-works" className="pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From study design to submission, automated end to end.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left column */}
          <div className="space-y-6 lg:space-y-8">
            <TuitionRewards />
            <DiscoverRewards />
          </div>
          {/* Right column - staggered down */}
          <div className="space-y-6 lg:space-y-8 lg:pt-48">
            <UnlockRate />
            <RewardsLoop />
          </div>
        </div>
      </div>
    </div>
  )
}
