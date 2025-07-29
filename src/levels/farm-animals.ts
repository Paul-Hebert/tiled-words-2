import { padGridToSquare } from '../../helpers/pad-grid-to-square'
import type { Level } from '../types'

export const farmAnimals: Level = {
  theme: 'Farm Animals',
  gridSize: 12,
  words: {
    vertical: [
      { text: 'cow', hint: 'Holy ___' },
      { text: 'sheep', hint: "_____ in wolf's clothing" },
      { text: 'pig', hint: 'When ___s fly' },
    ],
    horizontal: [
      { text: 'chicken', hint: '_______ out' },
      { text: 'horse', hint: 'Hold your _____s' },
    ],
  },
  tiles: [
    {
      id: 'tile-1',
      position: {
        x: 1,
        y: 8,
      },
      grid: padGridToSquare([['o'], ['w']]),
      rotations: 0,
    },
    {
      id: 'tile-2',
      position: {
        x: 2,
        y: 4,
      },
      grid: padGridToSquare([['c', 'h']]),
      rotations: 0,
    },
    {
      id: 'tile-3',
      position: {
        x: 4,
        y: 2,
      },
      grid: padGridToSquare([['p']]),
      rotations: 0,
    },
    {
      id: 'tile-4',
      position: {
        x: 5,
        y: 5,
      },
      grid: padGridToSquare([
        ['i', 'c', 'k'],
        ['g', null, null],
      ]),
      rotations: 1,
    },
    {
      id: 'tile-5',
      position: {
        x: 6,
        y: 2,
      },
      grid: padGridToSquare([
        ['s', null],
        ['h', 'o'],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-6',
      position: {
        x: 8,
        y: 3,
      },
      grid: padGridToSquare([['r', 's', 'e']]),
      rotations: 1,
    },
    {
      id: 'tile-7',
      position: {
        x: 8,
        y: 8,
      },
      grid: padGridToSquare([
        ['e', null],
        ['e', 'n'],
        ['p', null],
      ]),
      rotations: 0,
    },
  ],
}
