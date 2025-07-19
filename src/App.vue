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
    grid: [
      [null, 's', null],
      ['p', 'a', 'r'],
      [null, null, null],
    ],
  },
  {
    id: 'tile-2',
    position: {
      x: 0,
      y: 6,
    },
    grid: [
      ['r', 'o', 's'],
      [null, null, null],
      [null, null, null],
    ],
  },
  {
    id: 'tile-3',
    position: {
      x: 2,
      y: 8,
    },
    grid: [
      ['g', null],
      ['e', 'm'],
    ],
  },
  {
    id: 'tile-4',
    position: {
      x: 5,
      y: 7,
    },
    grid: [
      ['a', 'r', 'y'],
      [null, null, null],
      [null, null, null],
    ],
  },
  {
    id: 'tile-5',
    position: {
      x: 5,
      y: 0,
    },
    grid: [
      ['t', null, null],
      ['h', null, null],
      ['y', null, null],
    ],
  },
  {
    id: 'tile-6',
    position: {
      x: 6,
      y: 4,
    },
    grid: [
      [null, null, 'm', null],
      ['s', 'l', 'e', 'y'],
      [null, null, null, null],
      [null, null, null, null],
    ],
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
