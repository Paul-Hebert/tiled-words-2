import { describe, it, expect } from 'vitest'
import { rotateTileInPlace } from './rotate-tile-in-place'
import type { Tile, Grid } from '../src/types'

describe('rotateTileInPlace', () => {
  it('should rotate tile and keep same position when placement is still valid', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 1, y: 1 },
      rotations: 0,
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
  })

  it('should find a new position when current position becomes invalid after rotation', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      rotations: 0,
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
  })

  it('should return false when no valid position is found', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      rotations: 0,
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
    expect(tile.position).toEqual({ x: 0, y: 0 })
  })

  it('should handle tiles with null values', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 1, y: 1 },
      rotations: 0,
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
  })

  it('should handle edge case where tile is at grid boundary', () => {
    const tile: Tile = {
      id: 'test-tile',
      position: { x: 0, y: 0 },
      rotations: 0,
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
      rotations: 0,
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
})
