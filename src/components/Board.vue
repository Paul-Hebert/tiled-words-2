<script setup lang="ts">
import type { Tile as TileType, Point, WordResult } from '@/types'
import BackgroundGrid from './BackgroundGrid.vue'
import Tile from './Tile.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  boardViewboxSize: number
  boardGridSize: number
  boardGridScale: number
  tiles: TileType[]
  justDroppedTileId: string | null
  dragAdjustment: Point | null
  currentTileId: string | null
  selectedTile: TileType | null
  shadowPosition: Point | null
  placementIsValid: boolean
  foundWords: WordResult[]
  notInteractive?: boolean
}>()

const backgroundGridElement = ref<SVGSVGElement | null>(null)

defineExpose({
  backgroundGridElement,
})

const foundWordCells = computed(() => {
  const cells: Point[] = []

  props.foundWords.forEach((word) => {
    cells.push(...word.cells)
  })

  return cells
})
</script>

<template>
  <div class="board-container">
    <svg
      class="board"
      :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`"
      ref="backgroundGridElement"
    >
      <BackgroundGrid :size="boardGridSize" :scale="boardGridScale" />
    </svg>

    <svg
      class="board"
      :class="{ 'selected-container': tile.id === currentTileId }"
      :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`"
      v-for="tile in tiles"
    >
      <Tile
        :key="tile.id"
        :position="tile.position"
        :grid="tile.grid"
        :scale="10"
        :rotations="tile.rotations"
        :was-just-dropped="tile.id === justDroppedTileId"
        :drag-adjustment="tile.id === currentTileId ? dragAdjustment : null"
        :is-selected="tile.id === currentTileId"
        :id="tile.id"
        :found-cells="foundWordCells"
        :not-interactive="notInteractive"
      />
    </svg>

    <svg class="board shadow-container" :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`">
      <Tile
        v-if="selectedTile && shadowPosition"
        :key="`${selectedTile.id}-shadow`"
        :position="shadowPosition"
        :grid="selectedTile.grid"
        :scale="10"
        :rotations="selectedTile.rotations"
        :drag-adjustment="null"
        :is-shadow="true"
        :is-invalid="!placementIsValid"
      />
    </svg>
  </div>
</template>

<style scoped>
.board-container {
  display: grid;
  grid-template-areas: 'content';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  touch-action: none;
}

.board {
  aspect-ratio: 1 / 1;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
  /* TODO: refine... */
  grid-area: content;
  position: relative;
  pointer-events: none;
}

.shadow-container {
  z-index: 1;
}

.selected-container {
  z-index: 2;
}
</style>
