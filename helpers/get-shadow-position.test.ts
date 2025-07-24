import { describe, it, expect, vi } from 'vitest'
import { getShadowPosition } from './get-shadow-position'
import type { Point, Grid, Tile } from '../src/types'

// Mock DOM elements
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

const createMockTileElement = (x: number, y: number) => {
  return {
    getBoundingClientRect: () => ({
      x,
      y,
      width: 50,
      height: 50,
    }),
  } as SVGGElement
}

describe('getShadowPosition', () => {
  it('should return valid position when initial position is valid', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(100, 100) // Position at (1, 1) in 4x4 grid
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    expect(result).toEqual({ x: 1, y: 1 })
  })

  it('should find closest valid position when initial position is invalid', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(100, 100) // Position at (1, 1) in 4x4 grid
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
      rotations: 0,
    }

    // Create grid where position (1, 1) is blocked
    const gridState: Grid = [
      [null, null, null, null],
      [null, 'x', null, null], // Block position (1, 1)
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should find a valid adjacent position (likely (0, 1), (2, 1), (1, 0), or (1, 2))
    expect(result).not.toEqual({ x: 1, y: 1 })
    expect(result.x).toBeGreaterThanOrEqual(0)
    expect(result.x).toBeLessThan(4)
    expect(result.y).toBeGreaterThanOrEqual(0)
    expect(result.y).toBeLessThan(4)
  })

  it('should snap to grid bounds when position is off-grid (negative)', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(-50, -50) // Position off-grid (negative)
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [['a']], // 1x1 tile
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should snap to (0, 0) which is the closest valid grid position
    expect(result).toEqual({ x: 0, y: 0 })
  })

  it('should snap to grid bounds when position is off-grid (beyond max)', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(500, 500) // Position off-grid (beyond max)
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [['a']], // 1x1 tile
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should snap to (3, 3) which is the closest valid grid position for a 1x1 tile
    expect(result).toEqual({ x: 3, y: 3 })
  })

  it('should handle off-grid positions with large tiles', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(500, 500) // Position off-grid (beyond max)
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ], // 2x2 tile
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should snap to (2, 2) which is the closest valid position for a 2x2 tile
    // (maxValidX = 3 - (2-1) = 2, maxValidY = 3 - (2-1) = 2)
    expect(result).toEqual({ x: 2, y: 2 })
  })

  it('should handle off-grid positions with rotated tiles', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(500, 500) // Position off-grid (beyond max)
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ], // 2x2 tile
      rotations: 1, // 90 degree rotation (still 2x2)
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should snap to (2, 2) which is the closest valid position for a rotated 2x2 tile
    expect(result).toEqual({ x: 2, y: 2 })
  })

  it('should handle off-grid positions with rectangular tiles', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(500, 500) // Position off-grid (beyond max)
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [['a', 'b', 'c']], // 1x3 tile
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should snap to (1, 3) which is the closest valid position for a 1x3 tile
    // (maxValidX = 3 - (3-1) = 1, maxValidY = 3 - (1-1) = 3)
    expect(result).toEqual({ x: 1, y: 3 })
  })

  it('should handle tiles with null rows/columns correctly', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(100, 100) // Position at (1, 1) in 4x4 grid
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        [null, 'a', null],
        ['b', null, 'c'],
        [null, 'd', null],
      ], // 3x3 grid with null cells
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should return the snapped position (1, 1) since it's valid
    expect(result).toEqual({ x: 1, y: 1 })
  })

  it('should handle tiles with sparse null cells', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(100, 100) // Position at (1, 1) in 4x4 grid
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', null, 'c'],
        [null, 'e', null],
        ['g', null, 'i'],
      ], // 3x3 grid with sparse null cells
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should return the snapped position (1, 1) since it's valid
    expect(result).toEqual({ x: 1, y: 1 })
  })

  it('should handle tiles with only one non-null cell', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(100, 100) // Position at (1, 1) in 4x4 grid
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        [null, null, null],
        [null, 'a', null],
        [null, null, null],
      ], // 3x3 grid but only one non-null cell
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should return the snapped position (1, 1) since it's valid
    expect(result).toEqual({ x: 1, y: 1 })
  })

  it('should allow placement in first row/column with null cells', () => {
    const boardElement = createMockBoardElement(400, 400)
    const tileElement = createMockTileElement(50, 50) // Position at (0, 0) in 4x4 grid
    const numberOfRowsAndColumns = 4

    const selectedTile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        [null, 'a', null],
        ['b', null, 'c'],
        [null, 'd', null],
      ], // 3x3 grid with null cells
      rotations: 0,
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = getShadowPosition(
      boardElement,
      tileElement,
      numberOfRowsAndColumns,
      selectedTile,
      gridState,
    )

    // Should allow placement at (0, 0) even with null cells
    expect(result).toEqual({ x: 0, y: 0 })
  })
})
