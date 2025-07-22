import { describe, it, expect } from 'vitest'
import { rotateTileInPlace } from './rotate-tile-in-place'
import type { Tile, Grid } from '../src/types'

describe('rotateTileInPlace', () => {
  it('should rotate tile and keep same position when placement is still valid', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 1, y: 1 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    expect(result).toEqual({ x: 1, y: 1 })
    expect(tile.grid).toEqual([
      ['c', 'a'],
      ['d', 'b'],
    ])
  })

  it('should find a new position when current position becomes invalid after rotation', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    }

    const gridState: Grid = [
      ['x', null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    // Should find a valid position (likely { x: 1, y: 0 } or { x: 0, y: 1 })
    expect(result).not.toBe(false)
    expect(result).not.toEqual({ x: 0, y: 0 })
    expect(tile.grid).toEqual([
      ['c', 'a'],
      ['d', 'b'],
    ])
    expect(tile.position).toEqual(result)
  })

  it('should return false when no valid position is found', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    }

    const gridState: Grid = [
      ['x', 'y', null],
      ['z', 'w', null],
      [null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    expect(result).toBe(false)
    // Tile should not be modified when no valid position is found
    expect(tile.grid).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ])
    expect(tile.position).toEqual({ x: 0, y: 0 })
  })

  it('should handle tiles with null values', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 1, y: 1 },
      grid: [
        ['a', null, 'c'],
        [null, 'e', null],
        ['g', null, 'i'],
      ],
    }

    const gridState: Grid = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    expect(result).toEqual({ x: 1, y: 1 })
    expect(tile.grid).toEqual([
      ['g', null, 'a'],
      [null, 'e', null],
      ['i', null, 'c'],
    ])
  })

  it('should search in the correct order: adjacent then corners then increasing distances', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 1, y: 1 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    }

    // Create a grid where the tile can't fit at (1,1) after rotation
    // but can fit at adjacent positions
    const gridState: Grid = [
      [null, null, null, null],
      [null, 'x', null, null], // Block the original position
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    // Should find a valid position from the adjacent positions
    expect(result).not.toBe(false)
    expect(result).not.toEqual({ x: 1, y: 1 })
    expect(tile.position).toEqual(result)

    // Verify it's one of the expected adjacent positions
    const expectedAdjacentPositions = [
      { x: 1, y: 0 }, // up
      { x: 2, y: 1 }, // right
      { x: 1, y: 2 }, // down
      { x: 0, y: 1 }, // left
    ]
    expect(expectedAdjacentPositions).toContainEqual(result)
  })

  it('should handle edge case where tile is at grid boundary', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    }

    const gridState: Grid = [
      ['x', null, null],
      [null, null, null],
      [null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    // Should find a valid position (likely { x: 1, y: 0 } or { x: 0, y: 1 })
    expect(result).not.toBe(false)
    expect(result).not.toEqual({ x: 0, y: 0 })
  })

  it('should handle large tiles that need more space', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ],
    }

    const gridState: Grid = [
      ['x', null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    // Should find a valid position for the 3x3 tile
    expect(result).not.toBe(false)
    expect(result).not.toEqual({ x: 0, y: 0 })
  })

  it('should preserve tile ID and only update grid and position', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 1, y: 1 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    }

    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const originalId = tile.id
    const result = rotateTileInPlace(tile, gridState)

    expect(tile.id).toBe(originalId)
    expect(result).toEqual({ x: 1, y: 1 })
  })

  it('should handle empty grid state', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      grid: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    }

    const gridState: Grid = []

    const result = rotateTileInPlace(tile, gridState)

    // Should return false since empty grid state means no valid positions
    expect(result).toBe(false)
  })

  it('should handle single cell tiles', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 1, y: 1 },
      grid: [['a']],
    }

    const gridState: Grid = [
      [null, null, null],
      [null, 'x', null],
      [null, null, null],
    ]

    const result = rotateTileInPlace(tile, gridState)

    // Single cell tiles don't change when rotated, but position might change
    expect(result).not.toBe(false)
    expect(tile.grid).toEqual([['a']])
  })
})
