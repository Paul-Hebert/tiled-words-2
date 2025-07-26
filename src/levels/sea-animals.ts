import { padGridToSquare } from '../../helpers/pad-grid-to-square'
import type { Level } from '../types'

export const seaAnimals: Level = {
  theme: 'Sea animals',
  gridSize: 12,
  words: {
    vertical: [
      { text: 'whale', hint: 'A _____ of a time!' },
      { text: 'seal', hint: 'A sea dog' },
      { text: 'ray', hint: 'Sting, Manta...' },
    ],
    horizontal: [
      { text: 'shark', hint: 'Apex predator' },
      { text: 'jellyfish', hint: 'Peanut butter and...' },
      { text: 'crab', hint: 'Sea spider' },
    ],
  },
  tiles: [
    {
      id: 'tile-1',
      position: {
        x: 6,
        y: 2,
      },
      grid: padGridToSquare([
        [null, 'w', null],
        ['s', 'h', 'a'],
      ]),
      rotations: 1,
    },
    {
      id: 'tile-2',
      position: {
        x: 1,
        y: 3,
      },
      grid: padGridToSquare([
        ['r', 'k'],
        ['a', null],
      ]),
      rotations: 2,
    },
    {
      id: 'tile-3',
      position: {
        x: 8,
        y: 8,
      },
      grid: padGridToSquare([['j', 'e']]),
      rotations: 0,
    },
    {
      id: 'tile-4',
      position: {
        x: 8,
        y: 0,
      },
      grid: padGridToSquare([
        ['a', null],
        ['l', 'l'],
        ['e', null],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-5',
      position: {
        x: 0,
        y: 8,
      },
      grid: padGridToSquare([['y', 'f', 'i']]),
      rotations: 0,
    },
    {
      id: 'tile-6',
      position: {
        x: 4,
        y: 0,
      },
      grid: padGridToSquare([
        ['s', 'h'],
        ['e', null],
      ]),
      rotations: 1,
    },
    {
      id: 'tile-7',
      position: {
        x: 4,
        y: 3,
      },
      grid: padGridToSquare([['c', 'r']]),
      rotations: 0,
    },
    {
      id: 'tile-8',
      position: {
        x: 4,
        y: 6,
      },
      grid: padGridToSquare([
        ['a', 'b'],
        ['l', null],
      ]),
      rotations: 0,
    },
  ],
}
