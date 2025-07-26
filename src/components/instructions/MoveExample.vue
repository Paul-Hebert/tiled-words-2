<script setup lang="ts">
import Board from '@/components/Board.vue'
import type { Tile, WordResult } from '@/types'
import { ref, onMounted, onUnmounted } from 'vue'

// Demo tiles for the first instruction
const demoTiles = ref<Tile[]>([
  {
    id: 'demo-tile-1',
    position: { x: 2, y: 2 },
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
])

// Animation interval
let animationInterval: number | null = null

const foundWords = ref<WordResult[]>([])

// Animate the first tile position
const animateTiles = () => {
  const positions = [
    { x: 0, y: 1 },
    { x: 2, y: 2 },
  ]

  let currentIndex = 0

  animationInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % positions.length
    demoTiles.value[0].position = positions[currentIndex]

    if (currentIndex === 1) {
      foundWords.value = [
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
