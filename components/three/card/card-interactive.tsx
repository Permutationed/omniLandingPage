'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import type { Group } from 'three'
import { CardModel } from './card-model'

/**
 * Props for CardInteractive component
 */
interface CardInteractiveProps {
  /**
   * Whether to use gyroscope data for rotation (mobile)
   * @default false
   */
  gyroscopeEnabled?: boolean
  /**
   * Gyroscope orientation data from useDeviceOrientation hook
   * - beta: front-to-back tilt (-180 to 180)
   * - gamma: left-to-right tilt (-90 to 90)
   */
  gyroscopeData?: { beta: number | null; gamma: number | null }
}

/**
 * Interactive card wrapper that handles cursor/gyroscope-reactive rotation.
 *
 * Uses maath's dampE for smooth, frame-rate-independent interpolation.
 * On desktop, follows mouse cursor. On mobile (when enabled), follows device tilt.
 *
 * CRITICAL: No useState calls inside useFrame - uses direct ref mutation for 60fps.
 *
 * @example
 * ```tsx
 * <CardInteractive
 *   gyroscopeEnabled={permission === 'granted'}
 *   gyroscopeData={orientation}
 * />
 * ```
 */
export function CardInteractive({
  gyroscopeEnabled = false,
  gyroscopeData,
}: CardInteractiveProps) {
  const cardRef = useRef<Group>(null!)

  // Max rotation in radians (~14 degrees)
  const rotationFactor = 0.25

  useFrame((state, delta) => {
    let targetRotationX = 0
    let targetRotationY = 0

    if (gyroscopeEnabled && gyroscopeData && gyroscopeData.gamma !== null) {
      // Gyroscope input (mobile)
      // gamma: left-right tilt (-90 to 90), maps to Y rotation
      // beta: front-back tilt (-180 to 180), maps to X rotation
      // Offset beta by 45 degrees for natural phone holding angle
      const gamma = gyroscopeData.gamma
      const beta = (gyroscopeData.beta ?? 45) - 45

      targetRotationY = (gamma / 45) * rotationFactor
      targetRotationX = (beta / 45) * rotationFactor
    } else {
      // Mouse input (desktop)
      // state.pointer is normalized -1 to 1 based on mouse position in canvas
      // Y is inverted so card tilts toward cursor
      targetRotationY = state.pointer.x * rotationFactor
      targetRotationX = -state.pointer.y * rotationFactor
    }

    // Smooth interpolation using dampE
    // dampE mutates the first argument (euler rotation) directly
    // 0.2 is smoothing time, lower = faster response
    // delta ensures frame-rate independence (same speed on 60Hz and 120Hz)
    easing.dampE(
      cardRef.current.rotation,
      [targetRotationX, targetRotationY, 0],
      0.2,
      delta
    )
  })

  return (
    <group ref={cardRef}>
      <CardModel />
    </group>
  )
}
