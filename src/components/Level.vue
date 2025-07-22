<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Point, Tile as TileType, Word } from '../types'
import BackgroundGrid from './BackgroundGrid.vue'
import Tile from './Tile.vue'
import { getBoardScaledDelta } from '../../helpers/get-board-scaled-delta'
import { getMousePositionOnBoard } from '../../helpers/get-mouse-position-on-board'
import { getShadowPosition } from '../../helpers/get-shadow-position'
import { rotateGrid } from '../../helpers/rotate-grid'
import { computeGridState } from '../../helpers/compute-grid-state'
import { canPlaceTile } from '../../helpers/can-place-tile'
import WordDisplay from './WordDisplay.vue'
import { findWords } from '../../helpers/find-words'
import { rotateTileInPlace } from '../../helpers/rotate-tile-in-place'

const props = defineProps<{
  startingTiles: TileType[]
  boardGridSize: number
  theme: string
  words: Word[]
}>()

const boardGridScale = 10
const boardViewboxSize = props.boardGridSize * boardGridScale

const tiles = ref(props.startingTiles)

const selectedTile = computed(() => {
  return tiles.value.find((tile) => tile.id === currentTileId.value)
})

const otherTiles = computed(() => {
  return tiles.value.filter((tile) => tile.id !== currentTileId.value)
})

const currentTileId = ref<string | null>(null)
const justDroppedTileId = ref<string | null>(null)
const startingDragPoint = ref<Point | null>(null)
const startingDragOffset = ref<Point | null>(null)
const dragAdjustment = ref<Point | null>(null)
const boardElement = ref<SVGSVGElement | null>(null)
const shadowPosition = ref<Point | null>(null)
const tapOrDragStartedTime = ref<number | null>(null)

const gridState = computed(() => computeGridState(otherTiles.value, props.boardGridSize))

const placementIsValid = computed(() => {
  if (!selectedTile.value || !shadowPosition.value) {
    return false
  }
  return canPlaceTile(
    rotateGrid(selectedTile.value.grid, selectedTile.value.rotations),
    shadowPosition.value,
    gridState.value,
  )
})

const foundWords = computed(() => findWords(gridState.value))
const countOfFoundWords = computed(
  () => props.words.filter((word) => foundWords.value.includes(word.text)).length,
)

const emit = defineEmits<{
  (e: 'next-level'): void
}>()

const startDrag = (tileId: string, startDragPoint: Point, startDragOffset: Point) => {
  currentTileId.value = tileId
  startingDragPoint.value = startDragPoint
  startingDragOffset.value = startDragOffset
  tapOrDragStartedTime.value = Date.now()
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

  // Calculate shadow position using helper function
  shadowPosition.value = getShadowPosition(boardPosition, boardElement.value, boardGridScale)
}

const handleTileTap = (tileId: string) => {
  const tile = tiles.value.find((tile) => tile.id === tileId)
  if (tile) {
    const newPosition = rotateTileInPlace(tile, gridState.value)
    if (newPosition) {
      tile.position = newPosition
      tile.rotations++
    } else {
      alert('No valid position found')
    }
  }
}

const endDrag = async () => {
  const tile = tiles.value.find((tile) => tile.id === currentTileId.value)

  if (!tile) {
    return
  }

  if (!tapOrDragStartedTime.value || Date.now() - tapOrDragStartedTime.value < 300) {
    handleTileTap(tile.id)
  } else if (placementIsValid.value && shadowPosition.value) {
    tile.position = shadowPosition.value
  }

  currentTileId.value = null
  startingDragPoint.value = null
  startingDragOffset.value = null
  dragAdjustment.value = null
  shadowPosition.value = null
  justDroppedTileId.value = tile.id

  await nextTick()

  if (countOfFoundWords.value === props.words.length) {
    emit('next-level')
  }
}
</script>

<template>
  <div
    class="container"
    @pointermove="(e: PointerEvent) => handleMove({ x: e.clientX, y: e.clientY })"
    @pointerup="endDrag"
  >
    <h1 class="theme">{{ theme }} ({{ countOfFoundWords }}/{{ words.length }} found)</h1>

    <ul class="words">
      <li v-for="word in words" :key="word.text">
        <WordDisplay :word="word" :is-found="foundWords.includes(word.text)" />
      </li>
    </ul>

    <hr />

    <p>Drag tiles to move them on the board. Tap to rotate them. Find the words to win!</p>

    <div class="board-container">
      <svg
        class="board"
        :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`"
        ref="boardElement"
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
          @tile-pointerdown="
            (data) => startDrag(tile.id, data.startingDragPoint, data.startingDragOffset)
          "
          :drag-adjustment="tile.id === currentTileId ? dragAdjustment : null"
          :is-selected="tile.id === currentTileId"
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
  </div>
</template>

<style scoped>
.theme {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.container {
  display: grid;
  gap: 1em;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: grid;
  max-width: 500px;
  margin: 0 auto;
}

.board-container {
  display: grid;
  grid-template-areas: 'content';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
}

.board {
  aspect-ratio: 1 / 1;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
  /* TODO: refine... */
  touch-action: none;
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

.words {
  list-style: none;
  display: grid;
  gap: 1em;
  padding: 0;
}
</style>
