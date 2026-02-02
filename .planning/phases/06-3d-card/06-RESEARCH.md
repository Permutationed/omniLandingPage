# Phase 6: 3D Card - Research

**Researched:** 2026-02-02
**Domain:** React Three Fiber Interactive 3D / Materials / Device Input
**Confidence:** HIGH

## Summary

This research covers implementing an interactive 3D credit card with premium metallic materials, holographic shimmer effects, and multi-input responsiveness (cursor and gyroscope). The card builds on the Phase 5 infrastructure (Scene3D with View.Port pattern, R3F v9, drei v10.7.7).

Key findings:
- **RoundedBox from drei** provides credit card geometry with rounded corners without custom modeling
- **MeshPhysicalMaterial** with iridescence, clearcoat, and metalness creates premium metallic appearance
- **maath/easing dampE** provides frame-rate-independent smooth rotation following cursor
- **DeviceOrientationEvent.requestPermission()** is required for iOS 13+ gyroscope access
- **useFrame with delta** ensures 60fps by avoiding setState and using direct mutation

**Primary recommendation:** Use RoundedBox geometry with MeshPhysicalMaterial (iridescence + clearcoat for shimmer), dampE for smooth cursor tracking, and a permission-gated gyroscope hook for mobile tilt.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @react-three/fiber | ^9.5.0 | React renderer for Three.js | Already installed, React 19 compatible |
| @react-three/drei | ^10.7.7 | Helper components (RoundedBox, Environment) | Already installed, provides RoundedBox |
| three | ^0.182.0 | 3D rendering engine (MeshPhysicalMaterial) | Already installed, stable |

### New Dependencies
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| maath | ^0.10.8 | Frame-rate-independent easing (dampE) | pmndrs ecosystem, works with R3F |

### Supporting (Optional)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @pmndrs/assets | ^7.4.0 | Self-hosted HDRI presets | If Environment preset CDN is unreliable |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| MeshPhysicalMaterial | HolographicMaterial (ektogamat) | HolographicMaterial is more sci-fi; Physical is more premium/realistic |
| RoundedBox | Custom GLTF model | Custom model adds asset loading; RoundedBox is zero-asset solution |
| dampE | MathUtils.lerp | lerp doesn't use delta for frame-rate independence |
| Built-in gyroscope | react-parallax-tilt | react-parallax-tilt is DOM-based, not 3D |

**Installation:**
```bash
npm install maath
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── three/
│   ├── scene.tsx              # (existing) Canvas with View.Port
│   ├── loading-fallback.tsx   # (existing) Loading progress UI
│   └── card/
│       ├── card-model.tsx     # RoundedBox geometry + material
│       ├── card-interactive.tsx # Mouse/gyroscope rotation logic
│       └── use-device-orientation.ts # Gyroscope permission hook
└── hero/
    └── hero-card-3d.tsx       # (update) Replace placeholder with Card
```

### Pattern 1: RoundedBox for Credit Card Geometry

**What:** Use drei's RoundedBox instead of custom BoxGeometry for authentic card shape with rounded corners.

**When to use:** Always for credit card shapes - provides rounded corners without custom modeling.

**Example:**
```typescript
// Source: https://drei.docs.pmnd.rs/shapes/rounded-box
import { RoundedBox } from '@react-three/drei'

// Credit card ISO standard: 85.6mm x 53.98mm = ~1.586:1 ratio
// Using 3.375 x 2.125 matches existing placeholder proportions
function CardGeometry({ children }: { children: React.ReactNode }) {
  return (
    <RoundedBox
      args={[3.375, 2.125, 0.05]}  // width, height, depth
      radius={0.15}                 // corner radius
      smoothness={4}                // curve smoothness
      bevelSegments={4}             // bevel detail
    >
      {children}
    </RoundedBox>
  )
}
```

### Pattern 2: MeshPhysicalMaterial for Premium Metallic Look

**What:** Use Three.js MeshPhysicalMaterial with iridescence, clearcoat, and metalness for premium card appearance.

**When to use:** For realistic metallic surfaces with holographic shimmer effect.

**Example:**
```typescript
// Source: https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial
import { MeshPhysicalMaterial } from 'three'

// Premium metallic card material
<meshPhysicalMaterial
  color="#1a1a2e"          // Dark base color
  metalness={0.9}          // High metalness for reflections
  roughness={0.1}          // Low roughness for glossy look
  clearcoat={1.0}          // Full clearcoat for extra shine
  clearcoatRoughness={0.1} // Smooth clearcoat
  iridescence={0.8}        // Holographic color shift effect
  iridescenceIOR={1.8}     // Index of refraction for iridescence
  iridescenceThicknessRange={[100, 400]} // Thickness variation
  envMapIntensity={1.5}    // Boost environment reflections
/>
```

### Pattern 3: dampE for Smooth Cursor-Following Rotation

**What:** Use maath's dampE for frame-rate-independent, interruptible rotation animation.

**When to use:** Always for mouse-following rotation - provides smooth, consistent animation across refresh rates.

**Example:**
```typescript
// Source: https://github.com/pmndrs/maath
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import type { Group } from 'three'

function InteractiveCard() {
  const cardRef = useRef<Group>(null!)
  const rotationFactor = 0.3  // Max rotation in radians (~17 degrees)

  useFrame((state, delta) => {
    // state.pointer is normalized -1 to 1
    easing.dampE(
      cardRef.current.rotation,
      [
        -state.pointer.y * rotationFactor,  // Tilt up/down (inverted)
        state.pointer.x * rotationFactor,   // Rotate left/right
        0                                    // No roll
      ],
      0.25,  // Smoothing time (lower = faster)
      delta  // Frame delta for refresh-rate independence
    )
  })

  return (
    <group ref={cardRef}>
      <CardModel />
    </group>
  )
}
```

### Pattern 4: iOS Gyroscope Permission Hook

**What:** Custom hook that handles DeviceOrientationEvent permission request on iOS 13+.

**When to use:** For mobile gyroscope-reactive tilt.

**Example:**
```typescript
// Source: https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2
import { useState, useCallback, useEffect } from 'react'

interface DeviceOrientationData {
  alpha: number | null  // Compass direction (0-360)
  beta: number | null   // Front-to-back tilt (-180 to 180)
  gamma: number | null  // Left-to-right tilt (-90 to 90)
}

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientationData>({
    alpha: null, beta: null, gamma: null
  })
  const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt')

  const requestPermission = useCallback(async () => {
    // Check if permission API exists (iOS 13+)
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const result = await (DeviceOrientationEvent as any).requestPermission()
        setPermission(result)
        return result === 'granted'
      } catch {
        setPermission('denied')
        return false
      }
    }
    // Non-iOS devices don't need permission
    setPermission('granted')
    return true
  }, [])

  useEffect(() => {
    if (permission !== 'granted') return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      setOrientation({ alpha: e.alpha, beta: e.beta, gamma: e.gamma })
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [permission])

  return { orientation, permission, requestPermission }
}
```

### Pattern 5: Combining Mouse and Gyroscope Input

**What:** Detect device type and use appropriate input method.

**When to use:** For responsive card that works on both desktop and mobile.

**Example:**
```typescript
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import type { Group } from 'three'
import { useDeviceOrientation } from './use-device-orientation'

function InteractiveCard() {
  const cardRef = useRef<Group>(null!)
  const { orientation, permission } = useDeviceOrientation()
  const { gl } = useThree()

  // Detect if device supports touch (mobile proxy)
  const isMobile = 'ontouchstart' in window || gl.domElement.ontouchstart !== undefined

  useFrame((state, delta) => {
    let targetX = 0
    let targetY = 0

    if (isMobile && permission === 'granted' && orientation.gamma !== null) {
      // Gyroscope: gamma is left-right tilt (-90 to 90)
      // beta is front-back tilt (-180 to 180)
      targetX = (orientation.gamma / 90) * 0.3  // Normalize to rotation
      targetY = ((orientation.beta ?? 0) - 45) / 90 * 0.3  // Offset for holding angle
    } else {
      // Mouse: pointer is -1 to 1
      targetX = state.pointer.x * 0.3
      targetY = -state.pointer.y * 0.3
    }

    easing.dampE(
      cardRef.current.rotation,
      [targetY, targetX, 0],
      0.25,
      delta
    )
  })

  return <group ref={cardRef}><CardModel /></group>
}
```

### Pattern 6: Environment for Realistic Reflections

**What:** Use drei's Environment component for HDRI-based lighting and reflections.

**When to use:** Always for metallic materials - reflections need an environment to reflect.

**Example:**
```typescript
// Source: https://drei.docs.pmnd.rs/staging/environment
import { Environment } from '@react-three/drei'

// Inside your View component
<Environment
  preset="city"           // HDRI preset (or use files prop for custom)
  environmentIntensity={1.0}
  backgroundBlurriness={0}
/>
```

**Production note:** The `preset` prop uses CDN-hosted files. For production reliability, download HDRI and use `files` prop or `@pmndrs/assets`.

### Anti-Patterns to Avoid

- **setState in useFrame:** Never call React state setters inside useFrame - causes re-renders every frame. Use refs and direct mutation.
- **Creating objects in useFrame:** Never create new Vector3, Euler, etc. inside useFrame - creates garbage collection pressure. Create once with useRef or useMemo.
- **lerp without delta:** Using MathUtils.lerp without delta makes animation speed depend on frame rate. Use maath's damp functions instead.
- **Requesting gyroscope permission on load:** iOS requires user gesture (click/tap) before requesting permission. Trigger from a button.
- **High-res Environment in View:** Environment is scene-level; don't add inside View component. Add to the main Canvas scene or use a separate scene.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rounded box geometry | Custom BufferGeometry with rounded edges | drei RoundedBox | Complex bevel math, already solved |
| Frame-rate-independent animation | Custom lerp with deltaTime | maath dampE/damp3 | Handles edge cases, interruptible |
| Holographic shimmer | Custom shader | MeshPhysicalMaterial iridescence | Built into Three.js, GPU optimized |
| iOS gyroscope permission | Manual permission checks | Custom hook (pattern above) | Async/permission API is tricky |
| HDRI environment | Manual texture loading | drei Environment | Handles loading, formats, fallbacks |
| Mouse position tracking | Custom event listeners | useFrame state.pointer | R3F normalizes to -1 to 1 |

**Key insight:** The pmndrs ecosystem (R3F, drei, maath) has solved interactive 3D patterns. MeshPhysicalMaterial's iridescence property specifically exists for holographic effects and is GPU-optimized.

## Common Pitfalls

### Pitfall 1: setState Causes Render Loop
**What goes wrong:** Card stutters, performance drops to 15-30fps.
**Why it happens:** Calling useState setter in useFrame triggers React re-render every frame (60 times/second).
**How to avoid:** Use refs and direct mutation inside useFrame. Never call setState for animation values.
**Warning signs:** React DevTools shows constant re-renders, fps counter drops during interaction.

```typescript
// BAD
const [rotation, setRotation] = useState([0, 0, 0])
useFrame(() => setRotation([x, y, 0]))  // 60 re-renders/second!

// GOOD
const ref = useRef<Group>(null!)
useFrame(() => { ref.current.rotation.set(x, y, 0) })  // Direct mutation
```

### Pitfall 2: Gyroscope Permission Without User Gesture
**What goes wrong:** Permission request silently fails on iOS, no error thrown.
**Why it happens:** iOS 13+ requires user interaction (click/tap) before `requestPermission()` can be called.
**How to avoid:** Only call requestPermission in a click/tap event handler, not on mount.
**Warning signs:** Gyroscope works on Android but not iOS, no error in console.

```typescript
// BAD
useEffect(() => {
  requestPermission()  // Fails silently on iOS
}, [])

// GOOD
<button onClick={requestPermission}>Enable Tilt</button>
```

### Pitfall 3: Iridescence Without Environment
**What goes wrong:** Card looks flat, no holographic effect visible.
**Why it happens:** Iridescence effect needs an environment map to reflect/refract.
**How to avoid:** Always add Environment component when using MeshPhysicalMaterial with iridescence.
**Warning signs:** metalness and roughness work but iridescence has no effect.

### Pitfall 4: Animation Speed Varies by Device
**What goes wrong:** Card rotates faster on 120Hz displays, slower on 60Hz.
**Why it happens:** Using fixed increment (`rotation.x += 0.01`) instead of delta-based.
**How to avoid:** Always multiply by delta or use maath damp functions.
**Warning signs:** Animation runs twice as fast on iPad Pro (120Hz) vs iPhone (60Hz).

### Pitfall 5: Environment Inside View Component
**What goes wrong:** Environment doesn't work, reflections missing.
**Why it happens:** View component creates a separate scene; Environment needs to be in the main Canvas scene.
**How to avoid:** Add Environment outside View, in the main Canvas children or a shared scene.
**Warning signs:** Console warnings about scene.environment being undefined.

## Code Examples

Verified patterns from official sources:

### Complete Interactive Card Component
```typescript
// components/three/card/card-interactive.tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Environment } from '@react-three/drei'
import { easing } from 'maath'
import type { Group } from 'three'

interface CardInteractiveProps {
  gyroscopeEnabled?: boolean
  gyroscopeData?: { beta: number | null; gamma: number | null }
}

export function CardInteractive({
  gyroscopeEnabled = false,
  gyroscopeData
}: CardInteractiveProps) {
  const cardRef = useRef<Group>(null!)
  const rotationFactor = 0.25  // ~14 degrees max tilt

  useFrame((state, delta) => {
    let targetRotationX = 0
    let targetRotationY = 0

    if (gyroscopeEnabled && gyroscopeData?.gamma !== null) {
      // Gyroscope input (mobile)
      const gamma = gyroscopeData.gamma ?? 0
      const beta = (gyroscopeData.beta ?? 45) - 45  // Offset for natural hold angle
      targetRotationX = (beta / 45) * rotationFactor
      targetRotationY = (gamma / 45) * rotationFactor
    } else {
      // Mouse input (desktop)
      targetRotationX = -state.pointer.y * rotationFactor
      targetRotationY = state.pointer.x * rotationFactor
    }

    easing.dampE(
      cardRef.current.rotation,
      [targetRotationX, targetRotationY, 0],
      0.2,
      delta
    )
  })

  return (
    <group ref={cardRef}>
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
    </group>
  )
}
```

### Device Orientation Hook (Full Implementation)
```typescript
// components/three/card/use-device-orientation.ts
'use client'

import { useState, useCallback, useEffect } from 'react'

interface DeviceOrientationData {
  alpha: number | null
  beta: number | null
  gamma: number | null
}

type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported'

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientationData>({
    alpha: null,
    beta: null,
    gamma: null
  })
  const [permission, setPermission] = useState<PermissionState>('prompt')
  const [isSupported, setIsSupported] = useState(false)

  // Check support on mount
  useEffect(() => {
    const supported = typeof DeviceOrientationEvent !== 'undefined'
    setIsSupported(supported)
    if (!supported) {
      setPermission('unsupported')
    }
  }, [])

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false

    // iOS 13+ requires explicit permission
    const DeviceOrientation = DeviceOrientationEvent as any
    if (typeof DeviceOrientation.requestPermission === 'function') {
      try {
        const result = await DeviceOrientation.requestPermission()
        setPermission(result as PermissionState)
        return result === 'granted'
      } catch (error) {
        console.error('Device orientation permission error:', error)
        setPermission('denied')
        return false
      }
    }

    // Non-iOS devices: permission granted by default
    setPermission('granted')
    return true
  }, [isSupported])

  useEffect(() => {
    if (permission !== 'granted') return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      })
    }

    window.addEventListener('deviceorientation', handleOrientation, true)
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [permission])

  return {
    orientation,
    permission,
    isSupported,
    requestPermission
  }
}
```

### Updated HeroCard3D with Environment
```typescript
// components/hero/hero-card-3d.tsx
'use client'

import { View, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { LoadingFallback } from '@/components/three/loading-fallback'
import { CardInteractive } from '@/components/three/card/card-interactive'
import { useDeviceOrientation } from '@/components/three/card/use-device-orientation'

export function HeroCard3D() {
  const { orientation, permission, requestPermission, isSupported } = useDeviceOrientation()
  const gyroscopeEnabled = permission === 'granted'

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
      <LoadingFallback />

      {/* Mobile gyroscope permission button */}
      {isSupported && permission === 'prompt' && (
        <button
          onClick={requestPermission}
          className="absolute top-2 right-2 z-10 text-xs px-2 py-1 bg-primary/10 rounded"
        >
          Enable tilt
        </button>
      )}

      <View className="absolute inset-0 pointer-events-auto">
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
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom holographic shader | MeshPhysicalMaterial iridescence | Three.js r137 (2022) | Built-in, GPU optimized |
| BoxGeometry + manual bevels | drei RoundedBox | drei v9 | No custom geometry needed |
| MathUtils.lerp in useFrame | maath dampE with delta | 2023 | Frame-rate independent |
| DeviceOrientationControls | Custom hook + requestPermission | iOS 13 (2019) | Permission required |
| Multiple materials for shimmer | Single material with clearcoat | Three.js r129 | Simpler, faster |

**Deprecated/outdated:**
- **DeviceOrientationControls from drei:** Removed in drei v10, use custom hook
- **OrbitControls for card interaction:** Overkill for simple tilt, use direct rotation
- **Custom fresnel shader for shimmer:** MeshPhysicalMaterial iridescence is simpler and optimized
- **react-spring for 3D animation:** Use maath for better R3F integration

## Open Questions

Things that couldn't be fully resolved:

1. **Card texture/branding**
   - What we know: Can use texture maps on MeshPhysicalMaterial (map, normalMap)
   - What's unclear: Whether card needs Omni logo/branding texture or is abstract
   - Recommendation: Start with solid color material, add texture map if branding is needed

2. **Holographic intensity tuning**
   - What we know: iridescence (0-1), iridescenceIOR (1-2.333), thickness (100-400)
   - What's unclear: Exact values that look "premium" vs "gaudy"
   - Recommendation: Start with conservative values (0.5-0.7), tune visually

3. **Gyroscope calibration offset**
   - What we know: beta=0 is flat, users hold phone at ~45 degree angle
   - What's unclear: Best offset value for comfortable viewing
   - Recommendation: Use 45 degree offset as default, may need device testing

4. **Environment preset reliability**
   - What we know: preset="city" uses CDN-hosted files
   - What's unclear: CDN reliability for production
   - Recommendation: Monitor in production, have @pmndrs/assets as backup

## Sources

### Primary (HIGH confidence)
- [drei RoundedBox](https://drei.docs.pmnd.rs/shapes/rounded-box) - Geometry props and usage
- [drei Environment](https://drei.docs.pmnd.rs/staging/environment) - HDRI environment setup
- [maath GitHub](https://github.com/pmndrs/maath) - Easing functions documentation
- [MeshPhysicalMaterial](https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial) - Material properties
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls) - useFrame best practices
- [sbcode.net Lerp Tutorial](https://sbcode.net/react-three-fiber/lerp/) - Lerp with useFrame patterns

### Secondary (MEDIUM confidence)
- [iOS DeviceOrientation Permission](https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2) - iOS 13+ permission flow
- [Vercel Ship Badge Tutorial](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber) - Interactive card patterns
- [maath dampE Discussion](https://github.com/pmndrs/react-three-fiber/discussions/2192) - Mouse-following rotation

### Tertiary (LOW confidence)
- [HolographicMaterial GitHub](https://github.com/ektogamat/threejs-holographic-material) - Alternative holographic approach (not using)
- WebSearch results on gyroscope calibration - Device-specific, needs testing

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries are from pmndrs ecosystem, well-documented
- Architecture: HIGH - Patterns verified from official docs and tutorials
- Pitfalls: HIGH - Performance issues are well-documented in R3F pitfalls guide
- Gyroscope: MEDIUM - iOS permission is documented, calibration offset needs testing

**Research date:** 2026-02-02
**Valid until:** 60 days (stable ecosystem, major versions settled)
