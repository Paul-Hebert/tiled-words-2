<script setup lang="ts">
import Board from '@/components/Board.vue'
import type { Tile, WordResult } from '@/types'
import { ref, onMounted, onUnmounted } from 'vue'

// Demo tiles for the first instruction
const demoTiles = ref<Tile[]>([
  {
    id: 'demo-tile-1',
    position: { x: 1, y: 0 },
    grid: [
      [null, 'g', null],
      [null, 'o', null],
      ['p', 'o', null],
    ],
    rotations: 3,
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
])

// Animation interval
let animationInterval: number | null = null

const foundWords = ref<WordResult[]>([])

// Animate the first tile position
const animateTiles = () => {
  let rotations = 3

  animationInterval = setInterval(() => {
    rotations++
    demoTiles.value[0].rotations = rotations

    if (rotations % 4 === 0) {
      foundWords.value = [
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
    } else {
      foundWords.value = []
    }
  }, 2000)
}

onMounted(() => {
  animateTiles()
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
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
