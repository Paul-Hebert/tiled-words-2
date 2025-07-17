import { describe, it, expect } from 'vitest'
import { padGridToSquare } from './pad-grid-to-square'
import type { Grid } from '../src/types'

describe('padGridToSquare', () => {
  it('should convert a rectangular grid to a square matrix', () => {
    const input: Grid = [
      ['a', 'b', 'c'],
      ['a', 'b', null],
    ]

    const expected: Grid = [
      ['a', 'b', 'c'],
      ['a', 'b', null],
      [null, null, null],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle a grid that is already square', () => {
    const input: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]

    const expected: Grid = [
      ['a', 'b'],
      ['c', 'd'],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle a grid that is wider than it is tall', () => {
    const input: Grid = [
      ['a', 'b', 'c', 'd'],
      ['e', 'f', 'g', 'h'],
    ]

    const expected: Grid = [
      ['a', 'b', 'c', 'd'],
      ['e', 'f', 'g', 'h'],
      [null, null, null, null],
      [null, null, null, null],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle a grid that is taller than it is wide', () => {
    const input: Grid = [
      ['a', 'b'],
      ['c', 'd'],
      ['e', 'f'],
      ['g', 'h'],
    ]

    const expected: Grid = [
      ['a', 'b', null, null],
      ['c', 'd', null, null],
      ['e', 'f', null, null],
      ['g', 'h', null, null],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle an empty grid', () => {
    const input: Grid = []
    const expected: Grid = []

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle a grid with only null values', () => {
    const input: Grid = [
      [null, null],
      [null, null],
    ]

    const expected: Grid = [
      [null, null],
      [null, null],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle a grid with mixed content and null values', () => {
    const input: Grid = [
      ['a', null, 'c'],
      [null, 'b', null],
      ['d', 'e', null],
    ]

    const expected: Grid = [
      ['a', null, 'c'],
      [null, 'b', null],
      ['d', 'e', null],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle a single row grid', () => {
    const input: Grid = [['a', 'b', 'c', 'd', 'e']]

    const expected: Grid = [
      ['a', 'b', 'c', 'd', 'e'],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })

  it('should handle a single column grid', () => {
    const input: Grid = [['a'], ['b'], ['c'], ['d'], ['e']]

    const expected: Grid = [
      ['a', null, null, null, null],
      ['b', null, null, null, null],
      ['c', null, null, null, null],
      ['d', null, null, null, null],
      ['e', null, null, null, null],
    ]

    expect(padGridToSquare(input)).toEqual(expected)
  })
})
