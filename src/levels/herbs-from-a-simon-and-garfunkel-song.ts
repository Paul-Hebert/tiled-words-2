import { padGridToSquare } from '../../helpers/pad-grid-to-square'
import type { Level } from '../types'

export const herbsFromASimonAndGarfunkelSong: Level = {
  theme: 'Herbs from a Simon and Garfunkel song',
  gridSize: 12,
  words: {
    vertical: [
      { text: 'sage', hint: 'A wise person' },
      { text: 'thyme', hint: 'Tracked with a clock' },
    ],
    horizontal: [
      { text: 'parsley', hint: 'Chimichurri ingredient' },
      { text: 'rosemary', hint: "A woman's name" },
    ],
  },
  tiles: [
    {
      id: 'tile-1',
      position: {
        x: 3,
        y: 3,
      },
      grid: padGridToSquare([
        [null, 's', null],
        ['p', 'a', 'r'],
      ]),
      rotations: 1,
    },
    {
      id: 'tile-2',
      position: {
        x: 1,
        y: 6,
      },
      grid: padGridToSquare([['r', 'o', 's']]),
      rotations: 0,
    },
    {
      id: 'tile-3',
      position: {
        x: 4,
        y: 8,
      },
      grid: padGridToSquare([
        ['g', null],
        ['e', 'm'],
      ]),
      rotations: 0,
    },
    {
      id: 'tile-4',
      position: {
        x: 6,
        y: 7,
      },
      grid: padGridToSquare([['a', 'r', 'y']]),
      rotations: 0,
    },
    {
      id: 'tile-5',
      position: {
        x: 6,
        y: 0,
      },
      grid: padGridToSquare([['t'], ['h'], ['y']]),
      rotations: 1,
    },
    {
      id: 'tile-6',
      position: {
        x: 7,
        y: 4,
      },
      grid: padGridToSquare([
        [null, null, 'm', null],
        ['s', 'l', 'e', 'y'],
      ]),
      rotations: 0,
    },
  ],
}
