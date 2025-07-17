<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { Point } from './types'
import BackgroundGrid from './components/BackgroundGrid.vue'
import Tile from './components/Tile.vue'
import { getBoardScaledDelta } from '../helpers/get-board-scaled-delta'
import { getMousePositionOnBoard } from '../helpers/get-mouse-position-on-board'
import { getShadowPosition } from '../helpers/get-shadow-position'
import { padGridToSquare } from '../helpers/pad-grid-to-square'
import { rotateGrid } from '../helpers/rotate-grid'

const boardViewboxSize = 100
const boardGridSize = 10
const boardGridScale = boardViewboxSize / boardGridSize

const tiles = ref([
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

  if (!boardElement.value) {
    return
  }

  // Calculate drag adjustment using helper function
  const scaledDelta = getBoardScaledDelta(
    position,
    startingDragPoint.value,
    boardElement.value,
    boardViewboxSize,
  )

  dragAdjustment.value = scaledDelta

  if (!startingDragOffset.value) {
    return
  }

  // Get mouse position on board using helper function
  const boardPosition = getMousePositionOnBoard(
    position,
    startingDragOffset.value,
    boardElement.value,
  )

  const currentTile = tiles.value.find((tile) => tile.id === currentTileId.value)

  // Calculate shadow position using helper function
  shadowPosition.value = getShadowPosition(
    boardPosition,
    boardElement.value,
    boardGridScale,
    boardGridSize,
    currentTile,
  )
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

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space' && currentTileId.value) {
    event.preventDefault()

    const tile = tiles.value.find((tile) => tile.id === currentTileId.value)
    if (tile) {
      // Rotate the tile's grid clockwise
      tile.grid = rotateGrid(tile.grid, 'cw')
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    class="container"
    @pointermove="(e: PointerEvent) => handleMove({ x: e.clientX, y: e.clientY })"
    @pointerup="endDrag"
  >
    <svg class="board" :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`" ref="boardElement">
      <BackgroundGrid :size="boardGridSize" :scale="boardGridScale" />

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
        class="shadow"
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
        class="selected"
      />
    </svg>

    <p v-if="currentTileId" style="text-align: center">Press <kbd>Space</kbd> to rotate the tile</p>
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

.shadow {
  opacity: 0.2;
  filter: contrast(0) brightness(0.5);
  transition: transform 0.05s ease-in-out;
}

.selected {
  opacity: 0.85;
}
</style>
