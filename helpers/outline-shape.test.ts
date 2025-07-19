import { describe, it, expect } from 'vitest'
import { outlineShape } from './outline-shape'
import type { Grid } from '../src/types'

describe('outlineShape', () => {
  it('should outline a single cell', () => {
    const grid: Grid = [['a']]

    const expected = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ]

    expect(outlineShape(grid)).toEqual(expected)
  })

  it('should outline a 2x2 square', () => {
    const grid: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]

    const expected = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ]

    expect(outlineShape(grid)).toEqual(expected)
  })

  it('should outline an L shape', () => {
    const grid: Grid = [
      ['a', null, null],
      ['b', null, null],
      ['c', 'd', 'e'],
    ]

    const expected = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ]

    expect(outlineShape(grid)).toEqual(expected)
  })
})
