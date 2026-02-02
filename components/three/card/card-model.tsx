'use client'

import { RoundedBox } from '@react-three/drei'

/**
 * CardModel - 3D credit card geometry with premium metallic material.
 *
 * Uses RoundedBox for rounded corners without custom geometry.
 * MeshPhysicalMaterial with iridescence creates holographic shimmer effect.
 *
 * Dimensions: 3.375 x 2.125 x 0.05 (credit card proportions ~1.586:1 ratio)
 * Based on ISO 7810 ID-1 standard (85.6mm x 53.98mm)
 *
 * Material properties:
 * - High metalness (0.95) for reflective surface
 * - Low roughness (0.05) for glossy appearance
 * - Clearcoat (1.0) for extra shine layer
 * - Iridescence (0.7) for holographic color shift effect
 *
 * IMPORTANT: This is a pure presentational component.
 * Rotation and interactivity are handled by CardInteractive wrapper.
 */
export function CardModel() {
  return (
    <RoundedBox
      args={[3.375, 2.125, 0.05]}
      radius={0.12}
      smoothness={4}
    >
      <meshPhysicalMaterial
        color="#0f0f23"
        metalness={0.95}
        roughness={0.05}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        iridescence={0.7}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[100, 400]}
        envMapIntensity={1.2}
      />
    </RoundedBox>
  )
}
