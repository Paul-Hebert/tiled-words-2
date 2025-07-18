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
    expect(findWords(grid)).toEqual(['hello'])
  })

  it('should find single word in a column', () => {
    const grid: Grid = [
      ['h', null, null],
      ['e', null, null],
      ['l', null, null],
      ['l', null, null],
      ['o', null, null],
    ]
    expect(findWords(grid)).toEqual(['hello'])
  })

  it('should find multiple words in a row', () => {
    const grid: Grid = [
      ['h', 'e', 'l', 'l', 'o', null, 'w', 'o', 'r', 'l', 'd'],
      [null, null, null, null, null, null, null, null, null, null, null],
    ]
    expect(findWords(grid)).toEqual(['hello', 'world'])
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
    expect(findWords(grid)).toEqual(['hello', 'world'])
  })

  it('should find words in both rows and columns', () => {
    const grid: Grid = [
      [null, null, null, null, 'w'],
      ['h', 'e', 'l', 'l', 'o'],
      ['o', null, null, null, 'r'],
      ['r', null, null, null, 'l'],
      ['l', null, null, null, 'd'],
    ]
    expect(findWords(grid)).toEqual(['hello', 'horl', 'world'])
  })

  it('should handle complex grid with multiple words', () => {
    const grid: Grid = [
      ['c', 'a', 't', null, 'd', 'o', 'g'],
      ['a', null, null, null, 'o', null, null],
      ['t', null, null, null, 'g', null, null],
      [null, null, null, null, null, null, null],
      ['b', 'i', 'r', 'd', null, null, null],
    ]
    expect(findWords(grid)).toEqual(['cat', 'dog', 'bird', 'cat', 'dog'])
  })

  it('should handle words at grid boundaries', () => {
    const grid: Grid = [
      ['a', 'b', 'c'],
      ['d', null, 'f'],
      ['g', 'h', 'i'],
    ]
    expect(findWords(grid)).toEqual(['abc', 'ghi', 'adg', 'cfi'])
  })
})
