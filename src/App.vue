<script setup lang="ts">
import { padGridToSquare } from '../helpers/pad-grid-to-square'
import Level from './components/Level.vue'

const tiles = [
  {
    id: 'tile-1',
    position: { x: 1, y: 3 },
    grid: padGridToSquare([
      ['a', null, 'c'],
      ['d', 'e', 'f'],
      ['g', null, 'i'],
    ]),
  },
  {
    id: 'tile-2',
    position: { x: 5, y: 6 },
    grid: padGridToSquare([
      ['a', null, 'c'],
      ['d', 'e', 'f'],
    ]),
  },
  {
    id: 'tile-3',
    position: { x: 5, y: 1 },
    grid: padGridToSquare([
      ['a', 'c'],
      ['c', null],
      ['c', null],
    ]),
  },
]
</script>

<template>
  <Level :starting-tiles="tiles" :board-grid-size="10" />
</template>
