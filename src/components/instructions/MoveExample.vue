<script setup lang="ts">
import Board from '@/components/Board.vue'
import type { Point, Tile, WordResult } from '@/types'
import { computed } from 'vue'

interface Props {
  interval: number
}

const props = defineProps<Props>()

const computedInterval = computed(() => {
  return Math.floor((props.interval + 1) / 2)
})

// Demo tiles for the first instruction
const demoTiles = computed<Tile[]>(() => {
  const positions = [
    { x: 0, y: 1 },
    { x: 2, y: 2 },
  ]

  const currentIndex = computedInterval.value % positions.length
  const position = positions[currentIndex]

  return [
    {
      id: 'demo-tile-1',
      position,
      grid: [
        ['a', null],
        ['l', 'i'],
        [null, null],
      ],
      rotations: 0,
    },
    {
      id: 'demo-tile-2',
      position: { x: 4, y: 3 },
      grid: [
        ['o', 'n'],
        ['l', null],
        [null, null],
      ],
      rotations: 0,
    },
  ]
})

const exampleFoundWords: WordResult[] = [
  {
    text: 'drag',
    direction: 'horizontal',
    cells: [
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
    ],
  },
]

const foundWords = computed<WordResult[]>(() => {
  const currentIndex = computedInterval.value % 2
  return currentIndex === 1 ? exampleFoundWords : []
})
</script>

<template>
  <div class="demo-board">
    <Board
      :board-viewbox-size="60"
      :board-grid-size="6"
      :board-grid-scale="10"
      :tiles="demoTiles"
      :drag-adjustment="null"
      :current-tile-id="null"
      :selected-tile="null"
      :shadow-position="null"
      :placement-is-valid="true"
      :found-words="foundWords"
      just-dropped-tile-id="demo-tile-1"
      :not-interactive="true"
    />
  </div>
</template>

<style scoped>
.demo-board {
  pointer-events: none;
}
</style>
