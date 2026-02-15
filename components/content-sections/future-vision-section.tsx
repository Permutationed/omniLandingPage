'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Library, Beaker, Database, Lightbulb, FileCheck } from 'lucide-react'

const expansionAreas = [
  { icon: Library, text: 'Digital study libraries' },
  { icon: Beaker, text: 'Advanced trial design' },
  { icon: Database, text: 'End-to-end automation' },
  { icon: Lightbulb, text: 'Autonomous workflows' },
  { icon: FileCheck, text: 'Regulatory synchronization' },
]

export function FutureVisionSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Future Vision
        </h2>
        <h3 className="text-2xl font-semibold text-primary mb-4">
          Toward Fully Autonomous Clinical Trials
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From study design to submission — one orchestrated system.
        </p>
      </ScrollReveal>

      <div className="flex flex-wrap justify-center gap-4">
        {expansionAreas.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2 rounded-lg bg-card px-5 py-3 border border-border/50"
          >
            <item.icon className="size-5 text-primary shrink-0" />
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
