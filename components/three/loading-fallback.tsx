'use client'

import { useProgress } from '@react-three/drei'

export function LoadingFallback() {
  const { active, progress } = useProgress()

  if (!active) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          Loading 3D...
        </span>
      </div>
    </div>
  )
}
