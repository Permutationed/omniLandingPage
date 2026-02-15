'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function ArchitectureSection() {
  return (
    <section id="architecture" className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Architecture — Built for Regulated Environments
        </h2>
      </ScrollReveal>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl bg-card p-8 border border-border/50">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Omni runs as a multi-agent pipeline: specialized automation steps work together in sequence,
            passing outputs from one stage to the next. A central orchestrator coordinates the workflow,
            so data flows from documents and forms through analysis and reporting without manual handoffs.
            Built for regulated environments with audit-ready outputs and human oversight at key stages.
          </p>
        </div>
      </div>
    </section>
  )
}
