<script setup lang="ts">
import Board from '@/components/Board.vue'
import type { Tile, WordResult } from '@/types'
import { ref, onMounted, onUnmounted } from 'vue'

const currentTileId = ref<string | null>('demo-tile-1')

const tile1 = {
  id: 'demo-tile-1',
  position: { x: 3, y: 1 },
  grid: [['t'], ['i']],
  rotations: 0,
}
const tile2 = {
  id: 'demo-tile-2',
  position: { x: 3, y: 3 },
  grid: [
    [null, 'l', null],
    [null, 'e', null],
    [null, 'd', 's'],
  ],
  rotations: 3,
}
const tile3 = {
  id: 'demo-tile-3',
  position: { x: 0, y: 5 },
  grid: [['w', 'o', 'r']],
  rotations: 0,
}

const foundWords = ref<WordResult[]>([])

// Demo tiles for the first instruction
const demoTiles = ref<Tile[]>([tile1, tile2, tile3])

onMounted(() => {
  setTimeout(() => {
    demoTiles.value.find((tile) => tile.id === 'demo-tile-1')!.position = { x: 4, y: 1 }
  }, 500)

  setTimeout(() => {
    currentTileId.value = 'demo-tile-2'
  }, 600)

  setTimeout(() => {
    demoTiles.value.find((tile) => tile.id === 'demo-tile-2')!.rotations = 4
  }, 1000)

  setTimeout(() => {
    currentTileId.value = 'demo-tile-3'
  }, 1100)

  setTimeout(() => {
    demoTiles.value.find((tile) => tile.id === 'demo-tile-3')!.position = { x: 1, y: 5 }
    foundWords.value = [
      {
        text: 'hackz',
        cells: [
          { x: 4, y: 1 },
          { x: 4, y: 2 },
          { x: 4, y: 3 },
          { x: 4, y: 4 },
          { x: 4, y: 5 },
          { x: 5, y: 5 },
          { x: 3, y: 5 },
          { x: 2, y: 5 },
          { x: 1, y: 5 },
        ],
      },
    ]
  }, 1500)
})
</script>

<template>
  <div class="demo-board">
    <Board
      :board-viewbox-size="70"
      :board-grid-size="7"
      :board-grid-scale="10"
      :tiles="demoTiles"
      :drag-adjustment="null"
      :current-tile-id="null"
      :selected-tile="null"
      :shadow-position="null"
      :placement-is-valid="true"
      :just-dropped-tile-id="currentTileId"
      :not-interactive="true"
      :found-words="foundWords"
    />
  </div>
</template>

<style scoped>
.demo-board {
  pointer-events: none;
}
</style>
