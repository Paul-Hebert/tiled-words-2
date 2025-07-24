import { describe, it, expect, vi } from 'vitest'
import { findClosestTileCell } from './find-closest-tile-cell'
import type { Tile, Point } from '../src/types'

// Mock SVG element for testing
const createMockBoardElement = (width: number, height: number) => {
  return {
    getBoundingClientRect: () => ({
      x: 0,
      y: 0,
      width,
      height,
    }),
  } as SVGSVGElement
}

describe('findClosestTileCell', () => {
  it('should find the closest tile cell within threshold', () => {
    const tiles: Tile[] = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [
          ['a', 'b'],
          ['c', 'd'],
        ],
        rotations: 0,
      },
    ]

    const boardElement = createMockBoardElement(200, 200)
    const boardViewboxSize = 100
    const threshold = 15

    // Point near the center of the first cell (a)
    const point: Point = { x: 15, y: 15 }

    const result = findClosestTileCell(point, tiles, threshold, boardElement, boardViewboxSize, 10)

    expect(result).not.toBeNull()
    expect(result?.tile.id).toBe('tile-1')
    expect(result?.cellPosition).toEqual({ x: 0, y: 0 })
  })

  it('should return null when no cell is within threshold', () => {
    const tiles: Tile[] = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [
          ['a', 'b'],
          ['c', 'd'],
        ],
        rotations: 0,
      },
    ]

    const boardElement = createMockBoardElement(200, 200)
    const boardViewboxSize = 100
    const threshold = 15

    // Point far from any cell
    const point: Point = { x: 100, y: 100 }

    const result = findClosestTileCell(point, tiles, threshold, boardElement, boardViewboxSize, 10)

    expect(result).toBeNull()
  })

  it('should handle rotated tiles correctly', () => {
    const tiles: Tile[] = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [
          ['a', 'b'],
          ['c', 'd'],
        ],
        rotations: 1, // 90 degree rotation
      },
    ]

    const boardElement = createMockBoardElement(200, 200)
    const boardViewboxSize = 100
    const threshold = 15

    // Point near where the 'a' cell would be after rotation
    const point: Point = { x: 15, y: 15 }

    const result = findClosestTileCell(point, tiles, threshold, boardElement, boardViewboxSize, 10)

    expect(result).not.toBeNull()
    expect(result?.tile.id).toBe('tile-1')
  })

  it('should skip null cells in the grid', () => {
    const tiles: Tile[] = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [
          ['a', null],
          ['c', 'd'],
        ],
        rotations: 0,
      },
    ]

    const boardElement = createMockBoardElement(200, 200)
    const boardViewboxSize = 100
    const threshold = 15

    // Point near where the 'c' cell would be (which is valid)
    const point: Point = { x: 15, y: 25 }

    const result = findClosestTileCell(point, tiles, threshold, boardElement, boardViewboxSize, 10)

    // Should find the 'c' cell (0,1) which is the closest valid cell
    expect(result).not.toBeNull()
    expect(result?.tile.id).toBe('tile-1')
    expect(result?.cellPosition).toEqual({ x: 0, y: 1 }) // 'c' cell
  })

  it('should find the closest cell when multiple are within threshold', () => {
    const tiles: Tile[] = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [
          ['a', 'b'],
          ['c', 'd'],
        ],
        rotations: 0,
      },
    ]

    const boardElement = createMockBoardElement(200, 200)
    const boardViewboxSize = 100
    const threshold = 50 // Large threshold to include multiple cells

    // Point closer to cell 'b' than 'a'
    const point: Point = { x: 25, y: 15 }

    const result = findClosestTileCell(point, tiles, threshold, boardElement, boardViewboxSize, 10)

    expect(result).not.toBeNull()
    expect(result?.tile.id).toBe('tile-1')
    // Should find the closest cell to the point
    expect(result?.cellPosition).toEqual({ x: 1, y: 0 }) // 'b' cell
  })
})
