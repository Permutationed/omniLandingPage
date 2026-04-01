'use client'

import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SpendSliderProps {
  value: number
  onChange: (value: number) => void
}

const MIN = 5
const MAX = 50
const STEP = 5

/**
 * Parse numeric input
 */
function parseInput(input: string): number {
  const cleaned = input.replace(/[^0-9]/g, '')
  return parseInt(cleaned, 10) || 0
}

export function SpendSlider({ value, onChange }: SpendSliderProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInput(e.target.value)
    const clamped = Math.min(MAX, Math.max(MIN, parsed))
    onChange(clamped)
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const parsed = parseInput(e.target.value)
    const clamped = Math.min(MAX, Math.max(MIN, parsed))
    onChange(clamped)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="team-input" className="text-sm font-medium text-foreground">
          Stats / DM Team Size
        </Label>
        <Input
          id="team-input"
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-20 text-right tabular-nums font-medium"
          aria-describedby="team-range"
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={MIN}
        max={MAX}
        step={STEP}
        aria-label="Statistical and data management team size"
      />
      <p id="team-range" className="text-xs text-muted-foreground text-right">
        {MIN} - {MAX} FTE
      </p>
    </div>
  )
}
