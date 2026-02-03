'use client'

import { useMemo, useState, useEffect } from 'react'

interface CalculatorResultsProps {
  tuition: number
  monthlySpend: number
}

export function CalculatorResults({ tuition, monthlySpend }: CalculatorResultsProps) {
  const results = useMemo(() => {
    const annualSpend = monthlySpend * 12

    // Base Points: 1 point per $1 on all spend (tuition + everyday)
    const basePoints = tuition + annualSpend

    // Bonus: threshold-based on spend ratio
    let bonusValue = 0
    if (annualSpend >= 0.40 * tuition) {
      bonusValue = 0.01 * tuition
    } else if (annualSpend >= 0.20 * tuition) {
      bonusValue = 0.005 * tuition
    }

    // Total
    const totalValue = (basePoints * 0.01) + bonusValue
    const tuitionReduction = (totalValue / tuition) * 100

    return {
      totalPoints: Math.round(basePoints),
      totalValue: Math.round(totalValue),
      tuitionReduction: Math.round(tuitionReduction * 10) / 10,
    }
  }, [tuition, monthlySpend])

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <ResultItem
        value={results.totalPoints.toLocaleString()}
        label="Points Earned"
        suffix="pts"
      />
      <ResultItem
        value={`$${results.totalValue.toLocaleString()}`}
        label="Cash Value"
        highlight
      />
      <ResultItem
        value={`${results.tuitionReduction}%`}
        label="Tuition Savings"
      />
    </div>
  )
}

function ResultItem({
  value,
  label,
  suffix,
  highlight
}: {
  value: string
  label: string
  suffix?: string
  highlight?: boolean
}) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    setDisplay(value)
  }, [value])

  return (
    <div>
      <div className={`font-display text-2xl sm:text-3xl font-bold tabular-nums ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {display}
        {suffix && <span className="text-base font-normal text-muted-foreground ml-1">{suffix}</span>}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
