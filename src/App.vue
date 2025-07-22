<script setup lang="ts">
import { padGridToSquare } from '../helpers/pad-grid-to-square'
import Level from './components/Level.vue'

const tiles = [
  {
    id: 'tile-1',
    position: {
      x: 2,
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
      x: 0,
      y: 6,
    },
    grid: padGridToSquare([['r', 'o', 's']]),
    rotations: 2,
  },
  {
    id: 'tile-3',
    position: {
      x: 2,
      y: 8,
    },
    grid: padGridToSquare([
      ['g', null],
      ['e', 'm'],
    ]),
    rotations: 3,
  },
  {
    id: 'tile-4',
    position: {
      x: 5,
      y: 7,
    },
    grid: padGridToSquare([['a', 'r', 'y']]),
    rotations: 0,
  },
  {
    id: 'tile-5',
    position: {
      x: 5,
      y: 0,
    },
    grid: padGridToSquare([['t'], ['h'], ['y']]),
    rotations: 1,
  },
  {
    id: 'tile-6',
    position: {
      x: 6,
      y: 4,
    },
    grid: padGridToSquare([
      [null, null, 'm', null],
      ['s', 'l', 'e', 'y'],
    ]),
    rotations: 1,
  },
]

const nextLevel = () => {
  setTimeout(() => {
    window?.alert('You win!')
  }, 500)
}
</script>

<template>
  <Level
    theme="Herbs from a Simon and Garfunkel song"
    :words="[
      { text: 'parsley', hint: 'Chimichurri\'s main ingredient' },
      { text: 'sage', hint: 'A wise person' },
      { text: 'rosemary', hint: 'A woman\'s name' },
      { text: 'thyme', hint: 'Tracked with a clock' },
    ]"
    :starting-tiles="tiles"
    :board-grid-size="10"
    @next-level="nextLevel"
  />
</template>
