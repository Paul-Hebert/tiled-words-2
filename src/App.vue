<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Point } from './types'
import BackgroundGrid from './components/BackgroundGrid.vue'
import Tile from './components/Tile.vue'

const tiles = ref([
  {
    id: 'tile-1',
    position: { x: 1, y: 3 },
    grid: {
      rows: [
        ['a', null, 'c'],
        ['d', 'e', 'f'],
        ['g', null, 'i'],
      ],
    },
  },
  {
    id: 'tile-2',
    position: { x: 5, y: 6 },
    grid: {
      rows: [
        ['a', null, 'c'],
        ['d', 'e', 'f'],
      ],
    },
  },
  {
    id: 'tile-3',
    position: { x: 5, y: 1 },
    grid: {
      rows: [
        ['a', 'c'],
        ['c', null],
      ],
    },
  },
])

const selectedTile = computed(() => {
  return tiles.value.find((tile) => tile.id === currentTileId.value)
})

const otherTiles = computed(() => {
  return tiles.value.filter((tile) => tile.id !== currentTileId.value)
})

const currentTileId = ref<string | null>(null)
const startingDragPoint = ref<Point | null>(null)
const startingDragOffset = ref<Point | null>(null)
const dragAdjustment = ref<Point | null>(null)
const boardElement = ref<SVGSVGElement | null>(null)
const shadowPosition = ref<Point | null>(null)

const startDrag = (tileId: string, startDragPoint: Point, startDragOffset: Point) => {
  currentTileId.value = tileId
  startingDragPoint.value = startDragPoint
  startingDragOffset.value = startDragOffset
}

const handleMove = (position: Point) => {
  if (currentTileId.value === null || startingDragPoint?.value === null) {
    return
  }

  const delta = {
    x: position.x - startingDragPoint.value.x,
    y: position.y - startingDragPoint.value.y,
  }

  if (!boardElement.value) {
    return
  }

  const boardBoundingClientRect = boardElement.value.getBoundingClientRect()
  // TODO: fix magic numbers
  const boardScale = boardBoundingClientRect?.width / 100

  const scaledDelta = {
    x: delta.x / boardScale,
    y: delta.y / boardScale,
  }

  dragAdjustment.value = {
    x: scaledDelta.x,
    y: scaledDelta.y,
  }

  // TODO: abstract to function
  // Determine where the selecting tile's shadow should be placed:
  // 1. Check the current mouse position
  // 2. Subtract the starting drag offset
  // 3. Figure out which square in the grid that covers
  // 4. Return the position of that square

  if (!startingDragOffset.value) {
    return
  }

  // Calculate the adjusted mouse position by subtracting the drag offset
  const adjustedMousePosition = {
    x: position.x - startingDragOffset.value.x,
    y: position.y - startingDragOffset.value.y,
  }

  console.log('adjustedMousePosition', adjustedMousePosition, boardBoundingClientRect)

  // Convert screen coordinates to board coordinates
  const boardPosition = {
    x: adjustedMousePosition.x - boardBoundingClientRect.left,
    y: adjustedMousePosition.y - boardBoundingClientRect.top,
  }

  console.log('boardPosition', boardPosition)

  // Calculate the grid position (snap to grid)
  // TODO: fix magic numbers
  const gridPosition = {
    x: Math.floor(boardPosition.x / 50),
    y: Math.floor(boardPosition.y / 50),
  }

  // Ensure the position is within valid bounds (0-9 for a 10x10 grid)
  const clampedPosition = {
    x: Math.max(0, Math.min(9, gridPosition.x)),
    y: Math.max(0, Math.min(9, gridPosition.y)),
  }

  shadowPosition.value = clampedPosition
}

const endDrag = () => {
  const tile = tiles.value.find((tile) => tile.id === currentTileId.value)

  if (!tile || !shadowPosition.value) {
    return
  }

  tile.position = shadowPosition.value

  currentTileId.value = null
  startingDragPoint.value = null
  startingDragOffset.value = null
  dragAdjustment.value = null
  shadowPosition.value = null
}
</script>

<template>
  <div
    class="container"
    @pointermove="(e: PointerEvent) => handleMove({ x: e.clientX, y: e.clientY })"
    @pointerup="endDrag"
  >
    <svg class="board" viewBox="0 0 100 100" ref="boardElement">
      <BackgroundGrid :size="10" :scale="10" />

      <Tile
        v-for="tile in otherTiles"
        :key="tile.id"
        :position="tile.position"
        :grid="tile.grid"
        :scale="10"
        :drag-adjustment="tile.id === currentTileId ? dragAdjustment : null"
        @tile-pointerdown="
          (data) => startDrag(tile.id, data.startingDragPoint, data.startingDragOffset)
        "
      />

      <Tile
        v-if="selectedTile && shadowPosition"
        :key="`${selectedTile.id}-shadow`"
        :position="shadowPosition"
        :grid="selectedTile.grid"
        :scale="10"
        :drag-adjustment="null"
        style="opacity: 0.2; filter: contrast(0) brightness(0.5)"
      />

      <Tile
        v-if="selectedTile"
        :key="selectedTile.id"
        :position="selectedTile.position"
        :grid="selectedTile.grid"
        :scale="10"
        :drag-adjustment="selectedTile.id === currentTileId ? dragAdjustment : null"
        @tile-pointerdown="
          (data) => {
            if (!selectedTile) {
              return
            }

            startDrag(selectedTile.id, data.startingDragPoint, data.startingDragOffset)
          }
        "
      />
    </svg>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: grid;
}

.board {
  aspect-ratio: 1 / 1;
  background-color: #000;
  width: 90vw;
  max-width: 500px;
  margin: 0 auto;
  overflow: visible;
}
</style>
