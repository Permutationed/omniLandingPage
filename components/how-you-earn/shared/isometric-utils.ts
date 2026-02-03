/**
 * Isometric projection utilities
 * Standard 30 degree isometric angle (2:1 pixel ratio)
 */

const ISO_ANGLE = Math.PI / 6 // 30 degrees

/**
 * Convert 3D coordinates to 2D isometric projection
 */
export function toIsometric(x: number, y: number, z: number = 0): { x: number; y: number } {
  const isoX = (x - z) * Math.cos(ISO_ANGLE)
  const isoY = (x + z) * Math.sin(ISO_ANGLE) - y
  return { x: isoX, y: isoY }
}

/**
 * Generate SVG transform attribute for isometric positioning
 */
export function isometricTransform(x: number, y: number, z: number = 0): string {
  const iso = toIsometric(x, y, z)
  return `translate(${iso.x}, ${iso.y})`
}

/**
 * Create isometric box face paths
 * Returns paths for top, left, and right faces of a box
 */
export function createIsometricBox(
  width: number,
  height: number,
  depth: number,
  originX: number = 0,
  originY: number = 0
): {
  top: string
  left: string
  right: string
} {
  // Calculate corner points
  const w = width * Math.cos(ISO_ANGLE)
  const d = depth * Math.cos(ISO_ANGLE)
  const h = height
  const wY = width * Math.sin(ISO_ANGLE)
  const dY = depth * Math.sin(ISO_ANGLE)

  // Top face (parallelogram)
  const top = `M ${originX} ${originY - h}
    L ${originX + w} ${originY - h + wY}
    L ${originX + w - d} ${originY - h + wY + dY}
    L ${originX - d} ${originY - h + dY}
    Z`

  // Left face
  const left = `M ${originX} ${originY - h}
    L ${originX - d} ${originY - h + dY}
    L ${originX - d} ${originY + dY}
    L ${originX} ${originY}
    Z`

  // Right face
  const right = `M ${originX} ${originY - h}
    L ${originX + w} ${originY - h + wY}
    L ${originX + w} ${originY + wY}
    L ${originX} ${originY}
    Z`

  return { top, left, right }
}

/**
 * Generate points for an isometric grid
 */
export function createIsometricGrid(
  rows: number,
  cols: number,
  cellSize: number,
  originX: number = 0,
  originY: number = 0
): Array<{ x: number; y: number; row: number; col: number }> {
  const points: Array<{ x: number; y: number; row: number; col: number }> = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const iso = toIsometric(col * cellSize, 0, row * cellSize)
      points.push({
        x: originX + iso.x,
        y: originY + iso.y,
        row,
        col,
      })
    }
  }

  return points
}
