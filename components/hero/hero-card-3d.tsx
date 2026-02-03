'use client'

import { View, Environment, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { LoadingFallback } from '@/components/three/loading-fallback'
import { CardInteractive } from '@/components/three/card/card-interactive'
import { useDeviceOrientation } from '@/components/three/card/use-device-orientation'

export function HeroCard3D() {
  const { orientation, permission } = useDeviceOrientation()
  const gyroscopeEnabled = permission === 'granted'

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
      <LoadingFallback />
      <View className="absolute inset-0 pointer-events-auto">
        {/* Camera pulled back so the full card fits in view when tilted */}
        <PerspectiveCamera makeDefault position={[0, 0, 500]} fov={50} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Environment preset="city" />
          <CardInteractive
            gyroscopeEnabled={gyroscopeEnabled}
            gyroscopeData={orientation}
          />
        </Suspense>
      </View>
    </div>
  )
}
