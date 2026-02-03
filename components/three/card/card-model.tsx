'use client'

import { useEffect } from 'react'
import { RoundedBox, useTexture } from '@react-three/drei'

/** Card face dimensions (credit card proportions ~1.586:1), ISO 7810 ID-1 */
const CARD_WIDTH = 3.375
const CARD_HEIGHT = 2.125
const CARD_DEPTH = 0.05

/** Scale the front face image so it's larger than the 3D body and covers it */
const FACE_OVERHANG = 3.6

/**
 * CardModel - 3D credit card with custom front face image and metallic body.
 * Front face is scaled larger than the body so the card image covers the 3D thing.
 */
export function CardModel() {
  const frontTexture = useTexture('/card-face.png')

  useEffect(() => {
    frontTexture.flipY = false
  }, [frontTexture])

  return (
    <group>
      {/* Card body (edges visible only when tilted) */}
      <RoundedBox
        args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]}
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
      {/* Front face image - larger than body so it covers the 3D card */}
      <mesh position={[0, 0, CARD_DEPTH / 2 + 0.001]}>
        <planeGeometry args={[CARD_WIDTH * FACE_OVERHANG, CARD_HEIGHT * FACE_OVERHANG]} />
        <meshBasicMaterial
          map={frontTexture}
          toneMapped={false}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  )
}
