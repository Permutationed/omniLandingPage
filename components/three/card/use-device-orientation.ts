'use client'

import { useState, useCallback, useEffect } from 'react'

/**
 * Device orientation data from gyroscope
 */
interface DeviceOrientationData {
  /** Compass direction (0-360) - not used for card rotation */
  alpha: number | null
  /** Front-to-back tilt (-180 to 180) */
  beta: number | null
  /** Left-to-right tilt (-90 to 90) */
  gamma: number | null
}

/**
 * Permission state for device orientation API
 * - 'granted': Permission granted, orientation events will fire
 * - 'denied': Permission explicitly denied by user
 * - 'prompt': Permission not yet requested (default state)
 * - 'unsupported': DeviceOrientationEvent not available (desktop/old browser)
 */
type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported'

/**
 * Hook for accessing device orientation (gyroscope) data with iOS permission handling.
 *
 * iOS 13+ requires explicit permission request via user gesture (click/tap).
 * Android and desktop browsers grant permission automatically.
 *
 * @example
 * ```tsx
 * const { orientation, permission, isSupported, requestPermission } = useDeviceOrientation()
 *
 * // Must be called from user gesture on iOS
 * <button onClick={requestPermission}>Enable tilt</button>
 *
 * // Use orientation data once granted
 * if (permission === 'granted') {
 *   console.log(orientation.beta, orientation.gamma)
 * }
 * ```
 */
export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientationData>({
    alpha: null,
    beta: null,
    gamma: null,
  })
  const [permission, setPermission] = useState<PermissionState>('prompt')
  const [isSupported, setIsSupported] = useState(false)

  // Check support on mount (client-side only)
  useEffect(() => {
    const supported = typeof DeviceOrientationEvent !== 'undefined'
    setIsSupported(supported)
    if (!supported) {
      setPermission('unsupported')
    }
  }, [])

  /**
   * Request permission for device orientation events.
   * IMPORTANT: On iOS 13+, this MUST be called from a user gesture (click/tap).
   * Calling on mount or outside a gesture handler will silently fail.
   *
   * @returns Promise<boolean> - true if permission was granted
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false

    // iOS 13+ requires explicit permission via DeviceOrientationEvent.requestPermission()
    // This method only exists on iOS Safari, not on Android Chrome or desktop browsers
    const DeviceOrientation = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }

    if (typeof DeviceOrientation.requestPermission === 'function') {
      try {
        const result = await DeviceOrientation.requestPermission()
        setPermission(result as PermissionState)
        return result === 'granted'
      } catch (error) {
        // Permission request failed (possibly not called from user gesture)
        console.error('Device orientation permission error:', error)
        setPermission('denied')
        return false
      }
    }

    // Non-iOS browsers don't require permission - auto-grant
    setPermission('granted')
    return true
  }, [isSupported])

  // Listen for orientation events once permission is granted
  useEffect(() => {
    if (permission !== 'granted') return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      })
    }

    window.addEventListener('deviceorientation', handleOrientation, true)
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [permission])

  return {
    /** Current orientation data (alpha, beta, gamma) */
    orientation,
    /** Current permission state */
    permission,
    /** Whether DeviceOrientationEvent is supported */
    isSupported,
    /** Request permission - must be called from user gesture on iOS */
    requestPermission,
  }
}
