'use client'

import { useId } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  className = '',
}: FeatureCardProps) {
  const titleId = useId()

  return (
    <article
      tabIndex={0}
      role="article"
      aria-labelledby={titleId}
      className={`bg-card rounded-xl p-8 shadow-md border border-border/50 cursor-default outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
    >
      <div className="text-primary mb-4 size-8">{icon}</div>
      <h3
        id={titleId}
        className="font-display text-lg font-semibold mb-2"
      >
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </article>
  )
}
