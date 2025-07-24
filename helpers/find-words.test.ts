import { describe, it, expect } from 'vitest'
import { findWords } from './find-words'
import type { Grid } from '../src/types'

describe('findWords', () => {
  it('should find single word in a row', () => {
    const grid: Grid = [
      ['h', 'e', 'l', 'l', 'o'],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]
    expect(findWords(grid)).toEqual([
      {
        text: 'hello',
        direction: 'horizontal',
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
          { x: 4, y: 0 },
        ],
      },
    ])
  })

  it('should find single word in a column', () => {
    const grid: Grid = [
      ['h', null, null],
      ['e', null, null],
      ['l', null, null],
      ['l', null, null],
      ['o', null, null],
    ]
    expect(findWords(grid)).toEqual([
      {
        text: 'hello',
        direction: 'vertical',
        cells: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
          { x: 0, y: 4 },
        ],
      },
    ])
  })

  it('should find multiple words in a row', () => {
    const grid: Grid = [
      ['h', 'e', 'l', 'l', 'o', null, 'w', 'o', 'r', 'l', 'd'],
      [null, null, null, null, null, null, null, null, null, null, null],
    ]
    expect(findWords(grid)).toEqual([
      {
        text: 'hello',
        direction: 'horizontal',
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
          { x: 4, y: 0 },
        ],
      },
      {
        text: 'world',
        direction: 'horizontal',
        cells: [
          { x: 6, y: 0 },
          { x: 7, y: 0 },
          { x: 8, y: 0 },
          { x: 9, y: 0 },
          { x: 10, y: 0 },
        ],
      },
    ])
  })

  it('should find multiple words in a column', () => {
    const grid: Grid = [
      ['h', null],
      ['e', null],
      ['l', null],
      ['l', null],
      ['o', null],
      [null, null],
      ['w', null],
      ['o', null],
      ['r', null],
      ['l', null],
      ['d', null],
    ]
    expect(findWords(grid)).toEqual([
      {
        text: 'hello',
        direction: 'vertical',
        cells: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
          { x: 0, y: 4 },
        ],
      },
      {
        text: 'world',
        direction: 'vertical',
        cells: [
          { x: 0, y: 6 },
          { x: 0, y: 7 },
          { x: 0, y: 8 },
          { x: 0, y: 9 },
          { x: 0, y: 10 },
        ],
      },
    ])
  })

  it('should find words in both rows and columns', () => {
    const grid: Grid = [
      [null, null, null, null, 'w'],
      ['h', 'e', 'l', 'l', 'o'],
      ['o', null, null, null, 'r'],
      ['r', null, null, null, 'l'],
      ['l', null, null, null, 'd'],
    ]
    expect(findWords(grid)).toEqual([
      {
        text: 'hello',
        direction: 'horizontal',
        cells: [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
        ],
      },
      {
        text: 'horl',
        direction: 'vertical',
        cells: [
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
          { x: 0, y: 4 },
        ],
      },
      {
        text: 'world',
        direction: 'vertical',
        cells: [
          { x: 4, y: 0 },
          { x: 4, y: 1 },
          { x: 4, y: 2 },
          { x: 4, y: 3 },
          { x: 4, y: 4 },
        ],
      },
    ])
  })

  it('should handle complex grid with multiple words', () => {
    const grid: Grid = [
      ['c', 'a', 't', null, 'd', 'o', 'g'],
      ['a', null, null, null, 'o', null, null],
      ['t', null, null, null, 'g', null, null],
      [null, null, null, null, null, null, null],
      ['b', 'i', 'r', 'd', null, null, null],
    ]
    expect(findWords(grid)).toEqual([
      {
        text: 'cat',
        direction: 'horizontal',
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
        ],
      },
      {
        text: 'dog',
        direction: 'horizontal',
        cells: [
          { x: 4, y: 0 },
          { x: 5, y: 0 },
          { x: 6, y: 0 },
        ],
      },
      {
        text: 'bird',
        direction: 'horizontal',
        cells: [
          { x: 0, y: 4 },
          { x: 1, y: 4 },
          { x: 2, y: 4 },
          { x: 3, y: 4 },
        ],
      },
      {
        text: 'cat',
        direction: 'vertical',
        cells: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
        ],
      },
      {
        text: 'dog',
        direction: 'vertical',
        cells: [
          { x: 4, y: 0 },
          { x: 4, y: 1 },
          { x: 4, y: 2 },
        ],
      },
    ])
  })

  it('should handle words at grid boundaries', () => {
    const grid: Grid = [
      ['a', 'b', 'c'],
      ['d', null, 'f'],
      ['g', 'h', 'i'],
    ]
    expect(findWords(grid)).toEqual([
      {
        text: 'abc',
        direction: 'horizontal',
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
        ],
      },
      {
        text: 'ghi',
        direction: 'horizontal',
        cells: [
          { x: 0, y: 2 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
        ],
      },
      {
        text: 'adg',
        direction: 'vertical',
        cells: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
        ],
      },
      {
        text: 'cfi',
        direction: 'vertical',
        cells: [
          { x: 2, y: 0 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
        ],
      },
    ])
  })
})
