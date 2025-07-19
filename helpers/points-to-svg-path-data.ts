import type { Point } from '../src/types'

/**
 * Converts an array of points to SVG path data, drawing straight lines between the points
 * @param points - Array of points to connect
 * @param scale - Scale factor to apply to the coordinates
 * @returns SVG path data string
 */
export function pointsToSvgPathData(points: Point[], scale: number): string {
  const scaledPoints = points.map((point) => ({
    x: point.x * scale,
    y: point.y * scale,
  }))

  const pathCommands = scaledPoints.map((point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    } else {
      return `L ${point.x} ${point.y}`
    }
  })

  return pathCommands.join(' ') + ' Z'
}
