'use client'

import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TuitionSliderProps {
  value: number
  onChange: (value: number) => void
}

const MIN = 5000
const MAX = 80000
const STEP = 1000

/**
 * Format a number as currency: $25,000
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

export function TuitionSlider({ value, onChange }: TuitionSliderProps) {
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
        <Label htmlFor="tuition-input" className="text-sm font-medium text-foreground">
          Annual Tuition
        </Label>
        <Input
          id="tuition-input"
          type="text"
          inputMode="numeric"
          value={formatCurrency(value)}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-32 text-right tabular-nums font-medium"
          aria-describedby="tuition-range"
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={MIN}
        max={MAX}
        step={STEP}
        aria-label="Annual tuition amount"
      />
      <p id="tuition-range" className="text-xs text-muted-foreground text-right">
        {formatCurrency(MIN)} - {formatCurrency(MAX)}
      </p>
    </div>
  )
}
