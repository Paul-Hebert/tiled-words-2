import { describe, it, expect } from 'vitest'
import { rotateGrid } from './rotate-grid'
import type { Grid } from '../src/types'

describe('rotateGrid', () => {
  describe('clockwise rotation', () => {
    it('should rotate a 2x2 grid clockwise', () => {
      const input: Grid = [
        ['a', 'b'],
        ['c', 'd'],
      ]

      const expected: Grid = [
        ['c', 'a'],
        ['d', 'b'],
      ]

      expect(rotateGrid(input, 1)).toEqual(expected)
    })

    it('should rotate a 3x3 grid clockwise', () => {
      const input: Grid = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]

      const expected: Grid = [
        ['g', 'd', 'a'],
        ['h', 'e', 'b'],
        ['i', 'f', 'c'],
      ]

      expect(rotateGrid(input, 1)).toEqual(expected)
    })

    it('should rotate a 4x4 grid clockwise', () => {
      const input: Grid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l'],
        ['m', 'n', 'o', 'p'],
      ]

      const expected: Grid = [
        ['m', 'i', 'e', 'a'],
        ['n', 'j', 'f', 'b'],
        ['o', 'k', 'g', 'c'],
        ['p', 'l', 'h', 'd'],
      ]

      expect(rotateGrid(input, 1)).toEqual(expected)
    })

    it('should handle grids with null values', () => {
      const input: Grid = [
        ['a', null, 'c'],
        [null, 'e', null],
        ['g', null, 'i'],
      ]

      const expected: Grid = [
        ['g', null, 'a'],
        [null, 'e', null],
        ['i', null, 'c'],
      ]

      expect(rotateGrid(input, 1)).toEqual(expected)
    })
  })

  describe('counterclockwise rotation', () => {
    it('should rotate a 2x2 grid counterclockwise', () => {
      const input: Grid = [
        ['a', 'b'],
        ['c', 'd'],
      ]

      const expected: Grid = [
        ['b', 'd'],
        ['a', 'c'],
      ]

      expect(rotateGrid(input, 3)).toEqual(expected)
    })

    it('should rotate a 3x3 grid counterclockwise', () => {
      const input: Grid = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]

      const expected: Grid = [
        ['c', 'f', 'i'],
        ['b', 'e', 'h'],
        ['a', 'd', 'g'],
      ]

      expect(rotateGrid(input, 3)).toEqual(expected)
    })

    it('should rotate a 4x4 grid counterclockwise', () => {
      const input: Grid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l'],
        ['m', 'n', 'o', 'p'],
      ]

      const expected: Grid = [
        ['d', 'h', 'l', 'p'],
        ['c', 'g', 'k', 'o'],
        ['b', 'f', 'j', 'n'],
        ['a', 'e', 'i', 'm'],
      ]

      expect(rotateGrid(input, 3)).toEqual(expected)
    })

    it('should handle grids with null values', () => {
      const input: Grid = [
        ['a', null, 'c'],
        [null, 'e', null],
        ['g', null, 'i'],
      ]

      const expected: Grid = [
        ['c', null, 'i'],
        [null, 'e', null],
        ['a', null, 'g'],
      ]

      expect(rotateGrid(input, 3)).toEqual(expected)
    })
  })

  describe('edge cases', () => {
    it('should handle an empty grid', () => {
      const input: Grid = []
      const expected: Grid = []

      expect(rotateGrid(input, 1)).toEqual(expected)
      expect(rotateGrid(input, 3)).toEqual(expected)
    })

    it('should handle a 1x1 grid', () => {
      const input: Grid = [['a']]
      const expected: Grid = [['a']]

      expect(rotateGrid(input, 1)).toEqual(expected)
      expect(rotateGrid(input, 3)).toEqual(expected)
    })

    it('should handle a grid with all null values', () => {
      const input: Grid = [
        [null, null],
        [null, null],
      ]
      const expected: Grid = [
        [null, null],
        [null, null],
      ]

      expect(rotateGrid(input, 1)).toEqual(expected)
      expect(rotateGrid(input, 3)).toEqual(expected)
    })
  })

  describe('error handling', () => {
    it('should throw an error for non-square grids', () => {
      const rectangularGrid: Grid = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
      ]

      expect(() => rotateGrid(rectangularGrid, 1)).toThrow('Grid must be square to rotate')
      expect(() => rotateGrid(rectangularGrid, 3)).toThrow('Grid must be square to rotate')
    })

    it('should throw an error for grids with inconsistent row lengths', () => {
      const irregularGrid: Grid = [
        ['a', 'b', 'c'],
        ['d', 'e'],
        ['f', 'g', 'h'],
      ]

      expect(() => rotateGrid(irregularGrid, 1)).toThrow('Grid must be square to rotate')
      expect(() => rotateGrid(irregularGrid, 3)).toThrow('Grid must be square to rotate')
    })

    it('should throw an error for grids that are wider than tall', () => {
      const wideGrid: Grid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
      ]

      expect(() => rotateGrid(wideGrid, 1)).toThrow('Grid must be square to rotate')
      expect(() => rotateGrid(wideGrid, 3)).toThrow('Grid must be square to rotate')
    })

    it('should throw an error for grids that are taller than wide', () => {
      const tallGrid: Grid = [
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f'],
        ['g', 'h'],
      ]

      expect(() => rotateGrid(tallGrid, 1)).toThrow('Grid must be square to rotate')
      expect(() => rotateGrid(tallGrid, 3)).toThrow('Grid must be square to rotate')
    })
  })

  describe('rotation consistency', () => {
    it('should maintain consistency with multiple rotations', () => {
      const original: Grid = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]

      // Rotate clockwise 4 times should return to original
      let rotated = original
      for (let i = 0; i < 4; i++) {
        rotated = rotateGrid(rotated, 1)
      }
      expect(rotated).toEqual(original)

      // Rotate counterclockwise 4 times should return to original
      rotated = original
      for (let i = 0; i < 4; i++) {
        rotated = rotateGrid(rotated, 3)
      }
      expect(rotated).toEqual(original)
    })

    it('should have opposite effects for cw and ccw rotations', () => {
      const original: Grid = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]

      const cwOnce = rotateGrid(original, 1)
      const ccwOnce = rotateGrid(original, 3)

      // Rotating cw once then ccw once should return to original
      const cwThenCcw = rotateGrid(cwOnce, 3)
      expect(cwThenCcw).toEqual(original)

      // Rotating ccw once then cw once should return to original
      const ccwThenCw = rotateGrid(ccwOnce, 1)
      expect(ccwThenCw).toEqual(original)
    })
  })
})
