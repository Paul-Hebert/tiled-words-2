import { describe, it, expect } from 'vitest'
import { canPlaceTile } from './can-place-tile'
import type { Grid, Point } from '../src/types'

describe('canPlaceTile', () => {
  it('should return true when tile can be placed in empty grid', () => {
    const tileGrid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]
    const position: Point = { x: 1, y: 1 }
    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(canPlaceTile(tileGrid, position, gridState)).toBe(true)
  })

  it('should return true when tile can be placed without overlapping existing tiles', () => {
    const tileGrid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]
    const position: Point = { x: 2, y: 2 }
    const gridState: Grid = [
      ['x', 'y', null, null],
      ['z', 'w', null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(canPlaceTile(tileGrid, position, gridState)).toBe(true)
  })

  it('should return false when tile overlaps with existing tiles', () => {
    const tileGrid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]
    const position: Point = { x: 0, y: 0 }
    const gridState: Grid = [
      ['x', 'y', null, null],
      ['z', 'w', null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(canPlaceTile(tileGrid, position, gridState)).toBe(false)
  })

  it('should return false when tile extends outside grid bounds (right edge)', () => {
    const tileGrid: Grid = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ]
    const position: Point = { x: 2, y: 1 }
    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(canPlaceTile(tileGrid, position, gridState)).toBe(false)
  })

  it('should return false when tile extends outside grid bounds (bottom edge)', () => {
    const tileGrid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
      ['e', 'f'],
    ]
    const position: Point = { x: 1, y: 2 }
    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(canPlaceTile(tileGrid, position, gridState)).toBe(false)
  })

  it('should return false when tile extends outside grid bounds (left edge)', () => {
    const tileGrid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]
    const position: Point = { x: -1, y: 1 }
    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(canPlaceTile(tileGrid, position, gridState)).toBe(false)
  })

  it('should return false when tile extends outside grid bounds (top edge)', () => {
    const tileGrid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]
    const position: Point = { x: 1, y: -1 }
    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(canPlaceTile(tileGrid, position, gridState)).toBe(false)
  })
})
