'use client'

import { useState, useMemo } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { EmailCapture } from '@/components/hero/email-capture'
import { TuitionSlider } from './tuition-slider'
import { SpendSlider } from './spend-slider'

export function CalculatorSection() {
  const [studiesPerYear, setStudiesPerYear] = useState(5)
  const [teamSize, setTeamSize] = useState(15)

  const results = useMemo(() => {
    // ~15 weeks saved per study (eCRF 13 weeks + CDISC/monitoring)
    const weeksSavedPerStudy = 15
    const totalWeeksSaved = studiesPerYear * weeksSavedPerStudy

    // Capacity reclaimed: 25% base + scales with studies/team (capped 25-40%)
    const baseCapacity = 25
    const studyFactor = Math.min(studiesPerYear * 1.5, 10)
    const teamFactor = Math.min(teamSize * 0.2, 5)
    const capacityReclaimed = Math.min(40, Math.round(baseCapacity + studyFactor + teamFactor))

    return {
      weeksSaved: totalWeeksSaved,
      capacityReclaimed,
      csrReduction: 90,
    }
  }, [studiesPerYear, teamSize])

  return (
    <section id="calculator" className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
            Productivity Impact
          </h2>
          <p className="text-muted-foreground">
            Estimate time and capacity savings for your organization
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TuitionSlider value={studiesPerYear} onChange={setStudiesPerYear} />
                <SpendSlider value={teamSize} onChange={setTeamSize} />
              </div>
            </div>

            <div className="p-6 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Estimated Annual Time Saved
                </p>
                <div className="font-display text-4xl sm:text-5xl font-bold text-primary tabular-nums">
                  {results.weeksSaved} weeks
                </div>
                <p className="text-muted-foreground mt-1">
                  <span className="text-foreground font-medium">{results.capacityReclaimed}%</span> capacity reclaimed
                </p>
              </div>

              <div className="flex justify-center gap-8 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Weeks Saved</p>
                  <p className="font-semibold tabular-nums">{results.weeksSaved}</p>
                </div>
                <div className="border-l border-border pl-8">
                  <p className="text-muted-foreground">CSR Draft Reduction</p>
                  <p className="font-semibold text-accent">~{results.csrReduction}%</p>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-lg bg-accent/10 text-center">
                <p className="text-sm text-muted-foreground">
                  Automation removes operational friction — teams focus on what matters.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/30">
              <p className="text-center text-muted-foreground mb-4">
                Ready to see it in action?
              </p>
              <EmailCapture />
            </div>
          </div>
        </ScrollReveal>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Estimates based on automated document processing, data standardization, and report drafting.
        </p>
      </div>
    </section>
  )
}
