'use client'

import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SpendSliderProps {
  value: number
  onChange: (value: number) => void
}

const MIN = 200
const MAX = 2000
const STEP = 50

/**
 * Format a number as currency with /mo suffix: $500/mo
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Parse currency input by stripping non-numeric chars
 */
function parseCurrencyInput(input: string): number {
  const cleaned = input.replace(/[^0-9]/g, '')
  return parseInt(cleaned, 10) || 0
}

export function SpendSlider({ value, onChange }: SpendSliderProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseCurrencyInput(e.target.value)
    // Clamp to valid range
    const clamped = Math.min(MAX, Math.max(MIN, parsed))
    onChange(clamped)
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const parsed = parseCurrencyInput(e.target.value)
    // Clamp on blur to ensure valid value
    const clamped = Math.min(MAX, Math.max(MIN, parsed))
    onChange(clamped)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="spend-input" className="text-sm font-medium text-foreground">
          Monthly Everyday Spend
        </Label>
        <div className="flex items-center gap-1">
          <Input
            id="spend-input"
            type="text"
            inputMode="numeric"
            value={formatCurrency(value)}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-24 text-right tabular-nums font-medium"
            aria-describedby="spend-range"
          />
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={MIN}
        max={MAX}
        step={STEP}
        aria-label="Monthly everyday spend amount"
      />
      <p id="spend-range" className="text-xs text-muted-foreground text-right">
        {formatCurrency(MIN)}/mo - {formatCurrency(MAX)}/mo
      </p>
    </div>
  )
}
