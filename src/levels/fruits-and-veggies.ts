import { padGridToSquare } from '../../helpers/pad-grid-to-square'
import type { Level } from '../types'

export const fruitsAndVeggies: Level = {
  theme: 'Fruits and Veggies',
  gridSize: 12,
  words: {
    vertical: [
      { text: 'garlic', hint: 'Vampire protection' },
      { text: 'berries', hint: 'Black and blue...' },
    ],
    horizontal: [
      { text: 'cabbage', hint: 'Sauerkraut ingredient' },
      { text: 'celery', hint: 'Good with peanut butter and raisins' },
      { text: 'zucchini', hint: 'Good for bread and fritters' },
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
        [null, 'g'],
        ['c', 'a'],
        [null, 'r'],
      ]),
      rotations: 1,
    },
    {
      id: 'tile-2',
      position: {
        x: 5,
        y: 4,
      },
      grid: padGridToSquare([['b', 'b', 'a']]),
      rotations: 2,
    },
    {
      id: 'tile-3',
      position: {
        x: -1,
        y: 7,
      },
      grid: padGridToSquare([['g', 'e']]),
      rotations: 1,
    },
    {
      id: 'tile-4',
      position: {
        x: 0,
        y: 0,
      },
      grid: padGridToSquare([
        ['e', null],
        ['r', 'y'],
        ['r', null],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-5',
      position: {
        x: 2,
        y: 8,
      },
      grid: padGridToSquare([
        ['i', 'e', 's'],
        ['h', null, null],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-6',
      position: {
        x: 6,
        y: 7,
      },
      grid: padGridToSquare([['c', 'e']]),
      rotations: 1,
    },
    {
      id: 'tile-7',
      position: {
        x: 3,
        y: 1,
      },
      grid: padGridToSquare([
        ['l', 'e'],
        ['i', null],
        ['c', null],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-8',
      position: {
        x: 1,
        y: 4,
      },
      grid: padGridToSquare([['z', 'u', 'c']]),
      rotations: 2,
    },
    {
      id: 'tile-9',
      position: {
        x: 8,
        y: 8,
      },
      grid: padGridToSquare([['n', 'i']]),
      rotations: 1,
    },
  ],
}
