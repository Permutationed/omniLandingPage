'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { SecurityAccordion } from '@/components/security'

export function SecuritySection() {
  return (
    <section id="security" className="max-w-3xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Security & Governance
        </h2>
        <p className="text-muted-foreground text-lg">
          Built for regulated environments. Audit-ready and privacy-safe.
        </p>
      </ScrollReveal>

      <SecurityAccordion />
    </section>
  )
}
