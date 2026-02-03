'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { TuitionSlider } from './tuition-slider'
import { SpendSlider } from './spend-slider'
import { CalculatorResults } from './calculator-results'

export function CalculatorSection() {
  const [tuition, setTuition] = useState(30000)
  const [monthlySpend, setMonthlySpend] = useState(500)

  return (
    <section id="calculator" className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Compact header */}
        <ScrollReveal className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Calculate Your Rewards
          </h2>
          <p className="text-muted-foreground">
            See how much you could earn with Omni
          </p>
        </ScrollReveal>

        {/* Single compact card */}
        <ScrollReveal delay={0.1}>
          <div className="bg-card rounded-xl border shadow-sm p-6">
            {/* Sliders - horizontal on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <TuitionSlider value={tuition} onChange={setTuition} />
              <SpendSlider value={monthlySpend} onChange={setMonthlySpend} />
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Results */}
            <CalculatorResults tuition={tuition} monthlySpend={monthlySpend} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
