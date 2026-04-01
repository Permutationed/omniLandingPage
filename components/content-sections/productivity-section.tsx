'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'

const metrics = [
  { value: '90%', label: 'Report draft-time reduction' },
  { value: 'Weeks → Hours', label: 'Data standardization' },
  { value: 'Faster', label: 'Database lock' },
  { value: 'Reduced rework', label: 'Fewer handoffs' },
]

export function ProductivitySection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Productivity Impact
        </h2>
        <h3 className="text-2xl font-semibold text-primary mb-4">
          Reclaim 25–40% Organizational Capacity
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Automation removes operational friction. Teams focus on what matters.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-card rounded-xl p-8 shadow-md border border-border/50 text-center"
          >
            <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
              {metric.value}
            </div>
            <p className="text-muted-foreground text-sm mt-1">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
