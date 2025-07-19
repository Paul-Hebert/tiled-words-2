import { describe, it, expect } from 'vitest'
import { computeGridState } from './compute-grid-state'
import type { Grid } from '../src/types'

describe('computeGridState', () => {
  it('should return an empty grid when no tiles are provided', () => {
    const tiles: any[] = []
    const gridSize = 5

    const expected: Grid = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]

    expect(computeGridState(tiles, gridSize)).toEqual(expected)
  })

  it('should place a single tile at its position', () => {
    const tiles = [
      {
        id: 'tile-1',
        position: { x: 1, y: 2 },
        grid: [
          ['a', 'b'],
          ['c', 'd'],
        ],
      },
    ]
    const gridSize = 5

    const expected: Grid = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, 'a', 'b', null, null],
      [null, 'c', 'd', null, null],
      [null, null, null, null, null],
    ]

    expect(computeGridState(tiles, gridSize)).toEqual(expected)
  })

  it('should handle tiles with null values in their grid', () => {
    const tiles = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [
          ['a', null, 'c'],
          [null, 'e', null],
          ['g', null, 'i'],
        ],
      },
    ]
    const gridSize = 4

    const expected: Grid = [
      ['a', null, 'c', null],
      [null, 'e', null, null],
      ['g', null, 'i', null],
      [null, null, null, null],
    ]

    expect(computeGridState(tiles, gridSize)).toEqual(expected)
  })

  it('should handle multiple tiles without overlap', () => {
    const tiles = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [
          ['a', 'b'],
          ['c', 'd'],
        ],
      },
      {
        id: 'tile-2',
        position: { x: 3, y: 1 },
        grid: [
          ['x', 'y'],
          ['z', 'w'],
        ],
      },
    ]
    const gridSize = 5

    const expected: Grid = [
      ['a', 'b', null, null, null],
      ['c', 'd', null, 'x', 'y'],
      [null, null, null, 'z', 'w'],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]

    expect(computeGridState(tiles, gridSize)).toEqual(expected)
  })

  it('should handle tiles with different grid sizes', () => {
    const tiles = [
      {
        id: 'tile-1',
        position: { x: 0, y: 0 },
        grid: [['a'], ['b'], ['c']],
      },
      {
        id: 'tile-2',
        position: { x: 2, y: 1 },
        grid: [['x', 'y', 'z']],
      },
    ]
    const gridSize = 4

    const expected: Grid = [
      ['a', null, null, null],
      ['b', null, 'x', 'y'],
      ['c', null, null, null],
      [null, null, null, null],
    ]

    expect(computeGridState(tiles, gridSize)).toEqual(expected)
  })
})
