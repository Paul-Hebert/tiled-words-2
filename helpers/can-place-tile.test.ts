import { describe, it, expect } from 'vitest'
import { canPlaceTile } from './can-place-tile'
import type { Grid, Point } from '../src/types'

describe('canPlaceTile', () => {
  it('should return canPlace: true when tile can be placed in empty grid', () => {
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

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(true)
    expect(result.reason).toBeUndefined()
  })

  it('should return canPlace: true when tile can be placed without overlapping existing tiles', () => {
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

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(true)
    expect(result.reason).toBeUndefined()
  })

  it('should return canPlace: false with overlapping reason when tile overlaps with existing tiles', () => {
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

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(false)
    expect(result.reason).toBe('overlapping')
    expect(result.offGridDetails).toBeUndefined()
  })

  it('should return canPlace: false with off-grid reason when tile extends outside grid bounds (right edge)', () => {
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

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(false)
    expect(result.reason).toBe('off-grid')
    expect(result.offGridDetails).toEqual({
      axis: 'x',
      direction: 'positive',
      value: 4,
    })
  })

  it('should return canPlace: false with off-grid reason when tile extends outside grid bounds (left edge)', () => {
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

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(false)
    expect(result.reason).toBe('off-grid')
    expect(result.offGridDetails).toEqual({
      axis: 'x',
      direction: 'negative',
      value: -1,
    })
  })

  it('should return canPlace: false with off-grid reason when tile extends outside grid bounds (top edge)', () => {
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

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(false)
    expect(result.reason).toBe('off-grid')
    expect(result.offGridDetails).toEqual({
      axis: 'y',
      direction: 'negative',
      value: -1,
    })
  })

  it('should return canPlace: false with off-grid reason when tile extends outside grid bounds (bottom edge)', () => {
    const tileGrid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]
    const position: Point = { x: 1, y: 3 }
    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(false)
    expect(result.reason).toBe('off-grid')
    expect(result.offGridDetails).toEqual({
      axis: 'y',
      direction: 'positive',
      value: 4,
    })
  })

  it('should handle tiles with null values correctly', () => {
    const tileGrid: Grid = [
      ['a', null, 'c'],
      [null, 'e', null],
      ['g', null, 'i'],
    ]
    const position: Point = { x: 1, y: 1 }
    const gridState: Grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(true)
    expect(result.reason).toBeUndefined()
  })

  it('should handle tiles with null values that overlap', () => {
    const tileGrid: Grid = [
      ['a', null, 'c'],
      [null, 'e', null],
      ['g', null, 'i'],
    ]
    const position: Point = { x: 0, y: 0 }
    const gridState: Grid = [
      ['x', null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]

    const result = canPlaceTile(tileGrid, position, gridState)
    expect(result.canPlace).toBe(false)
    expect(result.reason).toBe('overlapping')
  })
})
