import { describe, it, expect } from 'vitest'
import { pointsToSvgPathData } from './points-to-svg-path-data'
import type { Point } from '../src/types'

describe('pointsToSvgPathData', () => {
  it('should handle two points', () => {
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 10, y: 5 },
    ]
    const scale = 2

    expect(pointsToSvgPathData(points, scale)).toBe('M 0 0 L 20 10 Z')
  })

  it('should handle multiple points', () => {
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 5 },
      { x: 0, y: 5 },
    ]
    const scale = 1

    expect(pointsToSvgPathData(points, scale)).toBe('M 0 0 L 5 0 L 5 5 L 0 5 Z')
  })

  it('should apply scale correctly', () => {
    const points: Point[] = [
      { x: 1, y: 1 },
      { x: 3, y: 2 },
      { x: 2, y: 4 },
    ]
    const scale = 3

    expect(pointsToSvgPathData(points, scale)).toBe('M 3 3 L 9 6 L 6 12 Z')
  })

  it('should handle negative coordinates', () => {
    const points: Point[] = [
      { x: -2, y: -1 },
      { x: 2, y: -1 },
      { x: 2, y: 3 },
      { x: -2, y: 3 },
    ]
    const scale = 2

    expect(pointsToSvgPathData(points, scale)).toBe('M -4 -2 L 4 -2 L 4 6 L -4 6 Z')
  })

  it('should handle decimal coordinates', () => {
    const points: Point[] = [
      { x: 0.5, y: 0.25 },
      { x: 1.5, y: 0.75 },
      { x: 2.5, y: 1.25 },
    ]
    const scale = 4

    expect(pointsToSvgPathData(points, scale)).toBe('M 2 1 L 6 3 L 10 5 Z')
  })

  it('should handle zero scale', () => {
    const points: Point[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]
    const scale = 0

    expect(pointsToSvgPathData(points, scale)).toBe('M 0 0 L 0 0 Z')
  })

  it('should handle negative scale', () => {
    const points: Point[] = [
      { x: 1, y: 1 },
      { x: 3, y: 3 },
    ]
    const scale = -2

    expect(pointsToSvgPathData(points, scale)).toBe('M -2 -2 L -6 -6 Z')
  })

  it('should handle complex shape', () => {
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 15, y: 5 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
      { x: -5, y: 5 },
    ]
    const scale = 1.5

    expect(pointsToSvgPathData(points, scale)).toBe(
      'M 0 0 L 15 0 L 22.5 7.5 L 15 15 L 0 15 L -7.5 7.5 Z',
    )
  })
})
