'use client'

interface MetricCardProps {
  value: string
  label: string
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-8 shadow-md border border-border/50">
      <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{value}</div>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </div>
  )
}

const metrics = [
  { value: '25–40%', label: 'Capacity reclaimed' },
  { value: '90%', label: 'Report draft-time reduction' },
  { value: 'Phase II/III', label: 'Clinical trial focus' },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} value={metric.value} label={metric.label} />
      ))}
    </div>
  )
}
