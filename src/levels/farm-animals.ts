import { padGridToSquare } from '../../helpers/pad-grid-to-square'
import type { Level } from '../types'

export const farmAnimals: Level = {
  theme: 'Farm Animals',
  gridSize: 10,
  words: {
    vertical: [
      { text: 'cow', hint: 'Holy ___' },
      { text: 'sheep', hint: "_____ in wolf's clothing" },
      { text: 'pigs', hint: 'When ____ fly' },
    ],
    horizontal: [
      { text: 'chicken', hint: 'Bock, bock, bock!' },
      { text: 'horses', hint: 'Hold your ______' },
    ],
  },
  tiles: [
    {
      id: 'tile-1',
      position: {
        x: 0,
        y: 8,
      },
      grid: padGridToSquare([['o'], ['w']]),
      rotations: 0,
    },
    {
      id: 'tile-2',
      position: {
        x: 1,
        y: 4,
      },
      grid: padGridToSquare([['c', 'h']]),
      rotations: 0,
    },
    {
      id: 'tile-3',
      position: {
        x: 2,
        y: 1,
      },
      grid: padGridToSquare([
        ['p', null],
        ['i', 'c'],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-4',
      position: {
        x: 4,
        y: 8,
      },
      grid: padGridToSquare([['g'], ['s']]),
      rotations: 3,
    },
    {
      id: 'tile-5',
      position: {
        x: 5,
        y: 0,
      },
      grid: padGridToSquare([
        ['r', 's'],
        [null, 'h'],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-6',
      position: {
        x: 6,
        y: 3,
      },
      grid: padGridToSquare([['e', 's']]),
      rotations: 1,
    },
    {
      id: 'tile-6-2',
      position: {
        x: 4,
        y: 3,
      },
      grid: padGridToSquare([['h', 'o']]),
      rotations: 0,
    },
    {
      id: 'tile-7',
      position: {
        x: 3,
        y: 5,
      },
      grid: padGridToSquare([
        [null, 'e', null],
        ['k', 'e', 'n'],
        [null, 'p', null],
      ]),
      rotations: 0,
    },
  ],
}
