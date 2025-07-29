<script setup lang="ts">
import Board from '@/components/Board.vue'
import type { Tile, WordResult } from '@/types'
import { computed } from 'vue'

interface Props {
  interval: number
}

const props = defineProps<Props>()

// Demo tiles for the first instruction
const demoTiles = computed<Tile[]>(() => {
  const rotations = Math.floor(props.interval / 2) + 3

  return [
    {
      id: 'demo-tile-1',
      position: { x: 1, y: 0 },
      grid: [
        [null, 'g', null],
        [null, 'o', null],
        ['p', 'o', null],
      ],
      rotations,
    },
    {
      id: 'demo-tile-2',
      position: { x: 2, y: 3 },
      grid: [
        ['s', 'n'],
        ['e', null],
      ],
      rotations: 0,
    },
  ]
})

const foundWords = computed<WordResult[]>(() => {
  const rotations = Math.floor(props.interval / 2) + 3

  if (rotations % 4 === 0) {
    return [
      {
        text: 'spin',
        direction: 'horizontal',
        cells: [
          { x: 2, y: 0 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 2, y: 3 },
          { x: 2, y: 4 },
        ],
      },
    ]
  }

  return []
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
      current-tile-id="demo-tile-1"
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
