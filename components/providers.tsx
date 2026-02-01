'use client'

import { MotionConfig } from 'motion/react'
import dynamic from 'next/dynamic'

const Scene3D = dynamic(
  () => import('@/components/three/scene').then(mod => mod.Scene3D),
  { ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Scene3D>
        {children}
      </Scene3D>
    </MotionConfig>
  )
}
