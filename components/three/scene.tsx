'use client'

import { Canvas } from '@react-three/fiber'
import { View, Preload } from '@react-three/drei'
import { useRef } from 'react'

interface Scene3DProps {
  children: React.ReactNode
}

export function Scene3D({ children }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null!)

  return (
    <div ref={containerRef} className="relative">
      {children}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        <Canvas
          eventSource={containerRef}
          eventPrefix="client"
          gl={{
            powerPreference: 'default',
            antialias: false,
          }}
          dpr={[1, 2]}
          fallback={<div className="sr-only">WebGL not supported</div>}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </div>
    </div>
  )
}
